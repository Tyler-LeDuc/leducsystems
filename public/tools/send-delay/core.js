/*
 * Send Delay core logic. Pure functions, no Office.js.
 * Loaded three ways: concatenated into launchevent.js (classic Outlook JS runtime has no imports),
 * by <script> in the task pane, and by require() in Node tests.
 */
(function (root) {
  "use strict";

  var SETTINGS_KEY = "sendDelaySettings";
  var MIN_DELAY = 1;
  var MAX_DELAY = 120;
  // A delivery time this far in the future (or more) counts as "already scheduled"; keep it.
  var KEEP_EXISTING_MS = 30 * 1000;

  var DEFAULTS = {
    enabled: true,
    delayMinutes: 2,
    skipInternalOnly: false,
    exceptions: [],
    businessHours: {
      enabled: false,
      days: [1, 2, 3, 4, 5], // 0 = Sunday
      start: "08:00",
      end: "18:00"
    }
  };

  function clone(o) {
    return JSON.parse(JSON.stringify(o));
  }

  function clampInt(v, lo, hi, fallback) {
    var n = parseInt(v, 10);
    if (isNaN(n)) return fallback;
    return Math.min(hi, Math.max(lo, n));
  }

  /** Parses "HH:MM" into minutes after midnight, or null. */
  function parseHHMM(s) {
    var m = /^(\d{1,2}):(\d{2})$/.exec(String(s || "").trim());
    if (!m) return null;
    var h = parseInt(m[1], 10);
    var mi = parseInt(m[2], 10);
    if (h > 23 || mi > 59) return null;
    return h * 60 + mi;
  }

  /** Cleans an exception entry: "Bob@X.com" -> "bob@x.com", "@x.com" or "x.com" -> "x.com". */
  function normalizeException(e) {
    var s = String(e || "").trim().toLowerCase();
    if (!s) return "";
    if (s.charAt(0) === "@") s = s.slice(1);
    if (/\s/.test(s) || s.indexOf(".") === -1) return "";
    return s;
  }

  function parseExceptionList(text) {
    var parts = String(text || "").split(/[\s,;]+/);
    var out = [];
    for (var i = 0; i < parts.length; i++) {
      var n = normalizeException(parts[i]);
      if (n && out.indexOf(n) === -1) out.push(n);
    }
    return out;
  }

  /** Accepts anything (string JSON, partial object, garbage) and returns a full valid settings object. */
  function normalizeSettings(raw) {
    var s = clone(DEFAULTS);
    var r = raw;
    if (typeof r === "string") {
      try {
        r = JSON.parse(r);
      } catch (e) {
        r = null;
      }
    }
    if (!r || typeof r !== "object") return s;

    if (typeof r.enabled === "boolean") s.enabled = r.enabled;
    s.delayMinutes = clampInt(r.delayMinutes, MIN_DELAY, MAX_DELAY, DEFAULTS.delayMinutes);
    if (typeof r.skipInternalOnly === "boolean") s.skipInternalOnly = r.skipInternalOnly;
    if (Array.isArray(r.exceptions)) {
      s.exceptions = parseExceptionList(r.exceptions.join(" "));
    }
    var bh = r.businessHours;
    if (bh && typeof bh === "object") {
      if (typeof bh.enabled === "boolean") s.businessHours.enabled = bh.enabled;
      if (Array.isArray(bh.days)) {
        var days = [];
        for (var i = 0; i < bh.days.length; i++) {
          var d = parseInt(bh.days[i], 10);
          if (d >= 0 && d <= 6 && days.indexOf(d) === -1) days.push(d);
        }
        days.sort();
        s.businessHours.days = days;
      }
      if (parseHHMM(bh.start) !== null) s.businessHours.start = bh.start;
      if (parseHHMM(bh.end) !== null) s.businessHours.end = bh.end;
    }
    // A business-hours rule with no days or an empty window can never be satisfied: turn it off.
    var st = parseHHMM(s.businessHours.start);
    var en = parseHHMM(s.businessHours.end);
    if (s.businessHours.days.length === 0 || st >= en) s.businessHours.enabled = false;
    return s;
  }

  function minutesOfDay(d) {
    return d.getHours() * 60 + d.getMinutes();
  }

  /** True when the local time of `date` falls inside the business-hours window. */
  function isWithinBusinessHours(date, bh) {
    if (bh.days.indexOf(date.getDay()) === -1) return false;
    var m = minutesOfDay(date);
    return m >= parseHHMM(bh.start) && m < parseHHMM(bh.end);
  }

  /** The first business-hours start at or after `date` (local time). Returns `date` if already inside. */
  function nextBusinessStart(date, bh) {
    if (isWithinBusinessHours(date, bh)) return new Date(date.getTime());
    var startMin = parseHHMM(bh.start);
    for (var i = 0; i < 8; i++) {
      var d = new Date(date.getFullYear(), date.getMonth(), date.getDate() + i, Math.floor(startMin / 60), startMin % 60, 0, 0);
      if (bh.days.indexOf(d.getDay()) !== -1 && d.getTime() >= date.getTime()) return d;
    }
    return new Date(date.getTime()); // unreachable with a valid normalized rule
  }

  function addressOf(r) {
    if (!r) return "";
    if (typeof r === "string") return r.trim().toLowerCase();
    return String(r.emailAddress || "").trim().toLowerCase();
  }

  function domainOf(addr) {
    var at = addr.lastIndexOf("@");
    return at === -1 ? "" : addr.slice(at + 1);
  }

  /** Exception entries match a full address, an exact domain, or a parent domain (x.com matches mail.x.com). */
  function matchesException(addr, exceptions) {
    if (!addr) return false;
    var dom = domainOf(addr);
    for (var i = 0; i < exceptions.length; i++) {
      var e = exceptions[i];
      if (e.indexOf("@") !== -1) {
        if (addr === e) return true;
      } else if (dom === e || (dom.length > e.length && dom.slice(-(e.length + 1)) === "." + e)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Decides what to do when the user presses Send.
   * input: { settings, now: Date, recipients: [{emailAddress}|string], userEmail, override, existingDelivery }
   *   override: null/undefined = use rules; { minutes: 0 } = send now; { minutes: n } = hold n minutes.
   *   existingDelivery: Date or 0/null from delayDeliveryTime.getAsync.
   * returns { action: "delay" | "keep" | "none" | "clear", sendAt: Date|null, reason: string }
   *   "clear" = an existing future time must be removed so the mail sends now.
   */
  function decide(input) {
    var settings = normalizeSettings(input.settings);
    var now = input.now;
    var existing = input.existingDelivery instanceof Date ? input.existingDelivery : null;
    var hasFutureExisting = existing && existing.getTime() - now.getTime() >= KEEP_EXISTING_MS;
    var override = input.override;

    if (override && typeof override.minutes === "number") {
      if (override.minutes <= 0) {
        return hasFutureExisting
          ? { action: "clear", sendAt: null, reason: "override-now" }
          : { action: "none", sendAt: null, reason: "override-now" };
      }
      var m = clampInt(override.minutes, MIN_DELAY, 7 * 24 * 60, settings.delayMinutes);
      return { action: "delay", sendAt: new Date(now.getTime() + m * 60000), reason: "override" };
    }

    if (hasFutureExisting) return { action: "keep", sendAt: existing, reason: "already-scheduled" };
    if (!settings.enabled) return { action: "none", sendAt: null, reason: "disabled" };

    var recips = (input.recipients || []).map(addressOf).filter(Boolean);
    for (var i = 0; i < recips.length; i++) {
      if (matchesException(recips[i], settings.exceptions)) {
        return { action: "none", sendAt: null, reason: "exception:" + recips[i] };
      }
    }

    if (settings.skipInternalOnly && recips.length > 0) {
      var ownDomain = domainOf(addressOf(input.userEmail));
      var allInternal = !!ownDomain;
      for (var j = 0; j < recips.length && allInternal; j++) {
        if (domainOf(recips[j]) !== ownDomain) allInternal = false;
      }
      if (allInternal) return { action: "none", sendAt: null, reason: "internal-only" };
    }

    var sendAt = new Date(now.getTime() + settings.delayMinutes * 60000);
    var reason = "rule";
    if (settings.businessHours.enabled && !isWithinBusinessHours(sendAt, settings.businessHours)) {
      sendAt = nextBusinessStart(sendAt, settings.businessHours);
      reason = "business-hours";
    }
    return { action: "delay", sendAt: sendAt, reason: reason };
  }

  function pad2(n) {
    return (n < 10 ? "0" : "") + n;
  }

  /** "14:05", or "Mon 08:00" when the time is not today. 24-hour, local time. */
  function formatSendAt(sendAt, now) {
    var hm = pad2(sendAt.getHours()) + ":" + pad2(sendAt.getMinutes());
    var sameDay =
      sendAt.getFullYear() === now.getFullYear() &&
      sendAt.getMonth() === now.getMonth() &&
      sendAt.getDate() === now.getDate();
    if (sameDay) return hm;
    var names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return names[sendAt.getDay()] + " " + hm;
  }

  /** Human text: "in 5 min", "in 2 h 10 min". */
  function formatIn(sendAt, now) {
    var mins = Math.max(0, Math.round((sendAt.getTime() - now.getTime()) / 60000));
    if (mins < 60) return "in " + mins + " min";
    var h = Math.floor(mins / 60);
    var m = mins % 60;
    return "in " + h + " h" + (m ? " " + m + " min" : "");
  }

  function heldMessage(sendAt, now) {
    return "Held by Send Delay. Sends at about " + formatSendAt(sendAt, now) + " (" + formatIn(sendAt, now) + "). Edit it in Drafts until then.";
  }

  var api = {
    SETTINGS_KEY: SETTINGS_KEY,
    MIN_DELAY: MIN_DELAY,
    MAX_DELAY: MAX_DELAY,
    DEFAULTS: DEFAULTS,
    normalizeSettings: normalizeSettings,
    parseExceptionList: parseExceptionList,
    parseHHMM: parseHHMM,
    isWithinBusinessHours: isWithinBusinessHours,
    nextBusinessStart: nextBusinessStart,
    matchesException: matchesException,
    decide: decide,
    formatSendAt: formatSendAt,
    formatIn: formatIn,
    heldMessage: heldMessage
  };

  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.SendDelayCore = api;
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this);

/* Send Delay task pane: per-message hold and the rule settings. */
/* global Office, SendDelayCore */
(function () {
  "use strict";

  var Core = SendDelayCore;
  var OVERRIDE_KEY = "sd-override";
  var inOffice = false;

  function $(id) {
    return document.getElementById(id);
  }

  function call(fn) {
    return new Promise(function (resolve, reject) {
      fn(function (r) {
        if (r && r.status === Office.AsyncResultStatus.Failed) reject(r.error || new Error("failed"));
        else resolve(r ? r.value : undefined);
      });
    });
  }

  // ---------- settings storage (roaming settings in Outlook, localStorage in a plain browser preview) ----------

  function readSettings() {
    if (inOffice) return Core.normalizeSettings(Office.context.roamingSettings.get(Core.SETTINGS_KEY));
    try {
      return Core.normalizeSettings(localStorage.getItem(Core.SETTINGS_KEY));
    } catch (e) {
      return Core.normalizeSettings(null);
    }
  }

  function writeSettings(s) {
    if (inOffice) {
      Office.context.roamingSettings.set(Core.SETTINGS_KEY, JSON.stringify(s));
      return call(function (cb) {
        Office.context.roamingSettings.saveAsync(cb);
      });
    }
    try {
      localStorage.setItem(Core.SETTINGS_KEY, JSON.stringify(s));
    } catch (e) {
      /* preview only */
    }
    return Promise.resolve();
  }

  function fillForm(s) {
    $("enabled").checked = s.enabled;
    $("delay").value = s.delayMinutes;
    $("bh-enabled").checked = s.businessHours.enabled;
    var boxes = $("bh-days").querySelectorAll("input");
    for (var i = 0; i < boxes.length; i++) boxes[i].checked = s.businessHours.days.indexOf(parseInt(boxes[i].value, 10)) !== -1;
    $("bh-start").value = s.businessHours.start.length === 4 ? "0" + s.businessHours.start : s.businessHours.start;
    $("bh-end").value = s.businessHours.end.length === 4 ? "0" + s.businessHours.end : s.businessHours.end;
    $("skip-internal").checked = s.skipInternalOnly;
    $("exceptions").value = s.exceptions.join("\n");
    $("btn-default").textContent = "Default (" + s.delayMinutes + " min)";
  }

  function readForm() {
    var days = [];
    var boxes = $("bh-days").querySelectorAll("input");
    for (var i = 0; i < boxes.length; i++) if (boxes[i].checked) days.push(parseInt(boxes[i].value, 10));
    return Core.normalizeSettings({
      enabled: $("enabled").checked,
      delayMinutes: $("delay").value,
      skipInternalOnly: $("skip-internal").checked,
      exceptions: Core.parseExceptionList($("exceptions").value),
      businessHours: {
        enabled: $("bh-enabled").checked,
        days: days,
        start: $("bh-start").value,
        end: $("bh-end").value
      }
    });
  }

  function onSave(e) {
    e.preventDefault();
    var wanted = $("bh-enabled").checked;
    var s = readForm();
    var note = "";
    if (wanted && !s.businessHours.enabled) note = " Business hours were turned off: pick at least one day and an end after the start.";
    $("save-status").textContent = "Saving...";
    writeSettings(s).then(
      function () {
        fillForm(s);
        $("save-status").textContent = "Saved." + note;
        refreshMessage();
      },
      function (err) {
        $("save-status").textContent = "Could not save: " + ((err && err.message) || "unknown error");
      }
    );
  }

  // ---------- this message ----------

  function item() {
    return inOffice ? Office.context.mailbox.item : null;
  }

  function isCompose() {
    var it = item();
    return !!(it && it.delayDeliveryTime && it.delayDeliveryTime.setAsync);
  }

  function getExisting() {
    return call(function (cb) {
      item().delayDeliveryTime.getAsync(cb);
    }).then(function (v) {
      if (!v) return null;
      var d = v instanceof Date ? v : new Date(v);
      return isNaN(d.getTime()) ? null : d;
    });
  }

  function getOverride() {
    var it = item();
    if (!it.sessionData) return Promise.resolve(null);
    return call(function (cb) {
      it.sessionData.getAsync(OVERRIDE_KEY, cb);
    }).then(
      function (v) {
        var n = parseInt(v, 10);
        return isNaN(n) ? null : n;
      },
      function () {
        return null;
      }
    );
  }

  function setStatus(text) {
    $("message-status").textContent = text;
  }

  function refreshMessage() {
    if (!isCompose()) return;
    var now = new Date();
    Promise.all([getExisting(), getOverride()]).then(
      function (r) {
        var existing = r[0];
        var override = r[1];
        if (override === 0) {
          setStatus("No delay. This message sends as soon as you press Send.");
        } else if (existing && existing.getTime() > now.getTime()) {
          setStatus(
            (override ? "Hold set: " : "Held. ") +
              "Sends at about " + Core.formatSendAt(existing, now) + " (" + Core.formatIn(existing, now) + ")."
          );
        } else {
          var d = Core.decide({ settings: readSettings(), now: now, recipients: [], userEmail: "" });
          if (d.action === "delay") {
            setStatus("When you press Send, this message is held until about " + Core.formatSendAt(d.sendAt, now) + ", unless a send-right-away rule matches.");
          } else {
            setStatus("Rules are off. This message sends right away.");
          }
        }
      },
      function (err) {
        setStatus("Could not read this message: " + ((err && err.message) || "unknown error"));
      }
    );
  }

  function hold(minutes) {
    var it = item();
    var now = new Date();
    var steps = [];
    if (it.sessionData) {
      steps.push(
        call(function (cb) {
          it.sessionData.setAsync(OVERRIDE_KEY, String(minutes), cb);
        })
      );
    }
    var at = minutes > 0 ? new Date(now.getTime() + minutes * 60000) : now;
    var clear = minutes <= 0;
    steps.push(
      getExisting().then(function (existing) {
        // "No delay" only needs to touch the delivery time when one is set.
        if (clear && !(existing && existing.getTime() > now.getTime())) return;
        return call(function (cb) {
          it.delayDeliveryTime.setAsync(at, cb);
        });
      })
    );
    setStatus("Saving...");
    Promise.all(steps).then(refreshMessage, function (err) {
      setStatus("Could not set the hold: " + ((err && err.message) || "unknown error"));
    });
  }

  function wireMessageCard() {
    var btns = document.querySelectorAll("[data-hold]");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function (e) {
        var v = e.currentTarget.getAttribute("data-hold");
        hold(v === "default" ? readSettings().delayMinutes : parseInt(v, 10));
      });
    }
    $("btn-custom").addEventListener("click", function () {
      var n = parseInt($("custom-min").value, 10);
      if (isNaN(n) || n < 1 || n > 10080) {
        setStatus("Enter 1 to 10080 minutes.");
        return;
      }
      hold(n);
    });
  }

  function start() {
    fillForm(readSettings());
    $("settings").addEventListener("submit", onSave);
    if (isCompose()) {
      $("message-card").hidden = false;
      wireMessageCard();
      refreshMessage();
    }
  }

  if (typeof Office !== "undefined" && Office.onReady) {
    Office.onReady(function (info) {
      inOffice = !!(info && info.host);
      start();
    });
  } else {
    document.addEventListener("DOMContentLoaded", start);
  }
})();

# Builds leducsystems.com/saguaro-hours/ pages from the Saguaro Hours listing Markdown
# in apps/jira-time/listing. Run from the repo root: python scripts/build-saguaro-pages.py
import html
import re
from pathlib import Path

import shutil

import markdown

SRC = Path("C:/Users/Tyler/apps/jira-time/listing")
OUT = Path("public/saguaro-hours")
SKIP_DOCS = set()
DOC_ORDER = ["getting-started", "weekly-timesheet", "log-work-panel", "periods-and-approvals", "teams",
             "billable-and-attributes", "reports-and-exports", "dashboard-gadget", "post-lock-warnings",
             "permissions", "data-export"]

STYLE = """<style>
:root{--ink:#15130F;--paper:#FAF8F3;--muted:#5C574E;--line:rgba(21,19,15,.14);--accent:#E8365F}
*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font:17px/1.6 "IBM Plex Sans",system-ui,-apple-system,"Segoe UI",sans-serif}
header,main,footer{max-width:760px;margin:0 auto;padding:0 20px}header{padding-top:28px;display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap}header img{height:28px;display:block}
nav a{margin-left:16px;color:var(--muted);font-size:.95rem}nav a:first-child{margin-left:0}
h1{font:600 2.1rem/1.15 Fraunces,Georgia,serif;margin:40px 0 12px}h2{font:600 1.3rem/1.3 Fraunces,Georgia,serif;margin:32px 0 8px}
a{color:var(--ink)}a:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
table{border-collapse:collapse;width:100%;margin:16px 0;font-size:.95rem}th,td{border:1px solid var(--line);padding:8px 10px;text-align:left;vertical-align:top}th{background:#EFEDE7}
code{background:#EFEDE7;padding:1px 5px;border-radius:3px}hr{border:0;border-top:1px solid var(--line);margin:32px 0}
main img{max-width:100%;height:auto}.docs-list li{margin:6px 0}footer{margin-top:56px;padding:16px 20px 40px;color:var(--muted);font-size:.9rem;border-top:1px solid var(--line)}
@media (max-width:480px){h1{font-size:1.7rem}table{display:block;overflow-x:auto}}
</style>"""


# Same cookie banner and GA4 tag as the rest of leducsystems.com (one source: leduc-tools/src/consent.js).
_consent_src = Path("C:/Users/Tyler/apps/leduc-tools/src/consent.js").read_text(encoding="utf-8")
CONSENT = re.search(r"consentScript = `(.*?)`;", _consent_src, re.S).group(1).replace(
    "${GA_ID}", re.search(r"GA_ID = '([^']+)'", _consent_src).group(1))

# Launch list: each "Email me when it's live" mailto (subject "... launch") gets a one-field form
# after it. It sends through the site's EmailJS contact template to tyler@leducsystems.com, keeps the
# mailto as the fallback, and records a GA4 generate_lead event (only counted after cookie consent).
NOTIFY = r"""<style>
.sg-notify{margin:12px 0 20px;padding:14px 16px;border:1px solid var(--line);border-radius:8px;background:#fff;max-width:560px}
.sg-notify label{display:block;font-weight:600;margin-bottom:6px}.sg-notify .sg-row{display:flex;gap:8px;flex-wrap:wrap}
.sg-notify input[type=email]{flex:1 1 220px;min-height:44px;font:inherit;padding:6px 10px;border:1px solid rgba(21,19,15,.4);border-radius:4px}
.sg-notify button{min-height:44px;font:inherit;font-weight:600;padding:6px 16px;border:0;border-radius:4px;background:#1d6b4f;color:#fff;cursor:pointer}
.sg-notify button[disabled]{opacity:.6;cursor:default}.sg-notify .sg-note{margin:8px 0 0;color:var(--muted);font-size:.9rem}
.sg-notify .sg-status{margin:8px 0 0;font-weight:600}.sg-notify .sg-hp{position:absolute;left:-9999px}
.sg-notify input:focus-visible,.sg-notify button:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.sg-notify [hidden]{display:none}
</style>
<script>
(function () {
  var DONE = 'sgLaunchList';
  function track(name, params) { if (window.gtag) window.gtag('event', name, params); }
  function done(form, msg) {
    form.querySelector('.sg-row').hidden = true;
    form.querySelector('.sg-note').hidden = true;
    form.querySelector('label').hidden = true;
    form.querySelector('.sg-status').textContent = msg;
  }
  function build(subject, n) {
    var id = 'sg-email-' + n, f = document.createElement('form');
    f.className = 'sg-notify';
    f.noValidate = true;
    f.innerHTML = '<label for="' + id + '">Your work email</label>'
      + '<div class="sg-row"><input id="' + id + '" type="email" name="email" autocomplete="email" required placeholder="you@company.com">'
      + '<button type="submit">Email me when it\'s live</button></div>'
      + '<input class="sg-hp" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">'
      + '<p class="sg-note">One email on the day it is live on the Atlassian Marketplace. I use your address for nothing else and never share it.</p>'
      + '<p class="sg-status" role="status" aria-live="polite"></p>';
    var stored = null;
    try { stored = window.localStorage.getItem(DONE + ':' + subject); } catch (e) {}
    if (stored) { done(f, 'You are on the list (' + stored + '). I will email you the day it is live.'); return f; }
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = f.querySelector('input[type=email]'), btn = f.querySelector('button'), st = f.querySelector('.sg-status');
      var email = input.value.trim();
      if (f.querySelector('.sg-hp').value) return;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { st.textContent = 'Enter a valid email address.'; input.focus(); return; }
      btn.disabled = true;
      st.textContent = 'Sending...';
      fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: 'service_zeogjbm', template_id: 'template_mfizbds', user_id: 'HIVHympEPP7sMQ_Pl',
          template_params: {
            from_name: email, from_email: email, reply_to: email, to_email: 'tyler@leducsystems.com', subject: subject,
            message: 'Launch list: please email me when it is live.\nEmail: ' + email + '\nPage: ' + location.pathname
          }
        })
      }).then(function (r) {
        if (!r.ok) throw new Error(r.status);
        try { window.localStorage.setItem(DONE + ':' + subject, email); } catch (e2) {}
        track('generate_lead', { form: 'launch_list', list: subject, page_path: location.pathname });
        done(f, 'Thanks. I will email ' + email + ' the day it is live.');
      }).catch(function () {
        btn.disabled = false;
        st.innerHTML = 'That did not send. Please email <a href="mailto:tyler@leducsystems.com?subject=' + encodeURIComponent(subject) + '">tyler@leducsystems.com</a> with the subject "' + subject + '" instead.';
      });
    });
    return f;
  }
  var n = 0;
  [].slice.call(document.querySelectorAll('main a[href^="mailto:"]')).forEach(function (a) {
    var m = /[?&]subject=([^&]*)/.exec(a.getAttribute('href'));
    var subject = m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : '';
    if (!/ launch$/i.test(subject)) return;
    a.addEventListener('click', function () { track('launch_list_mailto', { list: subject, page_path: location.pathname }); });
    var block = a.closest('p, li') || a;
    if (a.id === 'cta') a.style.display = 'none';
    block.parentNode.insertBefore(build(subject, ++n), block.nextSibling);
  });
})();
</script>"""


def doc_title(text):
    m = re.search(r"^# (.+)$", text, re.M)
    return m.group(1).strip() if m else "Saguaro Hours"


def link_doc_mentions(text, docs):
    # The docs refer to each other by file name ("see teams.md"); turn those into links.
    def repl(m):
        name = m.group(1)
        return f"[{name.replace('-', ' ')}](/saguaro-hours/docs/{name}/)" if name in docs else m.group(0)
    text = re.sub(r"(?<![\w/(])([a-z0-9-]+)\.md\b", repl, text)
    return re.sub(r"\bthe privacy policy\b", "the [privacy policy](/saguaro-hours/privacy/)", text)


def autolink(text):
    return re.sub(r"(?<!\]\()(?<![<\[])(https://[^\s)]+[^\s).,])", r"<\1>", text)


def page(title, body_md, path, description, full_title=False, product="Saguaro Hours for Jira"):
    body = markdown.markdown(body_md, extensions=["tables"])
    out = OUT / path / "index.html"
    out.parent.mkdir(parents=True, exist_ok=True)
    url = f"https://leducsystems.com/saguaro-hours/{path + '/' if path else ''}"
    out.write_text(f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{html.escape(title if full_title else title + ' | Saguaro Hours for Jira')}</title>
<meta name="description" content="{html.escape(description)}">
<link rel="canonical" href="{url}">
<link rel="icon" href="/favicon.ico">
{STYLE}
{CONSENT}
</head><body>
<header><a href="/"><img src="/leduc-logo.svg" alt="LeDuc Systems"></a>
<nav><a href="/saguaro-hours/docs/">Docs</a><a href="/saguaro-hours/support/">Support</a><a href="/saguaro-hours/security/">Security</a><a href="/saguaro-hours/privacy/">Privacy</a></nav></header>
<main>
{body}
</main>
<footer>{product} · LeDuc Systems LLC · <a href="mailto:tyler@leducsystems.com">tyler@leducsystems.com</a> · <a href="/privacy#cookies" data-cookie-settings>Cookie settings</a></footer>
{NOTIFY}
</body></html>
""", encoding="utf-8")
    return url


def prep(path, docs):
    text = path.read_text(encoding="utf-8")
    text = re.sub(r"^(# .*?)\s*\(?draft\)?\s*$", r"\1", text, count=1, flags=re.M | re.I)
    return autolink(link_doc_mentions(text, docs))


docs = {p.stem for p in (SRC / "docs").glob("*.md") if p.name not in SKIP_DOCS and p.stem != "security"}
urls = []
urls.append(page("Privacy Policy", prep(SRC / "privacy-policy-draft.md", docs), "privacy",
                 "What Saguaro Hours for Jira stores, where it stays, and how it is deleted."))
urls.append(page("Support", prep(SRC / "support-and-sla-draft.md", docs), "support",
                 "How to reach support for Saguaro Hours for Jira and our response times."))
urls.append(page("Terms", prep(SRC / "terms.md", docs), "terms",
                 "Terms for Saguaro Hours for Jira: the Atlassian Marketplace standard end user agreement."))
urls.append(page("Security", prep(SRC / "docs" / "security.md", docs), "security",
                 "How Saguaro Hours for Jira keeps your data on Atlassian Forge."))
ordered = [d for d in DOC_ORDER if d in docs] + sorted(docs - set(DOC_ORDER))
items = []
for name in ordered:
    text = prep(SRC / "docs" / f"{name}.md", docs)
    title = doc_title(text)
    page(title, text, f"docs/{name}", f"Saguaro Hours for Jira documentation: {title}.")
    items.append(f"- [{title}](/saguaro-hours/docs/{name}/)")
index_md = "# Saguaro Hours for Jira documentation\n\n" + "\n".join(items) + \
    "\n\nAlso see [Support](/saguaro-hours/support/), [Security](/saguaro-hours/security/) and the [Privacy Policy](/saguaro-hours/privacy/).\n"
urls.append(page("Documentation", index_md, "docs", "Guides for installing and using Saguaro Hours for Jira."))
# Marketing pages: front matter gives the exact title, description and output path.
SITE = Path("C:/Users/Tyler/apps/jira-time/site")
for f in sorted(SITE.glob("*.md")):
    text = f.read_text(encoding="utf-8")
    m = re.match(r"---\n(.*?)\n---\n", text, re.S)
    meta = dict(re.findall(r'^(\w+): "(.*)"$', m.group(1), re.M))
    body = autolink(link_doc_mentions(text[m.end():], docs))
    urls.append(page(meta["title"], body, meta["path"], meta["description"], full_title=True))
# The Azure DevOps version's pre-launch page lives in its own repo.
for f in sorted(Path("C:/Users/Tyler/apps/saguaro-ado/listing/site-prelaunch").glob("*.md")):
    text = f.read_text(encoding="utf-8")
    m = re.match(r"---\n(.*?)\n---\n", text, re.S)
    meta = dict(re.findall(r'^(\w+): "(.*)"$', m.group(1), re.M))
    urls.append(page(meta["title"], autolink(text[m.end():]), meta["path"], meta["description"], full_title=True,
                     product="Saguaro Hours for Azure DevOps"))
img = OUT / "img"
img.mkdir(parents=True, exist_ok=True)
for png in (SRC / "assets" / "screens").glob("*.png"):
    shutil.copy2(png, img / png.name)
print("\n".join(urls))
print(len(ordered), "doc pages")

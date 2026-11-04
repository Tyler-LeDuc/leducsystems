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


def page(title, body_md, path, description, full_title=False):
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
</head><body>
<header><a href="/"><img src="/leduc-logo.svg" alt="LeDuc Systems"></a>
<nav><a href="/saguaro-hours/docs/">Docs</a><a href="/saguaro-hours/support/">Support</a><a href="/saguaro-hours/security/">Security</a><a href="/saguaro-hours/privacy/">Privacy</a></nav></header>
<main>
{body}
</main>
<footer>Saguaro Hours for Jira · LeDuc Systems LLC · <a href="mailto:tyler@leducsystems.com">tyler@leducsystems.com</a></footer>
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
img = OUT / "img"
img.mkdir(parents=True, exist_ok=True)
for png in (SRC / "assets" / "screens").glob("*.png"):
    shutil.copy2(png, img / png.name)
print("\n".join(urls))
print(len(ordered), "doc pages")

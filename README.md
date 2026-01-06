# docker-etherpadplus

## Project overview

Build a **self‑hosted, Word‑like collaborative editor** using Etherpad, packaged as a custom Docker image with a curated plugin set and optional AI assistance via an existing **Ollama** instance.[^1][^2][^3]

The goal is to give a **non‑technical team** a familiar writing experience (toolbars, headings, page feel, images, spell/grammar help, and optional AI support per section) while keeping the underlying stack simple and under your control.[^4][^5]

## Objectives

- Provide a **web‑based editor** that feels closer to Microsoft Word than to a “notebook”/Markdown app for your team.
- Use **Etherpad** as the core real‑time editor, extended via plugins and theming to improve usability and document structure.[^5][^3]
- Integrate **basic language assistance** (spellcheck/grammar via LanguageTool) and **section‑scoped AI help** via your existing Ollama server.
- Package everything in a **custom Docker image** for easy deployment and reproducibility.

## Core components

### 1. Etherpad base service

- Use the official Etherpad Docker image as the base.
- Configure persistent storage for:
  - Etherpad data (pads database, usually in a volume or mapped directory).
  - Optional logs/config overrides (`settings.json`).[^3]

### 2. Plugin set (Word‑like editing)

Target: familiar toolbar, headings, page feeling, images, and basic formatting.

**Must‑have plugins:**

- **`ep_headings2`** – adds proper headings (H1/H2/H3) for structure and better exports.[^6][^4]
- **`ep_page_view`** – gives a page view UI with visible page breaks, closer to Word’s “Print Layout”.[^4][^5]
- **`ep_image_upload`** – allows users to insert images via upload/drag and drop.[^7]
- **`ep_font_color`** (and optionally `ep_font_size` / `ep_font_family`) – richer text formatting for users who expect Word‑style controls.[^5]
- **`ep_spellcheck`** – toggles native browser spellcheck in the pad so users see red underlines for typos.[^8][^9]

**Nice‑to‑have plugins (depending on taste):**

- **`ep_align`** – left/center/right/full justification toolbar buttons.[^1][^7]
- **`ep_comments_page`** – sidebar comments linked to text, useful for team review.[^7]
- **`ep_file_menu_toolbar` / similar** – more discoverable menu entries like “Print”, “Export”.[^5]

These plugins are all installable via NPM and are listed on the official Etherpad plugin index.[^1][^7]

### 3. Export workflow (for Pandoc → Word)

- Ensure Etherpad **HTML and/or ODT export** works and is tested with your plugin set.[^10][^3]
- Define a documented path for users:
  - “Write in Etherpad → Export as HTML/ODT → Pandoc to .docx → final formatting in Word.”
- Optionally, add a small script or service on the server side that:
  - Fetches a pad via Etherpad API and runs Pandoc automatically to produce `.docx` on demand.[^3]

### 4. LanguageTool integration (grammar + spelling)

Two layers, starting simple:

- **User‑side integration (Phase 1):**
  - Adopt **LanguageTool browser extension** as the baseline grammar checker.
  - Document that team members should install it, and that it will underline issues in Etherpad like in Word.[^9][^8]
- **Server‑side/UX integration (Phase 2 – optional custom plugin):**
  - Self‑host a LanguageTool server.
  - Create a small Etherpad plugin that:
    - Adds a “Check selection with LanguageTool” button.
    - Sends selected text to the LT HTTP API.
    - Displays suggestions in a simple popup or sidebar.[^11][^3]

This phase can be deferred; the project brief should explicitly mark it as “Later / nice‑to‑have”.

### 5. LLM “copilot” integration using Ollama

You already have **Ollama**, which exposes a local HTTP API for generating text. The aim is to add **section‑scoped** AI help, not whole‑document rewriting.[^2]

**Minimal viable integration:**

- Add a custom Etherpad plugin (or small JS injected via settings) that:
  - Adds an **“Ask AI”** toolbar button.
  - On click:
    - Reads the currently selected text from the pad.
    - Opens a small modal/side panel with:
      - A dropdown of actions (e.g. “Rewrite for clarity”, “Shorten”, “Expand”, “Fix grammar”).
      - A text area showing the selection and allowing user to tweak the prompt.
    - Sends a POST request to your Ollama API with `{ model, prompt, input }`.[^2]
    - Displays the returned suggestion with buttons:
      - “Replace selection”
      - “Insert below”
      - “Copy only”
- Keep the plugin **stateless** (all conversational context is in the prompt), to avoid storing user text server‑side beyond the current request.

**Security / privacy notes:**

- In the brief, specify that:
  - The LLM is **self‑hosted** and only accessible from your internal network.
  - No text leaves your infrastructure.
  - The plugin should not log raw user content.

## Dockerization approach

- **Custom Dockerfile** based on official `etherpad/etherpad` image:
  - Install required plugins via `npm install --no-save ...` in the image.[^7][^5]
  - Copy in:
    - `settings.json` (or additional config file) with:
      - Plugin config (page view default on, etc.).[^3]
      - API keys / URLs for LanguageTool server and Ollama endpoint.
    - Custom plugin code for the Ollama “Ask AI” feature (and optional LT plugin).
  - Expose Etherpad on your chosen port (e.g. 9001).
- Use **docker‑compose** to define:
  - `etherpad` service (your custom image).
  - Optional `language-tool` service (if you host LT).
  - Any reverse proxy (e.g. Traefik/NGINX) for TLS and stable URLs.

## Phased delivery plan

1. **Phase 1 – Core editor (Word‑like Etherpad)**
   - Deploy base Etherpad in Docker with the selected plugins:
     - `ep_headings2`, `ep_page_view`, `ep_image_upload`, `ep_font_color`, `ep_align`, `ep_spellcheck`.[^6][^4][^7]
   - Configure theme and defaults (page view on, clear toolbar).
   - Validate export → Pandoc → Word pipeline.
2. **Phase 2 – Language tools**
   - Standardize on LanguageTool browser extension with a short “how to install” guide.
   - Optionally, spin up a LanguageTool server and begin designing a simple Etherpad integration.
3. **Phase 3 – Ollama “copilot”**
   - Add the custom Etherpad plugin that:
     - Reads selected text.
     - Calls your Ollama instance via its REST API.
     - Inserts suggestions back into the pad.[^11][^2]
   - Limit scope explicitly to **per‑section** operations to align with your intent.
4. **Phase 4 – Refinement**
   - Gather feedback from your team (is the toolbar clear, are headings obvious, is the AI button helpful or distracting?).
   - Tweak plugin set and defaults (e.g. hide rarely used buttons, simplify menus).

This brief should give you a clear, bounded project: **one Dockerized Etherpad with a curated plugin stack and hooks into LanguageTool + your existing Ollama**, aimed at giving your team a Word‑ish experience without Microsoft’s ecosystem.


[^1]: https://static.etherpad.org/index.html

[^2]: https://builtin.com/articles/ollama-api

[^3]: https://etherpad.org/doc/v2.1.1/index.html

[^4]: https://blog.etherpad.org/2013/01/31/9-etherpad-plugins-to-extend-functionality/

[^5]: https://mclear.co.uk/2014/01/04/top-10-etherpad-plugins-2014/

[^6]: https://github.com/ether/ep_headings2

[^7]: https://github-wiki-see.page/m/T3Pad/etherpad-lite/wiki/Plugins

[^8]: https://github.com/ether/ep_spellcheck

[^9]: https://www.npmjs.com/package/ep_spellcheck

[^10]: https://github.com/ether/etherpad-lite/issues/5211

[^11]: https://docs.etherpad.org/api/hooks_server-side.html

[^12]: https://pinggy.io/blog/how_to_self_host_any_llm_step_by_step_guide/

[^13]: https://bugzilla.mozilla.org/show_bug.cgi?id=1208596

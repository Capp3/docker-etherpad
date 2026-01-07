# ep_languagetool

Grammar and style checking for Etherpad using LanguageTool.

## Features

- **Grammar checking** - Professional grammar and style checking powered by LanguageTool
- **One-click corrections** - Apply suggested replacements with a single click
- **User-friendly interface** - Clean modal dialog with contextual suggestions
- **Blue underlines** - Grammar errors are marked with blue wavy underlines (similar to spell check's red underlines)
- **Multi-language support** - Currently configured for en-US, extensible to other languages

## Requirements

- Etherpad 1.8.0+
- LanguageTool server (included in docker-compose setup)

## Installation

This plugin is pre-installed in the EtherpadPlus Docker image.

For manual installation:

```bash
npm install ep_languagetool
```

## Usage

1. Click the **"Check Grammar"** button in the toolbar (looks like a checkmark icon)
2. Wait for LanguageTool to analyze your text
3. Review suggestions in the modal dialog
4. Click a suggestion to apply it, or click "Ignore" to skip
5. Close the modal when done

## Configuration

The plugin connects to LanguageTool via environment variables:

- `LANGUAGETOOL_HOST` - Hostname of LanguageTool service (default: `languagetool`)
- `LANGUAGETOOL_PORT` - Port of LanguageTool service (default: `8081`)

## API Endpoint

The plugin exposes a server-side endpoint for checking text:

```
POST /languagetool/check
Content-Type: application/json

{
  "text": "Your text here",
  "language": "en-US"
}
```

## Development

The plugin follows Etherpad's plugin architecture:

- `ep.json` - Plugin manifest with hooks
- `server/index.js` - Server-side API proxy
- `static/js/index.js` - Client-side UI and logic
- `static/css/editor.css` - Styling

## Architecture

1. **Client clicks button** → Opens modal, fetches pad text
2. **Client sends text** → `/languagetool/check` (Etherpad server)
3. **Server proxies request** → LanguageTool container (`languagetool:8081`)
4. **LanguageTool responds** → Grammar matches
5. **Client displays suggestions** → User can apply or ignore
6. **Client applies replacement** → Updates pad content via Ace editor API

## Future Enhancements

- Real-time checking (as you type)
- Inline underlines (like `ep_spellcheck`)
- Custom dictionaries
- Multi-language selection
- Settings panel

## License

Apache-2.0

## Credits

Built for EtherpadPlus by the development team.
Powered by [LanguageTool](https://languagetool.org/).

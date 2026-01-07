# ep_ai_assistant

Etherpad plugin that provides AI-powered text assistance using Ollama or OpenRouter.

## Features

- **Multiple AI Providers** - Support for Ollama (self-hosted) and OpenRouter (cloud)
- **Section-Scoped Assistance** - Works on selected text only
- **Multiple Actions** - Rewrite, Shorten, Expand, Fix grammar, Improve tone, Summarize
- **Custom Prompts** - Override default actions with custom prompts
- **Easy Integration** - Simple toolbar button interface

## Installation

This plugin is automatically installed as part of the Etherpad Plus Docker image.

## Configuration

### Environment Variables

Add to your `.env` file:

```bash
# AI Provider: "ollama" or "openrouter"
AI_PROVIDER=ollama

# Ollama Configuration
OLLAMA_API_URL=http://ollama:11434
OLLAMA_MODEL=llama2

# OpenRouter Configuration
OPENROUTER_API_KEY=your_api_key_here
OPENROUTER_MODEL=openai/gpt-3.5-turbo
```

### Settings Configuration

The plugin reads configuration from `etherpad.settings.json`:

```json
{
  "ep_ai_assistant": {
    "provider": "ollama",
    "ollama": {
      "apiUrl": "http://ollama:11434",
      "defaultModel": "llama2",
      "timeout": 30000
    },
    "openrouter": {
      "apiUrl": "https://openrouter.ai/api/v1",
      "apiKey": "your_key",
      "defaultModel": "openai/gpt-3.5-turbo",
      "timeout": 30000
    }
  }
}
```

## Usage

1. **Select Text** - Highlight the text you want to improve
2. **Click AI Button** - Click the "🤖 AI" button in the toolbar
3. **Choose Action** - Select an action from the dropdown (or write custom prompt)
4. **Generate** - Click "Generate" to get AI suggestions
5. **Apply Result** - Choose to replace selection, insert below, or copy

## Supported Providers

### Ollama

- **Self-hosted** - Complete privacy, no internet required
- **No API costs** - Free to use
- **Models** - Supports any Ollama-compatible model (llama2, mistral, etc.)

### OpenRouter

- **Multiple Models** - Access to OpenAI, Anthropic, Google, Meta models
- **Unified API** - Single interface for multiple providers
- **Usage Tracking** - Monitor costs and usage in OpenRouter dashboard
- **Requires API Key** - Get from https://openrouter.ai/keys

## Available Actions

- **Rewrite for clarity** - Improve readability and flow
- **Shorten** - Make text more concise
- **Expand** - Add more detail and explanation
- **Fix grammar** - Correct grammar and spelling
- **Improve tone** - Adjust tone (professional, friendly, etc.)
- **Summarize** - Create a brief summary

## Troubleshooting

### "AI Assistant is not configured"

- Check that `ep_ai_assistant` section exists in `settings.json`
- Verify environment variables are set correctly

### "Cannot connect to Ollama"

- Ensure Ollama is running and accessible
- Check `OLLAMA_API_URL` is correct
- Verify network connectivity from Etherpad container

### "Invalid OpenRouter API key"

- Verify your API key at https://openrouter.ai/keys
- Check that `OPENROUTER_API_KEY` is set correctly
- Ensure key has sufficient credits

### Button doesn't appear

- Check browser console for errors
- Verify plugin is loaded in Etherpad admin panel
- Rebuild Docker image if plugin was just added

## Security Notes

- **Ollama**: All processing is local, no data leaves your infrastructure
- **OpenRouter**: Text is sent to external API, review privacy policy
- **API Keys**: Never commit API keys to version control
- **Server Proxy**: Consider implementing server-side proxy for OpenRouter to hide API keys

## License

Apache-2.0

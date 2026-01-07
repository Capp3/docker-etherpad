"use strict";

/**
 * OpenRouter API Client
 * Handles communication with OpenRouter API
 */

exports.generate = async function(config, prompt, selectedText) {
  const apiUrl = config.apiUrl || "https://openrouter.ai/api/v1";
  const apiKey = config.apiKey;
  const model = config.defaultModel || "openai/gpt-3.5-turbo";
  const timeout = config.timeout || 30000;

  if (!apiKey) {
    throw new Error("OpenRouter API key is required. Please set OPENROUTER_API_KEY in your configuration.");
  }

  const fullPrompt = `${prompt}\n\nText: ${selectedText}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(`${apiUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.origin,
        "X-Title": "Etherpad AI Assistant"
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: "user",
            content: fullPrompt
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: { message: await response.text() } }));
      const errorMessage = errorData.error?.message || `HTTP ${response.status}`;

      if (response.status === 401) {
        throw new Error("Invalid OpenRouter API key. Please check your OPENROUTER_API_KEY configuration.");
      }
      if (response.status === 429) {
        throw new Error("Rate limit exceeded. Please try again later.");
      }
      throw new Error(`OpenRouter API error: ${errorMessage}`);
    }

    const data = await response.json();

    // OpenRouter returns text in choices[0].message.content
    if (data.choices && data.choices.length > 0 && data.choices[0].message) {
      return data.choices[0].message.content.trim();
    } else {
      throw new Error("Invalid response format from OpenRouter");
    }
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Request timeout - OpenRouter did not respond in time");
    }
    if (error.message.includes("Failed to fetch")) {
      throw new Error("Cannot connect to OpenRouter. Please check your internet connection.");
    }
    throw error;
  }
};

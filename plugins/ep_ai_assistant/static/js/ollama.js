"use strict";

/**
 * Ollama API Client
 * Handles communication with Ollama instance
 */

exports.generate = async function(config, prompt, selectedText) {
  const apiUrl = config.apiUrl || "http://ollama:11434";
  const model = config.defaultModel || "llama2";
  const timeout = config.timeout || 30000;

  const fullPrompt = `${prompt}\n\nText: ${selectedText}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(`${apiUrl}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: model,
        prompt: fullPrompt,
        stream: false
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Ollama API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    // Ollama returns text in 'response' field
    if (data.response) {
      return data.response.trim();
    } else {
      throw new Error("Invalid response format from Ollama");
    }
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Request timeout - Ollama did not respond in time");
    }
    if (error.message.includes("Failed to fetch")) {
      throw new Error("Cannot connect to Ollama. Please check if Ollama is running and the API URL is correct.");
    }
    throw error;
  }
};

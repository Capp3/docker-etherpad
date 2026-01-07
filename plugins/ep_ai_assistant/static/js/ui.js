"use strict";

/**
 * AI Assistant UI Components
 * Handles modal, toolbar button, and user interactions
 */

let modal = null;
let selectedText = "";
let currentProvider = null;
let currentConfig = null;

// Create and show the AI assistant modal
exports.showModal = function(provider, config, text) {
  selectedText = text || "";
  currentProvider = provider;
  currentConfig = config;

  // Remove existing modal if present
  if (modal) {
    modal.remove();
  }

  // Create modal
  modal = $("<div>")
    .addClass("ai-assistant-modal")
    .html(`
      <div class="ai-assistant-modal-content">
        <div class="ai-assistant-modal-header">
          <h3>AI Assistant</h3>
          <button class="ai-assistant-close">&times;</button>
        </div>
        <div class="ai-assistant-modal-body">
          <div class="ai-assistant-section">
            <label>Selected Text:</label>
            <textarea class="ai-assistant-selected-text" readonly>${escapeHtml(selectedText)}</textarea>
          </div>
          <div class="ai-assistant-section">
            <label>Action:</label>
            <select class="ai-assistant-action">
              <option value="Rewrite for clarity">Rewrite for clarity</option>
              <option value="Shorten">Shorten</option>
              <option value="Expand">Expand</option>
              <option value="Fix grammar">Fix grammar</option>
              <option value="Improve tone">Improve tone</option>
              <option value="Summarize">Summarize</option>
            </select>
          </div>
          <div class="ai-assistant-section">
            <label>Custom Prompt (optional):</label>
            <textarea class="ai-assistant-prompt" placeholder="Leave empty to use selected action"></textarea>
          </div>
          ${config.provider === "openrouter" ? `
          <div class="ai-assistant-section">
            <label>Model:</label>
            <select class="ai-assistant-model">
              <option value="openai/gpt-3.5-turbo">GPT-3.5 Turbo</option>
              <option value="openai/gpt-4">GPT-4</option>
              <option value="anthropic/claude-3-haiku">Claude 3 Haiku</option>
              <option value="google/gemini-pro">Gemini Pro</option>
            </select>
          </div>
          ` : ""}
          <div class="ai-assistant-section">
            <button class="ai-assistant-generate">Generate</button>
            <div class="ai-assistant-loading" style="display: none;">
              <span>Generating...</span>
            </div>
          </div>
          <div class="ai-assistant-section ai-assistant-result" style="display: none;">
            <label>Result:</label>
            <textarea class="ai-assistant-result-text" readonly></textarea>
            <div class="ai-assistant-actions">
              <button class="ai-assistant-replace">Replace Selection</button>
              <button class="ai-assistant-insert">Insert Below</button>
              <button class="ai-assistant-copy">Copy Only</button>
            </div>
          </div>
          <div class="ai-assistant-error" style="display: none;"></div>
        </div>
      </div>
    `)
    .appendTo("body");

  // Event handlers
  modal.find(".ai-assistant-close").on("click", () => {
    modal.remove();
    modal = null;
  });

  modal.find(".ai-assistant-generate").on("click", () => {
    exports.handleGenerate();
  });

  modal.find(".ai-assistant-replace").on("click", () => {
    exports.handleReplace();
  });

  modal.find(".ai-assistant-insert").on("click", () => {
    exports.handleInsert();
  });

  modal.find(".ai-assistant-copy").on("click", () => {
    exports.handleCopy();
  });

  // Close on outside click
  modal.on("click", (e) => {
    if (e.target === modal[0]) {
      modal.remove();
      modal = null;
    }
  });

  // Close on ESC key
  $(document).on("keydown.ai-assistant", (e) => {
    if (e.key === "Escape" && modal) {
      modal.remove();
      modal = null;
      $(document).off("keydown.ai-assistant");
    }
  });
};

// Handle generate button click
exports.handleGenerate = async function() {
  if (!modal || !currentProvider) return;

  const action = modal.find(".ai-assistant-action").val();
  const customPrompt = modal.find(".ai-assistant-prompt").val().trim();
  const prompt = customPrompt || action;

  const generateBtn = modal.find(".ai-assistant-generate");
  const loading = modal.find(".ai-assistant-loading");
  const result = modal.find(".ai-assistant-result");
  const error = modal.find(".ai-assistant-error");
  const resultText = modal.find(".ai-assistant-result-text");

  // Show loading, hide result and error
  generateBtn.prop("disabled", true);
  loading.show();
  result.hide();
  error.hide();

  try {
    let generatedText;

    if (currentProvider === "ollama") {
      const ollama = require("./ollama");
      generatedText = await ollama.generate(currentConfig.ollama, prompt, selectedText);
    } else if (currentProvider === "openrouter") {
      const openrouter = require("./openrouter");
      const model = modal.find(".ai-assistant-model").val();
      const openrouterConfig = { ...currentConfig.openrouter, defaultModel: model };
      generatedText = await openrouter.generate(openrouterConfig, prompt, selectedText);
    } else {
      throw new Error(`Unknown provider: ${currentProvider}`);
    }

    resultText.val(generatedText);
    result.show();
    generateBtn.prop("disabled", false);
    loading.hide();
  } catch (err) {
    error.text(err.message || "An error occurred").show();
    generateBtn.prop("disabled", false);
    loading.hide();
  }
};

// Handle replace selection
exports.handleReplace = function() {
  if (!modal) return;
  const resultText = modal.find(".ai-assistant-result-text").val();
  if (resultText && window.ace && window.ace.aceCallWithAce) {
    window.ace.aceCallWithAce("replaceSelection", [resultText], () => {});
  }
  modal.remove();
  modal = null;
};

// Handle insert below
exports.handleInsert = function() {
  if (!modal) return;
  const resultText = modal.find(".ai-assistant-result-text").val();
  if (resultText && window.ace && window.ace.aceCallWithAce) {
    window.ace.aceCallWithAce("insertText", [resultText + "\n"], () => {});
  }
  modal.remove();
  modal = null;
};

// Handle copy to clipboard
exports.handleCopy = function() {
  if (!modal) return;
  const resultText = modal.find(".ai-assistant-result-text").val();
  if (resultText && navigator.clipboard) {
    navigator.clipboard.writeText(resultText).then(() => {
      alert("Copied to clipboard!");
    });
  }
  modal.remove();
  modal = null;
};

// Escape HTML for safe display
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

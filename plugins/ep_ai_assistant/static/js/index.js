"use strict";

const ui = require("./ui");
const ollama = require("./ollama");
const openrouter = require("./openrouter");

let config = null;
let editor = null;
let toolbarButton = null;

// Get configuration from settings
function getConfig() {
  if (config) return config;

  try {
    // Get config from clientVars (set by server)
    if (window.clientVars && window.clientVars.ep_ai_assistant) {
      config = window.clientVars.ep_ai_assistant;
      return config;
    }
  } catch (e) {
    console.error("Error loading AI assistant config:", e);
  }

  return null;
}

// Client vars hook to expose config
exports.clientVars = (hook, context, callback) => {
  // Config will be available via settings, this is just for compatibility
  return callback();
};

// Add toolbar button
exports.aceToolbarUpdateLine = (hook, context) => {
  if (toolbarButton) return;

  const toolbar = context.toolbar;
  if (!toolbar) return;

  // Create AI button
  toolbarButton = $("<button>")
    .addClass("ai-assistant-button")
    .attr("title", "Ask AI")
    .html("🤖 AI")
    .on("click", () => {
      handleAIClick(context);
    });

  // Add to toolbar
  toolbar.append(toolbarButton);
};

// Handle AI button click
function handleAIClick(context) {
  const cfg = getConfig();
  if (!cfg) {
    alert("AI Assistant is not configured. Please check your settings.");
    return;
  }

  // Get selected text
  let selectedText = "";
  try {
    if (context && context.ace && context.ace.callWithAce) {
      context.ace.callWithAce((ace) => {
        const selection = ace.getSelectionRange();
        if (selection && !selection.isEmpty()) {
          selectedText = ace.getSession().getTextRange(selection);
        } else {
          // If no selection, get current line
          const cursor = ace.getCursorPosition();
          const line = ace.getSession().getLine(cursor.row);
          selectedText = line || "";
        }
      }, "getSelectedText", true);
    }
  } catch (e) {
    console.error("Error getting selected text:", e);
  }

  if (!selectedText.trim()) {
    alert("Please select some text first, or place your cursor on a line.");
    return;
  }

  // Show modal
  ui.showModal(cfg.provider, cfg, selectedText);
}

// Store editor reference
exports.aceEditEvent = (hook, context) => {
  if (context && context.ace) {
    editor = context.ace;
  }
  return true;
};

// Inject CSS
exports.aceEditorCSS = () => {
  return ["/static/plugins/ep_ai_assistant/static/css/index.css"];
};

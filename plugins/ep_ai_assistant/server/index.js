"use strict";

/**
 * Server-side hooks for AI Assistant plugin
 * Exposes configuration to client via clientVars
 */

exports.expressCreateServer = (hookName, args, cb) => {
  // Server setup if needed (e.g., for proxy endpoints)
  return cb();
};

// Expose config to client
exports.clientVars = (hook, context, callback) => {
  const settings = require("ep_etherpad-lite/node/utils/Settings");
  const aiConfig = settings.ep_ai_assistant || {};

  // Make config available to client
  return callback({
    ep_ai_assistant: aiConfig
  });
};

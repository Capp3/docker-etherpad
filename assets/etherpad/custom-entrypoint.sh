#!/bin/sh
set -e

echo "[custom-entrypoint] Adding custom plugins to installed_plugins.json..."

PLUGINS_JSON="/opt/etherpad-lite/var/installed_plugins.json"

# Create var directory if it doesn't exist
mkdir -p /opt/etherpad-lite/var

# Check if our custom plugins are already registered
if [ -f "$PLUGINS_JSON" ]; then
  if grep -q "ep_languagetool" "$PLUGINS_JSON"; then
    echo "[custom-entrypoint] Custom plugins already registered"
  else
    echo "[custom-entrypoint] Adding custom plugins to existing installed_plugins.json"
    # Add custom plugins to the end of the plugins array
    sed -i 's/\]\}$/,{"name":"ep_ai_assistant","version":"1.0.0"},{"name":"ep_languagetool","version":"1.0.0"}]\}/' "$PLUGINS_JSON"
  fi
else
  echo "[custom-entrypoint] Creating new installed_plugins.json with custom plugins"
  echo '{"plugins":[{"name":"ep_ai_assistant","version":"1.0.0"},{"name":"ep_languagetool","version":"1.0.0"}]}' > "$PLUGINS_JSON"
  chown etherpad:etherpad "$PLUGINS_JSON"
fi

echo "[custom-entrypoint] Custom plugins registered. Starting Etherpad..."

# Execute the original entrypoint/command
exec "$@"

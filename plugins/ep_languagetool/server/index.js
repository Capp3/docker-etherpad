'use strict';

const http = require('http');

const LANGUAGETOOL_HOST = process.env.LANGUAGETOOL_HOST || 'languagetool';
const LANGUAGETOOL_PORT = process.env.LANGUAGETOOL_PORT || 8081;

exports.expressCreateServer = (hookName, args, cb) => {
  const {app} = args;

  // Proxy endpoint for LanguageTool API
  app.post('/languagetool/check', async (req, res) => {
    try {
      const {text, language = 'en-US'} = req.body;

      if (!text) {
        return res.status(400).json({error: 'Text is required'});
      }

      // Build POST data
      const postData = new URLSearchParams({
        text,
        language,
      }).toString();

      // Call LanguageTool API
      const options = {
        hostname: LANGUAGETOOL_HOST,
        port: LANGUAGETOOL_PORT,
        path: '/v2/check',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(postData),
        },
      };

      const ltReq = http.request(options, (ltRes) => {
        let data = '';

        ltRes.on('data', (chunk) => {
          data += chunk;
        });

        ltRes.on('end', () => {
          try {
            const result = JSON.parse(data);
            res.json(result);
          } catch (err) {
            console.error('[ep_languagetool] Error parsing LanguageTool response:', err);
            res.status(500).json({error: 'Failed to parse LanguageTool response'});
          }
        });
      });

      ltReq.on('error', (err) => {
        console.error('[ep_languagetool] Error calling LanguageTool:', err);
        res.status(500).json({error: 'Failed to connect to LanguageTool service'});
      });

      ltReq.write(postData);
      ltReq.end();
    } catch (err) {
      console.error('[ep_languagetool] Unexpected error:', err);
      res.status(500).json({error: 'Internal server error'});
    }
  });

  return cb();
};

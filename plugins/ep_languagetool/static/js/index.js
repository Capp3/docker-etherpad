'use strict';

// Add CSS to page
exports.addStyles = (hookName, args, cb) => {
  args.content += '<link href="../static/plugins/ep_languagetool/static/css/editor.css" rel="stylesheet">';
  return cb();
};

// Add button to toolbar
exports.addButton = (hookName, args, cb) => {
  const button = '<li><a class="buttonicon buttonicon-grammar" ' +
    'data-key="grammar" title="Check Grammar" id="grammar-check-button"></a></li>';
  args.content = button + args.content;
  return cb();
};

// Initialize after Ace is ready
exports.postAceInit = (hookName, context) => {
  const ace = context.ace;

  // Create modal HTML
  const modalHTML = `
    <div id="languagetool-overlay"></div>
    <div id="languagetool-modal">
      <div class="languagetool-header">
        <h3>Grammar Check</h3>
        <button class="languagetool-close" id="languagetool-close">&times;</button>
      </div>
      <div class="languagetool-body" id="languagetool-body">
        <div class="languagetool-loading">Checking grammar...</div>
      </div>
    </div>
  `;

  // Inject modal into page
  $('body').append(modalHTML);

  // Button click handler
  $('#grammar-check-button').on('click', function(e) {
    e.preventDefault();
    checkGrammar(ace);
  });

  // Close modal handlers
  $('#languagetool-close, #languagetool-overlay').on('click', function() {
    closeModal();
  });
};

// Close modal
function closeModal() {
  $('#languagetool-modal').removeClass('visible');
  $('#languagetool-overlay').removeClass('visible');
}

// Open modal
function openModal() {
  $('#languagetool-modal').addClass('visible');
  $('#languagetool-overlay').addClass('visible');
}

// Get pad text
function getPadText(ace) {
  try {
    const rep = ace.ace_getRep();
    return ace.ace_exportText(rep);
  } catch (err) {
    console.error('[ep_languagetool] Error getting pad text:', err);
    return null;
  }
}

// Check grammar
async function checkGrammar(ace) {
  const text = getPadText(ace);

  if (!text) {
    alert('Could not get pad text. Please try again.');
    return;
  }

  if (text.trim().length === 0) {
    alert('The pad is empty. Add some text and try again.');
    return;
  }

  // Show modal with loading state
  openModal();
  $('#languagetool-body').html('<div class="languagetool-loading">Checking grammar...</div>');

  try {
    const response = await fetch('/languagetool/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text,
        language: 'en-US',
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    displayResults(result, ace);
  } catch (err) {
    console.error('[ep_languagetool] Error checking grammar:', err);
    $('#languagetool-body').html(
      '<div class="languagetool-error">Error checking grammar: ' +
      err.message + '</div>'
    );
  }
}

// Display results
function displayResults(result, ace) {
  const matches = result.matches || [];

  if (matches.length === 0) {
    $('#languagetool-body').html(
      '<div class="languagetool-success">' +
      '<h4>✓ No issues found!</h4>' +
      '<p>Your text looks great.</p>' +
      '</div>'
    );
    return;
  }

  let html = '<div class="languagetool-results">';

  matches.forEach((match, index) => {
    const errorText = match.context.text.substring(
      match.context.offset,
      match.context.offset + match.context.length
    );

    const replacements = match.replacements.slice(0, 5); // Show max 5 suggestions

    html += `
      <div class="languagetool-suggestion" data-match-index="${index}">
        <div class="languagetool-suggestion-header">
          <div>
            <span class="languagetool-error-text">${escapeHtml(errorText)}</span>
            <div class="languagetool-rule">${escapeHtml(match.rule.description || match.rule.id)}</div>
          </div>
        </div>
        <div class="languagetool-message">${escapeHtml(match.message)}</div>
        <div class="languagetool-context">
          ${renderContext(match.context)}
        </div>
    `;

    if (replacements.length > 0) {
      html += '<div class="languagetool-replacements"><strong>Suggestions:</strong><br>';
      replacements.forEach((replacement) => {
        html += `<button class="languagetool-replacement-btn"
          data-match-index="${index}"
          data-replacement="${escapeHtml(replacement.value)}">
          ${escapeHtml(replacement.value)}
        </button>`;
      });
      html += '</div>';
    }

    html += `
        <button class="languagetool-ignore-btn" data-match-index="${index}">Ignore</button>
      </div>
    `;
  });

  html += '</div>';

  $('#languagetool-body').html(html);

  // Attach replacement handlers
  $('.languagetool-replacement-btn').on('click', function() {
    const matchIndex = $(this).data('match-index');
    const replacement = $(this).data('replacement');
    applyReplacement(ace, result.matches[matchIndex], replacement);
    $(this).closest('.languagetool-suggestion').fadeOut();
  });

  // Attach ignore handlers
  $('.languagetool-ignore-btn').on('click', function() {
    const matchIndex = $(this).data('match-index');
    $(this).closest('.languagetool-suggestion').fadeOut();
  });
}

// Apply replacement to pad
function applyReplacement(ace, match, replacement) {
  try {
    const rep = ace.ace_getRep();
    const offset = match.offset;
    const length = match.length;

    // Find the line and character position
    const text = ace.ace_exportText(rep);
    let currentOffset = 0;
    let lineNum = 0;
    let charNum = 0;

    // Locate the error position
    const lines = text.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const lineLength = lines[i].length + 1; // +1 for newline
      if (currentOffset + lineLength > offset) {
        lineNum = i;
        charNum = offset - currentOffset;
        break;
      }
      currentOffset += lineLength;
    }

    // Perform replacement
    ace.ace_focus();
    ace.ace_performSelectionChange(
      [lineNum, charNum],
      [lineNum, charNum + length],
      true
    );
    ace.ace_replaceRange([lineNum, charNum], [lineNum, charNum + length], replacement);

    console.log('[ep_languagetool] Applied replacement:', {
      original: match.context.text.substring(match.context.offset, match.context.offset + match.context.length),
      replacement: replacement,
      line: lineNum,
      char: charNum,
    });
  } catch (err) {
    console.error('[ep_languagetool] Error applying replacement:', err);
    alert('Could not apply replacement. Please try manually.');
  }
}

// Render context with highlighted error
function renderContext(context) {
  const before = escapeHtml(context.text.substring(0, context.offset));
  const error = escapeHtml(context.text.substring(context.offset, context.offset + context.length));
  const after = escapeHtml(context.text.substring(context.offset + context.length));

  return `${before}<span class="languagetool-context-error">${error}</span>${after}`;
}

// Escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

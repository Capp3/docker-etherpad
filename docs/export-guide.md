# Export Guide - Exporting Your Documents

Etherpad Plus supports exporting documents to multiple formats for sharing and final editing.

---

## Table of Contents

1. [Supported Formats](#supported-formats)
2. [How to Export](#how-to-export)
3. [Export Formats Explained](#export-formats-explained)
4. [Export Workflows](#export-workflows)
5. [Tips and Best Practices](#tips-and-best-practices)

---

## Supported Formats

Etherpad Plus can export to:

- **HTML** - Web format, opens in browsers
- **ODT** - OpenDocument format, opens in LibreOffice/Word
- **DOCX** - Microsoft Word format (via LibreOffice conversion)

---

## How to Export

### Method 1: File Menu

1. Click **File** in the menu bar
2. Select **Export**
3. Choose your format:
   - **Export as HTML**
   - **Export as ODT**
   - **Export as DOCX** (if available)
4. File downloads automatically

### Method 2: Toolbar Button

1. Look for **Export** button in toolbar
2. Click to see format options
3. Select desired format
4. File downloads

### Method 3: Keyboard Shortcut

- Some formats may have keyboard shortcuts
- Check File menu for available shortcuts

---

## Export Formats Explained

### HTML Export

**Best for:**
- Viewing in web browsers
- Sharing online
- Web publishing
- Quick previews

**Features:**
- Preserves formatting
- Includes images
- Headings preserved
- Links work
- Lightweight file size

**Limitations:**
- Not ideal for Word editing
- May need formatting adjustments
- Browser-dependent rendering

**Use When:**
- Sharing with web users
- Quick document preview
- Web publishing
- Email attachments (lightweight)

---

### ODT Export (OpenDocument)

**Best for:**
- Opening in LibreOffice
- Opening in Microsoft Word
- Final document editing
- Professional documents

**Features:**
- Full formatting preserved
- Images included
- Headings and structure maintained
- Editable in Word/LibreOffice
- Standard format

**Limitations:**
- Larger file size than HTML
- May need minor formatting tweaks

**Use When:**
- Final document editing
- Sharing with Word users
- Professional documents
- Archiving documents

---

### DOCX Export (Microsoft Word)

**Best for:**
- Microsoft Word users
- Final document editing
- Professional documents
- Corporate environments

**Features:**
- Native Word format
- Full formatting preserved
- Images included
- Editable in Word
- Professional appearance

**Limitations:**
- Requires LibreOffice conversion
- May have minor formatting differences
- Larger file size

**Use When:**
- Sharing with Word users
- Final document preparation
- Corporate documents
- When Word compatibility is required

**Note:** DOCX export uses LibreOffice for conversion. Ensure LibreOffice is properly configured on the server.

---

## Export Workflows

### Workflow 1: Quick Share (HTML)

1. Write your document in Etherpad Plus
2. Export as HTML
3. Share HTML file via email/chat
4. Recipients open in browser
5. No editing needed

**Best for:** Quick sharing, read-only documents

---

### Workflow 2: Word Editing (ODT/DOCX)

1. Write and collaborate in Etherpad Plus
2. Export as ODT or DOCX
3. Open in Microsoft Word or LibreOffice
4. Final formatting and polish
5. Save final document

**Best for:** Final document preparation, professional documents

---

### Workflow 3: Hybrid Approach

1. Collaborate in Etherpad Plus
2. Export as HTML for quick review
3. Export as ODT/DOCX for final editing
4. Use Word/LibreOffice for final polish
5. Share final document

**Best for:** Multi-stage document creation

---

## What Gets Exported

### Preserved Elements

✅ **Text formatting**
- Bold, italic, underline
- Font colors
- Text alignment
- Strikethrough

✅ **Document structure**
- Headings (H1, H2, H3)
- Paragraphs
- Line breaks
- Lists (if supported)

✅ **Media**
- Images (embedded or linked)
- Image positioning

✅ **Links**
- Hyperlinks
- Link text preserved

✅ **Comments**
- May be included as notes (format-dependent)

### May Need Adjustment

⚠️ **Complex formatting**
- Some advanced formatting may need tweaking
- Font sizes may differ
- Spacing may vary

⚠️ **Layout**
- Page breaks may differ
- Margins may need adjustment
- Column layouts may change

---

## Tips and Best Practices

### Before Exporting

1. **Review your document** - Check for errors
2. **Test formatting** - Ensure headings are correct
3. **Check images** - Verify images display correctly
4. **Verify links** - Test all hyperlinks
5. **Clean up** - Remove unnecessary content

### Format Selection

- **HTML** - Quick sharing, web viewing
- **ODT** - Word editing, professional documents
- **DOCX** - Maximum Word compatibility

### After Exporting

1. **Open exported file** - Verify formatting
2. **Check images** - Ensure images display
3. **Test links** - Verify hyperlinks work
4. **Review structure** - Check headings and organization
5. **Make adjustments** - Fine-tune in Word/LibreOffice if needed

### Export Quality Tips

1. **Use headings** - Better structure in exports
2. **Consistent formatting** - Easier to preserve
3. **Optimize images** - Smaller file sizes
4. **Test exports** - Verify before sharing
5. **Export regularly** - Backup your work

---

## Troubleshooting Exports

### Images Not Showing

**Problem:** Images don't appear in exported file

**Solutions:**
- Check image file size (max 5MB)
- Verify image format (JPEG, PNG, GIF, BMP)
- Re-upload image if needed
- Check image permissions

### Formatting Lost

**Problem:** Formatting doesn't match Etherpad view

**Solutions:**
- Use standard formatting (avoid complex styles)
- Check export format (try ODT instead of HTML)
- Open in appropriate application
- May need minor adjustments in Word/LibreOffice

### Large File Size

**Problem:** Exported file is very large

**Solutions:**
- Optimize images before uploading
- Remove unnecessary images
- Use HTML format for smaller files
- Compress images in image editor

### Can't Open File

**Problem:** Exported file won't open

**Solutions:**
- Check file extension matches format
- Try different application
- Verify file downloaded completely
- Re-export if corrupted

---

## Advanced: Export via API

For administrators, documents can be exported programmatically via the Etherpad API.

### API Endpoints

- `/p/{padId}/export/html` - HTML export
- `/p/{padId}/export/odt` - ODT export
- `/p/{padId}/export/docx` - DOCX export

### Example Usage

```bash
# Export pad as HTML
curl http://yourdomain/p/YourPadName/export/html > document.html

# Export pad as ODT
curl http://yourdomain/p/YourPadName/export/odt > document.odt
```

**Note:** API access may require authentication. Contact your administrator.

---

## Export Storage

### Where Exports Are Stored

- **Server exports**: Stored in `/data/exports` directory
- **Downloaded exports**: Saved to your Downloads folder
- **Temporary files**: May be cleaned up automatically

### Backup Exports

- **Download important exports** - Don't rely only on server storage
- **Keep local copies** - Backup your exported documents
- **Version control** - Export at key milestones

---

## Need More Help?

- See [User Guide](./user-guide.md) for general usage
- Check [Troubleshooting](./troubleshooting.md) for export issues
- Contact your administrator for technical support

---

**Next:** Learn about [administration](./admin-guide.md) →

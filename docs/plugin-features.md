# Plugin Features - Complete Reference

Etherpad Plus includes 11 powerful plugins that provide Word-like editing capabilities. This guide covers all available features.

---

## Table of Contents

1. [Word-Like Editing Plugins](#word-like-editing-plugins)
2. [Enhanced Features](#enhanced-features)
3. [Plugin Details](#plugin-details)

---

## Word-Like Editing Plugins

These plugins provide the core Word-like editing experience.

### 1. ep_headings2 - Structured Headings

**Purpose:** Create document structure with proper headings

**Features:**
- Three heading levels (H1, H2, H3)
- Automatic formatting
- Integration with Table of Contents
- Better document exports

**How to Use:**
1. Place cursor on a line
2. Select heading level from toolbar dropdown
3. Type your heading text
4. Headings automatically appear in TOC

**Best Practices:**
- Use H1 for document title (one per document)
- Use H2 for major sections
- Use H3 for subsections
- Maintain consistent heading hierarchy

---

### 2. ep_image_upload - Image Insertion

**Purpose:** Insert images into your documents

**Features:**
- Upload images via button or drag-and-drop
- Support for JPEG, PNG, GIF, BMP
- Maximum file size: 5MB
- Images stored on server
- Images included in exports

**How to Use:**
1. Click Image Upload button in toolbar
2. Select image file from your computer
3. OR drag and drop image into editor
4. Image appears inline with text

**Supported Formats:**
- JPEG / JPG
- PNG
- GIF
- BMP

**Storage:**
- Images stored in `/images` directory
- Accessible via URL: `http://yourdomain/images/filename`
- Persists across sessions

---

### 3. ep_font_color - Text Color Formatting

**Purpose:** Change text colors for emphasis and organization

**Features:**
- Wide color palette
- Quick color selection
- Works with selected text
- Colors preserved in exports

**How to Use:**
1. Select text you want to color
2. Click Font Color button (A with colored underline)
3. Choose color from palette
4. Text changes color immediately

**Tips:**
- Use colors sparingly for emphasis
- Dark colors work best for readability
- Consider color-blind accessibility

---

### 4. ep_spellcheck - Browser Spell Checking

**Purpose:** Automatic spell checking as you type

**Features:**
- Browser-native spell checking
- Red underlines for misspelled words
- Right-click for suggestions
- Works automatically
- No configuration needed

**How to Use:**
- Just start typing!
- Misspelled words show red underlines
- Right-click for suggestions
- Select suggestion to correct

**Browser Support:**
- Works in all modern browsers
- Uses browser's built-in dictionary
- Language based on browser settings

---

### 5. ep_align - Text Alignment

**Purpose:** Control text alignment (left, center, right, justify)

**Features:**
- Left alignment (default)
- Center alignment
- Right alignment
- Full justification
- Per-paragraph control

**How to Use:**
1. Place cursor in paragraph
2. Click alignment button:
   - **Left** - Align to left margin
   - **Center** - Center text
   - **Right** - Align to right margin
   - **Justify** - Stretch to fill line

**Use Cases:**
- **Left**: Standard text (default)
- **Center**: Titles, headings
- **Right**: Signatures, dates
- **Justify**: Formal documents

---

## Enhanced Features

These plugins add advanced functionality beyond basic editing.

### 6. ep_adminpads3 - Admin Pad Management

**Purpose:** Administrative tools for pad management

**Features:**
- View all pads
- Delete pads
- Manage pad access
- Pad statistics
- Admin-only features

**Access:**
- Available to administrators only
- Access via admin panel: `/admin/pads`
- Requires admin password

**Features:**
- List all pads
- Search pads
- Delete unused pads
- View pad metadata
- Manage pad permissions

---

### 7. ep_table_of_contents - Automatic TOC

**Purpose:** Generate table of contents from headings

**Features:**
- Automatic generation from headings
- Updates in real-time
- Click to jump to sections
- Shows heading hierarchy
- Toggle visibility

**How to Use:**
1. Create headings in your document (H1, H2, H3)
2. Click TOC button in toolbar
3. Table of contents appears
4. Click any item to jump to that section

**Features:**
- **Auto-updates** as you add/change headings
- **Hierarchical display** shows document structure
- **Click navigation** jumps to sections
- **Collapsible** for long documents

**Best Practices:**
- Use consistent heading structure
- TOC works best with proper H1/H2/H3 hierarchy
- Update headings, TOC updates automatically

---

### 8. ep_author_neat2 - Enhanced Author Display

**Purpose:** Better visualization of who's editing

**Features:**
- Color-coded authors
- Author name display
- Cursor tracking
- Author list sidebar
- Real-time updates

**How It Works:**
- Each author gets unique color
- Cursor appears in author's color
- Name displayed in author list
- Updates in real-time

**Benefits:**
- See who's editing what
- Avoid editing conflicts
- Better collaboration awareness
- Clear visual feedback

---

### 9. ep_comments_page - Sidebar Comments

**Purpose:** Add comments without editing main text

**Features:**
- Comment on specific text
- Sidebar comment panel
- Reply to comments
- Resolve comments
- Comment threading

**How to Use:**
1. Select text you want to comment on
2. Open comments sidebar
3. Type your comment
4. Save comment
5. Comment marker appears

**Comment Features:**
- **Text selection** - Comment on specific text
- **Sidebar view** - All comments in one place
- **Replies** - Threaded discussions
- **Resolution** - Mark comments as resolved
- **Persistence** - Comments stay with document

**Use Cases:**
- **Feedback** - Leave suggestions
- **Questions** - Ask about content
- **Review** - Document review process
- **Discussion** - Collaborative discussion

---

### 10. ep_embedded_hyperlinks2 - Hyperlink Support

**Purpose:** Create clickable links in documents

**Features:**
- Create hyperlinks
- Edit existing links
- Remove links
- Links work in exports
- URL validation

**How to Use:**
1. Select text you want to link
2. Click Link button (chain icon)
3. Enter URL
4. Save link
5. Text becomes clickable

**Link Features:**
- **Clickable** - Links work in editor
- **Editable** - Modify or remove links
- **Exported** - Links work in exported files
- **Validation** - Checks URL format

**Best Practices:**
- Use descriptive link text
- Test links after creating
- Use full URLs (https://example.com)
- Consider link accessibility

---

### 11. ep_markdown - Markdown Syntax Support

**Purpose:** Use Markdown syntax for quick formatting

**Features:**
- Markdown syntax support
- Auto-conversion to formatted text
- Works alongside toolbar
- Common Markdown features

**Supported Syntax:**
- **Bold**: `**text**` or `__text__`
- **Italic**: `*text*` or `_text_`
- **Headings**: `# H1`, `## H2`, `### H3`
- **Links**: `[text](url)`
- **Lists**: `- item` or `1. item`

**How to Use:**
1. Type Markdown syntax as you write
2. Syntax converts to formatted text automatically
3. Works with toolbar buttons
4. No special mode needed

**Examples:**
```markdown
# Main Title

## Section

**Bold** and *italic* text

- Bullet point
- Another point

[Link](https://example.com)
```

**Benefits:**
- **Fast formatting** - Type instead of clicking
- **Familiar** - Standard Markdown syntax
- **Flexible** - Works with toolbar too
- **Efficient** - Less mouse clicking

---

## Plugin Summary

| Plugin | Category | Key Feature |
|--------|----------|-------------|
| ep_headings2 | Word-Like | Structured headings (H1/H2/H3) |
| ep_image_upload | Word-Like | Image insertion |
| ep_font_color | Word-Like | Text color formatting |
| ep_spellcheck | Word-Like | Browser spell checking |
| ep_align | Word-Like | Text alignment |
| ep_adminpads3 | Enhanced | Admin pad management |
| ep_table_of_contents | Enhanced | Automatic TOC generation |
| ep_author_neat2 | Enhanced | Author visualization |
| ep_comments_page | Enhanced | Sidebar comments |
| ep_embedded_hyperlinks2 | Enhanced | Hyperlink support |
| ep_markdown | Enhanced | Markdown syntax |

---

## Plugin Versions

Current installed versions:
- ep_headings2: 0.2.68
- ep_image_upload: 1.0.105
- ep_font_color: 0.0.89
- ep_spellcheck: 0.0.65
- ep_align: 10.0.2
- ep_adminpads3: 3.0.22
- ep_table_of_contents: 0.3.89
- ep_author_neat2: 2.0.11
- ep_comments_page: 10.0.4
- ep_embedded_hyperlinks2: 1.2.4
- ep_markdown: 10.0.1

---

## Tips for Using Plugins

### Getting the Most Out of Plugins

1. **Combine features** - Use headings + TOC for structure
2. **Use comments** - Collaborate without editing main text
3. **Format consistently** - Use headings and colors consistently
4. **Export regularly** - Test exports to ensure formatting preserved

### Performance Tips

- **Large images** - Optimize before uploading
- **Many comments** - May slow down very long documents
- **Many users** - All plugins work well with multiple editors

---

## Need Help?

- See [User Guide](./user-guide.md) for detailed usage instructions
- Check [Troubleshooting](./troubleshooting.md) for plugin issues
- Contact your administrator for technical support

---

**Next:** Learn about [exporting documents](./export-guide.md) →

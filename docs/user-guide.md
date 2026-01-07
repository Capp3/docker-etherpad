# Etherpad Plus - User Guide

Complete guide to using Etherpad Plus for collaborative document editing.

---

## Table of Contents

1. [Interface Overview](#interface-overview)
2. [Text Formatting](#text-formatting)
3. [Working with Headings](#working-with-headings)
4. [Inserting Images](#inserting-images)
5. [Using Comments](#using-comments)
6. [Table of Contents](#table-of-contents)
7. [Hyperlinks](#hyperlinks)
8. [Markdown Support](#markdown-support)
9. [Collaboration Features](#collaboration-features)
10. [Exporting Documents](#exporting-documents)

---

## Interface Overview

### Main Components

- **Toolbar** - Formatting options at the top
- **Editor Area** - Main writing space
- **Author List** - Shows who's currently editing (top right)
- **Chat Panel** - Optional chat sidebar (if enabled)
- **Comments Panel** - Sidebar for comments (if enabled)

### Toolbar Buttons

The toolbar provides quick access to formatting options:

- **Bold** (B) - Make selected text bold
- **Italic** (I) - Make selected text italic
- **Underline** (U) - Underline selected text
- **Strikethrough** (S) - Cross out text
- **Font Color** - Change text color
- **Text Alignment** - Left, center, right, justify
- **Headings** - H1, H2, H3 dropdown
- **Image Upload** - Insert images
- **More options** - Additional formatting

---

## Text Formatting

### Basic Formatting

1. **Select text** by clicking and dragging
2. **Click a toolbar button** or use keyboard shortcuts:
   - **Bold**: Ctrl+B (Cmd+B on Mac)
   - **Italic**: Ctrl+I (Cmd+I on Mac)
   - **Underline**: Ctrl+U (Cmd+U on Mac)

### Font Colors

1. Select the text you want to color
2. Click the **Font Color** button (A with colored underline)
3. Choose a color from the palette
4. Your text changes color immediately

### Text Alignment

1. Place your cursor in the paragraph you want to align
2. Click an alignment button:
   - **Left** - Align text to the left (default)
   - **Center** - Center text
   - **Right** - Align text to the right
   - **Justify** - Stretch text to fill the line

---

## Working with Headings

Headings help organize your document and create structure.

### Creating Headings

1. Place your cursor on the line you want to make a heading
2. Click the **Headings** dropdown in the toolbar
3. Select:
   - **Heading 1** (H1) - Main title (largest)
   - **Heading 2** (H2) - Section title (medium)
   - **Heading 3** (H3) - Subsection title (smallest)
   - **Normal** - Regular paragraph text

### Best Practices

- Use **H1** for document titles (only one per document)
- Use **H2** for major sections
- Use **H3** for subsections
- Headings automatically appear in the [Table of Contents](#table-of-contents)

---

## Inserting Images

### Upload an Image

1. Click the **Image Upload** button in the toolbar (picture icon)
2. **Choose a file** from your computer
   - Supported formats: JPEG, JPG, PNG, GIF, BMP
   - Maximum size: 5MB per image
3. The image appears in your document

### Drag and Drop

1. **Drag an image file** from your computer
2. **Drop it** into the editor
3. The image uploads automatically

### Image Tips

- Images are stored on the server
- Images appear inline with your text
- You can resize images by selecting them
- Images are included when you export documents

---

## Using Comments

Comments allow you to leave feedback without editing the main text.

### Adding a Comment

1. **Select the text** you want to comment on
2. Click the **Comments** button or open the comments sidebar
3. **Type your comment** in the comment box
4. Click **Save** or press Enter
5. A comment marker appears next to the text

### Viewing Comments

- **Comments sidebar** shows all comments
- **Click a comment** to see which text it refers to
- **Comment markers** appear as colored highlights in the text

### Replying to Comments

1. Click on an existing comment
2. Type your reply
3. Save your reply

### Resolving Comments

- Mark comments as resolved when addressed
- Resolved comments remain visible but are marked as complete

---

## Table of Contents

The Table of Contents (TOC) automatically generates from your headings.

### Viewing the Table of Contents

1. Look for the **TOC button** in the toolbar
2. Click it to show/hide the table of contents
3. The TOC appears as a sidebar or dropdown

### How It Works

- **Automatically updates** as you add or change headings
- **Click any item** to jump to that section
- **Only shows headings** (H1, H2, H3)

### Generating a TOC

1. Create headings in your document (see [Working with Headings](#working-with-headings))
2. The TOC automatically includes them
3. No manual updates needed!

---

## Hyperlinks

### Creating a Link

1. **Select the text** you want to turn into a link
2. Click the **Link** button in the toolbar (chain icon)
3. **Enter the URL** in the dialog box
   - Example: `https://example.com`
4. Click **OK**

### Editing Links

1. **Click on the linked text**
2. Click the **Link** button again
3. **Modify the URL** or remove the link
4. Save your changes

### Link Tips

- Links are clickable in the editor
- Links work in exported documents
- Use descriptive link text (not just "click here")

---

## Markdown Support

Etherpad Plus supports Markdown syntax for quick formatting.

### Basic Markdown

- **Bold**: `**text**` or `__text__`
- **Italic**: `*text*` or `_text_`
- **Heading**: `# H1`, `## H2`, `### H3`
- **Link**: `[text](url)`
- **List**: `- item` or `1. item`

### Using Markdown

1. **Type Markdown syntax** as you write
2. **It converts automatically** to formatted text
3. Works alongside toolbar buttons

### Markdown Examples

```markdown
# Main Title

## Section

**Bold text** and *italic text*

- Bullet point
- Another point

[Link text](https://example.com)
```

---

## Collaboration Features

### Real-Time Editing

- **See other users** - Their cursors appear in different colors
- **See their names** - Displayed in the author list (top right)
- **Changes appear instantly** - No refresh needed
- **No conflicts** - Etherpad handles simultaneous edits automatically

### Author Colors

- Each author gets a **unique color**
- Their **cursor** appears in that color
- Their **name** appears in the author list
- Makes it easy to see who's editing what

### Chat (if enabled)

- **Sidebar chat** for quick messages
- **Real-time** - Messages appear instantly
- **Persistent** - Chat history stays with the pad

---

## Exporting Documents

See the [Export Guide](./export-guide.md) for detailed instructions.

### Quick Export

1. Click **File** → **Export**
2. Choose format:
   - **HTML** - Web format
   - **ODT** - OpenDocument format (opens in LibreOffice/Word)
   - **DOCX** - Microsoft Word format (if available)
3. **Download** your file

### Export Tips

- **Headings are preserved** in exports
- **Images are included** in exported files
- **Formatting is maintained** across formats
- **Use ODT or DOCX** for final Word documents

---

## Keyboard Shortcuts

### Text Formatting

- **Ctrl+B** / **Cmd+B** - Bold
- **Ctrl+I** / **Cmd+I** - Italic
- **Ctrl+U** / **Cmd+U** - Underline
- **Ctrl+Z** / **Cmd+Z** - Undo
- **Ctrl+Y** / **Cmd+Y** - Redo

### Navigation

- **Ctrl+Home** - Go to start of document
- **Page Up/Down** - Scroll through document
- **Ctrl+F** - Find text (if available)

### Editing

- **Delete** - Delete selected text
- **Tab** - Indent (if supported)
- **Enter** - New line
- **Shift+Enter** - Line break (no new paragraph)

---

## Tips and Best Practices

### Document Organization

1. **Use headings** to structure your document
2. **Create a table of contents** for long documents
3. **Use comments** for feedback and discussion
4. **Keep paragraphs focused** - One idea per paragraph

### Collaboration

1. **Communicate** - Use comments or chat to coordinate
2. **Watch for conflicts** - Etherpad handles them, but be aware
3. **Save important versions** - Export periodically
4. **Use author colors** - Know who's editing what

### Performance

1. **Large documents** may load slowly - Consider breaking into sections
2. **Many images** can slow editing - Optimize images before uploading
3. **Many users** editing simultaneously works well - Etherpad handles it

---

## Need More Help?

- See [Plugin Features](./plugin-features.md) for detailed feature documentation
- Check [Troubleshooting](./troubleshooting.md) for common issues
- Contact your administrator for technical support

---

**Next:** Learn about [all plugin features](./plugin-features.md) →

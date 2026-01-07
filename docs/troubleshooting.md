# Troubleshooting Guide

Common issues and solutions for Etherpad Plus.

---

## Table of Contents

1. [Access Issues](#access-issues)
2. [Editing Problems](#editing-problems)
3. [Formatting Issues](#formatting-issues)
4. [Export Problems](#export-problems)
5. [Performance Issues](#performance-issues)
6. [Plugin Issues](#plugin-issues)
7. [Administration Issues](#administration-issues)

---

## Access Issues

### Can't Access Etherpad Plus

**Symptoms:**
- Browser shows "connection refused"
- Page won't load
- Timeout errors

**Solutions:**

1. **Check if services are running:**
   ```bash
   docker compose ps
   ```
   - Services should show "Up" status
   - If not running, start with: `docker compose up -d`

2. **Check port configuration:**
   - Verify port in `.env`: `DOCKER_COMPOSE_APP_PORT_PUBLISHED`
   - Default: `11155`
   - Try: `http://localhost:11155`

3. **Check firewall:**
   - Ensure port is not blocked
   - Check firewall rules
   - Verify network access

4. **Check logs:**
   ```bash
   docker compose logs etherpad
   ```
   - Look for error messages
   - Check startup errors

### Wrong Port or URL

**Problem:** Can't find Etherpad at expected URL

**Solutions:**
- Check `.env` file for port configuration
- Verify domain/FQDN setting
- Check reverse proxy configuration (if used)
- Try default: `http://localhost:11155`

---

## Editing Problems

### Changes Not Saving

**Symptoms:**
- Text disappears
- Changes don't persist
- "Connection lost" messages

**Solutions:**

1. **Check connection:**
   - Look for connection status indicator
   - Refresh page if disconnected
   - Check network connection

2. **Check browser:**
   - Try different browser
   - Clear browser cache
   - Disable browser extensions

3. **Check database:**
   ```bash
   docker compose logs postgres
   ```
   - Look for database errors
   - Verify database is running

### Can't See Other Users

**Symptoms:**
- Other users' cursors not visible
- Author list empty
- No collaboration indicators

**Solutions:**

1. **Check plugin:**
   - Verify `ep_author_neat2` is installed
   - Check plugin status in admin panel

2. **Refresh page:**
   - Reload browser page
   - Clear browser cache

3. **Check network:**
   - Verify WebSocket connection
   - Check firewall for WebSocket ports

### Text Formatting Not Working

**Symptoms:**
- Formatting buttons don't work
- Text doesn't change appearance
- Formatting disappears

**Solutions:**

1. **Select text first:**
   - Highlight text before formatting
   - Some formatting requires selection

2. **Check plugins:**
   - Verify formatting plugins installed
   - Check plugin status in admin

3. **Try keyboard shortcuts:**
   - Ctrl+B for bold
   - Ctrl+I for italic
   - May work if buttons don't

4. **Refresh page:**
   - Reload browser
   - Clear cache

---

## Formatting Issues

### Headings Not Working

**Symptoms:**
- Heading dropdown doesn't work
- Headings don't appear different
- TOC not generating

**Solutions:**

1. **Check plugin:**
   - Verify `ep_headings2` installed
   - Check `ep_table_of_contents` for TOC

2. **Use dropdown:**
   - Select heading level from dropdown
   - Not just typing "#" symbol

3. **Check formatting:**
   - Headings may look similar
   - Check in exported document

### Images Not Uploading

**Symptoms:**
- Upload button doesn't work
- Images don't appear
- Upload fails

**Solutions:**

1. **Check file size:**
   - Maximum: 5MB per image
   - Compress large images

2. **Check file format:**
   - Supported: JPEG, PNG, GIF, BMP
   - Convert if needed

3. **Check permissions:**
   - Verify image directory writable
   - Check container permissions

4. **Check plugin:**
   - Verify `ep_image_upload` installed
   - Check plugin configuration

### Colors Not Working

**Symptoms:**
- Font color button doesn't work
- Colors don't apply
- Color picker not showing

**Solutions:**

1. **Select text first:**
   - Must select text before coloring
   - Empty selection won't work

2. **Check plugin:**
   - Verify `ep_font_color` installed
   - Check plugin status

3. **Try different browser:**
   - Browser compatibility issue
   - Update browser

---

## Export Problems

### Export Button Missing

**Symptoms:**
- Can't find export option
- File menu empty
- No export button

**Solutions:**

1. **Check menu:**
   - Look in File menu
   - May be in different location
   - Check toolbar

2. **Check permissions:**
   - Export may require login
   - Check authentication settings

3. **Use API:**
   - Try direct URL: `/p/PadName/export/html`
   - Or `/p/PadName/export/odt`

### Export File Corrupted

**Symptoms:**
- File won't open
- Error opening file
- File appears empty

**Solutions:**

1. **Re-export:**
   - Try exporting again
   - May be temporary issue

2. **Try different format:**
   - Try HTML instead of ODT
   - Or ODT instead of DOCX

3. **Check LibreOffice:**
   - DOCX requires LibreOffice
   - Verify LibreOffice installed
   - Check server logs

### Images Missing in Export

**Symptoms:**
- Images don't appear in exported file
- Broken image links
- Export incomplete

**Solutions:**

1. **Check image format:**
   - Verify supported formats
   - Re-upload if needed

2. **Check image size:**
   - Large images may fail
   - Optimize images

3. **Check export format:**
   - Some formats handle images differently
   - Try HTML format

---

## Performance Issues

### Slow Loading

**Symptoms:**
- Page takes long to load
- Laggy editing
- Timeouts

**Solutions:**

1. **Check server resources:**
   ```bash
   docker stats
   ```
   - Monitor CPU/memory usage
   - Add resources if needed

2. **Check document size:**
   - Large documents load slowly
   - Consider breaking into sections

3. **Check images:**
   - Many/large images slow loading
   - Optimize images
   - Remove unnecessary images

4. **Check database:**
   ```bash
   docker compose logs postgres
   ```
   - Look for slow queries
   - Optimize database

### Laggy Editing

**Symptoms:**
- Typing delay
- Cursor lag
- Slow response

**Solutions:**

1. **Check connection:**
   - Slow network causes lag
   - Check internet connection
   - Try different network

2. **Reduce document size:**
   - Large documents lag
   - Break into smaller pads

3. **Close other tabs:**
   - Browser resources limited
   - Close unnecessary tabs

4. **Check browser:**
   - Update browser
   - Clear cache
   - Try different browser

### High Memory Usage

**Symptoms:**
- Server slow
- Out of memory errors
- Crashes

**Solutions:**

1. **Check memory:**
   ```bash
   docker stats
   ```
   - Monitor memory usage
   - Add memory if needed

2. **Clean up pads:**
   - Delete unused pads
   - Archive old documents

3. **Optimize database:**
   ```bash
   docker compose exec postgres psql -U etherpad -d etherpad -c "VACUUM;"
   ```

4. **Restart services:**
   ```bash
   docker compose restart
   ```

---

## Plugin Issues

### Plugin Not Working

**Symptoms:**
- Feature not available
- Button missing
- Functionality broken

**Solutions:**

1. **Check installation:**
   - Verify plugin installed
   - Check admin → Plugins
   - Review plugin list

2. **Check configuration:**
   - Review plugin settings
   - Check `config/etherpad.settings.json`
   - Verify configuration correct

3. **Check logs:**
   ```bash
   docker compose logs etherpad | grep -i plugin
   ```
   - Look for plugin errors
   - Check startup messages

4. **Rebuild image:**
   ```bash
   docker compose build --no-cache etherpad
   docker compose up -d
   ```

### Plugin Conflicts

**Symptoms:**
- Features conflict
- Errors in console
- Crashes

**Solutions:**

1. **Identify conflict:**
   - Check error logs
   - Test plugins individually
   - Review plugin compatibility

2. **Disable problematic plugin:**
   - Edit `dockerfile.etherpad`
   - Remove plugin from install
   - Rebuild image

3. **Update plugins:**
   - Check for updates
   - Update to latest versions
   - May fix conflicts

---

## Administration Issues

### Can't Login to Admin

**Symptoms:**
- Admin password not working
- Login fails
- Access denied

**Solutions:**

1. **Check password:**
   - Verify `.env` file password
   - Check for typos
   - Reset if needed

2. **Check configuration:**
   - Verify admin user configured
   - Check `config/etherpad.settings.json`
   - Review authentication settings

3. **Reset password:**
   - Update `.env` file
   - Restart services
   - Try again

### Database Connection Failed

**Symptoms:**
- "Database error" messages
- Can't save changes
- Service won't start

**Solutions:**

1. **Check database:**
   ```bash
   docker compose ps postgres
   docker compose logs postgres
   ```
   - Verify database running
   - Check for errors

2. **Check credentials:**
   - Verify `.env` database settings
   - Check username/password
   - Test connection

3. **Restart database:**
   ```bash
   docker compose restart postgres
   ```

4. **Check network:**
   - Verify services on same network
   - Check `compose.yml` network config

### Services Won't Start

**Symptoms:**
- Docker containers exit
- Services crash
- Startup errors

**Solutions:**

1. **Check logs:**
   ```bash
   docker compose logs
   ```
   - Review all error messages
   - Identify root cause

2. **Check configuration:**
   - Verify `.env` file correct
   - Check `compose.yml` syntax
   - Review settings file

3. **Check resources:**
   ```bash
   docker system df
   ```
   - Verify disk space
   - Check memory available

4. **Rebuild:**
   ```bash
   docker compose down
   docker compose build --no-cache
   docker compose up -d
   ```

---

## Getting More Help

### Before Asking for Help

1. **Check logs:**
   ```bash
   docker compose logs
   ```

2. **Document the issue:**
   - What were you doing?
   - What error messages?
   - When did it start?

3. **Try basic fixes:**
   - Restart services
   - Clear browser cache
   - Check configuration

### Contact Information

- **System Administrator:** Contact your IT/admin
- **Documentation:** See [User Guide](./user-guide.md)
- **Technical Docs:** See [README](../README.md)

---

## Common Error Messages

### "Connection Lost"

**Meaning:** Lost connection to server

**Fix:**
- Refresh page
- Check network connection
- Verify services running

### "Database Error"

**Meaning:** Database connection issue

**Fix:**
- Check database service
- Verify credentials
- Check logs

### "Permission Denied"

**Meaning:** Access denied

**Fix:**
- Check authentication
- Verify permissions
- Contact administrator

### "Plugin Not Found"

**Meaning:** Plugin not installed

**Fix:**
- Check plugin installation
- Rebuild image
- Verify plugin name

---

**Still having issues?** Contact your system administrator with:
- Error messages
- Steps to reproduce
- Log output
- Browser/OS information

---

**Back to:** [User Documentation](./index.md) →

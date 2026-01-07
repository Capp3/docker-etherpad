# Admin Guide - Managing Etherpad Plus

Guide for administrators managing the Etherpad Plus installation.

---

## Table of Contents

1. [Accessing Admin Panel](#accessing-admin-panel)
2. [Pad Management](#pad-management)
3. [User Management](#user-management)
4. [Plugin Management](#plugin-management)
5. [System Configuration](#system-configuration)
6. [Backup and Maintenance](#backup-and-maintenance)
7. [Troubleshooting](#troubleshooting)

---

## Accessing Admin Panel

### Login

1. Navigate to: `http://yourdomain/admin`
2. Enter admin password (set in `.env` file)
3. Click **Login**

### Admin Password

- Set in `.env` file: `DOCKER_COMPOSE_APP_ADMIN_PASSWORD`
- Default: `admin` (change in production!)
- Stored securely in environment variables

### Admin Features

- Pad management
- User management
- Plugin configuration
- System settings
- Statistics and monitoring

---

## Pad Management

### Viewing All Pads

1. Go to **Admin** → **Pads**
2. See list of all pads
3. View pad metadata:
   - Pad name/ID
   - Creation date
   - Last edited
   - Author count
   - Revision count

### Searching Pads

- Use search box to find pads
- Filter by name, date, or author
- Sort by various criteria

### Deleting Pads

1. Select pad(s) to delete
2. Click **Delete** button
3. Confirm deletion
4. Pad permanently removed

**Warning:** Deletion cannot be undone!

### Pad Statistics

- View pad statistics:
  - Total pads
  - Active pads
  - Total revisions
  - Storage usage

---

## User Management

### Viewing Active Users

- See users currently editing
- View user activity
- Monitor concurrent sessions

### User Authentication

Etherpad Plus supports multiple authentication methods:

- **No authentication** (default) - Anyone can edit
- **SSO** - Single Sign-On (if configured)
- **Password-based** - User accounts with passwords

### Configuring Authentication

Edit `config/etherpad.settings.json`:

```json
{
  "requireAuthentication": true,
  "requireAuthorization": false,
  "users": {
    "admin": {
      "password": "your-password",
      "is_admin": true
    }
  }
}
```

---

## Plugin Management

### Viewing Installed Plugins

1. Go to **Admin** → **Plugins**
2. See list of installed plugins
3. View plugin status:
   - Enabled/disabled
   - Version
   - Configuration

### Current Plugins

- ep_headings2 (0.2.68)
- ep_image_upload (1.0.105)
- ep_font_color (0.0.89)
- ep_spellcheck (0.0.65)
- ep_align (10.0.2)
- ep_adminpads3 (3.0.22)
- ep_table_of_contents (0.3.89)
- ep_author_neat2 (2.0.11)
- ep_comments_page (10.0.4)
- ep_embedded_hyperlinks2 (1.2.4)
- ep_markdown (10.0.1)

### Plugin Configuration

Some plugins have configuration options in `config/etherpad.settings.json`:

```json
{
  "ep_table_of_contents": {
    "disable_by_default": false,
    "show_button": true
  },
  "ep_image_upload": {
    "storage": {
      "type": "local",
      "baseFolder": "/images",
      "baseURL": "http://yourdomain/images/"
    },
    "fileTypes": ["jpeg", "jpg", "bmp", "gif", "png"],
    "maxFileSize": 5000000
  }
}
```

---

## System Configuration

### Environment Variables

Key configuration in `.env` file:

```bash
# Port Configuration
DOCKER_COMPOSE_APP_PORT_PUBLISHED=11155
DOCKER_COMPOSE_APP_PORT_TARGET=9001

# Admin Password
DOCKER_COMPOSE_APP_ADMIN_PASSWORD=your-secure-password

# Database
DOCKER_COMPOSE_POSTGRES_DATABASE=etherpad
DOCKER_COMPOSE_POSTGRES_USER=etherpad
DOCKER_COMPOSE_POSTGRES_PASSWORD=your-db-password

# Domain
DOCKER_COMPOSE_APP_ETHERPAD_FQDN=documents.yourdomain.com

# LibreOffice
DOCKER_COMPOSE_APP_SOFFICE=true
DOCKER_COMPOSE_APP_SOFFICE_PATH='/usr/bin/soffice'
```

### Settings File

Main configuration: `config/etherpad.settings.json`

Key settings:
- Port and IP binding
- Database configuration
- Authentication settings
- Plugin configurations
- Export settings

### Restarting Services

After configuration changes:

```bash
# Restart services
docker compose restart etherpad

# Or rebuild and restart
docker compose down
docker compose up -d
```

---

## Backup and Maintenance

### Backup Strategy

#### What to Backup

1. **Database** - PostgreSQL data
   - Location: `postgres_data` volume
   - Contains: All pad content and revisions

2. **Images** - Uploaded images
   - Location: `/images` directory (in container)
   - Contains: User-uploaded images

3. **Exports** - Exported documents
   - Location: `./data/exports`
   - Contains: Exported HTML/ODT/DOCX files

4. **Backups** - Backup files
   - Location: `./data/backups`
   - Contains: Manual backups

5. **Configuration** - Settings files
   - Location: `config/etherpad.settings.json`
   - Contains: System configuration

#### Backup Commands

**Database Backup:**
```bash
# Backup PostgreSQL database
docker compose exec postgres pg_dump -U etherpad etherpad > backup_$(date +%Y%m%d).sql

# Or backup volume
docker run --rm -v etherpadplus_postgres_data:/data -v $(pwd)/backups:/backup alpine tar czf /backup/postgres_backup_$(date +%Y%m%d).tar.gz /data
```

**Image Backup:**
```bash
# Backup images directory
docker compose exec etherpad tar czf /backups/images_backup_$(date +%Y%m%d).tar.gz /images
```

**Configuration Backup:**
```bash
# Backup settings file
cp config/etherpad.settings.json backups/settings_$(date +%Y%m%d).json
```

#### Automated Backups

Create a backup script (`scripts/backup.sh`):

```bash
#!/bin/bash
BACKUP_DIR="./data/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup database
docker compose exec -T postgres pg_dump -U etherpad etherpad > $BACKUP_DIR/db_$DATE.sql

# Backup images
docker compose exec etherpad tar czf /backups/images_$DATE.tar.gz /images

# Backup config
cp config/etherpad.settings.json $BACKUP_DIR/settings_$DATE.json

echo "Backup completed: $DATE"
```

**Schedule with cron:**
```bash
# Daily backup at 2 AM
0 2 * * * /path/to/backup.sh
```

### Restore Procedures

#### Restore Database

```bash
# Restore from SQL dump
docker compose exec -T postgres psql -U etherpad etherpad < backup_YYYYMMDD.sql

# Or restore from volume backup
docker run --rm -v etherpadplus_postgres_data:/data -v $(pwd)/backups:/backup alpine tar xzf /backup/postgres_backup_YYYYMMDD.tar.gz -C /
```

#### Restore Images

```bash
# Restore images
docker compose exec etherpad tar xzf /backups/images_YYYYMMDD.tar.gz -C /
```

#### Restore Configuration

```bash
# Restore settings
cp backups/settings_YYYYMMDD.json config/etherpad.settings.json
docker compose restart etherpad
```

---

## Monitoring

### Service Status

```bash
# Check service status
docker compose ps

# View logs
docker compose logs -f etherpad
docker compose logs -f postgres

# Check health
curl http://localhost:11155
```

### Performance Monitoring

- **Memory usage**: `docker stats etherpad`
- **Disk usage**: `docker system df`
- **Log analysis**: Check logs for errors

### Log Locations

- **Etherpad logs**: `docker compose logs etherpad`
- **PostgreSQL logs**: `docker compose logs postgres`
- **Container logs**: Available via Docker

---

## Security

### Best Practices

1. **Change default passwords**
   - Admin password
   - Database password

2. **Use HTTPS** (via reverse proxy)
   - Set up Nginx/Traefik
   - Enable SSL certificates

3. **Restrict access**
   - Use firewall rules
   - Limit network access
   - Use authentication

4. **Regular updates**
   - Update Docker images
   - Update plugins
   - Security patches

5. **Backup regularly**
   - Automated backups
   - Test restore procedures
   - Off-site backups

### Security Checklist

- [ ] Default passwords changed
- [ ] HTTPS configured (if public)
- [ ] Firewall rules configured
- [ ] Authentication enabled (if needed)
- [ ] Regular backups scheduled
- [ ] Updates applied regularly
- [ ] Logs monitored
- [ ] Access restricted appropriately

---

## Troubleshooting

### Service Won't Start

**Check logs:**
```bash
docker compose logs etherpad
docker compose logs postgres
```

**Common issues:**
- Port already in use
- Database connection failed
- Configuration error
- Permission issues

### Database Connection Issues

**Check database:**
```bash
# Test connection
docker compose exec postgres pg_isready

# Check credentials
docker compose exec postgres psql -U etherpad -d etherpad -c "SELECT version();"
```

### Plugin Issues

**Check plugin status:**
- Admin → Plugins
- View plugin logs
- Check configuration

**Disable problematic plugins:**
- Edit `dockerfile.etherpad`
- Remove plugin from install list
- Rebuild image

### Performance Issues

**Check resources:**
```bash
docker stats
```

**Optimize:**
- Reduce image sizes
- Clean up old pads
- Optimize database
- Add resources if needed

---

## Maintenance Tasks

### Regular Maintenance

**Daily:**
- Check service status
- Review error logs
- Monitor disk space

**Weekly:**
- Review pad usage
- Clean up unused pads
- Check backup status

**Monthly:**
- Update Docker images
- Review security
- Test backup restore
- Performance review

### Cleanup Tasks

**Remove old pads:**
- Admin → Pads
- Select unused pads
- Delete

**Clean up exports:**
```bash
# Remove old exports (older than 30 days)
find ./data/exports -type f -mtime +30 -delete
```

**Database maintenance:**
```bash
# Vacuum database
docker compose exec postgres psql -U etherpad -d etherpad -c "VACUUM;"
```

---

## Advanced Configuration

### Reverse Proxy Setup

Example Nginx configuration:

```nginx
server {
    listen 80;
    server_name documents.yourdomain.com;

    location / {
        proxy_pass http://localhost:11155;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### SSL/HTTPS

Use Let's Encrypt or your SSL provider with reverse proxy.

### Custom Domain

Set `DOCKER_COMPOSE_APP_ETHERPAD_FQDN` in `.env`:
```bash
DOCKER_COMPOSE_APP_ETHERPAD_FQDN=documents.yourdomain.com
```

---

## Support and Resources

### Documentation

- [User Documentation](./index.md)
- [Technical Documentation](../README.md)
- [Memory Bank](../memory-bank/)

### Getting Help

- Check logs for errors
- Review configuration
- Test in isolation
- Contact technical support

---

**Next:** See [Troubleshooting](./troubleshooting.md) for common issues →

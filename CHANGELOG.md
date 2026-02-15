# Changelog

All notable changes to Workspace Hub will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-02-15

### Added
- Initial release
- 3x3 grid dashboard layout with 8 link tiles + 1 policies tile
- Auto-sorting by click frequency (per user)
- NEW badge for unclicked links
- Search functionality to find all links
- Custom link creation (stored in localStorage)
- Policy & procedures searchable directory
- Import/Export configuration via JSON
- Click tracking with localStorage
- Settings panel with 3 tabs (Manage, Import/Export, Changelog)
- Support for emoji icons
- Support for custom image URL icons
- Support for preset color names (blue, green, purple, orange, red, indigo, pink, teal)
- Support for hex color codes
- PWA meta tags for "Add to Home Screen"
- Responsive design for mobile and desktop
- Reset to defaults functionality

### Technical
- Pure HTML/CSS/JavaScript (no frameworks)
- localStorage for user data persistence
- External `data.json` for default configuration
- No backend required
- No dependencies

---

## Future Ideas

### [Planned]
- Dark mode toggle
- Different grid size options (2x2, 4x4)
- Icon picker UI for users
- Drag-and-drop reordering
- Categories/folders for links
- Analytics dashboard (click history charts)
- Export/import for policies
- Multi-language support
- Keyboard shortcuts
- Custom themes/branding

### [Under Consideration]
- Backend sync for click data across devices
- Team-shared links vs personal links
- Admin panel with authentication
- Browser extension version
- Desktop app (Electron)
- Mobile app versions

---

## Version History Template

When updating, copy this template:

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added
- New features

### Changed
- Changes to existing features

### Fixed
- Bug fixes

### Removed
- Removed features

### Security
- Security improvements
```

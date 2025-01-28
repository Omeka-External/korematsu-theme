# Korematsu S: An Omeka S Theme

This is an Omeka S theme that offers some custom options and a clean design.
![Korematsu Theme](https://github.com/Omeka-External/korematsu-theme/blob/main/theme.jpg?raw=true)

## Installation

For basic out-of-the-box use of the theme, follow the [Omeka S User Manual instructions for installing themes](https://omeka.org/s/docs/user-manual/sites/site_theme/#installing-themes).

For more advanced use, such as customizing the theme with Sass, you'll need to install the tools with [NodeJS](https://nodejs.org/en/) (0.12 or greater). Navigate to your theme directory and run `npm install`.

## Theme settings

### Header
- Logo: A desktop version of your logo (SVG, JPG, PNG)
- Logo Mobile: A mobile version of your logo (SVG, JPG, PNG)

### Banner
- Banner images (for a slider with cross-fade and Ken Burns effects)

### Footer
- Footer Logo
- Footer Site description
- Footer Menu Title
- Footer More Info Title
- Websites
- Email

### Social Media
- Facebook
- Twitter
- LinkedIn
- Instagram
- YouTube
- Mastodon

### Footer Bottom
- Copyright
- Terms Title
- Terms URL
- Privacy Policy Title
- Privacy Policy URL

### Resource Tags
- Show tags based on Resource Type and/or Class

### Browse Settings
- Layout for Browse Pages
- Truncate Body Property

## Customizing the Theme

If you want to customize the site with your own CSS, the [CSS Editor](https://omeka.org/s/modules/CSSEditor/) module allows site administrators to write style overrides.

For advanced CSS and Sass users, this theme includes variables and mixins for managing and extending many styles.

### Sass Tasks

Run these commands within the theme's root directory.

* **npm run start**: While this task runs, it watches for changes to sass files and recompiles the CSS.
* **gulp css**: This is the one-off task for compiling the current Sass/CSS.
* **gulp css:watch**: This task watches for changes in the Sass, then compiles the CSS.

## Utility classes
Korematsu S offers a set of predefined utility classes that will help you to add styles to certain elements by just assigning them these classes.

You can even combine multiple utility classes.

- `inline`
- `alignleft`
- `alignright`
- `aligncenter`
- `alignfull`
- `alignwide`
- `alignnarrow`
- `textleft`
- `textright`
- `textcenter`
- `clearfix`
- `screen-reader-text`


## Copyright
Korematsu S is Copyright © 2023-present Corporation for Digital Scholarship, Vienna, Virginia, USA http://digitalscholar.org

The Corporation for Digital Scholarship distributes the Omeka source code
under the GNU General Public License, version 3 (GPLv3). The full text
of this license is given in the license file.

The Omeka name is a registered trademark of the Corporation for Digital Scholarship.

Third-party copyright in this distribution is noted where applicable.

All rights not expressly granted are reserved.

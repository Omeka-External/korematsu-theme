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

### Resource Class Layouts
- Assign different column width distributions to the resource pages depending on their class.<br>Enter each distribution on a new line using `<class>|<left sidebar width in %>|<center region width in %>|<right sidebar width in %>`.<br>e.g. `Still Image|30|70|0` will set the left sidebar width to 30% and main region to 70% on resources with "Still Image" class.

### Browse Settings
- Layout for Browse Pages
  - Grid
  - List
  - Toggle - default to Grid
  - Toggle - default to List
- Truncate Body Property
  - Show full value
  - Show 4 lines and fade out
  - Show 4 lines and clip with an ellipsis

## Theme Features

### Page Templates

This theme offers 5 different page templates:
- Default
- No page navigation (a page with default layout but without page navigation)
- Page with Hero (a page with the hero slider set in the theme's settings page)
- Page with Hero - No page navigation (same as the above but without page navigation)
- Full width (a page with full width layout)
- Full width - No page navigation (same as the above but without page navigation)

### Assets with animated captions

You can add assets whose captions show up with a transition effect over the asset when you hover them.

To do this, you just have to add a "Group" block to your page, then assign a class "image-hover-text" to this block, and finally add 3 blocks to the Group:
1. Asset block: The image.
2. HTML block: The content that will show up in the animated caption on hover the image. It must have an <h4> heading in order for it to be previewed over the image.
3. HTML block: Another HTML block just to add the link. It will be rendered as an arrow button.

### Colored Captions

Captions in blocks like "Asset", "Item Carousel", and "Media Embed" are rendered with a color background (blue by default).

You can customize this color (beige or red) by assigning either "caption-beige" or "caption-red" class to the block in the "Block layout configuration" panel.

### Group blocks with color background

You can add Group blocks and assign some specific classes in order for them to have a solid color background:
- `has-background`: Class to assign the group block a solid color background.
- `<color>`: The solid color to assign to the background. It can be `blue`, `red` or `beige`. If no color class is assigned, it'll default to `blue`.

Optionally, you can add the `fullwidth` class to make it look full width (within the theme default container).

**Note:** By default, Omeka S offers a "Background" setting in the "Block layout configuration" panel where you can assign a custom color (3- or 6-digit hexadecimal color). However, we recommend using the color classes mentioned above in order to preserve this theme's look&feel. 

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

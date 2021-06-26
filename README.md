
![npm](https://img.shields.io/npm/dw/sanity-plugin-color-list?color=%235E6AD2&style=for-the-badge)

# Sanity Color List

Display colors for editors to choose from with this custom input component.

## 2.0.0 Breaking changes
Starting from 2.0.0 the whole color object is returned and the `type` has been changed from `colors` to `colorlist`.

![preview image](https://github.com/KimPaow/sanity-color-picker/raw/master/src/images/preview.png)

## Installation

1. `sanity install color-list`
2. In your schema:

```js
...,
{
  title: "Color List",
  description: "Pick a color",
  name: "colors",
  type: "colorlist", // required
  options: {
    list: [
      { title: "Red", value: "#f16d70" },
      { title: "Teal", value: "#88c6db" },
      { title: "Purple", value: "#aca0cc" },
      { title: "Green", value: "#bdcdcb" },
      { title: "White", value: "white" }
    ]
  }
},
...
```

Done. The component returns the selected list object. If the value key was an object it will return an rgb string instead.

## Options
This plugin offers some ways of customization via the options object. If you don't use an off-white theme in your studio the defaults should work well out of the box.

```js 
{string} [background="white"] // If you are using a theme with a non-white bg use this to inform the plugin of this non-white background color so that contrasts can be calculated properly
{object} [borderradius]
{string} [borderradius.outer="100%"] // Borderradius for the active decorator
{string} [borderradius.inner="100%"] // Borderradius for the main item
{number} [contrastcutoff=20] // 0-255. When the contrast between the background and the color falls below this level decorate the item with a lighter/darker value for better contrast
{number} [darken=10] // How much darker than the actual color the decoration color will be
{number} [lighten=10] // How much lighter than the actual color the decoration color will be
{bool} [tooltip] // Set to true to show a tooltip with the colors title on hover/focus
{object} list
{string} list.title // Used to display a tooltip if activated
{string || object} list.value // can be an object with keys for r, g and b or a valid color string. 0x formatted hex strings are not supported at the moment.
```

# Contributing

Issues are actively monitored and PRs are welcome. When developing this plugin the easiest setup is:

1. Fork this repo.
1. Install the sanity cli and create a sanity project: `npm install -g @sanity/cli && sanity init`. Follow the prompts, starting out with the blog template is a good way to go.
1. `cd` into your project directory, run `npm install && npm start` - your sanity studio should be running on http://localhost:3333.
1. `cd` into the `plugins` director of your project.
1. Fork this repo and clone your fork into the `plugins` directory inside your project `git clone git@github.com:your-fork/sanity-plugin-color-list.git`.
1. Open `sanity.json`, go to the `plugins` array and add `color-list`.
1. Re-start the sanity studio server with `npm start`.
1. Edit `schemas/post.js` and add follow the plugin documentation to add a `colorlist` type field.
1. Your studio should reload, and now when you edit the plugin code it should reload the studio, when you're done create a branch, put in a PR and a maintainer will review it. Thank you!

## Changelog

[See the changelog here.](https://github.com/KimPaow/sanity-color-picker/raw/master/CHANGELOG.md)

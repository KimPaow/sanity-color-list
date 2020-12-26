
![npm](https://img.shields.io/npm/dw/sanity-plugin-color-list?color=%235E6AD2&style=for-the-badge)

# Sanity Color List

Display colors for editors to choose from with this custom input component.

## 2.0.0 Breaking changes
Starting from 2.0.0 the whole color object is returned and the `type` has been changed from `colors` to `colorlist`.

Note: A bug has been found with `2.0.0` if you nest the colorlist type. Until resolved, please use version `1.2.1` if you need to nest the list. Otherwise `2.0.0` is still recommended because of the a11y upgrades.

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
      { title: "Yellow", value: "rgba(245, 199, 1, 0.5)" },
      { title: "Pink", value: {r: 246, g: 206, b: 219} },
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

Done. The component returns the selected list object value. If the value key was an object it will return an rgb string instead.

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

## Contributing
First run the following commands at the root of this repository.

```
npm i
npm link
```

Then, to include it in your Sanity development project, navigate to the root of your project and run: 
`npm link sanity-plugin-color-list`.
You will now reference the local version of the plugin when using the plugin.

Add the script `"dev": "sanity start --preserve-symlinks"` in your studio package.json file.
Then run `npm run dev` in your local sanity-plugin-color-list repository folder and `npm run dev` in your studio folder.

## Changelog

[See the changelog here.](https://github.com/KimPaow/sanity-color-picker/raw/master/CHANGELOG.md)

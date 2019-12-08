# Sanity Color List

Display colors for editors to choose from with this custom input component.

![preview image](https://github.com/KimPaow/sanity-color-picker/raw/master/src/images/preview.png)

## Installation

1. `sanity install color-list`
2. In your schema:

```js
...,
{
  title: "Color List",
  description: "Pick a color",
  name: "colorlist",
  type: "colors", // required
  options: {
    background: "black",
    borderradius: "100%",
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

Done. The component returns the selected value.

## Options
This plugin offers some ways of customization via the options object. If you don't use an off-white theme in your studio the defaults should work well out of the box.

```js 
{string} [background="white"] // If you are using a theme with a non-white bg use this to inform the plugin of this non-white background color so that contrasts can be calculated properly
{string} [borderradius="100%"] // Borderradius for both the inner and outer items
{number} [contrastcutoff=20] // 0-255. When the contrast between the background and the color falls below this level decorate the item with a lighter/darker value for better contrast
{number} [darken=10] // How much darker than the actual color the decoration color will be
{number} [lighten=10] // How much lighter than the actual color the decoration color will be
{object} list
{string} list.title
{string || object} list.value // can be an object with keys for r, g and b or a valid color string. 0x formatted hex strings are not supported at the moment.
```

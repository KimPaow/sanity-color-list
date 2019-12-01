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
    borderradius: "100%", // can be any valid border-radius value, defaults to 100%
    list: [
      { title: "Yellow", value: "rgba(245, 199, 1, 0.5)" }, // can be any valid color value
      { title: "Pink", value: "rgb(246, 206, 219)" },
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

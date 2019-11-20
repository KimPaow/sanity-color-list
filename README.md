# Sanity Color Picker

Display colors for editors to choose from with this custom input component.

![preview image](https://github.com/KimPaow/sanity-color-picker/raw/master/src/images/preview.png)

## Installation

1. `npm install sanity-color-picker`
1. In your schema: ```import ColorPicker from "sanity-color-picker/lib";

export default {
title: "Color Picker",
name: "colorpicker",
type: "string",
inputComponent: ColorPicker,
options: {
list: [
{ title: "Yellow", value: "#f5c701" },
{ title: "Pink", value: "#f6cedb" },
{ title: "Red", value: "#f16d70" },
{ title: "Teal", value: "#88c6db" },
{ title: "Purple", value: "#aca0cc" },
{ title: "Green", value: "#bdcdcb" },
{ title: "White", value: "#fff" }
]
}
};```

1. Profit. The component returns the selected value.

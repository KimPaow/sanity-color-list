import React from "react";
import styles from "./ColorPicker.css";
import PropTypes from "prop-types";
import FormField from "part:@sanity/components/formfields/default";
import PatchEvent, { set, unset } from "part:@sanity/form-builder/patch-event";

const createPatchFrom = value =>
  PatchEvent.from(value === "" ? unset() : set(value));
let isActive = false;
let isWhite = false;

class ColorPicker extends React.Component {
  focus() {
    this.inputElement ? this.inputElement.focus() : null;
  }

  selectColor(event) {
    this.props.onChange(createPatchFrom(event.target.dataset.color.toString()));
  }

  getColorProperties(colorBase) {
    let color = colorBase.toString();
    let hex = "";
    var r, g, b, a, hsp;

    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {
      color = color.match(
        /rgba?\(((25[0-5]|2[0-4]\d|1\d{1,2}|\d\d?)\s*,\s*?){2}(25[0-5]|2[0-4]\d|1\d{1,2}|\d\d?)\s*,?\s*([01]\.?\d*?)?\)/
      );

      r = color[1];
      g = color[2];
      b = color[3];
      a = color[4];
    } else {
      color = +(
        "0x" + color.slice(1).replace(color.length < 5 && /./g, "$&$&")
      );

      hex = color;
      r = color >> 16;
      g = (color >> 8) & 255;
      b = color & 255;
    }

    hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

    // Using the HSP value, determine whether the color is light or dark
    if (hsp > 127.5) {
      return {
        r: r,
        g: g,
        b: b,
        a: a,
        brightness: "light"
      };
    } else {
      return {
        r: r,
        g: g,
        b: b,
        a: a,
        brightness: "dark",
        hex: hex,
        rgb: `rgb(${r}, ${g}, ${b})`,
        rgba: `rgba(${r}, ${g}, ${b}, ${a})`
      };
    }
  }

  createColors(colors, value, options) {
    const borderradius = options.borderradius || "100%";
    return colors.map((color, i) => {
      let { r, g, b, a } = this.getColorProperties(color.value);

      r = r ? r.toString().replace(",", "") : "";
      g = g ? g.toString().replace(",", "") : "";
      b = b ? b.toString().replace(",", "") : "";

      let displayColor = color.value;
      let opaqueColor = `rgb(${r}, ${g}, ${b})`;

      // if color is transparent, replace the displayed color with a 100% opacity version
      if (a == 0) displayColor = opaqueColor;

      let containerStyles = {
        border: "2px solid white",
        borderRadius: borderradius
      };

      let innerStyles = {
        backgroundColor: displayColor,
        borderRadius: borderradius
      };

      // check if color is white
      if (
        (r.includes("255") && g.includes("255") && b.includes("255")) ||
        color.value === "white"
      ) {
        isWhite = true;
      } else {
        isWhite = false;
      }

      if (value && value === color.value) {
        isActive = true;
      } else {
        isActive = false;
      }

      // if active set an outer border
      if (isActive) {
        containerStyles.border = `2px solid ${displayColor}`;

        // if active and white set a lightgrey outer border and an inset boxshadow
        if (isWhite) {
          containerStyles.border = "2px solid rgba(23, 23, 23, 0.1)";
          innerStyles.boxShadow = "inset 0px 0px 0px 1px rgba(23, 23, 23, 0.1)";
        }
      }

      // if white and not active set a grey border
      if (isWhite && !isActive) {
        innerStyles.boxShadow = "inset 0px 0px 0px 1px rgba(23, 23, 23, 0.1)";
      }

      return (
        <div
          key={i}
          className={`${styles.colorContainer} ${
            isActive ? styles.active : ""
          }`}
          style={containerStyles}
          ref={element =>
            !this.inputElement ? (this.inputElement = element) : null
          }
        >
          <div
            className={styles.colorItem}
            style={innerStyles}
            onClick={event => this.selectColor(event)}
            data-color={color.value}
          ></div>
        </div>
      );
    });
  }

  render() {
    const { level, value, type } = this.props;
    const colors = type.options
      ? type.options.list
        ? type.options.list
        : []
      : [];

    return (
      <FormField
        label={type.title ? type.title : ""}
        description={type.description ? type.description : null}
        level={level}
      >
        <div className={styles.container}>
          {this.createColors(colors, value, type.options ? type.options : {})}
        </div>
      </FormField>
    );
  }
}

ColorPicker.propTypes = {
  type: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    options: PropTypes.shape({
      title: PropTypes.string,
      value: PropTypes.string
    }).isRequired
  }).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default ColorPicker;

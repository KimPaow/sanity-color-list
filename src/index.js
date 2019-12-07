import React from "react";
import styles from "./ColorPicker.css";
import PropTypes from "prop-types";
import FormField from "part:@sanity/components/formfields/default";
import PatchEvent, { set, unset } from "part:@sanity/form-builder/patch-event";
import { TinyColor } from "@ctrl/tinycolor";

const createPatchFrom = value =>
  PatchEvent.from(value === "" ? unset() : set(value));

class ColorPicker extends React.Component {
  focus() {
    this.inputElement ? this.inputElement.focus() : null;
  }

  selectColor(event) {
    this.props.onChange(createPatchFrom(event.target.dataset.color.toString()));
  }

  getDisplayColor({ tc, value }) {
    let alpha = tc.getAlpha();

    if (alpha === 0) {
      tc.setAlpha(1);
      return tc.toHex();
    }

    return value;
  }

  createColors(colors, value, options) {
    const borderradius = options.borderradius || "100%";
    const bg = options.background ? new TinyColor(options.background) : false;
    const bgBrightness = bg ? bg.getBrightness() : 255;
    const bgIsWhite = bgBrightness === 255 ? true : false;
    const contrastThreshold = 10;

    return colors.map((color, i) => {
      if (!color.value) return null;

      let tc = new TinyColor(color.value);

      const isActive = value && value === color.value ? true : false;
      const brightness = tc.getBrightness();
      const contrast =
        bgBrightness > brightness
          ? bgBrightness - brightness
          : brightness - bgBrightness;
      const isWhite = tc.getBrightness() === 255;
      const displayColor = this.getDisplayColor({ tc: tc, value: color.value });

      // console.log(`${color.title} | contrast to white: ${contrast}`);

      let containerStyles = {
        borderRadius: borderradius
      };

      let innerStyles = {
        backgroundColor: displayColor,
        borderRadius: borderradius
      };

      // if active set an outer border
      if (isActive) {
        containerStyles.border = `2px solid ${displayColor}`;
        innerStyles.width = "28px";
        innerStyles.height = "28px";

        // if active and white set a lightgrey outer border and an inset boxshadow
        // if active and lowcontrast
        if (isWhite) {
          // if bg is not white it's safe to set a white border
          containerStyles.border = !bgIsWhite
            ? "2px solid white"
            : "2px solid rgba(23, 23, 23, 0.1)";
          innerStyles.boxShadow = "inset 0px 0px 0px 1px rgba(23, 23, 23, 0.1)";
        }
      }

      // if white and not active set a grey border
      // if lowcontrast... lower color brightness of outer border?
      if (isWhite && !isActive) {
        // if no background is set or if the bg that is set is white...
        !options.background || bgIsWhite
          ? (innerStyles.boxShadow =
              "inset 0px 0px 0px 1px rgba(23, 23, 23, 0.1)")
          : null;
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

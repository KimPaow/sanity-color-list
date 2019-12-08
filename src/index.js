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

  getDisplayColor({ tinycolor, color }) {
    let alpha = tinycolor.getAlpha();
    let hex = tinycolor.toHex();

    if (alpha === 0) {
      tinycolor.setAlpha(1);
    }

    return hex ? `#${hex}` : color.value;
  }

  createColors(colors, value, options) {
    const {
      borderradius,
      background,
      contrastcutoff,
      lighten,
      darken
    } = options;
    const borderRadius = borderradius || "100%";
    const bg = background ? new TinyColor(background) : false;
    const bgBrightness = bg ? bg.getBrightness() : 255;
    const contrastThreshold = contrastcutoff ? contrastcutoff : 20;

    return colors.map((color, i) => {
      if (!color.value) {
        console.error(
          `sanity-plugin-color-list could not find a color value. Please check your schema.`
        );
        return null;
      }

      let tc = new TinyColor(color.value);
      if (!tc.isValid) {
        console.error(
          `sanity-plugin-color-list could not recognize the color: ${color.value}. Perhaps try another format.`
        );
        return null;
      }

      const isActive =
        value && value.toString() === color.value.toString() ? true : false;
      const brightness = tc.getBrightness();
      const contrast =
        bgBrightness > brightness
          ? bgBrightness - brightness
          : brightness - bgBrightness;
      const isLowContrast = contrast < contrastThreshold;
      const displayColor = this.getDisplayColor({
        tinycolor: tc,
        color: color
      });
      const adjustedColor = tc.isLight()
        ? tc.darken(darken ? darken : 10)
        : tc.lighten(lighten ? lighten : 10);

      let style = {
        outer: {
          borderRadius: borderRadius
        },
        inner: {
          backgroundColor: displayColor,
          borderRadius: borderRadius
        }
      };

      if (isLowContrast) {
        style.inner.boxShadow = `inset 0px 0px 0px 1px ${adjustedColor}`;
      }

      if (isActive) {
        style.outer.border = isLowContrast
          ? `2px solid ${adjustedColor}`
          : `2px solid ${displayColor}`;
        style.inner.width = "28px";
        style.inner.height = "28px";
      }

      return (
        <div
          key={i}
          className={`${styles.colorContainer} ${
            isActive ? styles.active : ""
          }`}
          style={style.outer}
          ref={element =>
            !this.inputElement ? (this.inputElement = element) : null
          }
        >
          <div
            className={styles.colorItem}
            style={style.inner}
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
      background: PropTypes.string,
      borderradius: PropTypes.string,
      contrastcutoff: PropTypes.number,
      lighten: PropTypes.number,
      darken: PropTypes.number,
      list: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          value: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
            .isRequired
        })
      )
    }).isRequired
  }).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default ColorPicker;

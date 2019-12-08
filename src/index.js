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

  selectColor(activeValue, selectedColor) {
    // unset if you select same color twice
    if (selectedColor === activeValue) {
      this.props.onChange(createPatchFrom(""));
    } else {
      this.props.onChange(createPatchFrom(selectedColor.toString()));
    }
  }

  getDisplayColor({ tinycolor, color }) {
    if (typeof color.value === "object") {
      return tinycolor.toRgbString();
    }

    return color.value;
  }

  createColors(colors, value, options) {
    const {
      borderradius,
      background,
      contrastcutoff,
      lighten,
      darken
    } = options;
    const borderRadiusInner = (borderradius || {}).inner || "100%";
    const borderRadiusOuter = (borderradius || {}).outer || "100%";
    const bg = background
      ? new TinyColor(background)
      : new TinyColor("#FFFFFF");
    const bgBrightness = bg ? bg.getBrightness() : 255;
    const contrastThreshold = contrastcutoff ? contrastcutoff : 20;
    const opacityThreshold = 0.2;
    const bgAccent =
      bg && bg.isLight()
        ? bg.darken(darken ? darken : 10)
        : bg.lighten(lighten ? lighten : 10);

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

      const rgbString = tc.toRgbString();
      const isObj = typeof color.value === "object";
      let isActive = isObj
        ? value === rgbString
        : value === color.value.toString();

      const alpha = tc.getAlpha();
      const brightness = tc.getBrightness();
      const contrast =
        bgBrightness > brightness
          ? bgBrightness - brightness
          : brightness - bgBrightness;
      const isLowContrast = contrast <= contrastThreshold;
      const displayColor = this.getDisplayColor({
        tinycolor: tc,
        color: color
      });
      // used for decorating lowcontrast colors
      let adjustedColor = tc.isLight()
        ? tc.darken(darken ? darken : 10)
        : tc.lighten(lighten ? lighten : 10);

      // if opacity is low, set adjusted color to use a specific color which contrasts with bg
      adjustedColor = alpha < opacityThreshold ? bgAccent : adjustedColor;

      let style = {
        outer: {
          borderRadius: borderRadiusOuter
        },
        inner: {
          backgroundColor: displayColor,
          borderRadius: borderRadiusInner
        }
      };

      // if lowcontrast decorate the color with an inner 1px border and change the color of the active state border
      if (isLowContrast || alpha < opacityThreshold) {
        style.inner.boxShadow = `inset 0px 0px 0px 1px ${adjustedColor}`;
      }

      if (isActive) {
        style.outer.border =
          isLowContrast || alpha < opacityThreshold
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
            className={styles.colorItemBg}
            style={isActive ? { width: "28px", height: "28px" } : {}}
          />
          <div
            className={styles.colorItem}
            style={style.inner}
            onClick={() =>
              this.selectColor(
                value,
                isObj ? rgbString : color.value.toString()
              )
            }
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
      borderradius: PropTypes.shape({
        outer: PropTypes.string,
        inner: PropTypes.string
      }),
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

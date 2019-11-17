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
  static propTypes = {
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

  focus() {
    this.inputElement ? this.inputElement.focus() : null;
  }

  selectColor(event) {
    this.props.onChange(createPatchFrom(event.target.dataset.color.toString()));
  }

  createColors(colors, value) {
    return colors.map((color, i) => {
      isWhite =
        color.value === "#fff" || color.value === "#ffffff" ? true : false;
      isActive = value && value === color.value ? true : false;

      let borderStyle = `2px solid white`;
      let styleInner = { backgroundColor: color.value };

      if (isActive) {
        borderStyle = `2px solid ${color.value}`;
        if (isWhite) {
          borderStyle = "2px solid black";
        }
      }

      if (isWhite && !isActive) {
        styleInner = { border: "2px solid lightgrey" };
      }

      return (
        <div
          key={i}
          className={`${styles.colorContainer} ${
            isActive ? styles.active : ""
          }`}
          style={{ border: borderStyle }}
          ref={element =>
            !this.inputElement ? (this.inputElement = element) : null
          }
        >
          <div
            className={styles.colorItem}
            style={styleInner}
            onClick={event => this.selectColor(event)}
            data-color={color.value}
          ></div>
        </div>
      );
    });
  }

  render() {
    const { type, value } = this.props;
    const colors = type.options.list ? type.options.list : [];

    return (
      <FormField
        label={type.title ? type.title : ""}
        description={type.description ? type.description : null}
      >
        <div className={styles.container}>
          {this.createColors(colors, value)}
        </div>
      </FormField>
    );
  }
}

export default ColorPicker;

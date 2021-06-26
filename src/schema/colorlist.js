import ColorList from "../index.js";

export default {
  title: "Colors",
  name: "colorlist",
  type: "object",
  fields: [
    {
      name: "title",
      type: "string",
    },
    {
      name: "value",
      type: "string",
    },
  ],
  inputComponent: ColorList,
};

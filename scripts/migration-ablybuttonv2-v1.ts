import { API, FileInfo } from "jscodeshift";

// yarn jscodeshift -t scripts/jscodeshift-fixedSize.ts ./pages/**/*.tsx --parser=tsx --dry
const sizeMap = {
  xxl: "xlarge",
  xl: "xlarge",
  lg: "large",
  nm: "medium",
  ms: "medium",
  sm: "small",
  xs: "xsmall",
};
export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const source = j(file.source);

  /**
   * @desc <AblyButton >{text}</AblyButton>
   * 최하단 노드의 AblyButton의 fixedSize prop을 지운다
   * */

  source
    .find(j.JSXElement)
    .filter(
      (path) =>
        path.value.openingElement.name.type === "JSXIdentifier" &&
        path.value.openingElement.name.name === "AblyButton"
    )
    .find(j.JSXAttribute)
    .filter((path) =>
      ["textColor", "disabledBackground", "borderColor"].includes(
        path.node.name.name
      )
    )
    .remove();

  source
    .find(j.JSXElement)
    .filter(
      (path) =>
        path.value.openingElement.name.type === "JSXIdentifier" &&
        path.value.openingElement.name.name === "AblyButton"
    )
    .find(j.JSXOpeningElement)
    .filter((a) => a.value.name.name === "AblyButton")
    .find(j.JSXAttribute)
    .filter((path) => path.node.name.name === "size")
    .forEach((path) => {
      if (sizeMap[path.node.value.value] != null) {
        path.node.value.value = sizeMap[path.node.value.value];
      }
    });

  source
    .find(j.JSXElement)
    .filter(
      (path) =>
        path.value.openingElement.name.type === "JSXIdentifier" &&
        path.value.openingElement.name.name === "AblyButton"
    )
    .find(j.JSXOpeningElement)
    .filter((a) => a.value.name.name === "AblyButton")
    .find(j.JSXAttribute)
    .filter((path) => path.node.name.name === "color")
    .forEach((path) => {
      const value = path.node.value.value;
      if (typeof value !== "string") {
        return;
      }
      if (value.includes("pink")) {
        path.node.value.value = "pink";
      } else if (value.includes("blue")) {
        path.node.value.value = "blue";
      } else if (value.includes("gray")) {
        path.node.value.value = "gray";
      }
    });

  return source.toSource();
}

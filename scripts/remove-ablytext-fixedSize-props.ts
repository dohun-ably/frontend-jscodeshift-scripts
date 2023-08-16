import { API, FileInfo } from "jscodeshift";

// yarn jscodeshift -t scripts/jscodeshift-fixedSize.ts ./pages/**/*.tsx --parser=tsx --dry
export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  /**
   * @desc <AblyText fixedSize>{text}</AblyText>
   * 최하단 노드의 AblyText의 fixedSize prop을 지운다
   * */

  root
    .find(j.JSXElement)
    .filter(
      (path) =>
        path.value.openingElement.name.type === "JSXIdentifier" &&
        path.value.openingElement.name.name === "AblyText" &&
        path.value.children != null &&
        path.value.children.every((a) => a.type !== "JSXElement")
    )
    .find(j.JSXAttribute)
    .filter((path) => path.node.name.name === "fixedSize")
    .remove();

  /**
   * @desc <AblyText fixedSize><AblyText fixedSize>{text}</AblyText></AblyText>
   * 걸러지지 않은 JSX를 한번 더 지운다
   * */

  root
    .find(j.JSXElement)
    .filter(
      (path) =>
        path.value.openingElement.name.type === "JSXIdentifier" &&
        path.value.openingElement.name.name === "AblyText"
    )
    .find(j.JSXAttribute)
    .filter((path) => path.node.name.name === "fixedSize")
    .remove();
  return root.toSource();
}

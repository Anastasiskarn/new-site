import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
const errors = [];
function walk(directory) {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) =>
      entry.isDirectory()
        ? walk(path.join(directory, entry.name))
        : [path.join(directory, entry.name)],
    );
}
for (const file of [
  ...walk("app"),
  ...walk("components"),
  ...walk("lib"),
].filter((file) => /\.tsx?$/.test(file))) {
  const source = fs.readFileSync(file, "utf8");
  if (/REPLACE_ME|PLACEHOLDER|\?{3,}/.test(source))
    errors.push(`${file}: placeholder or damaged text`);
  const ast = ts.createSourceFile(
    file,
    source,
    ts.ScriptTarget.Latest,
    true,
    file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  function visit(node) {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tag = node.tagName.getText(ast);
      const attributes = node.attributes.properties;
      const has = (name) =>
        attributes.some(
          (a) => ts.isJsxAttribute(a) && a.name.getText(ast) === name,
        );
      if (tag === "img" && !has("alt"))
        errors.push(`${file}: image without alt`);
      if (tag === "button" && !has("type"))
        errors.push(`${file}: button without explicit type`);
      if (
        has("onClick") &&
        !["button", "a", "input", "select", "textarea"].includes(tag)
      )
        errors.push(`${file}: click on noninteractive element`);
      if (has("dangerouslySetInnerHTML") && !["script", "span"].includes(tag))
        errors.push(`${file}: unapproved raw HTML boundary`);
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
}
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else
  console.log(
    "Local source lint passed (JSX semantics, explicit buttons, image alternatives, HTML boundaries and placeholders).",
  );

const extensionToFiletypeConfig = {
  js: "JavaScript",
  jsx: "JavaScript",
  ts: "TypeScript",
  tsx: "TypeScript",
  py: "Python",
  java: "Java",
  c: "C",
  cpp: "C++",
  html: "HTML",
  css: "CSS",
  json: "JSON",
  md: "Markdown",
  txt: "Text",
};

export const extensionToFiletype = (extension) => {
  if (!extension) return undefined;

  return extensionToFiletypeConfig[extension].toLowerCase();
};

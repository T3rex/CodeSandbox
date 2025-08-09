// treeUtils.js
export const findParentDirectory = (parentDirPath, treeStructure) => {
  if (treeStructure.path === parentDirPath) return treeStructure;
  if (!treeStructure.children) return null;
  for (const child of treeStructure.children) {
    if (child.path === parentDirPath) return child;
    const found = findParentDirectory(parentDirPath, child);
    if (found) return found;
  }
  return null;
};

export const hasNameCollision = (newFileName, parentDirPath, treeStructure) => {
  const parentDir = findParentDirectory(parentDirPath, treeStructure);
  if (!parentDir || !parentDir.children) return false;
  return parentDir.children.some(
    (child) => child.name.trim() === newFileName.trim()
  );
};

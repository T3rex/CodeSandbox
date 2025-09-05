import fs from "fs/promises";
import path from "path";

export const createFiles = async (files, root) => {
  for (const file of files) {
    const filePath = path.join(root, file.path);
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, file.content.join("\n"), "utf8");
  }
};

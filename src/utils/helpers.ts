import { DirContent } from "../ts/interfaces/dirContent.interface";
import { readdir } from "fs/promises";
import { basename, resolve, join } from "path";

/**
 * Recursively get the contents of a directory.
 * @param dirPath Absolute path to the directory.
 */
export const getDirContent = async (
  dirPath: string,
  obj: DirContent = {}
): Promise<DirContent> => {
  const dirContent = await readdir(dirPath, { withFileTypes: true });
  const dirName = basename(dirPath);

  Object.assign(obj, {
    [basename(dirPath)]: {
      baseDirPath: resolve(dirPath),
      files: [],
      subDirs: {},
    },
  });

  for await (const dirent of dirContent) {
    if (dirent.isDirectory()) {
      await getDirContent(join(dirPath, dirent.name), obj[dirName].subDirs);
    }
    if (dirent.isFile()) {
      obj[dirName].files.push({
        filename: dirent.name,
        path: join(obj[dirName].baseDirPath, dirent.name),
      });
    }
  }

  return obj;
};

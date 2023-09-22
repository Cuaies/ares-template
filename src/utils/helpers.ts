import { DirContent } from "../ts/interfaces/dirContent.interface";
import { readdir } from "fs/promises";
import { basename, resolve, join } from "path";
import { Dirent } from "fs";
import { logger } from "../modules/logger/logger";

/**
 * Recursively get the contents of a directory.
 * @param dirPath Absolute path to the directory.
 */
export const getDirContent = async (
  dirPath: string,
  obj: DirContent = {}
): Promise<DirContent> => {
  let dirExists: boolean = undefined!;
  let dirContent: Dirent[] = [];
  const dirName = basename(dirPath);

  try {
    dirContent = [...(await readdir(dirPath, { withFileTypes: true }))];
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code != "ENOENT") {
      logger.log(e as NodeJS.ErrnoException);
    } else {
      dirExists = false;
    }
  }

  Object.assign(obj, {
    [basename(dirPath)]: {
      validDir: dirExists ?? true,
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

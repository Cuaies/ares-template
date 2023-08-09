export interface DirContent {
  [dir: string]: {
    baseDirPath: string;
    files: { filename: string; path: string }[];
    subDirs: DirContent;
  };
}

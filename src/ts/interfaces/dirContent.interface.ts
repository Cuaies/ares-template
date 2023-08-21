export interface DirContent {
  [dir: string]: {
    /**
     * Whether the directory is valid (exists).
     */
    validDir: boolean;
    /**
     * Absolute path to the directory.
     */
    baseDirPath: string;
    /**
     * Files contained within the directory.
     */
    files: { filename: string; path: string }[];
    /**
     * Subdirectories contained within the directory.
     */
    subDirs: DirContent;
  };
}

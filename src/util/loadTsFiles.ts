import { readdir } from "node:fs/promises";
import { join } from "node:path";

/**
 * 指定されたディレクトリ内のすべての `.ts` ファイルを再帰的に取得します。
 *
 * @param dirpath - 検索対象のディレクトリのパス
 * @returns `.ts` ファイルのパスを含む配列を返します。
 *
 * @example
 * ```typescript
 * const tsFiles = await getTsFiles("./src");
 * console.log(tsFiles); // ['./src/index.ts', './src/util/helper.ts']
 * ```
 */
export const getTsFiles = async (dirpath: string): Promise<string[]> => {
    const files: string[] = [];
    try {
        const dirents = await readdir(dirpath, { withFileTypes: true });
        for (const dirent of dirents) {
            const fp = join(dirpath, dirent.name);
            if (dirent.isDirectory()) {
                files.push(...(await getTsFiles(fp)));
            } else {
                if (!fp.endsWith(".ts")) return [];
                files.push(fp);
            }
        }
    } catch (e) {
        console.error(e);
    }
    return files;
};

/**
 * 指定されたディレクトリ内のすべての `.ts` ファイルを動的にインポートし、
 * 各モジュールに対してコールバック関数を実行します。
 *
 * @param dirpath - `.ts` ファイルを含むディレクトリのパス
 * @param fn - 各インポートされたモジュールに対して実行されるコールバック関数
 *
 * @example
 * ```typescript
 * await loadTsFiles("./src/events", (module) => {
 *     console.log("モジュールがロードされました:", module);
 * });
 * ```
 */
export const loadTsFiles = async (
    dirpath: string,
    fn: (data: unknown) => void,
): Promise<void> => {
    const paths = await getTsFiles(dirpath);
    for (const path of paths) {
        try {
            const file = await import(path);
            fn(file);
        } catch (error) {
            console.error(error);
        }
    }
};

import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const MDX_PATH = path.join(process.cwd(), 'src/markdown');
export const mdxFilePaths = fs.readdirSync(MDX_PATH);
export function getMdxWithMeta(fileName: string) {
    const mdxFile = fs.readFileSync(path.join(MDX_PATH, fileName), 'utf-8');
    const {data, content} = matter(mdxFile);
    return {data, content};
}
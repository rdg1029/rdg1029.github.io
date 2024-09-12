import fs from "fs";
import path from "path";
import { serialize } from 'next-mdx-remote/serialize'

export const MDX_PATH = path.join(process.cwd(), 'src/markdown');
export const mdxFilePaths = fs.readdirSync(MDX_PATH);
export async function getMdxData(fileName: string) {
    const source = fs.readFileSync(path.join(MDX_PATH, fileName), 'utf-8');
    const mdxSource = await serialize(source, {parseFrontmatter: true});
    return mdxSource;
}
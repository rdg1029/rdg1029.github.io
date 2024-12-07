import fs from "fs";
import path from "path";
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from "remark-gfm";
import rehypePrettyCode from 'rehype-pretty-code';

export type FrontMatter = {
    id: string;
    title: string;
    description?: string;
    author?: string;
    authorImg?: string;
    date: string;
    tag: string[];
}

/** @type {import('rehype-pretty-code').Options} */
const options = {
    theme: 'one-dark-pro',
    keepBackground: false,
};

export const MDX_PATH = path.join(process.cwd(), 'src/markdown');
export const mdxFilePaths = fs.readdirSync(MDX_PATH);
export async function getMdxData(fileName: string) {
    const source = fs.readFileSync(path.join(MDX_PATH, fileName), 'utf-8');
    const mdxSource = await serialize(source, {
        parseFrontmatter: true,
        mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [[rehypePrettyCode, options]],
        },
    });
    return mdxSource;
}
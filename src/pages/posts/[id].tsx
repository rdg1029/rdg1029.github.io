import type { InferGetStaticPropsType, GetStaticProps, GetStaticPaths } from 'next'
import { mdxFilePaths, getMdxData } from "@/lib/mdx-utils";
import { MDXRemote} from 'next-mdx-remote'
import MdxLayout from "@/components/mdx-layout";

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: mdxFilePaths.map(fileName => ({params: {id: fileName.replace(".mdx", "")}})),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const id = params?.id;
    const mdxSource = await getMdxData(`${id}.mdx`);
    const content = mdxSource;
    const data = mdxSource.frontmatter
    return { props: {content, data} }
}

export default function Post({ content, data }: InferGetStaticPropsType<typeof getStaticProps>) {
    // const router = useRouter();
    // const { id } = router.query;
    return (
        <>
        <p>Title: {data.title}</p>
        <p>Tag: {data.tag}</p>
        <MdxLayout>
            <MDXRemote {...content} />
        </MdxLayout>
        </>
    );
}
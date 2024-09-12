import { useRouter } from "next/router";
import type { InferGetStaticPropsType, GetStaticProps, GetStaticPaths } from 'next'
import { mdxFilePaths, getMdxWithMeta } from "@/lib/mdx-utils";
import MdxLayout from "@/components/mdx-layout";

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: mdxFilePaths.map(fileName => ({params: {id: fileName.replace(".mdx", "")}})),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const id = params?.id;
    const {data, content} = getMdxWithMeta(`${id}.mdx`);
    return { props: {data, content} }
}

export default function Post({ data, content }: InferGetStaticPropsType<typeof getStaticProps>) {
    // const router = useRouter();
    // const { id } = router.query;
    return (
        <>
        <p>Title: {data.title}</p>
        <p>Tag: {data.tag}</p>
        <MdxLayout>{content}</MdxLayout>
        </>
    );
}
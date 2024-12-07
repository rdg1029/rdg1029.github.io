import type { InferGetStaticPropsType, GetStaticProps, GetStaticPaths } from 'next'
import { mdxFilePaths, getMdxData } from "@/lib/mdx-utils";
import { MDXRemote } from 'next-mdx-remote'
import MdxLayout from "@/components/mdx-layout";
import Header from '@/components/header';
import Head from 'next/head';
import Image from 'next/image';

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: mdxFilePaths.filter((fileName) => fileName.match(/\.mdx$/i)).map(fileName => ({ params: { id: fileName.replace(".mdx", "") } })),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const id = params?.id;
    const mdxSource = await getMdxData(`${id}.mdx`);
    const content = mdxSource;
    const data = mdxSource.frontmatter
    return { props: { content, data } }
}

export default function Post({ content, data }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <div className='flex flex-col gap-y-8 md:p-4 max-md:p-2 max-w-screen-xl min-w-80 w-full m-auto'>
            <Head><title>{data.title}</title></Head>
            <Header />
            <div className='flex flex-col max-w-screen-md min-w-80 w-full m-auto bg-white rounded-3xl md:p-8 max-md:p-4'>
                <p className='text-4xl font-bold break-all'>{data.title}</p>
                <div className='flex max-md:flex-col gap-x-4 my-4 text-neutral-500'>
                    <div className='flex flex-row gap-x-2'>
                        {data.authorImg && <Image className='rounded-full' src={data.authorImg} width={24} height={24} alt='Autor image' />}
                        <p>{data.author}</p>
                    </div>
                    <div className="border-s border-neutral-400 h-5 max-md:invisible"></div>
                    <p>{new Date(data.date).toDateString()}</p>
                </div>
                <div className='flex flex-row flex-wrap gap-2'>
                    {data.tag.map((tagName: string, idx: number) => <p key={idx} className='rounded-xl bg-neutral-200 text-sm font-semibold py-0.5 px-1'>{tagName}</p>)}
                </div>
                {/* <hr className='my-4'></hr> */}
                <MdxLayout>
                    <MDXRemote {...content} />
                </MdxLayout>
            </div>
        </div>
    );
}
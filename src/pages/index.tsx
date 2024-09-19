import { useRouter } from 'next/router';
import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { mdxFilePaths, getMdxData, FrontMatter } from "@/lib/mdx-utils";
import PostItem from '@/components/post-item';

export const getStaticProps: GetStaticProps<{ postList: FrontMatter[] }> = (async () => {
  const postList = await Promise.all(mdxFilePaths.map(async (fileName) => {
    const mdxSource = await getMdxData(`${fileName}`);
    return Object.assign(mdxSource.frontmatter, { id: fileName.replace(".mdx", "") }) as FrontMatter;
  }));
  return { props: { postList } }
});

export default function Home({ postList }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  return (
    <div className='flex flex-col max-w-screen-xl min-w-80 w-full m-auto'>
      <header className='p-5 border-2 border-x-0 border-t-0 border-b-slate-200'>
        <nav className='mx-auto flex items-center justify-between'>
          <div className='lg:flex-1'>
            <a href='/'>HOME</a>
          </div>
          <div className='flex lg:gap-x-12'>
            <p>MENU1</p>
          </div>
        </nav>
      </header>
      <main className='max-w-screen-md w-full m-auto p-5'>
        <p className="text-4xl">Posts</p>
        {postList.map((data, idx) => {
          return (
            <PostItem key={idx} data={data} onClick={() => router.push(`/posts/${data.id}`)} />
          )
        })}
        {/* {mdxFilePaths.map(((fileName, idx) => {
          const title = fileName.replace(".mdx", "");
          return <p key={idx}><button onClick={() => router.push(`/posts/${title}`)}>{title}</button></p>
        }))} */}
      </main>
      <footer className='p-5 border-2 border-x-0 border-b-0 border-t-slate-200'>
        <div><p>EMAIL: wcle3456@gmail.com</p></div>
        <div><a href='https://github.com/rdg1029'>GITHUB</a></div>
      </footer>
    </div>
  );
}

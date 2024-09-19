import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { mdxFilePaths, getMdxData, FrontMatter } from "@/lib/mdx-utils";
import { useState } from 'react';
import PostList from '@/components/post-list';
import PostTag from '@/components/post-tag';
import About from '@/components/about';

export const getStaticProps: GetStaticProps<{ postListAll: FrontMatter[], tagList: string[] }> = (async () => {
  const postListAll = await Promise.all(mdxFilePaths.map(async (fileName) => {
    const mdxSource = await getMdxData(`${fileName}`);
    return Object.assign(mdxSource.frontmatter, { id: fileName.replace(".mdx", "") }) as FrontMatter;
  }));
  const tagList = Array.from(new Set(postListAll.map((data) => data.tag).flat()));
  return { props: { postListAll, tagList } }
});

export default function Home({ postListAll, tagList }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [postList, setPostList] = useState(postListAll);
  return (
    <div className='flex flex-col max-w-screen-xl min-w-80 w-full m-auto'>
      <header className='p-5 border-2 border-x-0 border-t-0 border-b-slate-200'>
        <nav className='mx-auto flex items-center justify-between'>
          <div className='lg:flex-1'>
            <a className='font-bold' href='/'>HOME</a>
          </div>
          <div className='flex lg:gap-x-12'>
            {/* <p>MENU1</p>
            <p>MENU2</p>
            <p>MENU3</p> */}
          </div>
        </nav>
      </header>
      <main className='flex flex-row gap-x-4 w-full m-auto p-5'>
        <div className='grow-0'>
          <About />
        </div>
        <div className='grow'>
          <PostList list={postList} />
        </div>
        <div className='grow-0'>
          <PostTag tagList={tagList} postListAll={postListAll} setPostList={setPostList} />
        </div>
      </main>
      {/* <footer className='p-5 border-2 border-x-0 border-b-0 border-t-slate-200'>
        <div><p>EMAIL: wcle3456@gmail.com</p></div>
        <div><a href='https://github.com/rdg1029'>GITHUB</a></div>
      </footer> */}
    </div>
  );
}

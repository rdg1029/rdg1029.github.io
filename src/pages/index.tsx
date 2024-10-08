import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import Head from 'next/head';
import { useState } from 'react';
import { mdxFilePaths, getMdxData, FrontMatter } from "@/lib/mdx-utils";
import Header from '@/components/header';
import PostList from '@/components/post-list';
import PostTag from '@/components/post-tag';
import About from '@/components/about';

export const getStaticProps: GetStaticProps<{ postListAll: FrontMatter[], tagList: string[] }> = (async () => {
  const postListAll = await Promise.all(mdxFilePaths.map(async (fileName) => {
    const mdxSource = await getMdxData(`${fileName}`);
    return Object.assign(mdxSource.frontmatter, { id: fileName.replace(".mdx", "") }) as FrontMatter;
  })).then(list => list.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))); // a.date - b.date => oldest / b.date - a.date => latest

  const tagList = Array.from(new Set(postListAll.map((data) => data.tag).flat())).sort();

  return { props: { postListAll, tagList } }
});

export default function Home({ postListAll, tagList }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [postList, setPostList] = useState(postListAll);
  const [tag, setTag] = useState("ALL");
  const [latest, setLatest] = useState(true);
  
  function updatePostList({orderLatest, tagName}: {orderLatest?: boolean, tagName?: string}) {
    setPostList(currList => {
      if (orderLatest === undefined) {
        if (tagName === undefined) {
          return currList;
        }
        else if (tagName === "ALL") {
          return latest ? postListAll : postListAll.toReversed();
        }
        else {
          return latest ? postListAll.filter(data => data.tag.includes(tagName)) : postListAll.filter(data => data.tag.includes(tagName)).reverse();
        }
      }
      else {
        if (tagName === undefined) {
          if (tag === "ALL") {
            return orderLatest ? postListAll : postListAll.toReversed();
          }
          else {
            return orderLatest ? postListAll.filter(data => data.tag.includes(tag)) : postListAll.filter(data => data.tag.includes(tag)).reverse();
          }
        }
        else if (tagName === "ALL") {
          return orderLatest ? postListAll : postListAll.toReversed();
        }
        else {
          return orderLatest ? postListAll.filter(data => data.tag.includes(tagName)) : postListAll.filter(data => data.tag.includes(tagName)).reverse();
        }
      }
    })
  }

  return (
    <div className='flex flex-col max-w-screen-xl min-w-80 w-full m-auto p-4'>
      <Head>
        <title>Blog (@rdg1029)</title>
      </Head>
      <Header />
      <main className='flex flex-row gap-x-4 w-full m-auto p-5'>
        <div className='grow-0'>
          <About />
        </div>
        <div className='grow'>
          <PostList list={postList} latestState={[latest, setLatest]} updatePostList={updatePostList} />
        </div>
        <div className='grow-0'>
          <PostTag tag={tag} tagList={tagList} setTag={setTag} updatePostList={updatePostList} />
        </div>
      </main>
    </div>
  );
}

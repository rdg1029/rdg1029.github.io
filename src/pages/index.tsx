import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import Head from 'next/head';
import { useState } from 'react';
import { mdxFilePaths, getMdxData, FrontMatter } from "@/lib/mdx-utils";
import Header from '@/components/header';
import PostList from '@/components/post-list';
import PostTag from '@/components/post-tag';
import About from '@/components/about';
import Links from '@/components/links';

export const getStaticProps: GetStaticProps<{ postListAll: FrontMatter[], tagList: string[] }> = (async () => {
  const postListAll = await Promise.all(mdxFilePaths.filter((fileName) => fileName.match(/\.mdx$/i)).map(async (fileName) => {
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

  function updatePostList({ orderLatest, tagName }: { orderLatest?: boolean, tagName?: string }) {
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
    <div className='flex flex-col max-w-screen-xl m-auto p-4'>
      <Head>
        <title>Blog (@rdg1029)</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </Head>
      <Header />
      <main className='w-full flex max-md:flex-col gap-x-4 m-auto p-5'>
        <div className='block md:grow-0 max-md:order-1'>
          <div>
            <About />
          </div>
          <div>
            <Links />
          </div>
        </div>
        <div className='md:grow max-md:order-3'>
          <PostList list={postList} latestState={[latest, setLatest]} updatePostList={updatePostList} />
        </div>
        <div className='md:grow-0 max-md:order-2'>
          <PostTag tag={tag} tagList={tagList} setTag={setTag} updatePostList={updatePostList} />
        </div>
      </main>
    </div>
  );
}

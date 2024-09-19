import { useRouter } from 'next/router';
import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { mdxFilePaths, getMdxData, FrontMatter } from "@/lib/mdx-utils";
import PostItem from '@/components/post-item';

export const getStaticProps: GetStaticProps<{ postList: FrontMatter[], tagList: string[] }> = (async () => {
  const postList = await Promise.all(mdxFilePaths.map(async (fileName) => {
    const mdxSource = await getMdxData(`${fileName}`);
    return Object.assign(mdxSource.frontmatter, { id: fileName.replace(".mdx", "") }) as FrontMatter;
  }));
  const tagList = postList.map((data) => data.tag).reduce((acc, cur) => acc.concat(cur));
  return { props: { postList, tagList } }
});

export default function Home({ postList, tagList }: InferGetStaticPropsType<typeof getStaticProps>) {
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
      <main className='flex flex-row gap-x-4 max-w-screen-xl w-full m-auto p-5'>
        <div className='grow'>
          <p className="text-3xl">Posts</p>
          {postList.map((data, idx) => {
            return (
              <PostItem key={idx} data={data} onClick={() => router.push(`/posts/${data.id}`)} />
            )
          })}
        </div>
        <div className='grow-0'>
          <p className="text-3xl">Tags</p>
          <div className='flex flex-wrap gap-2'>
            {Array.from(new Set(tagList)).map((tagName, idx) => {
              return <p className='rounded-xl bg-neutral-200 text-sm font-semibold py-0.5 px-1' key={idx}>{tagName}</p>
            })}
          </div>
        </div>
      </main>
      <footer className='p-5 border-2 border-x-0 border-b-0 border-t-slate-200'>
        <div><p>EMAIL: wcle3456@gmail.com</p></div>
        <div><a href='https://github.com/rdg1029'>GITHUB</a></div>
      </footer>
    </div>
  );
}

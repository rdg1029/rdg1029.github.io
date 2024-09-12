import { useRouter } from 'next/router';
import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { MDX_PATH, mdxFilePaths } from "@/lib/mdx-utils";

export const getStaticProps = (async () => {

  return { props: { MDX_PATH, mdxFilePaths } }
}) satisfies GetStaticProps<{MDX_PATH: string, mdxFilePaths: string[]}>

export default function Home({MDX_PATH, mdxFilePaths}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  return (
    <div>
      <p className="text-4xl">Posts</p>
      {mdxFilePaths.map((fileName => {
        const title = fileName.replace(".mdx", "");
        return <p><button onClick={() => router.push(`/posts/${title}`)}>{title}</button></p>
      }))}
    </div>
  );
}

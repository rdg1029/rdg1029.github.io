import { useRouter } from 'next/router';
import { FrontMatter } from "@/lib/mdx-utils"
import PostItem from "./post-item";

type Props = {
    list: FrontMatter[];
}

export default ({list}: Props) => {
    const router = useRouter();
    return (
        <div className='max-w-screen-lg'>
            <p className="text-3xl">Posts</p>
            {list.map((data, idx) => <PostItem key={idx} data={data} onClick={() => router.push(`/posts/${data.id}`)} />)}
        </div>
    )
}
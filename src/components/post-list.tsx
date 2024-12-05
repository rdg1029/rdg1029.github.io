import { useRouter } from 'next/router';
import { FrontMatter } from "@/lib/mdx-utils"
import PostItem from "./post-item";
import { Dispatch, SetStateAction } from 'react';

type Props = {
    list: FrontMatter[];
    latestState: [boolean, Dispatch<SetStateAction<boolean>>];
    updatePostList: ({orderLatest, tagName}: {orderLatest?: boolean, tagName?: string}) => void;
}

export default function PostList({list, latestState, updatePostList}: Props) {
    const router = useRouter();
    const CSS_BTN = 'rounded-xl font-extrabold decoration-2 px-1 py-px'
    const [latest, setLatest] = latestState;

    return (
        <div className='max-w-screen-lg'>
            <p className="text-3xl">Posts</p>
            <div className='flex flex-row justify-end gap-x-2'>
                <button className={`${CSS_BTN} ${latest ? 'bg-neutral-400' : 'bg-neutral-200 hover:bg-neutral-300'}`} onClick={() => {
                    if (latest) return;
                    setLatest(true);
                    updatePostList({orderLatest: true});
                }}>Latest</button>
                <button className={`${CSS_BTN} ${latest ? 'bg-neutral-200 hover:bg-neutral-300' : 'bg-neutral-400'}`} onClick={() => {
                    if (!latest) return;
                    setLatest(false);
                    updatePostList({orderLatest: false});
                }}>Oldest</button>
            </div>
            {list.map((data, idx) => <PostItem key={idx} data={data} onClick={() => router.push(`/posts/${data.id}`)} />)}
        </div>
    )
}
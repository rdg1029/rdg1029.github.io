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
    const CSS_BTN_ACTIVE = 'font-extrabold underline decoration-2';
    const [latest, setLatest] = latestState;

    return (
        <div className='max-w-screen-lg'>
            <p className="text-3xl">Posts</p>
            <div className='flex flex-row justify-end gap-x-2'>
                <button className={latest ? CSS_BTN_ACTIVE : ''} onClick={() => {
                    if (latest) return;
                    setLatest(true);
                    updatePostList({orderLatest: true});
                }}>Latest</button>
                <button className={!latest ? CSS_BTN_ACTIVE : ''} onClick={() => {
                    if (!latest) return;
                    setLatest(false);
                    updatePostList({orderLatest: false});
                }}>Oldest</button>
            </div>
            {list.map((data, idx) => <PostItem key={idx} data={data} onClick={() => router.push(`/posts/${data.id}`)} />)}
        </div>
    )
}
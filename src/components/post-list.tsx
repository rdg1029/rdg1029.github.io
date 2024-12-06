import { useRouter } from 'next/router';
import { FrontMatter } from "@/lib/mdx-utils"
import PostItem from "./post-item";
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const ITEMS_PER_PAGE = 5;

type Props = {
    list: FrontMatter[];
    latestState: [boolean, Dispatch<SetStateAction<boolean>>];
    updatePostList: ({orderLatest, tagName}: {orderLatest?: boolean, tagName?: string}) => void;
}

export default function PostList({list, latestState, updatePostList}: Props) {
    const router = useRouter();
    const CSS_BTN = 'rounded-xl font-bold decoration-2 px-1 py-px'
    const [latest, setLatest] = latestState;
    const [pageNum, setPageNum] = useState(1);
    const [listByPages, setListByPages] = useState<FrontMatter[][]>([]);

    useEffect(() => {
        setListByPages(() => {
            const MAX_PAGE_NUM = list.length / ITEMS_PER_PAGE;
            const origin = Array.from(list);
            const arr = [];
            for (let i = 0; i < MAX_PAGE_NUM; i++) {
                arr.push(origin.splice(0, ITEMS_PER_PAGE));
            }
            return arr;
        });
    }, [list]);

    return (
        <div className='md:min-w-96 max-w-screen-lg overflow-y-scroll'>
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
            {listByPages.map((postList, pageIdx) => <div key={pageIdx} className={`${pageNum === pageIdx + 1 ? '' : 'hidden'}`}>{postList.map((data, idx) => <PostItem key={idx} data={data} onClick={() => router.push(`/posts/${data.id}`)} />)}</div>)}
            <div className='flex justify-center gap-x-2'>
                {listByPages.map((_, idx) => <button className={`${CSS_BTN} ${pageNum === idx + 1 ? 'bg-neutral-400' : 'bg-neutral-200 hover:bg-neutral-300'}`} key={idx} onClick={() => setPageNum(idx+1)}>{idx+1}</button>)}
            </div>
        </div>
    )
}
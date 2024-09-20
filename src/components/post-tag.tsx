import { Dispatch, SetStateAction } from "react";
import { FrontMatter } from "@/lib/mdx-utils";

type Props = {
    tagList: string[];
    postListAll: FrontMatter[];
    setPostList: Dispatch<SetStateAction<FrontMatter[]>>
}

export default ({tagList, postListAll, setPostList}: Props) => {
    return (
        <>
            <p className="text-3xl">Tags</p>
            <div className='flex flex-wrap gap-2 max-w-48 m-3'>
                <button
                    className='rounded-xl bg-neutral-200 hover:bg-neutral-300 focus:bg-neutral-400 text-sm font-semibold py-0.5 px-1'
                    onClick={() => setPostList(postListAll)}>ALL</button>
                {tagList.map((tagName, idx) => {
                    return (
                        <button
                            className='rounded-xl bg-neutral-200 hover:bg-neutral-300 focus:bg-neutral-400 text-sm font-semibold py-0.5 px-1'
                            key={idx}
                            onClick={() => setPostList(postListAll.filter(data => data.tag.includes(tagName)))}>{tagName}</button>
                    )
                })}
            </div>
        </>
    )
}
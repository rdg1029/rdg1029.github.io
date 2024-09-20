import { Dispatch, SetStateAction } from "react";

type Props = {
    tag: string;
    tagList: string[];
    setTag: Dispatch<SetStateAction<string>>;
    updatePostList: ({orderLatest, tagName}: {orderLatest?: boolean, tagName?: string}) => void;
}

export default function PostTag({tag, tagList, setTag, updatePostList}: Props) {
    return (
        <>
            <p className="text-3xl">Tags</p>
            <div className='flex flex-wrap gap-2 max-w-48 m-3'>
                <button
                    className={`rounded-xl ${tag === "ALL" ? 'bg-neutral-400' : 'bg-neutral-200 hover:bg-neutral-300'} text-sm font-semibold py-0.5 px-1`}
                    onClick={() => {
                        setTag("ALL");
                        updatePostList({tagName: "ALL"});
                    }}>ALL</button>
                {tagList.map((tagName, idx) => {
                    return (
                        <button
                            className={`rounded-xl ${tagName === tag ? 'bg-neutral-400' : 'bg-neutral-200 hover:bg-neutral-300'} text-sm font-semibold py-0.5 px-1`}
                            key={idx}
                            onClick={() => {
                                setTag(tagName);
                                updatePostList({tagName: tagName});
                            }}>{tagName}</button>
                    )
                })}
            </div>
        </>
    )
}
import { FrontMatter } from "@/lib/mdx-utils"

type Props = {
    data: FrontMatter;
    onClick: () => void;
}

export default function PostItem({data, onClick}: Props) {
    return (
        <button
            className='flex flex-col text-left bg-white hover:bg-neutral-50 rounded-3xl hover:shadow-md p-4 my-3 w-full'
            onClick={onClick}
        >
            <p className='text-xl font-semibold justify-content-start'>{data.title}</p>
            <p className='text-sm text-neutral-600 mb-1'>{data.description}</p>
            <p className='text-sm text-neutral-500 font-thin'>{new Date(data.date).toDateString()}</p>
            <div className='flex flex-row justify-end gap-x-1 w-full'>{data.tag.map((tagName, idx) => <p className='rounded-xl bg-neutral-200 text-sm font-semibold py-0.5 px-1' key={idx}>{tagName}</p>)}</div>
        </button>
    )
}
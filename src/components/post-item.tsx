import { FrontMatter } from "@/lib/mdx-utils"

type Props = {
    data: FrontMatter;
    onClick: () => {};
}

export default ({data, onClick}: Props) => {
    return (
        <button
            className='flex flex-col bg-white rounded-xl shadow-sm hover:shadow-md p-4 m-3 w-full'
            onClick={onClick}
        >
            <p className='text-2xl font-semibold'>{data.title}</p>
            <p className='text-neutral-600 mb-1'>{data.description}</p>
            <p className='text-sm text-neutral-500 font-thin'>{new Date(data.date).toDateString()}</p>
            <div className='flex flex-row justify-end gap-x-1 w-full'>{data.tag.map((tagName, idx) => <p className='rounded-xl bg-neutral-200 text-sm font-semibold py-0.5 px-1' key={idx}>{tagName}</p>)}</div>
        </button>
    )
}
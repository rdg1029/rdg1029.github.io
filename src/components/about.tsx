import Image from "next/image"

export default function About() {
    return (
        <div className='flex flex-col gap-y-2 md:max-w-64 my-2'>
            <h1 className="text-2xl font-semibold">Profile</h1>
            <div className="flex flex-col bg-neutral-200 rounded-3xl p-4 max-md:items-center">
                <Image className="rounded-full mb-4" src="https://avatars.githubusercontent.com/u/10252712?v=4" width={96} height={96} alt="profile" />
                <p className="font-bold">김영현 (Younghyun Kim)</p>
                <p>Frontend Developer</p>
                <p>E-mail: wcle3456@gmail.com</p>
            </div>
        </div>
    )
}
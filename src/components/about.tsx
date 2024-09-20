import Image from "next/image"
import Link from "next/link"

function LinkComponent({title, description, href}: {title: string, description: string, href: string}) {
    const linkCSS = "flex flex-col bg-white hover:bg-neutral-50 rounded-2xl hover:shadow-md p-2"
    return (
        <Link className={linkCSS} href={href}>
            <p className="font-semibold">{title}</p>
            <p className="text-sm text-neutral-500">{description}</p>
        </Link>
    )
}

export default function About() {
    return (
        <div className='flex flex-col gap-y-2 max-w-64 my-2'>
            <h1 className="text-2xl font-semibold">Profile</h1>
            <div className="flex flex-col bg-neutral-200 rounded-3xl p-4">
                <Image className="rounded-full mb-4" src="https://avatars.githubusercontent.com/u/10252712?v=4" width={96} height={96} alt="profile" />
                <p className="font-bold">김영현 (Younghyun Kim)</p>
                <p>Frontend Developer</p>
                <p>E-mail: wcle3456@gmail.com</p>
            </div>
            <h1 className="text-2xl font-semibold">Links</h1>
            <LinkComponent title='GITHUB' description='깃허브 프로필 페이지' href='https://github.com/rdg1029' />
            <h1 className="text-lg font-medium">Personal Projects</h1>
            <LinkComponent title='ChatZip (개발 중)' description='웹 기반 실시간 3D 채팅' href='https://github.com/Chat-Zip' />
            <h1 className="text-lg font-medium">Team Projects</h1>
            <LinkComponent title='SoulRest' description='2019 스마트서울 모바일 앱공모전 장려상 수상작' href='https://github.com/yymin1022/SeoulHealing' />
            <LinkComponent title='EComuity' description='2022 KBSC 출품작' href='https://github.com/DefCon-Apps/ECOmunity-FE' />
        </div>
    )
}
import Link from "next/link"

function LinkComponent({ title, description, href }: { title: string, description: string, href: string }) {
    const linkCSS = "flex flex-col bg-white hover:bg-neutral-50 rounded-2xl hover:shadow-md p-2 my-2"
    return (
        <Link className={linkCSS} href={href}>
            <p className="font-semibold">{title}</p>
            <p className="text-sm text-neutral-500">{description}</p>
        </Link>
    )
}

export default function Links() {
    return (
        <div className="md:max-w-64">
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
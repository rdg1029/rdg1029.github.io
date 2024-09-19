export default () => {
    const linkCSS = "flex flex-col bg-white rounded-xl shadow-sm hover:shadow-md font-semibold p-2"
    return (
        <div className='flex flex-col gap-y-2 max-w-64'>
            <h1 className="text-2xl font-semibold">Profile</h1>
            <img className="justify-self-center" src="https://avatars.githubusercontent.com/u/10252712?v=4" width={96} height={96}></img>
            <p className="font-bold">김영현 (Younghyun Kim)</p>
            <p>Frontend Developer</p>
            <p>E-mail: wcle3456@gmail.com</p>
            <h1 className="text-2xl font-semibold">Links</h1>
            <a className={linkCSS} href='https://github.com/rdg1029'>GITHUB PROFILE</a>
            <h1 className="text-lg font-medium">Team Projects</h1>
            <a className={linkCSS} href='https://github.com/yymin1022/SeoulHealing'>SoulRest (2019 스마트서울 모바일 앱공모전 장려상 수상작)</a>
            <a className={linkCSS} href='https://github.com/DefCon-Apps/ECOmunity-FE'>EComuity (2022 KBSC 출품작)</a>
        </div>
    )
}
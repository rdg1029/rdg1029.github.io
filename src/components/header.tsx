import Link from "next/link";

export default function Header() {
    return (
        <header className='p-4 border-2 border-x-0 border-t-0 border-b-slate-200'>
            <nav className='mx-auto flex items-center justify-between'>
                <div className='lg:flex-1'>
                    <Link className='font-bold' href='/'>HOME</Link>
                </div>
                <div className='flex lg:gap-x-12'>
                    {/* <p>MENU1</p>
            <p>MENU2</p>
            <p>MENU3</p> */}
                </div>
            </nav>
        </header>
    )
}
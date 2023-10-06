'use client'

import Image from 'next/image'
import { Separator } from '../ui/separator'
import { useRouter } from 'next/navigation'
import { ScrollArea } from '../ui/scroll-area'

export default function Head() {

    const router = useRouter()

    return (
        <ScrollArea>
            <div className=' top-0 z-20 fixed border-blue-950 bg-[#161822] py-4 w-full flex justify-center items-center'>
                <Image className='' width='120' height='100' src='/assets/logo3.png' alt='' />
            </div>
            <div className=' mt-16'>
                <Image className=' md:h-[250px]' width='1920' height='100' src='/assets/image.jpg' alt='' />
            </div>
            <nav className=' flex justify-center bg-[#06070d]'>

                <div className=' gap-4 mt-4 rounded-xl w-[90%] border-blue-950 bg-[#11131b] py-4 flex justify-center items-center'>
                    <a className='cursor-pointer text-sm font-normal text-white' onClick={() => router.push('/skills')} >SKILLS</a>
                    <Separator orientation='vertical' className='h-6' />
                    <a className='cursor-pointer ml-0 text-sm font-normal text-white' onClick={() => router.push('/monsters')} >MONSTERS</a>
                    <Separator orientation='vertical' className='h-6' />
                    <a className='cursor-pointer  text-sm font-normal text-white' onClick={() => router.push('/items')}>ITENS</a>

                </div>
            </nav>
        </ScrollArea>

    )
}
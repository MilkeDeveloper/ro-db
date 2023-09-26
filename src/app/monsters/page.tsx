import { MonstersCard } from "@/components/monsters/monsters-card";
import { MonsterForm } from "@/components/monsters/monsters-form";
import { Pagination } from "@/components/monsters/pagination";
import { Separator } from "@/components/ui/separator";

import { Suspense } from "react";

export default function MonstersScreen() {
    return (
        <div className=' bg-[#06070d] flex items-center flex-col min-h-screen'>

            <main className=' flex-1 flex justify-center w-[90%] ' >
                <div className=' -z-1 animate-fade-right duration-1000 animate-ease-in-out py-6 my-6 px-6 rounded-xl bg-[#11131b] w-full h-[850px] flex flex-col items-start'>

                    <MonsterForm />

                    <Separator className='mt-6' />

                    <div className='flex justify-between mt-6 w-full'>
                        <span className='ml-7 md:ml-16 text-sm font-semibold text-gray-400'>MONSTRO</span>
                        <span className='ml-7 mr-12 md:mr-32 text-sm font-semibold text-gray-400'>NÍVEL</span>
                    </div>
                    <div className='w-full h-[530px] flex justify-center'>

                        <Suspense fallback={''
                        }>

                            <MonstersCard id={'1500'} name={'lulichan'} />


                        </Suspense>

                    </div>
                    <section className='w-full px-6 my-4 flex justify-start mr-4' >

                        <Pagination />
                    </section>
                </div>
                
            </main>
            
        </div>
    )
} 
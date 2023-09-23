import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import { Separator } from "../ui/separator";
import { Search } from "lucide-react";
import { Input } from "../ui/input";


export function MonsterForm() {
    return (
        <form action="" className='w-full'>
            <h1 className='font-semibold'>Lista de Monstros</h1>
            <div className='w-full pt-6 flex justify-center gap-4 items-center '>
              
              <Input className='w-full md:w-[280px] text-sm ' type='text' placeholder='Buscar monstro' />
              <Search className='w-6 h-6' />
              
            </div>

            <Separator className='mt-6' />

            <div className='flex'>
            
              <div className='w-full pt-6'>
                <Select>
                      <SelectTrigger className=' w-[99%] md:w-[300px]'>
                        <SelectValue placeholder='Escolha o tipo' />
                      </SelectTrigger>
                      <SelectContent className='bg-[#0a0c13]'>
                        <SelectItem value='Normal' >Normal</SelectItem>
                        <SelectItem value='Mini-Boss' >Mini-Boss</SelectItem>
                        <SelectItem value='MVP' >MVP</SelectItem>
                      </SelectContent>
                  </Select>
              </div>
        
            </div>
        </form>
    )
}
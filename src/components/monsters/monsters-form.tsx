'use client'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import { Separator } from "../ui/separator";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useMonstersStore } from "@/app/store/monstersStore";


export function MonsterForm() {

  const { searchTerm } = useMonstersStore();
  const handleInputChange = (e: any) => {
    const term = e.target.value;
    useMonstersStore.setState({ searchTerm: term });
    useMonstersStore.setState({ currentPage: 1 });
    useMonstersStore.setState({ isKeyDown: false });
  }  

  const handleSearch = (e: any) => {
    if (e.key === 'Enter') {
      const term = e.target.value;
      useMonstersStore.setState({ searchTerm: term });
      useMonstersStore.setState({ isKeyDown: true });
      e.target.blur();
    }
  }
    console.log(useMonstersStore.getState().searchTerm)

    return (
        <form onSubmit={(e) => e.preventDefault()} action="" className='w-full'>
            <h1 className='font-semibold'>Lista de Monstros</h1>
            <div className='w-full pt-6 flex justify-center gap-4 items-center '>
              
              <Input onKeyDown={handleSearch} onChange={ handleInputChange } type='text' value={searchTerm} className='w-full md:w-[280px] text-sm ' placeholder='Buscar monstro' />
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
                      <SelectItem value='Todos' >Todos</SelectItem>
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
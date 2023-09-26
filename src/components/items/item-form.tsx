import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import { Separator } from "../ui/separator";
import { Search } from "lucide-react";
import { Input } from "../ui/input";


export function ItemForm() {
  return (
    <form action="" className='w-full'>
      <h1 className='font-semibold'>Lista de Itens</h1>
      <div className='w-full pt-6 flex justify-center gap-4 items-center '>

        <Input className='w-full md:w-[280px] text-sm ' type='text' placeholder='Buscar item' />
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
              <SelectItem value='Consumível' >Consumível</SelectItem>
              <SelectItem value='Cartas' >Cartas</SelectItem>
              <SelectItem value='Adagas' >Adagas</SelectItem>
              <SelectItem value='Arcos' >Arcos</SelectItem>
              <SelectItem value='Espadas' >Espadas</SelectItem>
              <SelectItem value='Cajados' >Cajados</SelectItem>
              <SelectItem value='Armaduras' >Armaduras</SelectItem>
              <SelectItem value='Botas' >Botas</SelectItem>
              <SelectItem value='Chapéus/Elmos' >Chapéus/Elmos</SelectItem>
              <SelectItem value='Acessórios' >Acessórios</SelectItem>
              <SelectItem value='Etc' >Etc</SelectItem>
            </SelectContent>
          </Select>
        </div>

      </div>
    </form>
  )
}
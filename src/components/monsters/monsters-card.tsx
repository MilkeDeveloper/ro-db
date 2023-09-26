'use client'
import { useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import Image from 'next/image'
import { ScrollArea } from "../ui/scroll-area";
import { useRouter } from "next/navigation";
import { useMonstersStore } from "@/app/store/monstersStore";


const translateToPt = require("@kreisler/js-google-translate-free");
const serial = '4f2d4effd149e5789c2a905291d7b651'
const API_URL = `https://www.divine-pride.net/api/database/monster`;


async function getItemsData(monster_id: number) {

  const res = await fetch(`${API_URL}/${monster_id}?apiKey=${serial}`, { cache: "no-store" });
  //ItemList()
  try {
    const data = await res.json();
    return data

  } catch (error) {
    // Ocorreu um erro ao fazer o parse do JSON (não é JSON válido)
    return null; // Ou você pode retornar um valor padrão, como um objeto vazio: return {};
  }
}


export interface MonsterProps {
  id: string
  name: string;
  stats?: {
    level?: number
  }

}

export async function MonstersCard(props: MonsterProps) {
  //const data = await getItemsData(item_id)
  
  const id_route = useRouter();
  const { monsters, nextPage, previousPage, pageSize, currentPage, idMonster, isLoading } = useMonstersStore();
  const startIndex = 0 * pageSize;
  const endIndex = startIndex + pageSize;
  
  useEffect(() => {
    const fazerRequisicoesSequenciais = async () => {

      useMonstersStore.setState({ isLoading: true });

      const monsters = [];

      for (let i = startIndex; i < endIndex; i++) {
        const monsterID = useMonstersStore.getState().idMonster + i;
        console.log(monsterID)
        
        const monster = await getItemsData(monsterID);

        if (monster !== null) {
          monsters.push(monster);
          //useMonstersStore.setState({ isLoading: true });
        }
        
      }
      useMonstersStore.setState({ monsters, isLoading: false });
    };
    
    fazerRequisicoesSequenciais();
    
    //useMonstersStore.setState({ isLoading: false });
  }, [idMonster]);
  console.log(idMonster , currentPage)
  
  //console.log("array:", useMonstersStore.getState().idMonster)
  if(isLoading) {
    return <div className="flex justify-center items-center h-[535px] ">
    <svg aria-hidden="true" role="status" className="inline w-6 h- mr-3 text-gray-800 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#3abff8" />
    </svg>
    <p className='text-xl text-cyan-500'>Buscando dados...</p>
</div>
  }

  return (
    
    <ScrollArea className="w-full h-[475px] mt-6">
      
      <div className='w-full flex flex-col overflow-x-hidden '>

        {useMonstersStore.getState().monsters.map((monster: MonsterProps) => (

          <Card className='w-full mt-1 py-2 md:py-0' key={monster.id}>
            <CardContent className=" w-full">
              <a className="cursor-pointer" onClick={() => id_route.push(`/monsters/${monster.id}`)}>
                <div className='flex items-center w-full h-[50px] mt-6 '>

                  <img className=" ml-0 md:ml-4 w-[50px] h-[50px] " width={100} height={100} src={`https://static.ragnaplace.com/db/npc/gif/${monster.id}.gif`} alt="Monster Image" />

                  <div className='pl-2 md:pl-0 ml-4 md:ml-8 w-[80px] md:w-[300px]'>
                    <span className=' text-sm text-gray-300 font-semibold capitalize'>{monster.name}</span>
                    <p className='text-xs text-muted-foreground' > <span className="text-xs font-semibold text-muted-foreground">ID</span> #{monster.id} </p>
                  </div>
                  <section className="w-[100px] md:w-[72%] flex justify-end">
                    <span className=' ml-0 mr-4 md:mr-11 text-xs text-cyan-500 border border-cyan-900 rounded-[8px] p-1'>
                      Lv.{monster.stats?.level}
                    </span>
                  </section>
                </div>
              </a>
            </CardContent>
          </Card>
        ))}

        <div>

        </div>

      </div>

    </ScrollArea>
    
  )
}



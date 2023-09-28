'use client'
import { useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import Image from 'next/image'
import { ScrollArea } from "../ui/scroll-area";
import { useRouter } from "next/navigation";
import { useMonstersStore } from "@/app/store/monstersStore";
import { GetMonstersDataReq } from "./fecth-data-monster";
import { GetMonstersDataReq2 } from "./monsterObjectToJson";




const translateToPt = require("@kreisler/js-google-translate-free");



export interface MonsterProps {
  monster_id: string
  monster_info: string;
  main_stats?: {
    level?: number;
  };
  gif?: string;

}

export async function MonstersCard(props: MonsterProps) {
  //const data = await getItemsData(item_id)

  
  
  
  
  const id_route = useRouter();
  const { monsters, nextPage, previousPage, pageSize, currentPage, idMonster, isLoading, setMonsters } = useMonstersStore();
  const startIndex = 0 * pageSize;
  const endIndex = startIndex + pageSize;
  
  useEffect(() => {
    
    const fazerRequisicoesSequenciais = async () => {

      //if(useMonstersStore.getState().monsters.length > 0) {
      
        //return useMonstersStore.getState().monsters
        
      //}

      useMonstersStore.setState({ isLoading: true });

      const monsters = [];

      for (let i = startIndex; i < endIndex; i++) {
        const monsterID = useMonstersStore.getState().idMonster + i;
        console.log(monsterID)
        
        
        const monster = await GetMonstersDataReq(monsterID);
        

        if (monster !== null) {
          monsters.push(monster);
          //useMonstersStore.setState({ isLoading: true });
        }
        
      }
      setMonsters(monsters);
      useMonstersStore.setState({ monsters, isLoading: false });
      console.log('monstros:', useMonstersStore.getState().monsters)
      return monsters 
      
    };
    
    fazerRequisicoesSequenciais();
    //console.log(monsters)
    //useMonstersStore.setState({ isLoading: false });
  }, [idMonster]);
  
  
  //console.log("array:", useMonstersStore.getState().idMonster)
  if(isLoading) {
    return <div className="flex flex-col justify-center items-center h-[535px] ">
    <img className=" ml-0 md:ml-4 w-[68px] h-[60px] " width={100} height={100} src='http://db.irowiki.org/image/monster/1261.png' alt="Monster Image" />
    <p className='text-md text-cyan-500'>Buscando dados...</p>
</div>
  }

  return (
    
    <ScrollArea className="w-full h-[475px] mt-6">
      
      <div className='w-full flex flex-col overflow-x-hidden '>

        {monsters.map((monster: MonsterProps) => (
          
          <Card className=' animate-fade duration-500 ease-in-out touch-none w-full mt-1 py-2 md:py-0' key={monster.monster_id}>
            <CardContent className=" w-full">
              <a className="cursor-pointer" onClick={() => id_route.push(`/monsters/${monster.monster_id}`)}>
                <div className='flex items-center w-full h-[50px] mt-6 '>

                  <img className=" ml-0 md:ml-4 w-[50px] h-[50px] " width={100} height={100} src={`https://static.ragnaplace.com/db/npc/gif/${monster.monster_id}.gif`} alt="Monster Image" />

                  <div className='pl-2 md:pl-0 ml-4 md:ml-8 w-[80px] md:w-[300px]'>
                    <span className=' text-sm text-gray-300 font-semibold capitalize'>{monster.monster_info}</span>
                    <p className='text-xs text-muted-foreground' > <span className="text-xs font-semibold text-muted-foreground">ID</span> #{monster.monster_id} </p>
                  </div>
                  <section className="w-[100px] md:w-[72%] flex justify-end">
                    <span className=' ml-0 mr-4 md:mr-11 text-xs text-cyan-500 border border-cyan-900 rounded-[8px] p-1'>
                      Lv.{monster.main_stats?.level}
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





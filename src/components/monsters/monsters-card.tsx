'use client'
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode, useEffect, useState, Suspense } from "react";
import { Card, CardContent } from "../ui/card";
import Image from 'next/image'
import { text } from "node:stream/consumers";
import { ScrollArea } from "../ui/scroll-area";
import { useRouter } from "next/navigation";


const idInicial = 1250;
const maxReq = 20;
const pagination = 0;

const translateToPt = require("@kreisler/js-google-translate-free");
const serial = '4f2d4effd149e5789c2a905291d7b651'
const API_URL = `https://www.divine-pride.net/api/database/monster`;


async function getItemsData(monster_id: number) {
  
    const res = await fetch(`${API_URL}/${(monster_id)}?apiKey=${serial}`, { cache: 'force-cache' });
    //ItemList()
    try {
      const data = await res.json();
        return data;
    } catch (error) {
      // Ocorreu um erro ao fazer o parse do JSON (não é JSON válido)
      return null; // Ou você pode retornar um valor padrão, como um objeto vazio: return {};
    }
}

async function fazerRequisicoesSequenciais() {
    const monsters = []
  
    for (let i = 0; i < maxReq; i++) {
      const monsterID = idInicial + i;

      const monster = await getItemsData(monsterID);
      
      
      if (monster !== null) {
        monsters.push(monster);
      }
    }
    //console.log('Itens obtidos:', monsters);
    return monsters
    
    
  }

export interface MonsterProps {
  id: string
  name: string;
  stats?: {
    level?: number
  }

}

export async function MonstersCard(props: MonsterProps ) {
    //const data = await getItemsData(item_id)
    const id_route = useRouter()

    const monsters = await fazerRequisicoesSequenciais();

    console.log("array:", 'items')

    


    //console.log(data2)
    //console.log(data_pt)

    return ( 
    <ScrollArea className="w-full mt-6">

      <div className='w-full flex flex-col overflow-x-hidden '>
          
            {monsters?.map((monster: MonsterProps) => (
              
                <Card className='w-full mt-1 py-2 md:py-0' key={monster.id}>
                    <CardContent className=" w-full">
                      <a onClick={ () => id_route.push(`/monsters/${monster.id}`)}>
                      <div className='flex items-center w-full h-[50px] mt-6 '>
                        
                        <img  className=" ml-0 md:ml-4 w-[50px] h-[50px] " width={100} height={100}  src={`https://static.ragnaplace.com/db/npc/gif/${monster.id}.gif` } alt="Monster Image" />
                        
                        <div className='pl-2 md:pl-0 ml-4 md:ml-8 w-[80px] md:w-[300px]'>
                            <span className=' text-sm text-gray-300 font-semibold capitalize'>{monster.name }</span>
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



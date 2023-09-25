
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode, useEffect, useState, Suspense } from "react";
import { Card, CardContent } from "../ui/card";
import Image from 'next/image'
import { ScrollArea } from "../ui/scroll-area";
import { useRouter } from "next/navigation";


const idInicial = 1250;
const maxReq = 20;
const pagination = 0;

const translateToPt = require("@kreisler/js-google-translate-free");

const serial = '4f2d4effd149e5789c2a905291d7b651'

const API_URL = `https://www.divine-pride.net/api/database/Item`;


async function getItemsData(item_id: number) {
  
    const res = await fetch(`${API_URL}/${(item_id)}?apiKey=${serial}`, { cache: 'force-cache' });
    //ItemList()
    try {
      if(res) {
        const data = await res.json();
        return data;
      }
          
    } catch (error) {
      // Ocorreu um erro ao fazer o parse do JSON (não é JSON válido)
      return null; // Ou você pode retornar um valor padrão, como um objeto vazio: return {};
    }
}

async function fazerRequisicoesSequenciais() {
    const itens: any = []
  
    for (let i = 0; i < maxReq; i++) {
      const itemId = idInicial + i;

      const item = await getItemsData(itemId);
      
      try {
        if (item !== null) {
          itens.push(item);
        }
      } catch (error) {
        
        return null
      } 
      
    }
    return itens
    //console.log('Itens obtidos:', itens);
    
  }

export async function ItemCard() {
    //const data = await getItemsData(item_id)
    const items = await fazerRequisicoesSequenciais();
    
    console.log("array:", 'items')

    //console.log(data2)
    //console.log(data_pt)

    return ( 
      <ScrollArea className="w-full mt-6">
      <div className='w-full flex flex-col overflow-x-hidden '>
          
            {items?.map((item: any) => (
              
                <Card className='w-full mt-1 py-2 md:py-0' key={item.id }>
                    <CardContent className=" w-full">
                      <div className='flex items-center w-full h-[50px] mt-6 '>
                        
                        <img  className=" ml-0 md:ml-4 w-[30px] h-[30px] " width={100} height={100}  src={`https://static.divine-pride.net/images/items/item/${item.id}.png` } alt="Item Image" />
                        
                        <div className='pl-2 md:pl-0 ml-4 md:ml-8 w-[80px] md:w-[300px]'>
                            <span className=' text-sm text-gray-300 font-semibold capitalize'>{ item.name }</span>
                            <p className='text-xs text-muted-foreground' ><span className="text-xs font-semibold text-muted-foreground">ID</span> #{item.id} </p>
                        </div>
                        <section className="w-[100px] md:w-[72%] flex justify-end">
                          <span className='ml-0 mr-0 text-xs text-cyan-500 border border-cyan-900 rounded-[8px] p-1'>
                                {item.itemTypeId == 1? 'Weapon': 
                                  item.itemTypeId == 5? 'Etc' : 
                                  item.itemTypeId == 3? 'Consumível' : 
                                  item.itemTypeId == 2? 'Defensivo' :
                                  item.itemTypeId == 4? 'Munição' :
                                  item.itemTypeId == 6? 'Carta'
                                  : 'Unknown'}
                              </span>
                        </section>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              
            <div>
                
            </div>
                
        </div>
           
      </ScrollArea>     
              
    )
}





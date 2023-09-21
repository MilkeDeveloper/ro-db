
'use client'

import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode, useEffect, useState, Suspense } from "react";
import { Card, CardContent } from "../ui/card";
import Image from 'next/image'


const idInicial = 1459;
const maxReq = 50;

const translateToPt = require("@kreisler/js-google-translate-free");

const API_KEY = "d1665402c23b7072c9cfeb69f416e8b4"
const API_URL = `https://www.divine-pride.net/api/database/Item`;


async function getItemsData(item_id: number) {
  
    const res = await fetch(`${API_URL}/${(item_id)}?apiKey=${API_KEY}`, { next: { revalidate: 3600 } });
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
      
      <div className='w-full mt-6 flex flex-col overflow-x-hidden '>
          
            {items?.map((item: any, index: any) => (
              
                <Card className='w-full mt-1'>
                    <CardContent>
                      <div className='flex items-center w-full h-[50px] mt-6 '>
                           
                        <Image  className=" ml-0 md:ml-4 w-[30px] h-[30px]" width='100' height='100'  src={`http://db.irowiki.org/image/item/${item.id}.png`} alt="" />

                        <div className='ml-0 md:ml-4 gap-x-2 w-full flex items-center justify-between ' >
                          <div className='pl-2 md:pl-0 ml-2 md:ml-4 w-[180px]'>
                            <span className='text-sm text-gray-300 font-semibold capitalize'>{ item.name ? translateToPt.translate('en', 'pt', (item.name).replace(/_/g, ' ' )) : ''}</span>
                            <p className='text-sm text-muted-foreground' key={item.id} >ID: #{item.id} </p>
                          </div>
                          <div className="flex justify-end w-[250px] mr-0 md:mr-6">

                            <span className='ml-0 mr-12 text-xs text-cyan-500 border border-cyan-900 rounded-[8px] p-1'>
                              {item.itemTypeId == 1? 'Weapon': 
                                item.itemTypeId == 5? 'Etc' : 
                                item.itemTypeId == 3? 'Consumable' 
                                : 'Unknown'}
                            </span>
                          </div>
                        </div>
      
                      </div>
                    </CardContent>
                  </Card>
                ))}
              
            <div>
                
            </div>
                
        </div>
               

    )
}



'use client'
import { useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import Image from 'next/image'
import { ScrollArea } from "../ui/scroll-area";
import { useRouter } from "next/navigation";
import { useMonstersStore } from "@/app/store/monstersStore";
import { GetAllMonstersDataReq, GetMonstersDataReq } from "./fecth-data-monster";





const translateToPt = require("@kreisler/js-google-translate-free");



export interface MonsterProps {
  id: string
  monster_id: string
  monster_info: string;
  main_stats?: {
    level?: number;
  };
  gif?: string;

}
const monsterList: any = []
export async function MonstersCard(props: MonsterProps) {

  const id_route = useRouter();
  const { pageSize, currentPage, isLoading, searchTerm, monsters } = useMonstersStore();
  //const data = await getItemsData(item_id)


  const startIndex = (useMonstersStore.getState().currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;


  console.log(useMonstersStore.getState().currentPage)



  if (searchTerm === '') {

    useEffect(() => {
      const fetchMonsters = async () => {

        try {
          useMonstersStore.setState({ isLoading: true });
          const data = await GetMonstersDataReq(currentPage, pageSize);
          monsterList.push(useMonstersStore.setState({ filteredMonsters: data }));

          return data
        } catch (error) {
          console.error("Error fetching monsters:", error);
        } finally {
          useMonstersStore.setState({ isLoading: false });
        }


      };

      fetchMonsters();
    }, [currentPage]);

  } else {
    //useMonstersStore.setState({ filteredMonsters: filteredMonstersList })

    const paginatedList: any = []

    useEffect(() => {
      const fetchAllMonsters = async () => {
        try {
          // Lógica para buscar monstros da API e definir a lista de monstros
          // Substitua os URLs pelos seus endpoints reais
          useMonstersStore.setState({ isLoading: true });
          const monster_data = await GetAllMonstersDataReq();
          monsterList.push(useMonstersStore.setState({ monsters: monster_data }));

          return monster_data

        } catch (error) {
          console.error('Erro ao buscar monstros da API', error);
        } finally {
          
        }
      };

      // Lógica para filtrar monstros com base no searchTerm
      const timeout = setTimeout(() => {

        const filterMonsters = (searchTerm : string) => {
          const { monsters } = useMonstersStore.getState();
          const filteredMonstersList = monsters.filter(
            (monster) =>
              monster.monster_id.toString().includes(searchTerm) ||
              monster.monster_info.toLowerCase().includes(searchTerm.toLowerCase())
          );
          const paginatedMonstersList = filteredMonstersList.slice(startIndex, endIndex);
          paginatedList.push(paginatedMonstersList)
          console.log(paginatedList)
          useMonstersStore.setState({ isLoading: false });
          useMonstersStore.setState({ filteredMonsters: paginatedMonstersList });
          
        };
        filterMonsters(searchTerm);
      }, 300);
      

      // Função para buscar todos os monstros quando o componente monta
      fetchAllMonsters();
      console.log(useMonstersStore.getState().filteredMonsters)
      // Filtra os monstros sempre que o searchTerm é alterado
      return () => {
        clearTimeout(timeout);
      };
      //filterMonsters(useMonstersStore.getState().searchTerm);
      
      //useMonstersStore.setState({ isLoading: false });
    }, [useMonstersStore.getState().searchTerm, currentPage]);


  }




  //console.log("array:", useMonstersStore.getState().idMonster)
  if (isLoading) {
    return <div className="flex flex-col justify-center items-center h-[535px] ">
      <img className=" ml-0 md:ml-4 w-[68px] h-[60px] " width={100} height={100} src='http://db.irowiki.org/image/monster/1261.png' alt="Monster Image" />
      <p className='text-md text-cyan-500'>Buscando dados...</p>
    </div>
  }

  if(!isLoading && useMonstersStore.getState().filteredMonsters?.length === 0) {
    return <div className="flex flex-col justify-center items-center h-[535px] ">
      <img className=" ml-0 md:ml-4 w-[100px] h-[100px] " width={100} height={100} src='https://123emoji.com/wp-content/uploads/2016/08/ragnarok-stickers-2747441.png' alt="Monster Image" />
      <p className='text-md text-cyan-500'>Ops!! Nada encontrado!</p>
    </div>
  }

  return (

    <ScrollArea className="w-full h-[475px] mt-6">

      <div className='w-full flex flex-col overflow-x-hidden '>

        {useMonstersStore.getState().filteredMonsters?.map((monster: MonsterProps) => (

          <Card className=' animate-fade duration-500 ease-in-out w-full mt-1 py-2 md:py-0' key={monster.id}>
            <CardContent className=" w-full">
              <a className="cursor-pointer" onClick={() => id_route.push(`/monsters/${monster.monster_id}`)}>
                <div className='flex items-center w-full h-[50px] mt-6 '>

                  <img className=" ml-0 md:ml-4 w-[50px] h-[50px] " width={100} height={100} src={`https://legacymmo.com.br/data/monsters/${monster.monster_id}.gif`} alt="Monster Image" />

                  <div className='pl-2 md:pl-0 ml-4 md:ml-8 w-[80px] md:w-[300px]'>
                    <span className=' text-sm text-gray-300 font-semibold capitalize'>{monster.monster_info?.replace(/_/g, ' ')}</span>
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





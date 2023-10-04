
import { ArrowLeft } from "lucide-react"
import { Separator } from "../ui/separator"
import { GetMonsterDetailsData } from "./fecth-data-monster"
import { useRouter } from "next/navigation"
import { BackPage } from "./back-component"
import { useMonstersStore } from "@/app/store/monstersStore"
import { useEffect } from "react"

export async function MonsterCardDetails({ params: { id } }: { params: { id: number } }) {

    const monster = await GetMonsterDetailsData(id)

    //const router = useRouter()

    //console.log(monster)

    const race: any = {
        0: 'Amorfo',
        1: 'Morto-vivo',
        2: 'Bruto',
        5: 'Peixe'
    }

    const element: any = {
        41: 'Água 2',
        42: 'Terra 1',
        87: 'Sombrio 4',

    }

    const size: any = {
        0: 'Pequeno',
        1: 'Médio',
        2: 'Grande'
    }

    const elementalProperties: any = {
        0: 'Neutro',
        1: 'Água',
        2: 'Terra',
        3: 'Fogo',
        4: 'Vento',
        5: 'Veneno',
        6: 'Sagrado',
        7: 'Sombrio',
        8: 'Fantasma',
        9: 'Morto-vivo'
    }

    const race_name = race[monster.stats.race]
    const element_name = element[monster.stats.element]
    const size_name = size[monster.stats.scale]

    const monsterStats: any = [
        { name: 'Level', value: monster.stats.level },
        { name: 'HP', value: monster.stats.health },
        { name: 'Base EXP', value: monster.stats.baseExperience },
        { name: 'Classe EXP', value: monster.stats.jobExperience },
        { name: 'Raça', value: race_name },
        { name: 'Elemento', value: element_name },
        {
            name: 'Ataq', value:
                `${monster.stats.attack.minimum} - ${monster.stats.attack.maximum}`
        },
        {
            name: 'M.Ataq', value:
                `${monster.stats.magicAttack.minimum} - ${monster.stats.magicAttack.maximum}`
        },
        { name: 'Def', value: monster.stats.defense },
        { name: 'M.Def', value: monster.stats.magicDefense },
        { name: 'Tamanho', value: size_name },

    ]

    const monsterElementProps = monster.propertyTable

    const resultadoMapeado = Object.keys(monsterElementProps).map((id) => ({
        id: id,
        name: elementalProperties[id],
        value: monsterElementProps[id],
    }));

    console.log(resultadoMapeado)
    

    return (
        <article className="w-full h-[100%] bg-[#06070d] flex justify-center items-center">
            <div className=" animate-fade-right duration-500 ease-in-out my-6 w-[90%] lg:w-[60%] flex flex-col items-center h-full bg-[#11131b] rounded-xl py-6">
                <div className=" ml-4 mt-0 pb-6 w-[90%] items-center flex flex-start">
                    <BackPage />
                    
                </div>
                <h1 className=" font-bold text-center text-lg">{monster.name}</h1>
                <Separator className="mt-4 w-[90%]" />
                <div className="w-full md:w-[85%] flex flex-col justify-center lg:flex-row gap-8 md:gap-16 ">
                    <div className="px-2 flex w-[95%] justify-center gap-8 ">
                        <div className=" w-full flex flex-col items-center">
                            <section className="ml-8 overflow-hidden bg-[#0a0c13] mt-6 flex flex-col justify-center items-center w-full h-[200px] border border-cyan-500 rounded-xl">
                                <div className="mt-12 w-[full] flex flex-col items-center">
                                    <img className=" z-10 relative bottom-0 top-20 left-0 ml-0 md:ml-4 " width={90} height={90} src={`https://legacymmo.com.br/data/monsters/${monster.id}.gif`} alt="Monster Image" />
                                    <img className=" z-0 pt-6 pr-0 " width={200} height={100} src={'/assets/bg-rock.png'} alt="Monster Image" />
                                </div>

                            </section>
                            <Separator className="ml-8 mt-6 w-[100%]" />
                            <div className="ml-8 mt-4 w-full h-[30px] text-muted-foreground" >
                                <span className="text-sm"><span className="font-semibold">ID</span> #{monster.id}</span>
                            </div>
                        </div>

                        <div className="ml-2 my-6 w-full">
                            <section className="flex flex-col items-start" >
                                <ul className="text-muted-foreground text-sm flex flex-col gap-1">
                                    {monsterStats.map((stat: any) => (
                                        <li key={stat.name} ><span className="font-semibold">{stat.name}: </span> {stat.value}</li>
                                    ))}

                                </ul>
                            </section>
                        </div>
                    </div>
                </div>
                <Separator className="ml-0 mt-0 w-[90%]" />
                <section className="mt-6 md:hidden w-[90%] flex flex-col justify-start">
                    <h1 className="font-bold text-sm text-muted-foreground">Efetividade Elemental</h1>
                    <Separator className="ml-0 mt-2 w-full" />
                    <ul className="text-sm  ml-6 mt-6 grid grid-cols-2 gap-y-2 gap-x-4">
                        {resultadoMapeado.map((element, index) => (
                            <li key={element.id}> <span className=" font-semibold text-muted-foreground">{element.name}: </span>
                                {element.value > 100 && <span className="ml-1 text-xs font-bold text-[#71CA0B]" > {element.value} % </span> ||
                                    element.value < 100 && <span className="ml-1 text-xs font-bold text-[#C80539]" > {element.value} % </span> ||
                                    element.value == 100 && <span className="ml-1 text-xs font-bold text-slate-300" > {element.value} % </span>}
                            </li>

                        ))}

                    </ul>
                    <Separator className="ml-0 mt-6 w-[100%]" />


                </section>
            </div>
        </article>
    )
}
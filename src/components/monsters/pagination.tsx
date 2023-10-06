'use client';
import { useMonstersStore } from "@/app/store/monstersStore";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination() {
    const { isLoading, currentPage, previousPage, nextPage, nextMonsterList, previousMonsterList } = useMonstersStore();
    if(!isLoading && useMonstersStore.getState().filteredMonsters.length > 0)
    
        return (
            <div className={` w-full items-end flex justify-between }`} >
                <button className={`${currentPage <= 1 ? 'opacity-50' : ''}`} disabled={currentPage <= 1} onClick={ () =>{ previousPage();
                    {currentPage <= 0  ? '' : previousMonsterList() } } } > 
                
                    <ChevronLeft className="text-cyan-500" /> 
                </button>
                <span className="text-cyan-500 font-semibold">{useMonstersStore.getState().currentPage}</span>
                <button className={`${currentPage >= 70 || useMonstersStore.getState().filteredMonsters.length < 15 ? 'opacity-50' : ''}`} disabled={currentPage >= 70 || useMonstersStore.getState().filteredMonsters.length < 15 } onClick={ () =>{ nextPage();
                    {currentPage <= 0  ? '' : nextMonsterList() } } } > 
                
                    <ChevronRight className="text-cyan-500" /> 
                </button>
            </div>
        )
}
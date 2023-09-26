'use client';
import { useMonstersStore } from "@/app/store/monstersStore";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination() {
    return (
        <div className=" w-full flex justify-between">
            <button onClick={(useMonstersStore.getState().previousPage, useMonstersStore.getState().previousMonsterList) } > <ChevronLeft className="text-cyan-500" /> </button>
            <button onClick={useMonstersStore.getState().nextMonsterList}> <ChevronRight className="text-cyan-500" /> </button>
        </div>
    )
}
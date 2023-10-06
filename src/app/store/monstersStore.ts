import { MonsterProps } from '@/components/monsters/monsters-card';

import { create } from 'zustand';

interface MonstersStoreState {
    monsters: MonsterProps[];
    newMonsters: any[];
    currentPage: number;
    pageSize: number;
    nextPage: () => void;
    previousPage: () => void;
    idMonster: number;
    nextMonsterList: () => void;
    previousMonsterList: () => void;
    isLoading: boolean;
    hideElement: boolean;
    setMonsters: (monsters: MonsterProps[]) => void;
    searchTerm: string
    filteredMonsters: MonsterProps[]
    isKeyDown: boolean
    //maxPage: number
}

export const useMonstersStore = create<MonstersStoreState>((set) => ({
    monsters: [],
    newMonsters: [],
    currentPage: 1,
    pageSize: 15,
    nextPage: () => set((state) => ({ currentPage: state.currentPage + 1 })),
    previousPage: () => set((state) => ({ currentPage: state.currentPage - 1 })),
    idMonster: 1001,
    nextMonsterList: () => set((state) => ({ idMonster: state.idMonster + state.monsters?.length })),
    previousMonsterList: () => set((state) => ({ idMonster: state.idMonster - state.monsters?.length })),
    isLoading: false,
    hideElement: false,
    setMonsters: (monsters) => set({ monsters }),
    searchTerm: '',
    filteredMonsters: [],
    isKeyDown: false,
    //maxPage: useMonstersStore.getState().filteredMonsters.length / useMonstersStore.getState().pageSize
}
));
import { MonsterProps } from '@/components/monsters/monsters-card';

import { create } from 'zustand';

interface MonstersStoreState {
    monsters: MonsterProps[];
    currentPage: number;
    pageSize: number;
    nextPage: () => void;
    previousPage: () => void;
    idMonster: number;
    nextMonsterList: () => void;
    previousMonsterList: () => void;
    isLoading: boolean;
}

export const useMonstersStore = create<MonstersStoreState>((set) => ({
    monsters: [],
    currentPage: 0,
    pageSize: 10,
    nextPage: () => set((state) => ({ currentPage: state.currentPage + 1 })),
    previousPage: () => set((state) => ({ currentPage: state.currentPage - 1 })),
    idMonster: 1300,
    nextMonsterList: () => set((state) => ({ idMonster: state.idMonster + state.monsters.length })),
    previousMonsterList: () => set((state) => ({ idMonster: state.idMonster - state.monsters.length })),
    isLoading: true
}
));
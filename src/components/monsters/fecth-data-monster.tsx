
import { useMonstersStore } from "@/app/store/monstersStore";
import NextCors from 'nextjs-cors';


export async function GetMonsterDetailsData(id: number) {
    const serial = '4f2d4effd149e5789c2a905291d7b651'
    const API_URL = `https://www.divine-pride.net/api/database/monster`;

    const res = await fetch(`${API_URL}/${id}?apiKey=${serial}`, { cache: 'force-cache' })
    const data = await res.json()
    if (data) {
        return data
    }
}

export async function GetMonstersDataReq(page: number, pageSize: number) {

    

    const serial = '4f2d4effd149e5789c2a905291d7b651'
    const API_URL = `https://www.divine-pride.net/api/database/monster`;
    const API_URL2 = `https://ragnapi.com/api/v1/re-newal/monsters`
    const API_URL3 = `http://localhost:5700/api/monsters?page=${page}&pageSize=${pageSize}`
    const API_URL_TEST = `https://ro-db-api.onrender.com/api/monsters?page=${page}&pageSize=${pageSize}`

    //const res = await fetch(`${API_URL}/${monster_id}/?apiKey=${serial}`, {  cache: 'force-cache' });
    const res = await fetch(API_URL_TEST, { cache: 'force-cache' });
    //ItemList()
    try {
        const data = await res.json();
        //useMonstersStore.setState({ monsters: [...monsters, data] })
        //console.log(data)
        return data;
        

    } catch (error) {
        
        // Ocorreu um erro ao fazer o parse do JSON (não é JSON válido)
        return (
            console.log('Ocorreu um erro ao fazer o parse do JSON (não é JSON válido)')
        ) //}; // Ou você pode retornar um valor padrão, como um objeto vazio: return {};
    }
    
}


export async function GetMonstersDataReq2(monster_id: number) {

    const serial = '4f2d4effd149e5789c2a905291d7b651'
    const API_URL = `https://www.divine-pride.net/api/database/monster`;
    const API_URL2 = `https://ragnapi.com/api/v1/re-newal/monsters`

    //const res = await fetch(`${API_URL}/${monster_id}/?apiKey=${serial}`, {  cache: 'force-cache' });
    const res = await fetch(`/api/${monster_id}`, { cache: 'force-cache' });
    //ItemList()
    try {
        const data: any = await res.json().then(newMonster => {
            const jsonData = JSON.stringify(newMonster);
            const blob = new Blob([jsonData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const downloadLink = document.createElement('a');
            downloadLink.href = url;
            downloadLink.download = 'monsters.json';
            downloadLink.click();

            const data2 = res.json()



            return data2
        });

    } catch (error) {

        // Ocorreu um erro ao fazer o parse do JSON (não é JSON válido)
        return (
            {
                monster_info: 'unknown',
                monster_id: monster_id,
                gif: '/assets/unk_item.png',
                main_stats: {
                    level: 0

                }
            }
        ) //}; // Ou você pode retornar um valor padrão, como um objeto vazio: return {};
    }

}

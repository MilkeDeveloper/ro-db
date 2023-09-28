
import { useMonstersStore } from "@/app/store/monstersStore";

export function GetMonstersDataReq2(monster_id: number) {

    const { monsters } = useMonstersStore();

    const jsonData = JSON.stringify(monsters);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'monsters.json';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

}
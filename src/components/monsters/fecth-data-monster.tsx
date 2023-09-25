export async function GetMonsterDetailsData(id: number) {
    const serial = '4f2d4effd149e5789c2a905291d7b651'
    const API_URL = `https://www.divine-pride.net/api/database/monster`;

    const res = await fetch(`${API_URL}/${id}?apiKey=${serial}`, { cache: 'force-cache' })
    const data = await res.json()
    if (data) {
        return data
    }
}
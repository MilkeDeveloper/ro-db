
import { GetMonsterDetailsData } from "@/components/monsters/fecth-data-monster";
import { MonsterCardDetails } from "@/components/monsters/monster-card-details";
import { Separator } from "@/components/ui/separator";
import { ArrowBigLeft, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";



export default async function MonsterDatailsPage({params: {id}} : {params: {id: number}}) {
    return (
        <MonsterCardDetails params={{id}} />
    )
}
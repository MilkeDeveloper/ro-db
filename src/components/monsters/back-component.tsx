'use client'
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackPage() {

    const router = useRouter();
  
    return (
      <>
        
        <button onClick={() => router.push('/monsters')} className="btn ">
            <ArrowLeft className="text-cyan-500  "/>
        </button>
      </>

    )
  }
"use client";

import { ReactNode } from "react";

export default function Meta({content, icon, value}: {content: string, icon: ReactNode, value: string}){
    return(
        <div className="flex flex-col gap-0.5 justify-center items-center">
            <div className="flex flex-wrap gap-1 justify-center items-center">
                <span className="text-lg">{icon}</span> 
                <span className="font-semibold">{content}</span>
            </div>
            <div>
                {
                    content === "Salary" ? (
                        <p>{value}/LPA</p>
                    ): (
                        <p>{value}</p>
                    )
                }
            </div>
        </div>
    )
}
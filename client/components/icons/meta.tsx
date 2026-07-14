"use client";

import { ReactNode } from "react";

export default function Meta({label, icon, value}: {label: string, icon: ReactNode, value: string}){
    return(
        <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-sm text-base-content/60">
                <span className="text-base">{icon}</span> 
                <span>{label}</span>
            </div>
            <p className="font-semibold text-base">
                {value}
            </p>
        </div>
    )
}
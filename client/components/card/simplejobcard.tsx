"use client";
import { ReactNode } from "react";

export default function SimpleJobCrad({ children, className }: { children: ReactNode , className?: string}){
    return(
        <div className={`card
        w-full
        bg-base-100
        border
        border-base-300
        rounded-xl
        shadow-sm
        mb-2
        transition-all
        duration-200
        hover:shadow-md
        hover:border-primary/20 
        hover:-translate-y-0.5 ${className}`}>
            <div className="card-body">
                {children}
            </div>
        </div>
    )
}
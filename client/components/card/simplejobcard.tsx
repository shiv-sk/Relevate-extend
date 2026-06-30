"use client";
import { ReactNode } from "react";

export default function SimpleJobCrad({ children, className }: { children: ReactNode , className?: string}){
    return(
        <div className={`card md:w-[680px] w-[350px] bg-base-200 card-md shadow-xl ${className}`}>
            <div className="card-body">
                {children}
            </div>
        </div>
    )
}
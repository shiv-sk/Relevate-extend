"use client";
import { ReactNode } from "react";

export default function BaseLoginRegister({ children, className }: { children: ReactNode , className?: string}){
    return(
        <div className={`min-h-screen bg-base-200 flex items-center justify-center px-6 py-10 ${className}`}>
            <div className="grid lg:grid-cols-2 w-full max-w-6xl bg-base-100 rounded-2xl shadow-sm border border-base-300 overflow-hidden">
                {children}
            </div>
        </div>
    )
}
import { ReactNode } from "react";

export default function BaseApplicationCard({children, className}: { children: ReactNode , className?: string}){
    return(
        <div className={`w-full rounded-xl border border-base-300 bg-base-100 shadow-sm p-6 transition-all duration-200 hover:shadow-md ${className}`}>
            {children}
        </div>
    )
}
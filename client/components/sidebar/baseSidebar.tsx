import { ReactNode } from "react";

export default function BaseSidebar({children}: { children: ReactNode}){
    return(
        <div className="bg-base-200 border border-base-300 rounded-xl shadow-lg">
            {children}
        </div>
    )
}
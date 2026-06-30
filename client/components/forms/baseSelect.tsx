import React from "react"

export default function BaseSelect(
    {option, label, value, onChange, className, required=false}: 
    {
        option: string[], 
        label: string, 
        value: string, 
        onChange: (e: React.ChangeEvent<HTMLSelectElement>)=>void,
        className?: string,
        required?: boolean,
    }){
    return(
        <div>
            {
                label && (
                    <label htmlFor="" className="label font-bold text-lg">{label}</label>
                )
            }
            <select className={`select w-full ${className}`} value={value} onChange={onChange} required={required}>
                {
                    option.map((opt)=>(
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))
                }
            </select>
        </div>
    )
}
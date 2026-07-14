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
                    <label htmlFor="" className="label">
                        <span className="label-text font-medium text-base-content">
                            {label}
                        </span>
                    </label>
                )
            }
            <select 
            className={`input input-bordered bg-base-100 border-base-300 focus:border-primary focus:outline-none transition-colors w-full ${className}`}
            value={value} 
            onChange={onChange} 
            required={required}>
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
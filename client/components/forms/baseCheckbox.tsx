import { ChangeEvent } from "react";

export default function BaseCheckbox(
    {label, value, handleOnChange}: 
    {label: string, value: boolean, handleOnChange: (e: ChangeEvent<HTMLInputElement>)=>void}){
    return(
        <div>
            <label className="label font-bold text-lg">
                <input 
                type="checkbox" 
                className="checkbox"
                checked={value}
                onChange={handleOnChange} />
                {label}
            </label>
        </div>
    )
}
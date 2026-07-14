"use client";
export default function BaseInput(
    {label, type, onChange, value, placeholder, required=false, className}:
    {
        label?: string, 
        type :string, 
        onChange: (e: React.ChangeEvent<HTMLInputElement>)=>void, 
        value: string | number, 
        placeholder?: string, 
        required?: boolean, 
        className?: string
    }){
    return(
        <div className="form-control w-full">
            {
                label && (
                    <label htmlFor="" className="label font-bold text-lg">{label}</label>
                )
            }
            <input 
            type={type} 
            placeholder={placeholder} 
            className={`input input-bordered bg-base-100 border-base-300 focus:border-primary focus:outline-none transition-colors w-full ${className}`} 
            value={value} 
            onChange={onChange}
            required={required} />
        </div> 
    )
}
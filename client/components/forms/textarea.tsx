export default function Textarea({value, onChange, placeholder, className, label}: 
    {
        value: string, 
        onChange: (e: React.ChangeEvent<HTMLTextAreaElement>)=>void, 
        placeholder: string, 
        className?: string, 
        label?: string
    }){
    return(
        <div className="form-control w-full">
            {
                label && (
                    <label htmlFor="" className="label font-bold text-lg">{label}</label>
                )
            }
            <textarea 
            className={`textarea w-full ${className}`}
            value={value}
            onChange={onChange} 
            placeholder={placeholder}></textarea>
        </div>
    )
}
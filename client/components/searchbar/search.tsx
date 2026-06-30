import BaseButton from "../forms/baseButton";

export default function SearchBar(
    {onSearchChange, value, label, className, handleSearchOnClick}: 
    {onSearchChange: (val: string)=>void, value: string, label?: string, className?: string, handleSearchOnClick: ()=>void}){
    return(
        <div>
            {
                label && (
                    <label htmlFor="" className="label font-bold text-lg">{label}</label>
                )
            }
            <div className="flex justify-between items-center gap-2 px-4">
                <input 
                type="text" 
                onChange={(e)=>onSearchChange(e.target.value)} 
                value={value}
                placeholder="Search by Jobs"
                className={`input w-full ${className}`}/>
                
                <BaseButton 
                type={"button"} 
                text={"Search"}
                className="btn btn-primary"
                handleOnClick={handleSearchOnClick}/>
            </div>
        </div>
    )
}
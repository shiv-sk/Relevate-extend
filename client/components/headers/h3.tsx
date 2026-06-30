export default function H3({title, className}: {title: string, className?: string}){
    return(
        <h3 className={`text-lg font-bold ${className}`}>{title}</h3>
    )
}
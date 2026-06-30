export default function Badge({className, text}: {className?: string, text?: string}){
    return(
        <span className={`badge ${className}`}>{text}</span>
    )
}
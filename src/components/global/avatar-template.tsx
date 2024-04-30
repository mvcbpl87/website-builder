import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function AvatarTemplate({source, name}:{source:string, name?:string}){
    return(
    <Avatar className="border-border border-[1px]">
        <AvatarImage src={source} />
        <AvatarFallback>{!name? 'CN': name.slice(0,2).toUpperCase()}</AvatarFallback>
    </Avatar>
    )
}
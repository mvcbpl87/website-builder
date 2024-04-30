import { useState } from "react";
import { FileIcon, X , Upload} from "lucide-react";
import Image from 'next/image';
import React from "react";
import { Button } from "../ui/button";
import { WrapperProps } from "@/lib/types";
import { shortenText } from "@/lib/utils";

const Wrapper = ({children}:WrapperProps) =>{
    const style = `relative flex`;
    return(<div className = {style}>{children}</div>)
}
const UploadButton = ({
    value,
    onChange,
    loading
}:{
    value?:string,
    loading:boolean,
    onChange?:React.ChangeEventHandler<HTMLInputElement>,
}) =>{
    const Label = ({children}:{children:React.ReactNode}) =>{
        const style = `border-border border-muted-foreground border-[0.04rem] 
        rounded-lg py-2 px-4 text-xs cursor-pointer
        hover:bg-muted-foreground/10 flex-wrap
        w-full h-[15rem]
        flex items-center justify-center
        `;
        return(<label className={style}>{children}</label>)
    }
    return(
    <Label>
        <div className="flex flex-col items-center space-y-4">
        {value && (<span>{shortenText(value)}</span>)}
        <span className="flex items-center "> <Upload className="h-3 w-3"/> &nbsp;Upload File</span>
        </div>
       
        
        <input id="dropzone-file" type="file" disabled = {loading}
            onChange={onChange}
            className="hidden"/>
    </Label>
    )
}

type Props = {
    apiEndpoint?: 'agencyLogo' | 'avatar' | 'subaccountLogo'
    onChange: (url?: string) => void
    value?: string
  }
export default function FileUpload({onChange, value}:Props){
    const handleOnChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
        // "use server"
        const file = event.target.files?.[0]! 
        // (2) Write file into local space
        const data = new FormData(); data.set("file", file)
        onChange(file.name)
    }
    return(
    <Wrapper>
        <UploadButton value={value} loading={false} onChange={e=>handleOnChange(e)}/>

    </Wrapper>
    )
}


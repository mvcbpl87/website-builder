"use client"
import { WrapperProps } from "@/lib/types"
import { testNotification } from "@/test/dummy/type"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Switch } from "@/components/ui/switch"
import { ModeToggle } from "./mode-toggle"
import { Bell, icons } from "lucide-react"
import { Card } from "../ui/card"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
type Props = {
    // notifications: NotificationWithUser | []
    notifications:  testNotification[]
    role?: string
    className?: string
    subAccountId?: string
}

export default function InfoBar({
    notifications, 
    role, 
    className, 
    subAccountId
}:Props){
    const [allNotifications, setAllNotifications] = useState(notifications)
    const [showAll, setShowAll] = useState(true);
    const Wrapper = ({children, className }:WrapperProps) => <div className={className}>{children}</div>
    const handleClick = ()=>{
        if(!showAll){setAllNotifications(notifications); return;}// WIP load with notification datas
        if(notifications.length >= 0)
            setAllNotifications(
                notifications?.filter((item:any)=> item.subAccountId == subAccountId) ?? []
            )
        setShowAll(prev => !prev)
    }

    return(
    <Wrapper className="bg-background/80 backdrop-blur-md p-4 flex justify-end gap-4">
        <AvatarTemplate source="/avatars/2.png"/>
        <InfoSheetLayout handleClick={handleClick} notifications={allNotifications}/>
        <ModeToggle/>
    </Wrapper>)
      
    
}

type TSheetLayout={
    handleClick: ()=>void,
    notifications?: testNotification[]
}
function InfoSheetLayout({handleClick, notifications}:TSheetLayout){
    return(
    <Sheet>
    <SheetTrigger asChild>
        <Button 
            variant="outline" 
            size={"icon"}
            className="rounded-full hover:bg-primary"
        >
            <Bell size={18}/>
        </Button>
    </SheetTrigger>
    <SheetContent 
        showX={true}
        className=""
    >
        <SheetHeader>
        <SheetTitle>Notifications</SheetTitle>
        <SheetDescription>
            <Card className="flex items-center justify-between p-4">
                Current Subaccount
                <Switch onCheckedChange={handleClick} />
            </Card>
        </SheetDescription>
        </SheetHeader>
        <div className="my-4">
        {
            (notifications?.length == 0 || notifications == undefined) &&
            <div className="flex items-center justify-center text-muted-foreground">
                You have no notifications
            </div> 
        }
        {
           notifications?.map((item:testNotification, index)=>(
            <div
            key = {`info-${index+1}`} 
            className="flex items-center gap-4 text-ellipsis  border-border border-b-[1px] py-5">
                <AvatarTemplate 
                    name = { item.users.name}
                    source ={item.users.avatarUrl}/>
                <div className="flex flex-col text-sm space-y-[1px]">
                    <span className="font-bold">{item.notification.split('|')[0]}</span>
                    <span className="text-muted-foreground">{item.notification.split('|')[1]}</span>
                    <span className="font-bold">{item.notification.split('|')[2]}</span>
                    <small className="text-xs text-muted-foreground">{new Date(item.createdAt).toLocaleDateString()}</small>
                </div>
            </div>
           )
        )}

        </div>
      
    </SheetContent>
    </Sheet>)
}

function UserButton(){
    return(
    <Avatar className="border-border border-[1px]">
        <AvatarImage src="/avatars/1.png" />
        <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    )
}

function AvatarTemplate({source, name}:{source:string, name?:string}){
    return(
    <Avatar className="border-border border-[1px]">
        <AvatarImage src={source} />
        <AvatarFallback>{!name? 'CN': name.slice(0,2).toUpperCase()}</AvatarFallback>
    </Avatar>
    )
}
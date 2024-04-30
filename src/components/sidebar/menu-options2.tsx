"use client"
import React, {useEffect, useMemo, useState} from "react";
import { icons } from "@/lib/constant";
import { Sheet, SheetContent, SheetHeader, SheetClose, SheetTrigger, } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator,} from "@/components/ui/command";
import { Button } from "../ui/button";
import { ChevronsUpDown, Compass, Menu } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import type { WrapperProps } from "@/lib/types";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import type { testSidebarOpt } from "@/test/dummy/type";


type Props = {
    defaultOpen?: boolean,
    subAccounts?:  any[],
    // sidebarOpt: TAgencySidebarOption[] | TSubAccountSidebarOption[],
    sidebarOpt: testSidebarOpt[],
    sidebarLogo: string,
    details: any,
    user: any,
    id: string
}

export default function MenuOptions2({
    details,
    id,
    sidebarLogo,
    sidebarOpt,
    subAccounts,
    user,
    defaultOpen
}: Props){
    const [isMounted, setIsMounted] = useState(false);
    useEffect(()=> setIsMounted(true), []);
    const openState = useMemo(
        () => (defaultOpen ? { open: true } : {}),
        [defaultOpen]
      )
    if(!isMounted) return

    return(
    <Sheet modal={false} {...openState}>
        <SheetTrigger asChild className="absolute md:!hidden flex ">
            <div className="p-4">
                <Button size={"icon"} variant ={"outline"}><Menu/></Button>
            </div>   
        </SheetTrigger>
        <SheetContent  
         side = "left" 
         showX={!defaultOpen}
         className={clsx('bg-background/90 backdrop-blur border-r-[1px] border-white p-6',{
            'hidden md:inline-block w-[300px]': defaultOpen,
            'inline-block md:hidden w-full': !defaultOpen,
        })}
        >
        <AccountManager details={details}/>
        </SheetContent>
    </Sheet>
    )
}

function AccountManager({details}:{details:any}){
    const Wrapper = ({children, className}:WrapperProps) => (<div className={className}>{children}</div>);

    return(
    <Popover>
        <PopoverTrigger asChild>
            <Button 
             variant={"ghost"}
             className=" flex w-full py-8 my-4 justify-between"
            >
                <Wrapper className="flex items-center gap-2">
                    <Compass/>
                    <div className="flex flex-col">
                        {details.name}
                        <span className="text-muted-foreground font-light">{details.address}</span>
                    </div>
                </Wrapper>
                <ChevronsUpDown size={16} className="text-muted-foreground"/>
            </Button>
        </PopoverTrigger>
        <PopoverContent asChild>
        <Command>
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Search Emoji</CommandItem>
      <CommandItem>Calculator</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem>Profile</CommandItem>
      <CommandItem>Billing</CommandItem>
      <CommandItem>Settings</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
        </PopoverContent>
      </Popover>
    )
    
}
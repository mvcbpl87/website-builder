"use client"
import React, {useEffect, useMemo, useState} from "react";
import { icons } from "@/lib/constant";
import { Sheet, SheetContent, SheetHeader, SheetClose, SheetTrigger, } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,   CommandSeparator,} from "@/components/ui/command"
import { Button } from "../ui/button";
import { ChevronsUpDown, Compass, Menu } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image"
import { SubAccountType, TAgency, TAgencySidebarOption, TSubAccountSidebarOption, TUser } from "@/lib/types";
import { useModal } from "@/providers/modal-provider";
import { UserRole } from "@/lib/enum";


type Props = {
    defaultOpen?: boolean,
    subAccounts: SubAccountType[] | null,
    sidebarOpt: TAgencySidebarOption[] | TSubAccountSidebarOption[] | null,
    sidebarLogo: string,
    details: TAgency  | null,
    user:TUser | null,
    id: string
}

export default function MenuOptions({
    details,
    id,
    sidebarLogo,
    sidebarOpt,
    subAccounts,
    user,
    defaultOpen
}: Props){
    const [isMounted, setIsMounted] = useState(false);
    const modal = useModal();
    useEffect(()=> setIsMounted(true), []);
    const openState = useMemo(
        () => (defaultOpen ? { open: true } : {}),
        [defaultOpen]
      )
    if(!isMounted) return
    return(
    <Sheet modal={false} {...openState}>
    <SheetTrigger asChild className="absolute md:!hidden flex z-[100]">
        <div className=" p-4">
        <Button variant="outline" size={'icon'}><Menu/></Button>
        </div>
    </SheetTrigger>
    <SheetContent 
        side = "left" 
        showX={!defaultOpen}
        className={clsx('bg-background/90 backdrop-blur border-r-[1px] p-6',{
            'hidden md:inline-block z-0 w-[300px]': defaultOpen,
            'inline-block md:hidden z-[100] w-full': !defaultOpen,
        })}
    >
    <div>
        <AspectRatio ratio={16 / 5}>
          <Image 
            src={sidebarLogo} 
            alt="Image" 
            fill className="rounded-md object-contain" 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </AspectRatio>
    </div>
    { details && <AccountManager 
      details={details} 
      defaultOpen={defaultOpen as boolean} 
      sidebarLogo={sidebarLogo}
      user={user}  
      subAccounts={subAccounts}
    />}
    <OptionMenu sidebarOpt={sidebarOpt}/>
    </SheetContent>
    </Sheet>
    )
}

export function AccountManager({
  user, 
  details, 
  defaultOpen,
  sidebarLogo,
  subAccounts
}:{
  user:TUser | null, 
  details:TAgency ,
  defaultOpen:boolean,
  sidebarLogo: string,
  subAccounts: SubAccountType[] | null
}){
  const AccountLink = ({
    linkPath,
    name,
    address,
    source
  }:{
    linkPath:string,
    name:string,
    address:string,
    source:string
  })=>{
    return(
    <Link href={linkPath} className="flex w-full h-full gap-4 cursor-pointer ">
    <div className="relative w-16">
      <Image 
        fill
        src = {source}
        alt = "Agency Logo"
        className="object-contain rounded-md"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      </div>
      <div className="flex flex-col flex-1">{name}
      <span className="text-muted-foreground">{address}</span></div>
    </Link>)
  }
  return(
  <Popover> 
  <PopoverTrigger asChild>
    <Button 
      variant="ghost"
      className="w-full my-4 flex items-center justify-between py-8"
    >
    <div className="flex justify-center items-center gap-2 text-left">
        <Compass/>
        <div className="flex flex-col">
            {details.name}
            <span className="text-muted-foreground">
            {details.address}</span> 
        </div>
    </div>
    <div><ChevronsUpDown size={16} className="text-muted-foreground"/></div>
    </Button>
  </PopoverTrigger>
  <PopoverContent className="z-[200] mt-4" asChild>
    <Command className="rounded-lg ">
      <CommandInput placeholder="Search Accounts..."/>
      <CommandList className="pb-16">
        <CommandEmpty>No results found</CommandEmpty>
        {
        (user?.role == UserRole.AGENCY_OWNER || user?.role == UserRole.AGENCY_ADMIN)
        && (
        <CommandGroup heading = 'Agency' >
          <CommandItem
            className="!bg-transparent cursor-pointer my-2 text-primary border-[1px] 
            border-border p-2 rounded-md hover:!bg-muted transition-all " 
          >
          { defaultOpen ? 
            <AccountLink 
              linkPath={`/agency/${user.id}`}
              source={sidebarLogo}
              name={details?.name as string}
              address={details?.address as string}
            /> : (
            <SheetClose asChild>
              <AccountLink 
                linkPath={`/agency/${user.id}`}
                source={sidebarLogo}
                name={details?.name as string}
                address={details?.address as string}
              />
            </SheetClose> 
          )}
          </CommandItem>
        </CommandGroup>
        )}  
        <CommandGroup heading="subAccounts">
        {subAccounts && subAccounts.map((subAccount)=>{
          return(
          <CommandItem
            key={subAccount.id}
            className="!bg-transparent cursor-pointer my-2 text-primary border-[1px] 
            border-border p-2 rounded-md hover:!bg-muted transition-all " 
          >
          { defaultOpen ? 
            <AccountLink 
              linkPath={`/subaccount/${subAccount.id}`}
              source={sidebarLogo}
              name={subAccount.name}
              address={(subAccount.address as string)}
            /> : (
            <SheetClose asChild>
              <AccountLink 
                linkPath={`/subaccount/${subAccount.id}`}
                source={sidebarLogo}
                name={subAccount.name}
                address={(subAccount.address as string)}
              />
            </SheetClose> 
          )}
          </CommandItem>
          )})}
        </CommandGroup>
      </CommandList>
    </Command>
  </PopoverContent>
  </Popover>)
}

export function OptionMenu({sidebarOpt}:{
  sidebarOpt: TAgencySidebarOption[] | TSubAccountSidebarOption[] | null}){
  return(
  <>
  <div className="text-muted-foreground text-xs mb-2">Menu Links</div>
  <Separator className="mb-4" />
  <nav className="relative ">
  <Command className="rounded-lg overflow-visible ">
    <CommandInput placeholder="Search menu..."/>
    <CommandList className="overflow-visible">
      <CommandEmpty/>
      <CommandGroup className="overflow-visible">
      {sidebarOpt && sidebarOpt.map((option)=>{
        let icon;
        const result = icons.find((icon)=> icon.value === option.icon);
        if(result) icon = <result.path/>
        return(
          <CommandItem 
            key={option.id}
            className=" md:w-[320px] w-full"
          >
            <Link 
            href={(option.link as string)}
            className="flex items-center gap-2 hover:bg-transparent rounded-md transition-all w-full md:w-[320px] "
            >
              {icon}
              <span>{option.name}</span>
            </Link>
          </CommandItem>
        )}
      )}
      </CommandGroup>
    </CommandList>
  </Command>
  </nav>
  </>)
}
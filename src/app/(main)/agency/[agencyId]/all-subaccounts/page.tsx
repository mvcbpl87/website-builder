import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { SubAccountsDummy } from '@/test/dummy'
import Image from 'next/image'
import Link from 'next/link'
import { CreateSubAccountButton } from './_components/create-subAccount'
import { GetSubAccountCredentials } from '@/lib/drizzle/queries/subaccounts'
import { SubAccountType } from '@/lib/types'
import { AvatarTemplate } from '@/components/global/avatar-template'
type Props = {
  params: {agencyId: string}
}
export default async function Page({params}:Props){
  const subAccounts = await GetSubAccountCredentials(params.agencyId) ;
  
  return(
  <div className=' '>
  <AlertDialog>
    <div className='w-full flex gap-4 justify-end mb-4' >
      <CreateSubAccountButton agencyId={params.agencyId} />
    </div>
    <Command className="rounded-lg bg-transparent">
        <CommandInput placeholder='Search Account...'/>
        <CommandList free_height={true}>
            <CommandEmpty>No Results Found.</CommandEmpty>
            <CommandGroup heading="Sub Accounts" >
            { subAccounts && 
              subAccounts.map((account,index)=>(
             <CommandItem
              key={`subaccount-${index+1}`}
              className=" !bg-background my-2 text-muted-foreground/90 border-[1px] border-border py-4 px-7
              rounded-lg hover:!bg-background cursor-pointer transition-all"
             >
                <Link href={`/subaccount/${account.id}`} className="flex gap-4 w-full h-full">
                <div className="relative w-24 h-24 p-2">
                  <div className='w-full h-full rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 flex justify-center items-center text-3xl'>
                    {account.name.slice(0,2).toUpperCase()}
                  </div>
    
                    {/* <Image
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        fill
                        className="rounded-md object-contain bg-muted/50 p-4" 
                        src={(account.subAccountLogo) as string | '/assets/plura-logo.svg'} 
                        alt="accountLogo"/> */}
                </div>
                <div className="flex flex-col justify-between">
                    <div className='flex flex-col justify-center h-full gap-2'>
                        {account.name}
                        <span className="">{account.address}</span>
                    </div>
                </div>
                </Link>
                <AlertDialogTrigger asChild>
                  <Button variant={"destructive"} >
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will delete the
                      subaccount and all data related to the subaccount/
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <Button variant={"destructive"}>Delete</Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
             </CommandItem> )
            )}
             </CommandGroup>
        </CommandList>
    </Command>
  </AlertDialog>
  </div>
  )

}
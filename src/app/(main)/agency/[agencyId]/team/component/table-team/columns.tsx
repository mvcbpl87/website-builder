"use client"
 
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { AlertDialogAction, AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { useModal } from "@/providers/modal-provider";
import { CustomModal } from "@/components/global/custom-modal";
import UserDetails from "@/components/forms/user-details";
import { AvatarTemplate } from "@/components/global/avatar-template";
import { UserRole } from "@/lib/enum";
import { Badge } from "@/components/ui/badge";
import { testAgency, testSubAccount } from "@/test/dummy/type";
import { cn } from "@/lib/utils";
import { TUser } from "@/lib/types";

export type Data = {
  id:string,
  name: string,
  avatarUrl: string,
  email: string,
  role:string,
  agency:{id:string, subAccounts:testSubAccount},
  permissions:boolean
}
export const columns: ColumnDef<TUser>[] = [
  {
    accessorKey: "id",
    header: "",
    cell: () => {
      return null
    },
  },
  {
    accessorKey:'name',
    header:'Name',
    cell:({row}) =>{
      const avatarUrl = row.getValue('avatarUrl') as string;
      const name = row.getValue('name') as string;
      return(
      <div className="flex items-center gap-4">
        <div className="h-8 w-8 flex items-center">
          <AvatarTemplate source={avatarUrl} name={name}/>
        </div>
       
        <span>{name}</span>
      </div>
      )
    }
  },
  {
    accessorKey: 'avatarUrl',
    header: '',
    cell: () => {
      return null
    },
  },
  { accessorKey: 'email', header: 'Email' },
  {
    accessorKey: 'SubAccount',
    header:'Owned Accounts',
    cell: ({row}) =>{
      const isAgencyOwner = row.getValue('role') == UserRole.AGENCY_OWNER;
      if(isAgencyOwner) return <Badge className="whitespace-nowrap">Agency - {row.original?.name}</Badge>
      return(<div className="text-muted-foreground/80">No access</div>)
    }
  },
  {
    accessorKey:'role',
    header:'Role',
    cell:({row}) =>{
      const role = row.getValue('role') as string;
      return (
      <Badge className={cn('whitespace-nowrap',{
        'bg-emerald-500':role == UserRole.AGENCY_OWNER,
        'bg-orange-400': role === UserRole.AGENCY_ADMIN,
        'bg-purple-500': role === UserRole.SUBACCOUNT_USER,
        'bg-muted': role === UserRole.SUBACCOUNT_GUEST
      })}>
        {role}
      </Badge>)
    }
  },
  {
    id:"actions",
    cell:({ row }) =>{
      const payment = row.original;
      return ( <CellActions/>)
    }
  }
]


function CellActions({rowData}:{rowData?:Data}){
 const {toast} = useToast();
 const modal = useModal();
 return(
 <AlertDialog>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
    <Button variant={"ghost"}><span className="sr-only">Open menu</span>&nbsp;<MoreHorizontal className="h-4 w-4"/></Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem
        onClick={()=>navigator.clipboard.writeText('email')}
      >
        <Copy size={15}/>&nbsp;Copy Email
      </DropdownMenuItem>
      <DropdownMenuSeparator/>
      <DropdownMenuItem
        onClick={()=>{
          modal.setOpen
          (<CustomModal
            title = "Edit User Details"
            subheading="You can change permissions only when the user has an owned subaccount">
            <UserDetails/>
            </CustomModal>
          )
      }}
      >
        <Edit size={15}/>&nbsp;Edit Details
      </DropdownMenuItem>
      <AlertDialogTrigger>
        <DropdownMenuItem>
          <Trash size={15}/>&nbsp;Remove User
        </DropdownMenuItem>
      </AlertDialogTrigger>
    </DropdownMenuContent>
  </DropdownMenu>
  <AlertDialogContent className="absolute flex flex-col justify-center items-center bg-background/90 border-border border-[1px] p-5">
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete the user
        and related data.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction 
       onClick={()=>{
          toast({
            title:'Deleted User',
            description: 
            'The user has been deleted from this agency they no longer have access to the agency'
          })
        }
        }>
        Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
 </AlertDialog>
 )
}
"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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
  } from '@/components/ui/alert-dialog';
import { Copy, MoreHorizontal, Trash } from 'lucide-react';
import Image from 'next/image';
import { testMedia } from '@/test/dummy/type';

type Props = { file: testMedia}

export default function MediaCard({file}:Props){
 const handleCopy = ()=> navigator.clipboard.writeText(file.link)
 return(
 <AlertDialog>
 <DropdownMenu>
    <article className="border w-full rounded-lg bg-background/50">
        <div className="relative w-full h-40">
        <Image
              src={file.link}
              alt="preview image"
              fill
              className="object-cover rounded-lg"
        />
        </div>
        {/* <span className=''>{file.name}</span> */}
        <div className='p-4 relative flex items-center justify-between'>
         <div className='flex flex-col'>
            <span className="text-muted-foreground">{file.createdAt.toDateString()}</span>
            <span>{file.name}</span>
         </div>
        
   
        <DropdownMenuTrigger>
        <MoreHorizontal/>
        </DropdownMenuTrigger>
  
        </div>
        <DropdownMenuContent>
            <DropdownMenuLabel>Menu</DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuItem
             onClick={handleCopy}
            >
             <Copy size ={15}/>&nbsp;Copy Image Link
            </DropdownMenuItem>
            <AlertDialogTrigger asChild>
             <DropdownMenuItem>
                <Trash size={15}/>&nbsp;Delete File
             </DropdownMenuItem>
            </AlertDialogTrigger>
        </DropdownMenuContent>
    </article>
 </DropdownMenu>
 <AlertDialogContent>
    <AlertDialogHeader>
     <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
     <AlertDialogDescription>
        Are you sure you want to delete this file? All subaccount using this
        file will no longer have access to it!
     </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
     <AlertDialogCancel>Cancel</AlertDialogCancel>
     <AlertDialogAction>Delete</AlertDialogAction>
    </AlertDialogFooter>
 </AlertDialogContent>
 </AlertDialog>
 )
}
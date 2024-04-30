"use client"
import { Button } from '../ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from '../ui/command';
import { FolderSearch } from "lucide-react";
import { mediaDummy } from '@/test/dummy';
import { testMedia } from '@/test/dummy/type';
import MediaCard from './media-card';
import { useModal } from '@/providers/modal-provider';
import UploadMediaForm from '../forms/upload-media';
import { CustomModal } from '../global/custom-modal';

export default function MediaComponent(){
 const data:testMedia[] = mediaDummy;
 const modal = useModal()
 const handleUpload = ()=>{
    modal.setOpen(
    <CustomModal
    title="Upload Media"
    subheading="Upload a file to your media bucket"
    >
      <UploadMediaForm/>
    </CustomModal>
    )
 }
 return(
 <div className=''>
    <div className='flex items-center justify-between py-[2rem]'>
        <h1 className='text-4xl'>Media Bucket</h1>
        <Button size={'sm'} onClick={handleUpload}>Upload</Button>
    </div>
    <Command className='bg-transparent'>
     <CommandInput placeholder='Search for file name...'/>
     <CommandList free_height={true}>
        <CommandEmpty>No Media Files</CommandEmpty>
        <CommandGroup heading = "Media Files">
         <div className="flex flex-wrap gap-4 pt-4">
         { data.length <= 0 && (
           <div className='flex flex-col items-center w-full'>
             <FolderSearch size={200}
                 className="dark:text-muted text-slate-300"/>
             <span className="text-muted-foreground ">Empty! No files to show.</span>
           </div>)
         }
         { data.map((file,index)=>(
             <CommandItem 
              key = {`media-${index+1}`}
              className="p-0 max-w-[300px] w-full rounded-lg !bg-transparent !font-medium !text-white"
              >
              <MediaCard file={file}/>
             </CommandItem>
         ))
 
         }
        </div>
        </CommandGroup>
     </CommandList>
    </Command>
 </div>
 )
}
"use client"
import CreatePipelineForm from '@/components/forms/create-pipeline-form'
import { CustomModal } from '@/components/global/custom-modal'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { useModal } from '@/providers/modal-provider'
import { Check, ChevronsUpDown, Plus } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

type Props = {
    subAccountId?: string
    pipelines?: any[]
    pipelineId?: string
}

export default function PipelineInfoBar({
    pipelineId,
    subAccountId, 
    pipelines
}: Props){
 const [currentId, setCurrentId] = useState(pipelineId)
 const modal = useModal();
 const handleClickCreatePipeline = ()=>{
    modal.setOpen(
    <CustomModal
     title="Create A Pipeline"
     subheading="Pipelines allows you to group tickets into lanes and track your business processes all in one place."
    >
     <CreatePipelineForm/>
    </CustomModal>
    )
 }

 return(
 <Popover>
  <PopoverTrigger asChild>
    <Button
     className='bg-background/90'
     variant="outline"
     role="combobox" 
     >
        Select a pipeline
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
    </Button>
  </PopoverTrigger>
  <PopoverContent>
    <Command>
    <CommandList free_height={true} >
      <CommandEmpty>No pipelines found.</CommandEmpty>
      <CommandGroup >
        {/* WIP */}
        <Link href={'#'}>
         <CommandItem>
            <Check
             className={cn('h-4 w-4',currentId=== pipelineId ? 'opacity-100' : 'opacity-0')}
            /> &nbsp;
            Pipeline Name
         </CommandItem>
        </Link>
        <Button
         size ="sm"
         variant = "secondary"
         className='flex gap-2 items-center w-full mt-4'
         onClick={handleClickCreatePipeline}
        >
         <Plus size={15}/>&nbsp;Create Pipeline
        </Button>
      </CommandGroup>
    </CommandList>
    </Command>
  </PopoverContent>
 </Popover>
 )
 
}
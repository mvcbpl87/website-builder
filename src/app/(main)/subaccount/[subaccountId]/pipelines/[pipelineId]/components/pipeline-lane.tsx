"use client"
import { cn } from '@/lib/utils'
import { CustomModal } from '@/components/global/custom-modal'
import { Draggable, Droppable } from 'react-beautiful-dnd'
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
import { Badge } from '@/components/ui/badge'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import TicketForm from '@/components/forms/ticket-form'
import { useModal } from '@/providers/modal-provider'
import { useMemo } from 'react'
import LaneForm from '@/components/forms/lane-form'
import { Edit, MoreVertical, PlusCircle, Trash } from 'lucide-react'
import PipelineTicket from './pipeline-ticket'
type Props = {
    index:number,
    id:string,
    tickets: string[]
}
export default function PipelineLane({index, id, tickets}:Props){
 const modal = useModal();
 const amt = new Intl.NumberFormat(undefined, { style: 'currency',currency:'USD'});
 
 //WIP
//  const laneAmt = useMemo((tickets:any)=>{
//     return tickets.reduce( 
//         (sum,ticket) => sum + (Number(ticket?.value)|| 0), 0
//     )
//  },[tickets])
 const randomColor = `#${Math.random().toString(16).slice(2, 8)}`;
 const handleCreateTicket = ()=>{
    modal.setOpen(
     <CustomModal
      title="Create A Ticket"
      subheading="Tickets are a great way to keep track of tasks"
     >
      <TicketForm/>
     </CustomModal>
    )
 }
 
 const handleEditLane = () =>{
    modal.setOpen(
    <CustomModal
      title="Edit Lane Details"
      subheading=""
     >
      <LaneForm/>
     </CustomModal>
    )
 }
 return(
 <Draggable
  draggableId={id}
  index = {index}
  key = {id}
 >
 { (provided, snapshot) =>{
    if(snapshot.isDragging){
     //@ts-ignore
     const offset = { x: 300, y: 100 }
     //@ts-ignore
     const x = provided.draggableProps.style?.left - offset.x
     //@ts-ignore
     const y = provided.draggableProps.style?.top - offset.y
     console.log(x, y)
     //@ts-ignore
     provided.draggableProps.style = {
       ...provided.draggableProps.style,
       top: y,
       left: x,
     }
    }
    return(
    <div 
    {...provided.draggableProps}
     ref = {provided.innerRef}
     className=' '
    >
     <AlertDialog>
       <DropdownMenu>
        <div className="bg-slate-200/30 dark:bg-background/20 h-[700px] w-[300px] px-2 relative rounded-lg overflow-visible flex-shrink-0 ">
         <div 
          {...provided.dragHandleProps}
          className=" h-14 backdrop-blur-lg dark:bg-background/40  bg-slate-200/60  "
         >
           <div className="h-full flex items-center p-4 justify-between cursor-grab border-b-[1px] ">
             <div className="flex items-center w-full gap-2">
               <div
                 className={cn('w-4 h-4 rounded-full')}
                 style={{ background: randomColor }}
               />
               <span className="font-bold text-sm">{id}</span>
             </div>
             <div className="flex items-center flex-row">
               <Badge className="bg-white text-black">
                 {amt.format(0)}
               </Badge>
               <DropdownMenuTrigger>
                 <MoreVertical className="text-muted-foreground cursor-pointer" />
               </DropdownMenuTrigger>
             </div>
           </div> {/* End Header */}
        
         <Droppable
             droppableId={id}
             key={id}
             type="ticket"
         >
         {(provided) =>(
          <div className="max-h-[700px] overflow-auto pt-6 ">
            <div
             {...provided.droppableProps}
             ref={provided.innerRef}
             className="mt-2"
            >
             {tickets.map( (ticket,index) =>(
                <PipelineTicket 
                 key = {`ticket-${index}`}
                 index={index} 
                 ticketId={`${ticket}-${id}`}/>
             ))
             }
             {provided.placeholder}
            </div>
          </div>
         )}
         </Droppable>
         
         </div>
        </div>
        <DropdownMenuContent>
         <DropdownMenuLabel>Options</DropdownMenuLabel>
         <DropdownMenuSeparator/>
         <AlertDialogTrigger asChild>
            <DropdownMenuItem className="flex items-center gap-2">
                <Trash size={15}/>&nbsp;Delete
            </DropdownMenuItem>
         </AlertDialogTrigger>
         <DropdownMenuItem 
          onClick={handleEditLane}
          className="flex items-center gap-2">
            <Edit size ={15}/>&nbsp;Edit Lane
         </DropdownMenuItem>
         <DropdownMenuItem 
          onClick = {handleCreateTicket}
          className="flex items-center gap-2">
            <PlusCircle size ={15}/>&nbsp;Create Ticket
         </DropdownMenuItem>
        </DropdownMenuContent>
       </DropdownMenu>
       <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete
            your account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-center">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive">Continue</AlertDialogAction>
        </AlertDialogFooter>
       </AlertDialogContent>
     </AlertDialog>
    </div>)
   }
 }
 </Draggable>
 )
}
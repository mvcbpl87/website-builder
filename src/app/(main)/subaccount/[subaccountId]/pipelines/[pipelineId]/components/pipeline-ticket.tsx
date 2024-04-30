import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card'
import { useModal } from '@/providers/modal-provider'
import { Draggable } from 'react-beautiful-dnd'
import { CustomModal } from '@/components/global/custom-modal'
import TicketForm from '@/components/forms/ticket-form'
import { Button } from '@/components/ui/button'
import { Contact2, Edit, MoreHorizontal, Trash } from 'lucide-react'
import LinkIcon from '@/components/icons/link'
import { AvatarTemplate } from '@/components/global/avatar-template'
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

type Props = {
    ticketId:string,
    index:number
}
export default function PipelineTicket({ticketId,index}:Props){
 const modal = useModal();
 const amt = new Intl.NumberFormat(undefined, { style: 'currency',currency:'USD'});
 const handleEdit = () =>{
    modal.setOpen(
     <CustomModal
       title="Edit Lane Details"
       subheading=""
      >
       <TicketForm/>
      </CustomModal>
     )   
 }
 const handleDeleteTicket = () =>{}
 return(
 <Draggable
  draggableId={ticketId}
  index={index}
  key={ticketId}
 >
 { (provided, snapshot) =>{
   if (snapshot.isDragging) {
     const offset = { x: 200, y: 100 }
     //@ts-ignore
     const x = provided.draggableProps.style?.left - offset.x
     //@ts-ignore
     const y = provided.draggableProps.style?.top - offset.y
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
     {...provided.dragHandleProps}
     ref={provided.innerRef}
    >
     <AlertDialog>
      <DropdownMenu>
        <Card className="my-4 dark:bg-background/90 bg-white shadow-none transition-all">
          <CardHeader className="p-[8px]">
            <CardTitle className="flex items-center justify-between">
             <span className="text-lg w-full flex-wrap">Ticket Name-{ticketId}</span>
             <DropdownMenuTrigger asChild>
              <Button variant={"ghost"}><MoreHorizontal className="text-muted-foreground"/></Button>
             </DropdownMenuTrigger>
            </CardTitle>
            <span className="text-muted-foreground text-xs">
                {new Date().toLocaleDateString()}
            </span>
            {/* WIP - Tag */}
            <CardDescription className="w-full ">This is ticket description</CardDescription>
            <HoverCard>
             <HoverCardTrigger asChild>
                <div className="p-2 text-muted-foreground flex justify-center gap-2 hover:bg-muted transition-all rounded-lg cursor-pointer items-center">
                    <LinkIcon/>
                    <span className="text-xs font-bold">Contact</span>
                </div>
             </HoverCardTrigger>
             <HoverCardContent
              side="bottom"
              className="z-[300] w-fit flex justify-between items-center space-x-4"
             >
                <AvatarTemplate source='/' name="TicketName"/>
                <div className="space-y-1">
                 <h4 className="text-sm font-semibold">customer name</h4>
                 <span className="text-sm text-muted-foreground">customer email</span>
                 <div className="flex items-center pt-2">
                    <Contact2 className="mr-2 h-4 w-4 opacity-70"/>
                    <span className="text-xs text-muted-foreground">Joined&nbsp;{new Date().toLocaleDateString()}</span>
                 </div>
                </div>
             </HoverCardContent>
            </HoverCard>
          </CardHeader>
          <CardFooter className="m-0 p-2 border-t-[1px] border-muted-foreground/20 flex items-center justify-between">
            <div className="flex item-center gap-2">
                <AvatarTemplate source="/" name="Assigned To"/>
                <div className="flex flex-col justify-center">
                    <span className="text-sm text-muted-foreground">Assigned to</span>
                    <span className="text-xs w-28  overflow-ellipsis overflow-hidden whitespace-nowrap text-muted-foreground">team member</span>
                </div>
            </div>
            <span className="text-sm font-bold">
                {amt.format(10)}
            </span>
          </CardFooter>
        </Card>
        <DropdownMenuContent>
         <DropdownMenuLabel>Options</DropdownMenuLabel>
         <DropdownMenuSeparator/>
         <AlertDialogTrigger>
            <DropdownMenuItem className="flex items-center gap-2">
                <Trash size={15}/>&nbsp;Delete Ticket
            </DropdownMenuItem>
         </AlertDialogTrigger>
         <DropdownMenuItem 
          onClick={handleEdit}
          className="flex items-center gap-2">
            <Edit size ={15}/>&nbsp;Edit Ticket
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
          <AlertDialogAction onClick={handleDeleteTicket} className="bg-destructive">Delete</AlertDialogAction>
        </AlertDialogFooter>
       </AlertDialogContent>
     </AlertDialog>
    </div>
   )
  }

 }

 </Draggable>
 )
}
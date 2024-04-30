'use client'
import { Button } from '@/components/ui/button'
import { CustomModal } from '@/components/global/custom-modal'
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd'
import { Flag, Plus } from 'lucide-react'
import { useModal } from '@/providers/modal-provider'
import { useEffect, useState } from 'react'
import LaneForm from '@/components/forms/lane-form'
import PipelineLane from './pipeline-lane'
import { StrictModeDroppable } from './test-draggable'

export default function PipelineView(){
 const modal = useModal();
 const [allTickets, setAllTickets] = useState<string[]>([]); 
 const [allLanes, setAllLanes] = useState<any[]>([]);
 useEffect(()=> {
    setAllLanes(prev => prev =['lane-1', 'lane-2','lane-3'])
    setAllTickets(prev => prev = ['ticket-1', 'ticket-2'])
}, [])
 const handleAddLane = ()=>{
  modal.setOpen(
    <CustomModal
     title=" Create A Lane"
     subheading="Lanes allow you to group tickets"
    >
     <LaneForm/>
    </CustomModal>
  ) 
 };
 const onDragEnd = (dropResult: DropResult) =>{
    console.log('test',dropResult)
    const { destination, source, type } = dropResult
    if (
        !destination ||
        (destination.droppableId === source.droppableId &&
          destination.index === source.index)
      ) {
        return
      }
    if(type == 'lane'){
        const newLanes = [...allLanes]
          .toSpliced(source.index, 1)
          .toSpliced(destination.index, 0, allLanes[source.index])
        //   .map((lane, idx) => {
        //     return { ...lane, order: idx }
        //   })
        // console.log(newLanes)
        setAllLanes(newLanes)
    }
 }
 return(
 <DragDropContext onDragEnd={onDragEnd}>
  <div className="bg-white/60 dark:bg-background/80 backdrop-blur rounded-xl p-4 use-automation-zoom-in">
    <div className='flex items-center justify-between'>
        <h1 className="text-2xl">Pipeline name</h1>
        <Button><Plus size={15}/>&nbsp;Create Lane</Button>
    </div>
    <Droppable
     droppableId='lanes'
     type="lane"
     direction='horizontal'
     key = "lanes"
    >
    { (provided) =>(
      <div
       {...provided.droppableProps}
       ref = {provided.innerRef}
       className='flex item-center gap-x-2 overflow-auto'
      >
        <div className='flex mt-4'>
       
        { allLanes.map((lane,index)=>(
          <PipelineLane key = {lane} index={index} id={lane} tickets={allTickets}/>)
        )}
        {provided.placeholder}
        </div>
        
      </div>
    )}
    </Droppable>
  </div>
 </DragDropContext>
 )
}
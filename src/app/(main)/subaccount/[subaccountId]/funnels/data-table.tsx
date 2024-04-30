'use client'
import React from 'react'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { Plus, Search } from 'lucide-react'
  
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { useModal } from '@/providers/modal-provider'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CustomModal } from '@/components/global/custom-modal'

interface FunnelDataTableProps<TData, TValue>{
 columns: ColumnDef<TData, TValue>[]
 data: TData[]
 actionButtonText?: React.ReactNode
 modalChildren?: React.ReactNode
}

export default function FunnelsDataTable<TData,TValue>({
    columns,
    data,
    modalChildren,
    actionButtonText
}:FunnelDataTableProps<TData, TValue>){
 const { isOpen, setOpen, setClose } = useModal() 
 const table = useReactTable({
   data,
   columns,
   getCoreRowModel: getCoreRowModel(),
   getFilteredRowModel: getFilteredRowModel(),
 })
 const handleClick = ()=>{
  if(!modalChildren) return;
   setOpen
    (<CustomModal
        title="Create A Funnel"
        subheading="Funnels are a like websites, but better! Try creating one!">
       {modalChildren}
    </CustomModal>)
}
 return(
 <div className=" ">
  <div className="flex  items-center py-4">
   <div className="flex items-center gap-2 w-full ">
     <Search size={18}/>
     <Input 
     placeholder="Search team..."
     className="max-w-sm bg-background/90"/>
   </div>
   <Button onClick={handleClick} >
    {actionButtonText}
   </Button>
  </div>
  <div className=" border bg-background/80 rounded-lg">
  <Table>
    <TableHeader>
    { table.getHeaderGroups().map( (headerGroup) =>(
       <TableRow key={headerGroup.id}>
       { headerGroup.headers.map((header)=>{
          return(
           <TableHead key = {header.id}>
              { header.isPlaceholder
                ? null
                : flexRender(
                  header.column.columnDef.header,
                  header.getContext() )
              }
           </TableHead>
         )}
       )}
       </TableRow>)
    )}
    </TableHeader>
    <TableBody>
    { table.getRowModel().rows.length ? (
      table.getRowModel().rows.map((row) =>(
        <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
         { row.getVisibleCells().map((cell) =>(
            <TableCell key = {cell.id}>
             {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
            ))

         }
        </TableRow>)
       )
      ) : (
        <TableRow>
         <TableCell 
          colSpan={columns.length}
          className='h-24 text-center'
         >
             No Results.
         </TableCell>
        </TableRow>)
    }
    </TableBody>
  </Table>
  </div>
 </div>
 )
}
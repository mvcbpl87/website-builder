"use client"
import { Plus, Search } from "lucide-react"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { AddTeamFunnel } from "../add-team"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
 columns,
 data,
}:DataTableProps<TData,TValue>){

 const table = useReactTable({
    data,
    columns,
    getCoreRowModel:getCoreRowModel(),
 })
 return(
 <div>
 <div className=" flex  items-center py-4">
    <div className=" flex items-center gap-2 w-full ">
        <Search size={18}/>
        <Input 
        placeholder="Search team..."
        className="max-w-sm bg-background/90"/>
    </div>
    <AddTeamFunnel/>
</div>
 <div className="rounded-md border bg-background/90">
 <Table>
    <TableHeader>
        {table.getHeaderGroups().map((headerGroup)=>(
         <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header)=>(
            <TableHead key={header.id}>
                {header.isPlaceholder 
                 ? null:
                 flexRender(
                    header.column.columnDef.header, 
                    header.getContext()) 
                }
          </TableHead>)
          )}
         </TableRow>)
         )}
    </TableHeader>
    <TableBody>
        {table.getRowModel().rows?.length 
         ? ( table.getRowModel().rows.map((row)=>(
            <TableRow key={row.id}
             data-state = {row.getIsSelected() && "selected"}
            >
            {row.getVisibleCells().map( (cell)=>(
                <TableCell key={cell.id}>
                    {flexRender(
                        cell.column.columnDef.cell, 
                        cell.getContext())}
                </TableCell>
            ))
            }
            </TableRow>
         ))
         ) : (
            <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                    No Results.
                </TableCell>
            </TableRow>
         )

        }
    </TableBody>
 </Table>
 </div>
 </div>
 )
}
'use client'
import { Badge } from '@/components/ui/badge'
import { testClassName, testFunnel, testFunnelPage } from '@/test/dummy/type'
import { ColumnDef } from '@tanstack/react-table'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'

type FunnelsForSubAccount = {
    funnels: testFunnel
    className:testClassName
    funnelPage: testFunnelPage
}

export const columns: ColumnDef<FunnelsForSubAccount>[]= [
 {
    accessorKey: 'name',
    header: 'Name',
    cell:({row}) =>{
     const {id, subAccountId} = row.original.funnels
     return(
        <Link
         className='flex gap-2 items-center'
         href={`/subaccount/${subAccountId}/funnels/${id}`}
        >
         {row.getValue('name')}&nbsp;<ExternalLink size={15}/> 
        </Link>
     )
    }  
 },
 {
    accessorKey:'updatedAt',
    header:'Last Updated',
    cell: ({row}) =>{
        const {updatedAt} = row.original.funnels
        const date= `${updatedAt.toDateString()} ${updatedAt.toLocaleTimeString()}`;
        return <span className="text-muted-foreground">{date}</span>
    }
 },
 {
    accessorKey: 'published',
    header: 'Status',
    cell: ({ row }) => {
        const status = row.original.funnels.published
        return status?(
            <Badge variant={'default'}>live-{row.original.funnels.subDomainName}</Badge>
        ): (
            <Badge variant={'secondary'}>Draft</Badge>
        )
    }
 }
]
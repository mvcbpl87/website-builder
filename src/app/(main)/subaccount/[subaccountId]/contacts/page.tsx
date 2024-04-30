'use client'
import ContactUserForm from '@/components/forms/contact-user-form';
import { AvatarTemplate } from '@/components/global/avatar-template';
import { CustomModal } from '@/components/global/custom-modal';
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useModal } from '@/providers/modal-provider';

type Props = {
    params: { subaccountId: string }
}

export default function ContactPage(){
 const modal = useModal();
 const addContact = ()=>{
    modal.setOpen(
    <CustomModal
     title="Create Or Update Contact information"
     subheading="Contacts are like customers."
    >
    <ContactUserForm/>
    </CustomModal>
    )
 }
 return(
 <div>
    <div className=' flex items-center justify-between'>
        <h1 className="text-4xl p-4">Contacts</h1>
        <Button  onClick={addContact}>Create Contact</Button>
    </div>
  <Table>
    <TableHeader>
     <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Active</TableHead>
      <TableHead>Created Date</TableHead>
      <TableHead className="text-right">Total Value</TableHead>
     </TableRow>
    </TableHeader>
    <TableBody>
    <ContactData/>
    </TableBody>
  </Table>
 </div>   
 )
}

function ContactData(){
 return(
 <TableRow>
  <TableCell className='flex items-center space-x-2'>
    <AvatarTemplate source='/' name="Name Here"/>
    <span>Contact name</span>
  </TableCell>
  <TableCell>Contact email</TableCell>
  <TableCell><Badge className='bg-emerald-700'>Active</Badge></TableCell>
  <TableCell>{new Date().toDateString()}</TableCell>
  <TableCell className="text-right">$100</TableCell>
 </TableRow>
 )
}
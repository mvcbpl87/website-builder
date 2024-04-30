'use client'
import { Button } from "@/components/ui/button"
import { PlusCircleIcon } from "lucide-react"
import { useModal } from "@/providers/modal-provider"
import { CustomModal } from "@/components/global/custom-modal"
import SubAccountDetails from "@/components/forms/subaccount-details"
export function CreateSubAccountButton({agencyId}:{agencyId:string}){
 const modal = useModal();
 const handleClick = async()=>{
    modal.setOpen(
    <CustomModal
     title="Create a Subaccount"
     subheading="You can switch between"
    >
      <SubAccountDetails agencyId={agencyId}/>
      {/* <SendInvitation/> */}
    </CustomModal>  
    )
 }
 return(
 <Button 
     onClick={handleClick}
     className='flex items-center gap-2'>
       <PlusCircleIcon size={15}/>
       Create Sub Account
   </Button>
 )
}
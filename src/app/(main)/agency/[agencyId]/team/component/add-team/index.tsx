import { Button } from "@/components/ui/button"
import { CustomModal } from "@/components/global/custom-modal"
import { useModal } from "@/providers/modal-provider"
import SendInvitation from "@/components/forms/send-invitation"
import { Plus } from "lucide-react"
export function AddTeamFunnel(){
    const modal = useModal()
    return(
    <Button size={'sm'}
     onClick={()=>{
        modal.setOpen
        (<CustomModal
          title = "Add a Team Member"
          subheading="Send an invitation">
         <SendInvitation/>
          </CustomModal>
        )
    }}
    ><Plus size={15}/>&nbsp;Add&nbsp;Member
    </Button>
    )
}
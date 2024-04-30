import { Plus } from "lucide-react";
import FunnelsDataTable from "./data-table";
import UserDetails from "@/components/forms/user-details";
import { columns } from "./columns";
import { funnelSubAccountDummy } from "@/test/dummy";
export default function FunnelsPage(){
 return(
 <FunnelsDataTable
  actionButtonText={
     <>
       <Plus size={15} />
       Create Funnel
     </>
   }
   modalChildren = {
    <UserDetails/>
   }
   columns={columns}
   data = {funnelSubAccountDummy}
 />
 )
}
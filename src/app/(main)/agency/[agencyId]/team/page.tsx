import { GetTeamMembersAccess } from "@/lib/drizzle/queries";
import { columns } from "./component/table-team/columns"
import { DataTable } from "./component/table-team/data-table"
import SendInvitation from "@/components/forms/send-invitation";
import { UserTeamDummy } from "@/test/dummy";

type Props = {
  params: {agencyId: string}
}
export default async function TeamPage({params}:Props){
  const test = await GetTeamMembersAccess(params.agencyId)

 return(
 <div className=" ">
    <DataTable columns={columns} data={test.allUsers}/>
 </div>
 )
}


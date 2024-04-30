import { TAgency, TUser, WrapperProps } from "@/lib/types";
import { AgencyDetails } from "@/components/forms/agency-details";
import UserDetails from "@/components/forms/user-details";
import { GetAgencyCredentials, GetUserCredentials } from "@/lib/drizzle/queries";

type Props = {
    params: {agencyId: string}
}
export default async function SettingPage({params}:Props){
    let agencyCredentials;
    let userDetails;
    if(params.agencyId){
        agencyCredentials = await GetAgencyCredentials(params.agencyId) as TAgency;
        userDetails = await GetUserCredentials(params.agencyId) as TUser;
    }
    
    return (
    <div className="overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        <AgencyDetails agencyId={params.agencyId} data={agencyCredentials}/>
        <UserDetails userData={userDetails} agencyId={params.agencyId}/>
    </div>
    )
}
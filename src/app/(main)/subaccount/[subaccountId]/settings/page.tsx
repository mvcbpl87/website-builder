import SubAccountDetails from "@/components/forms/subaccount-details";
import UserDetails from "@/components/forms/user-details";
import { GetUserCredentials } from "@/lib/drizzle/queries";
import { GetCurrentSubAccount, GetSubAccountCredentials } from "@/lib/drizzle/queries/subaccounts";
import { SubAccountType, TUser } from "@/lib/types";
type Props = {
    params?: {subaccountId: string}
}
export default async function SettingsPage({params}:Props){

    const currentSubAccount = await GetCurrentSubAccount(params?.subaccountId as string) as SubAccountType;
    const agencyId = currentSubAccount.agencyId as string;
    const userDetails = await GetUserCredentials(agencyId) as TUser;

    return (
    <div className="overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        <SubAccountDetails 
         agencyId={agencyId} 
         subAccountDetails={currentSubAccount}
        />
        <UserDetails
         agencyId={agencyId}
         userData={userDetails}
        />
    </div>
    )
}
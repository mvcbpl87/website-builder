'use server'
import { AgencyCredentials } from "@/components/forms/agency-details";
import { db } from "../db"
import { Agency,AgencySidebarOption, SubAccountSidebarOption, User, SubAccount } from "../schema"
import { eq, sql } from "drizzle-orm"
import { getClerkAuth } from "@/server-actions/auth";
import { UserRole } from "@/lib/enum";
import { UserCredentialsFormType } from "@/components/forms/user-details";

export async function GetUserCredentials(agencyId:string){
    const data = await db.select().from(User).where(sql`${User.agencyId} = ${agencyId}`);
    if(data.length<=0) return null;
    return data[0];
}

export async function GetAgencyCredentials(agencyId:string){
    const data = await db.select().from(Agency).where(sql`${Agency.id} = ${agencyId}`);
    if(data.length<=0) return null;
    return data[0];
}
export async function GetSubAccountCredentials(agencyId:string){
    const data = await db.select().from(SubAccount).where(sql`${SubAccount.agencyId} = ${agencyId}`);
    if(data.length<=0) return null;
    return data;
}
export async function GetSideBarOptions(Id:string, type:string){
    if(type == 'agency'){
        const data = await db.select().from(AgencySidebarOption).where(sql`${AgencySidebarOption.agencyId} = ${Id}`);
        if(data.length<=0) return null;
        return data;
    }
    if(type == 'subaccount'){
        const data = await db.select().from(SubAccountSidebarOption).where(sql`${SubAccountSidebarOption.subAccountId} = ${Id}`);
        if(data.length<=0) return null;
        return data;
    }
}

export async function GetTeamMembersAccess(agencyId:string){
    // const data = await db.select().from(User).where(sql`${User.agencyId} = ${agencyId}`);

    // if(data.length<=0) return null;
    const allUsers = await db.query.User.findMany({
        where:eq(User.agencyId, agencyId),
        with:{ Permissions: true},
    })
    const allSubAccounts = await db.query.SubAccount.findMany({
        where:eq(SubAccount.agencyId, agencyId),
        with:{ Permissions: true}
    })

    return {allUsers, allSubAccounts}
}

export async function InternalUserVerification(emailAddress:string){
    const data = await db.select().from(User).where(sql`${User.email} = ${emailAddress}`);
    if(data.length<=0) return null;
    return data[0];
}

export async function InsertAgencyCredentials(values:AgencyCredentials){
 try{
    // 1. Create Agency Credentials
    const data = await db.insert(Agency).values({
        name:values.name,
        companyEmail:values.companyEmail,
        companyPhone:values.companyPhone,
        whiteLabel:values.whiteLabel,
        address:values.address,
        state:values.state,
        city:values.city,
        zipCode:values.zipCode,
        country:values.country,
        agencyLogo:values.agencyLogo
    }).returning({id:Agency.id});
    console.log('from InsertAgency Credential', data)
    if(data.length<=0) throw new Error('Error insert agency credentials')

    // 2. Create AgencySidebarOptions for accessiblity
    const _callSidebars = await CreateAgencySideBarOptions(data[0].id);
    if(!_callSidebars) throw new Error('Error creating accessibilities: Agency Sidebar Options')
    
    // 3. Create User Credentials (First Time User)
    const _callback = await InsertUserCredentials(data[0].id);
    if(!_callback) throw new Error('Error creating user credentials');

    return true; //if success update all databases
 }catch(err){
    console.log('Error from InsertAgencyCredentials', err);
    return null;
 }
}

export async function UpdateAgencyCredentials(agencyId:string, values:AgencyCredentials){
    const _feedback = await db.update(Agency)
    .set({
        name:values.name,
        companyEmail:values.companyEmail,
        companyPhone:values.companyPhone,
        whiteLabel:values.whiteLabel,
        address:values.address,
        state:values.state,
        city:values.city,
        zipCode:values.zipCode,
        country:values.country,
        agencyLogo:values.agencyLogo,
        updatedAt:`${new Date().toDateString()}`
    })
    .where(eq(Agency.id, agencyId))
    .returning({id:Agency.id});
    if(_feedback.length <=0) return null;
    return true;
}

export async function InsertUserCredentials(agencyId:string){
    const user = await getClerkAuth();
    if(!user) return null;
    const _constant = {
        name:( user.fullName || user.username || user.emailAddresses[0].emailAddress) as string,
        avatarUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
        role: UserRole.AGENCY_OWNER,
        agencyId
    }
    const data = await db.insert(User).values({
       ..._constant
    
    }).returning({id:User.id});

    if(data.length<=0) return null;
    return data[0].id;
}

export async function UpdateUserCredentials(agencyId:string, values:UserCredentialsFormType){
    const userId = await GetUserCredentials(agencyId);
    if(userId){
        const _feedback = await db.update(User)
        .set({
            name:values.userName,
            email: values.userEmail,
            avatarUrl: values.userAvatarUrl,
            role: values.role,
            updatedAt:`${new Date().toDateString()}`
        })
        .where(eq(User.agencyId, agencyId))
        .returning({id:User.id});
        if(_feedback.length <=0) return null;
        return true;
    }
    return false;
}

export async function CreateAgencySideBarOptions(agencyId:string){
    let response = null
    const data = await db.select().from(AgencySidebarOption).where(sql`${AgencySidebarOption.agencyId} = ${agencyId}`);
    if(data.length<=0){
        const data = await db.insert(AgencySidebarOption)
        .values([ {
            name:'Dashboard',
            icon:'category',
            link: `/agency/${agencyId}`,
            agencyId
        },
        {
            name: 'Launchpad',
            icon: 'clipboardIcon',
            link: `/agency/${agencyId}/launchpad`,
            agencyId
        },
        {
            name: 'Settings',
            icon: 'settings',
            link: `/agency/${agencyId}/settings`,
            agencyId 
        },
        {
            name: 'SubAccounts',
            icon: 'person',
            link: `/agency/${agencyId}/all-subaccounts`,
            agencyId
        },
        {
            name: 'Team',
            icon: 'shield',
            link: `/agency/${agencyId}/team`,
            agencyId
        }
        ]).returning({id:AgencySidebarOption.id});

        response = data;
    }
    return response;
}
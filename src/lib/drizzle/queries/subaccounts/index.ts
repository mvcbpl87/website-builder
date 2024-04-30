'use server'
import { SubAccountCredentialsFormType } from "@/components/forms/subaccount-details";
import { db } from "../../db";
import { SubAccount, SubAccountSidebarOption } from "../../schema";
import { eq, sql } from "drizzle-orm";
import { SubAccountType } from "@/lib/types";

export async function GetCurrentSubAccount(subAccountId:string){
    const data = await db.select().from(SubAccount).where(sql`${SubAccount.id} = ${subAccountId}`);
    if(data.length <=0 ) return null;
    return data[0]; 
}

export async function GetSubAccountCredentials(agencyId:string):Promise<SubAccountType[] | null >{
 const data = await db.select().from(SubAccount).where(sql`${SubAccount.agencyId} = ${agencyId}`);
 
 if(data.length <=0 ) return null;
 return data; // Extract all subaccount
}

export async function InsertSubAccountCredentials(agencyId:string, values: SubAccountCredentialsFormType){
 try{
    const _feedback = await db.insert(SubAccount).values({
        name: values.subName,
        subAccountLogo:values.subAccountLogo,
        companyEmail:values.subCompanyEmail,
        companyPhone: values.subCompanyPhone,
        address: values.subAddress,
        city: values.city,
        zipCode: values.zipCode,
        state: values.state,
        country: values.country,
        agencyId
    }).returning({id:SubAccount.id});
    if(_feedback.length <= 0) throw new Error('Error insert subAccount credentials')

    // Create SubAccountSidebarOptions for accessibility
    const _callbackSideBar = await CreateSubAccountSideBarOptions(_feedback[0].id);
    if(!_callbackSideBar) throw new Error('Error creating accessibilities: SubAccount Sidebar Options')
    
    return true;
 }catch(err){
    console.log('Error from InsertSubAccountCredential', err);
    return null;
 }
}

export async function UpdateSubAccountCredentials(agencyId:string, values: SubAccountCredentialsFormType){
 const _feedback = await db.update(SubAccount)
 .set({
    name: values.subName,
    subAccountLogo:values.subAccountLogo,
    companyEmail:values.subCompanyEmail,
    companyPhone: values.subCompanyPhone,
    address: values.subAddress,
    city: values.city,
    zipCode: values.zipCode,
    state: values.state,
    country: values.country,
    updatedAt:`${new Date().toDateString()}`,
 })
 .where(eq(SubAccount.agencyId, agencyId))
 .returning({id:SubAccount.id});
 
 if(_feedback.length <=0) return null;
 return true;
}

export async function CreateSubAccountSideBarOptions(subAccountId:string){
    let response = null
    const data = await db.select().from(SubAccountSidebarOption).where(sql`${SubAccountSidebarOption.id} = ${subAccountId}`);
    if(data.length<=0){
        const data = await db.insert(SubAccountSidebarOption)
        .values([ {
            name: 'Dashboard',
            icon: 'category',
            link: `/subaccount/${subAccountId}`,
            subAccountId
        },
        {
            name: 'Launchpad',
            icon: 'clipboardIcon',
            link: `/subaccount/${subAccountId}/launchpad`,
            subAccountId
        },
        {
            name: 'Funnels',
            icon: 'pipelines',
            link: `/subaccount/${subAccountId}/funnels`,
            subAccountId
        },
        {
            name: 'Settings',
            icon: 'settings',
            link: `/subaccount/${subAccountId}/settings`,
            subAccountId
        },
        {
            name: 'Media',
            icon: 'database',
            link: `/subaccount/${subAccountId}/media`,
            subAccountId
        },
        {
            name: 'Pipelines',
            icon: 'flag',
            link: `/subaccount/${subAccountId}/pipelines`,
            subAccountId
        },
        {
            name: 'Contacts',
            icon: 'person',
            link: `/subaccount/${subAccountId}/contacts`,
            subAccountId
        }
        ]).returning({id:SubAccountSidebarOption.id});

        response = data;
    }
    return response;
}
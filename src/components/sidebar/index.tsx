import React from 'react'
import MenuOptions from './menu-options';
import MenuOptions2 from './menu-options2';
import type { SubAccountType, TAgency, TAgencySidebarOption, TSubAccountSidebarOption, TUser } from '@/lib/types';
import { AgencyDummy, SubAccountsDummy2 } from '@/test/dummy';
import { GetSideBarOptions, GetSubAccountCredentials, GetUserCredentials, GetAgencyCredentials } from '@/lib/drizzle/queries';
type Props = {
    id: string,
    type: 'agency' | 'subaccount'
}
async function Sidebar({id, type}: Props) {

  let user = await GetUserCredentials(id) as TUser | null;
  let details= await GetAgencyCredentials(id) as TAgency | null;
  let subAccounts = await GetSubAccountCredentials(id) as SubAccountType[] | null;
  let sidebarLogo =  '/assets/plura-logo.svg';
  let sidebarOption = await GetSideBarOptions(id, type) as TAgencySidebarOption[] | TSubAccountSidebarOption[] | null;

  return (
  <>
    <MenuOptions
      defaultOpen={true} 
      details={details}
      id = {id}
      sidebarLogo={sidebarLogo}
      sidebarOpt={sidebarOption}
      subAccounts={subAccounts}
      user = {user}
    />
    <MenuOptions
      details={details}
      id = {id}
      sidebarLogo={sidebarLogo}
      sidebarOpt={sidebarOption}
      subAccounts={subAccounts}
      user = {user}
    />
  </>
  )
}

export default Sidebar
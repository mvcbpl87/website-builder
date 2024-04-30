import React from 'react'
import { AgencyDetails } from '@/components/forms/agency-details';
import { redirect } from 'next/navigation';
import { VerifyFirstTimeUser } from '@/server-actions/agency';
type WrapperProps = {
    children: React.ReactNode;
}

const Wrapper = ({children}:WrapperProps) =>{
    const style = `flex min-h-screen flex-col p-20 items-center`;
    return(<div className={style}>{children}</div>)
}

async function AgencyPage() {
    const user = await VerifyFirstTimeUser();
    if(user?.agencyId) redirect(`/agency/${user.agencyId}`)
    return (
    <Wrapper>
       <div className="max-w-[850px] border-[1px] p-4 rounded-xl">
        <h1 className="text-4xl p-4 text-center">Create An Agency</h1>
        <AgencyDetails/>
      </div>
    </Wrapper>
    )
}

export default AgencyPage
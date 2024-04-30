export type testSidebarOpt ={
    
        id: number,
        name: string,
        icon: string,
        link: string,
        createdAt:Date,
        updatedAt: Date,
        agencyId:string
    
}
export type testSidebarOptSubAccount ={
    
        id: number,
        name: string,
        icon: string,
        link: string,
        createdAt:Date,
        updatedAt: Date,
        subAccountId:string
    
}
export type testUser = {
        id: string,
        name: string,
        avatarUrl : string,
        email:string,
        createdAt: Date,
        updatedAt: Date,
        role: string,
        agencyId: string
}

export type testAgency = {
    
         id:string,
         connectAccountId: string,
         customerId: string,
         name: string,
         agencyLogo: string,
         companyEmail: string,
         companyPhone: string,
         whiteLabel: boolean,
         address: string,
         city: string,
         zipCode: string,
         state: string,
         country: string,
         goal: number,
         createdAt: Date,
         updatedAt: Date,
        
         //Reference
         sidebarOption: testSidebarOpt[]
        
}
export type testNotification = {
        id:string,
        notification: string,
        createdAt:Date,
        updatedAt: Date,
        agency: testAgency,
        users:testUser,
        subAccounts: any[]
}

export type testSubAccount = {
        id:string,
        connectAccountId:string,
        name:string,
        subAccountLogo:string,
        createdAt:Date,
        updatedAt:Date,
        companyEmail: string,
        companyPhone: string,
        goal:5,
        address: string,
        city: string,
        zipCode:string,
        state: string,
        country: string,
        agencyId:string
}
export type testSubAccount2 = {
        id:string,
        connectAccountId:string,
        name:string,
        subAccountLogo:string,
        createdAt:Date,
        updatedAt:Date,
        companyEmail: string,
        companyPhone: string,
        goal:5,
        address: string,
        city: string,
        zipCode:string,
        state: string,
        country: string,
        agencyId:string

        //Reference
        sidebarOption: testSidebarOptSubAccount[]
}

export type testPermission = {
        id:string,
        email:string,
        access: boolean,
        userId:string,
        subAccountId: string
}

export type testMedia = {
        id: string,
        type:string,
        name: string,
        link: string,
        createdAt: Date,
        updatedAt: Date,
        subAccountId: string
}

export type testFunnel = {
        id: string,
        name:  string,
        createdAt:Date,
        updatedAt: Date,
        description: string,
        published: boolean,
        subDomainName: string,
        favicon: string,
        liveProducts: string,
        subAccountId: string,
}

export type testClassName = {
        id: string ,
        name: string,
        color: string,
        createdAt:Date,
        updatedAt: Date, 
        customData:string,
        funnelId:string 
}

export type testFunnelPage = {
        id:string,
        name: string,
        pathName: string,
        createdAt: Date,
        updatedAt: Date, 
        visits: number,
        content: string,
        order: number,
        previewImage:string,
        funnelId: string, 
}
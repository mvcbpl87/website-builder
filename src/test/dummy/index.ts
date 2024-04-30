import { UserRole } from "@/lib/enum"

export const UserDummy = {
    id: '8dc0e4e9-6185-41af-9d7c-5ae0ef1531cf',
    name: 'James Carl',
    avatarUrl : 'https:from-supabase',
    email: 'james.carl@gmail.com',
    createdAt: new Date(),
    updatedAt: new Date(),
    role: 'Agency_Owner',
    agencyId: 'd9d288eb-9aa7-40b4-a4a9-2998957914ef'
}

export const AgencyDummy = {
    id:'d9d288eb-9aa7-40b4-a4a9-2998957914ef',
    connectAccountId: "",
    customerId: "",
    name: 'Focal Point',
    agencyLogo: '/assets/plura-logo.svg',
    companyEmail: 'james.carl.company@gmail.com',
    companyPhone: '012-3456789',
    whiteLabel: true,
    address: 'West Bank',
    city: 'Mariner Bay',
    zipCode: '000999',
    state: 'Nevada',
    country: 'Canada',
    goal: 5,
    createdAt: new Date(),
    updatedAt: new Date(),

    //Reference
    sidebarOption:(()=>SidebarOption('d9d288eb-9aa7-40b4-a4a9-2998957914ef'))()
}

export const SubAccountsDummy = [
  {
    id:'6dea509d-7b1a-4bfb-9267-e28fe05dc00f',
    connectAccountId:'',
    name:'SubCom1',
    subAccountLogo:'/assets/plura-logo.svg',
    createdAt: new Date(),
    updatedAt: new Date(),
    companyEmail: 'John.Sub1@email.com',
    companyPhone: '010-2345678',
    goal:5,
    address: '77050 Stracke Summit',
    city: 'Beierhaven',
    zipCode:'27695',
    state: 'Indiana',
    country: 'USA',
    agencyId:AgencyDummy.id,
  },
  {
    id:'dc6e294a-f1f3-4a30-b76b-22117f8393d2',
    connectAccountId:'',
    name:'SubCom2',
    subAccountLogo:'/assets/plura-logo.svg',
    createdAt: new Date(),
    updatedAt: new Date(),
    companyEmail: 'Jhin.Sub2@email.com',
    companyPhone: '010-2345678',
    goal:5,
    address: '95639 Prosacco Viaduct',
    city: 'South Cooper',
    zipCode:'34943',
    state: 'Arkansas',
    country: 'USA',
    agencyId:AgencyDummy.id,
  },
  {
    id:'dc6e294a-f1f3-4a30-b76b-22117f8393d2',
    connectAccountId:'',
    name:'SubCom3',
    subAccountLogo:'/assets/plura-logo.svg',
    createdAt: new Date(),
    updatedAt: new Date(),
    companyEmail: 'Jhin.Sub2@email.com',
    companyPhone: '010-2345678',
    goal:5,
    address: '95639 Prosacco Viaduct',
    city: 'South Cooper',
    zipCode:'34943',
    state: 'Arkansas',
    country: 'USA',
    agencyId:AgencyDummy.id,
  }
]

export const SubAccountsDummy2 =  {
  id:'6dea509d-7b1a-4bfb-9267-e28fe05dc00f',
  connectAccountId:'',
  name:'SubCom1',
  subAccountLogo:'/assets/plura-logo.svg',
  createdAt: new Date(),
  updatedAt: new Date(),
  companyEmail: 'John.Sub1@email.com',
  companyPhone: '010-2345678',
  goal:5,
  address: '77050 Stracke Summit',
  city: 'Beierhaven',
  zipCode:'27695',
  state: 'Indiana',
  country: 'USA',
  agencyId:AgencyDummy.id,
  //Reference
  sidebarOption:(()=>SidebarOptionSubAccount('6dea509d-7b1a-4bfb-9267-e28fe05dc00f'))()
}

function SidebarOption(agencyId: string){
    return([
         {
              id: 1,
              name: 'Dashboard',
              icon: 'category',
              link: `/agency/${agencyId}`,
              createdAt: new Date(),
              updatedAt: new Date(),
              agencyId
            },
            {
              id: 2,
              name: 'Launchpad',
              icon: 'clipboardIcon',
              link: `/agency/${agencyId}/launchpad`,
              createdAt: new Date(),
              updatedAt: new Date(),
              agencyId
            },
            {
              id: 3,
              name: 'Billing',
              icon: 'payment',
              link: `/agency/${agencyId}/billing`,
              createdAt: new Date(),
              updatedAt: new Date(),
              agencyId
            },
            {
              id:4, 
              name: 'Settings',
              icon: 'settings',
              link: `/agency/${agencyId}/settings`,
              createdAt: new Date(),
              updatedAt: new Date(),
              agencyId
            },
            {
              id:5,
              name: 'SubAccounts',
              icon: 'person',
              link: `/agency/${agencyId}/all-subaccounts`,
              createdAt: new Date(),
              updatedAt: new Date(),
              agencyId
            },
            {
              id:6,
              name: 'Team',
              icon: 'shield',
              link: `/agency/${agencyId}/team`,
              createdAt: new Date(),
              updatedAt: new Date(),
              agencyId
            },
    ])
}

function SidebarOptionSubAccount(subAccountId: string){
  return([
       {
            id: 1,
            name: 'Dashboard',
            icon: 'category',
            link: `/subaccount/${subAccountId}`,
            createdAt: new Date(),
            updatedAt: new Date(),
            subAccountId
          },
          {
            id: 2,
            name: 'Launchpad',
            icon: 'clipboardIcon',
            link: `/subaccount/${subAccountId}/launchpad`,
            createdAt: new Date(),
            updatedAt: new Date(),
            subAccountId
          },
          {
            id: 3,
            name: 'Funnels',
            icon: 'pipelines',
            link: `/subaccount/${subAccountId}/funnels`,
            createdAt: new Date(),
            updatedAt: new Date(),
            subAccountId
          },
          {
            id:4, 
            name: 'Settings',
            icon: 'settings',
            link: `/subaccount/${subAccountId}/settings`,
            createdAt: new Date(),
            updatedAt: new Date(),
            subAccountId
          },
          {
            id:5,
            name: 'Media',
            icon: 'database',
            link: `/subaccount/${subAccountId}/media`,
            createdAt: new Date(),
            updatedAt: new Date(),
            subAccountId
          },
          {
            id:6,
            name: 'Automations',
            icon: 'chip',
            link: `/subaccount/${subAccountId}/automations`,
            createdAt: new Date(),
            updatedAt: new Date(),
            subAccountId
          },
          {
            id:7,
            name: 'Pipelines',
            icon: 'flag',
            link: `/subaccount/${subAccountId}/pipelines`,
            createdAt: new Date(),
            updatedAt: new Date(),
            subAccountId
          },
          {
            id:8,
            name: 'Contacts',
            icon: 'person',
            link: `/subaccount/${subAccountId}/contacts`,
            createdAt: new Date(),
            updatedAt: new Date(),
            subAccountId
          },
  ])
}

export const NotificationDummy = {
  id:'test1234',
  notification: `${UserDummy.name} | description inserted here  `,
  createdAt: new Date(),
  updatedAt: new Date(),
  agency: AgencyDummy,
  users: UserDummy,
  subAccounts: [] as any[]
}

export const allNoti = [NotificationDummy, NotificationDummy];

export const PermissionsDummy = [
  {
    id:'3e47d02f-a960-4d2a-a10d-d326838ebfe9', 
    email:'perTestAcc1@email.com',
    access: true,
    userId:UserDummy.id,
    subAccountId: SubAccountsDummy[0].id
  },
  {
    id:'b6fb2dd1-35ab-4b60-a121-69a0f152cb33',
    email:'perTestAcc2@email.com',
    access: true,
    userId:UserDummy.id,
    subAccountId: SubAccountsDummy[1].id 
  },
  {
    id:'d03fa652-7197-46c9-a98b-3f86e1b6af29',
    email:'perTestAcc2@email.com',
    access: true,
    userId:UserDummy.id,
    subAccountId: SubAccountsDummy[2].id 
  },
]

export const UserTeamDummy = [
  {
    id:UserDummy.id, // rep. user id
    name:UserDummy.name,
    avatarUrl: UserDummy.avatarUrl,
    email:UserDummy.email,
    role:UserDummy.role,
    agency:{ id:AgencyDummy.id, subAccounts:SubAccountsDummy},
    permissions: true
  },
  {
    id:'d22745c3-6825-4386-8508-0f26ebe592fb',
    name:'Joseph Khan',
    avatarUrl:'',
    email:'user2.mail@mail.com',
    role:UserRole.AGENCY_OWNER,
    agency:{ id:AgencyDummy.id, subAccounts:[SubAccountsDummy[1]]},
    permissions: true
  },
  {
    id:'fd0f60b3-f91c-45ec-9be9-b388c5cf6c70',
    name:'Tremoil Josh',
    avatarUrl:'',
    email:'user3.mail@mail.com',
    role:UserRole.SUBACCOUNT_USER,
    agency:{ id:AgencyDummy.id, subAccounts:[SubAccountsDummy[2]]},
    permissions: true
  }
]

export const mediaDummy = [
  {
    id: '193fa65d-5cff-4dcf-aef8-8d7df2bef80e',
    type: '',
    name: 'Media 1',
    link: '/assets/appstore.png',
    createdAt: new Date(),
    updatedAt: new Date(),
    subAccountId: '6dea509d-7b1a-4bfb-9267-e28fe05dc00f'
  },
  {
    id: '193fa65d-5cff-4dcf-aef8-8d7df2bef80e',
    type: '',
    name: 'Media 2',
    link: '/assets/appstore.png',
    createdAt: new Date(),
    updatedAt: new Date(),
    subAccountId: '6dea509d-7b1a-4bfb-9267-e28fe05dc00f'
  }
]

export const funnelDummy  = {
  id: 'test1234',
  name:  'Funnel Name',
  createdAt: new Date(),
  updatedAt: new Date(),
  description:'Funnel description insert here',
  published: false,
  subDomainName: 'funnel subdomain',
  favicon: '',
  liveProducts: '',
  subAccountId: SubAccountsDummy[0].id,
}

export const ClassNameDummy = {
  id:'test class dummy',
  name: 'class name name',
  color:'color classname',
  createdAt: new Date(),
  updatedAt: new Date(), 
  customData:'custom data classname',
  funnelId:funnelDummy.id,
}
export const FunnelPageDummy = {
  id:'testdummyid1234',
  name: 'funnelpage name',
  pathName: 'funnelpage pathname',
  createdAt: new Date(),
  updatedAt:new Date(), 
  visits: 0,
  content: 'funnel page content',
  order: 0,
  previewImage:'funnel page previewImage',
  funnelId: funnelDummy.id, 
}
export const FunnelPageDummy2 = {
  id:'testdummyid1235',
  name: 'funnelpage name2',
  pathName: 'funnelpage pathname',
  createdAt: new Date(),
  updatedAt:new Date(), 
  visits: 0,
  content: 'funnel page content',
  order: 0,
  previewImage:'funnel page previewImage',
  funnelId: funnelDummy.id, 
}
export const funnelSubAccountDummy = [
 {
  funnels: funnelDummy,
  className: ClassNameDummy,
  funnelPage:FunnelPageDummy
 }
]
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FunnelPageDummy, FunnelPageDummy2, funnelDummy } from '@/test/dummy';
import { testFunnelPage } from '@/test/dummy/type';
import FunnelSteps from '../_components/funnel-steps';
import Link from 'next/link';
type Props = {
    params: { funnelId: string; subaccountId: string }
  }
export default function FunnelPage({params}:Props){
 const funnelPages:testFunnelPage = FunnelPageDummy
 return(
 <div>
    <Link
       href={`/subaccount/${params.subaccountId}/funnels`}
       className="flex justify-between gap-4 mb-4 text-muted-foreground"
     >
       Back
     </Link>
     <h1 className="text-3xl mb-8">{funnelPages.name}</h1>
      <Tabs
        defaultValue="steps"
        className="w-full"
      >
        <TabsList className="grid  grid-cols-2 w-[50%] bg-transparent ">
          <TabsTrigger value="steps">Steps</TabsTrigger>
          {/* <TabsTrigger value="settings">Settings</TabsTrigger> */}
        </TabsList>
        <TabsContent value="steps">
          <FunnelSteps
            funnel={funnelDummy}
            subaccountId={params.subaccountId}
            pages={[FunnelPageDummy, FunnelPageDummy2]}
            funnelId={params.funnelId}
          />
        </TabsContent>
        {/* <TabsContent value="settings"> */}
          {/* <FunnelSettings
            subaccountId={params.subaccountId}
            defaultData={funnelPages}
          /> */}
          {/* funnel settings */}
        {/* </TabsContent> */}
      </Tabs>
 </div>
 )
 
}
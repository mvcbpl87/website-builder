import CircleProgress from '@/components/global/circle-progress'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { AgencyDummy } from '@/test/dummy'
import { AreaChart } from '@tremor/react'
import { Contact2, DollarSign, Goal, ShoppingCart } from 'lucide-react'
type Props = {
    params: { agencyId: string}
}
export default function Page({params}:Props){
  let currency = 'USD'
  let sessions:any = []
  let totalClosedSessions:any = []
  let totalPendingSessions
  let net = 0
  let potentialIncome = 0
  let closingRate = 0
  const currentYear = new Date().getFullYear()
  const startDate = new Date(`${currentYear}-01-01T00:00:00Z`).getTime() / 1000
  const endDate = new Date(`${currentYear}-12-31T23:59:59Z`).getTime() / 1000
  const subaccounts = [];
  const agencyDetails = AgencyDummy
  return(
  <div>
   <h1 className="text-4xl">Dashboard</h1> 
   <Separator className='my-6'/>
   <div className="flex flex-col gap-4 pb-6">
   <div className="flex gap-4 flex-col xl:!flex-row">
   <Card className="flex-1 relative">
   <CardHeader>
     <CardDescription>Income</CardDescription>
     <CardTitle className="text-4xl">
       {net ? `${currency} ${net.toFixed(2)}` : `$0.00`}
     </CardTitle>
     <small className="text-xs text-muted-foreground">
       For the year {currentYear}
     </small>
   </CardHeader>
   <CardContent className="text-sm text-muted-foreground">
        Total revenue generated as reflected in your stripe dashboard.
    </CardContent>
    <DollarSign className="absolute right-4 top-4 text-muted-foreground" />
   </Card>
   <Card className="flex-1 relative">
    <CardHeader>
    <CardDescription>Potential Income</CardDescription>
       <CardTitle className="text-4xl">
         {potentialIncome
           ? `${currency} ${potentialIncome.toFixed(2)}`
           : `$0.00`}
       </CardTitle>
       <small className="text-xs text-muted-foreground">
         For the year {currentYear}
        </small>
    </CardHeader>
    <CardContent className="text-sm text-muted-foreground">
        This is how much you can close.
    </CardContent>
    <DollarSign className="absolute right-4 top-4 text-muted-foreground" />
   </Card>
   <Card className="flex-1 relative">
   <CardHeader>
        <CardDescription>Active Clients</CardDescription>
        <CardTitle className="text-4xl">{subaccounts.length}</CardTitle>
    </CardHeader>
    <CardContent className="text-sm text-muted-foreground">
        Reflects the number of sub accounts you own and manage.
    </CardContent>
    <Contact2 className="absolute right-4 top-4 text-muted-foreground" />
   </Card>
   <Card className='flex-1 relative'>
   <CardHeader>
    <CardTitle>Agency Goal</CardTitle>
    <CardDescription>
      <p className="mt-2">
        Reflects the number of sub accounts you want to own and
        manage.
      </p>
    </CardDescription>
    </CardHeader>
    <CardFooter>
     <div className="flex flex-col w-full">
       <div className="flex justify-between items-center">
         <span className="text-muted-foreground text-sm">
           Current: {subaccounts.length}
         </span>
         <span className="text-muted-foreground text-sm">
           Goal: {agencyDetails.goal}
         </span>
       </div>
       <Progress
         value={(subaccounts.length / agencyDetails.goal) * 100}
       />
     </div>
    </CardFooter>
    <Goal className="absolute right-4 top-4 text-muted-foreground" />
   </Card>
   </div>
   <div className="flex gap-4 xl:!flex-row flex-col">
    <Card className="p-4 flex-1">
    <CardHeader>
        <CardTitle>Transaction History</CardTitle>
    </CardHeader>
    <AreaChart
      className="text-sm stroke-primary"
      data={[
        ...(totalClosedSessions || []),
        ...(totalPendingSessions || []),
      ]}
      index="created"
      categories={['amount_total']}
      colors={['primary']}
      yAxisWidth={30}
      showAnimation={true}
    />
    </Card>
    <Card className="xl:w-[400px] w-full">
     <CardHeader>
        <CardTitle>Conversions</CardTitle>
     </CardHeader>
     <CardContent>
     <CircleProgress
        value={closingRate}
        description={
            <>
            {sessions && (
              <div className="flex flex-col">
                Abandoned
                <div className="flex gap-2">
                  <ShoppingCart className="text-rose-700" />
                  {sessions.length}
                </div>
              </div>
            )}
            {totalClosedSessions && (
              <div className="felx flex-col">
                Won Carts
                <div className="flex gap-2">
                  <ShoppingCart className="text-emerald-700" />
                  {totalClosedSessions.length}
                </div>
              </div>
            )}
          </>
        }
     />

     </CardContent>

    </Card>

   </div>

   </div>
  </div>
  )
}
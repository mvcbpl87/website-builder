import { redirect } from "next/navigation"
import { SubAccountsDummy2 } from "@/test/dummy"
type Props = {
    params: { subaccountId: string}
}
export default function PipelinesPage({ params}: Props){
 //Pipeline refers to subaccount and lane
 const pipelineId = '4a5efc72-0ea2-4b01-a3ab-047ef653bb92'
 redirect(`/subaccount/${params.subaccountId}/pipelines/${pipelineId}`)
//  return(
//  <div>Page pipeline</div>
//  )
}
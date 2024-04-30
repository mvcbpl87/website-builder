import { Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import PipelineInfoBar from './components/pipeline-infobar'
import PipelineSettings from './components/pipeline-settings';
import PipelineView from './components/pipeline-view';
type Props = {
    params: { subaccountId: string; pipelineId: string }
  }
export default function PipelineIdPage({params}:Props){
 return(
 <Tabs defaultValue='view'>
  <TabsList className='bg-transparent border-b-[1px] rounded-none h-16 w-full justify-between mb-4 p-0'>
     <PipelineInfoBar/>
      <div>
          <TabsTrigger value="view">Pipeline View</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
      </div>
  </TabsList>
  <TabsContent value = "view">
    <PipelineView/>
  </TabsContent>
  <TabsContent value = "settings">
    <PipelineSettings/>
  </TabsContent>
 </Tabs>
 )
}
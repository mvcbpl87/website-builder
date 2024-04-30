import EditorProvider from "@/providers/editor/editor-provider"
import { FunnelPageDummy } from "@/test/dummy"
import FunnelEditorNavigation from "./_components/funnel-editor-navigation"
import FunnelEditor from "./_components/funnel-editor"
import FunnelEditorSidebar from "./_components/funnel-editor-sidebar"
type Props = {
    params: {
      subaccountId: string
      funnelId: string
      funnelPageId: string
    }
  }
export default function EditorPage({params}:Props){
    return(
    <div className="h-full">
    <EditorProvider
       subaccountId={params.subaccountId}
       funnelId={params.funnelId}
       pageDetails={FunnelPageDummy}
    >
     <FunnelEditorNavigation
      funnelId={params.funnelId}
      funnelPageDetails={FunnelPageDummy}
      subaccountId={params.subaccountId}
     />
     <div className="h-full flex justify-center">
        <FunnelEditor funnelPageId={params.funnelPageId} />
    </div>
     <FunnelEditorSidebar subaccountId={params.subaccountId} />
    </EditorProvider>
    </div>
    )
}
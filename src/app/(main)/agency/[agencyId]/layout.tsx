import Sidebar from "@/components/sidebar";
import BlurPage from "@/components/global/blur-page";
import InfoBar from "@/components/global/info-bar";
import { NotificationDummy, allNoti } from "@/test/dummy";
import { redirect } from "next/navigation";
type Props = {
    children: React.ReactNode,
    params: {agencyId: string}
}

const Wrapper = ({children}:{children:React.ReactNode})=>{
    const style = `min-h-screen flex flex-1 `;
    return(<div className={style}>{children}</div>)
}
export default function Layout({children,params}:Props){
    
    return(
    <Wrapper>
        <Sidebar id={params.agencyId } type="agency"/>
        <div className="md:ml-[300px] flex flex-col flex-1">
            <InfoBar notifications={allNoti}/>
            <BlurPage>{children}</BlurPage>
        </div>
    </Wrapper>
    )
}

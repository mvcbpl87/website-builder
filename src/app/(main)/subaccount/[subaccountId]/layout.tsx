import Sidebar from "@/components/sidebar";
import BlurPage from "@/components/global/blur-page";
import InfoBar from "@/components/global/info-bar";
import { NotificationDummy, allNoti } from "@/test/dummy";
type Props = {
    children: React.ReactNode,
    params?: { subaccountId: string}
}

const Wrapper = ({children}:{children:React.ReactNode})=>{
    const style = `min-h-screen flex flex-1 `;
    return(<div className={style}>{children}</div>)
}
export default function Layout({children, params}:Props){
    return(
    <Wrapper>
        <Sidebar id={params?.subaccountId as string} type="subaccount"/>
        <div className="md:ml-[300px] flex flex-col flex-1">
            <InfoBar notifications={allNoti}/>
            <BlurPage>{children}</BlurPage>
        </div>
    </Wrapper>
    )
}

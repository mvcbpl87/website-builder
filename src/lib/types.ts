import type { InferSelectModel } from "drizzle-orm";
import {User,Agency, AgencySidebarOption, SubAccount, SubAccountSidebarOption, Role } from "./drizzle/schema";
export type WrapperProps = {
    children:React.ReactNode;
    className?: string
}
export type TUser = InferSelectModel<typeof User>;
export type TAgency = InferSelectModel<typeof Agency>;
export type SubAccountType = InferSelectModel<typeof SubAccount>;
export type TAgencySidebarOption = InferSelectModel<typeof AgencySidebarOption>;
export type TSubAccountSidebarOption = InferSelectModel<typeof SubAccountSidebarOption>;
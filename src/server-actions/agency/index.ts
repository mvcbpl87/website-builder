'use server'

import { redirect } from "next/navigation";
import { getClerkAuth } from "../auth"
import { InternalUserVerification } from "@/lib/drizzle/queries";

export async function VerifyFirstTimeUser(){
    const userId = await getClerkAuth();
    if(!userId) redirect('/agency/sign-in');
    const emailAddress = userId.emailAddresses[0].emailAddress
    //check into database if user Exist
    const isUserExist = await InternalUserVerification(emailAddress);
    return isUserExist

}
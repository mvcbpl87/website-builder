'use server'
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

export async function getClerkAuth(){
    const user = await currentUser();
    if(!user?.id) return null;
    return user;
}


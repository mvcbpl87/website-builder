"use client";
import { NumberInput } from "@tremor/react"
import Loading from "../global/loading";
import FileUpload from "../global/file-upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import { z } from "zod";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Switch } from "../ui/switch";
import { InsertAgencyCredentials, UpdateAgencyCredentials } from "@/lib/drizzle/queries";
import { useRouter } from "next/navigation";
import { SubAccountType } from "@/lib/types";
import { InsertSubAccountCredentials, UpdateSubAccountCredentials } from "@/lib/drizzle/queries/subaccounts";
import { useEffect, useState } from "react";

type Props = {
    agencyId: string,
    subAccountDetails?: SubAccountType
}

const FormSchema = z.object({
    subName: z.string().min(2, {message:'Name must be at least 2 chard'}),
    subCompanyEmail: z.string().min(1),
    subCompanyPhone: z.string().min(1),
    subAddress: z.string().min(1),
    city: z.string().min(1),
    zipCode: z.string().min(1),
    state: z.string().min(1),
    country: z.string().min(1),
    subAccountLogo: z.string().min(1),
});
export type SubAccountCredentialsFormType = z.infer<typeof FormSchema>;

export default function SubAccountDetails({agencyId, subAccountDetails}:Props){
    const router = useRouter();
    const { toast } = useToast()
    const [isMounted, setMounted] = useState(false);
    useEffect(()=>setMounted(true),[]);
    

    const form = useForm<z.infer<typeof FormSchema>>({
        mode:'onChange',
        resolver:zodResolver(FormSchema),
        defaultValues:{
            subName: subAccountDetails?.name,
            subCompanyEmail:(subAccountDetails?.companyEmail) as string,
            subCompanyPhone: (subAccountDetails?.companyPhone) as string,
            subAddress: subAccountDetails?.address as string,
            city: subAccountDetails?.city as string,
            zipCode: subAccountDetails?.zipCode as string,
            state: subAccountDetails?.state as string,
            country:subAccountDetails?.country as string,
            subAccountLogo: subAccountDetails?.subAccountLogo as string,
        }
    })
    const isLoading = form.formState.isSubmitting;
    const FlexContain = `grid grid-cols-1 md:grid-cols-2 gap-4`;
    const handleSubmit = async(values:z.infer<typeof FormSchema>)=>{
        try{
            console.log('from subaccount', values)
            if(agencyId){
                const response = await UpdateSubAccountCredentials(agencyId, values);
                if(!response) throw new Error();
                toast({
                    title: 'Subaccount details saved',
                    description: 'Successfully update your subaccount details.',
                  })

            }else{
                const response = await InsertSubAccountCredentials(agencyId, values);
                if(!response) throw new Error();
                toast({
                    title: 'Subaccount details saved',
                    description: 'Successfully saved your subaccount details.',
                  })
            }
           
        }catch(err){
            console.log(err);
            toast({
                variant: 'destructive',
                title: 'Oppse!',
                description: 'Could not save sub account details.',
            })
        }finally{
            router.refresh();
        }
    }
    if(!isMounted) return
    return(
    <AlertDialog>
    <Card className="w-full bg-muted/10">
        <CardHeader>
            <CardTitle>Agency Information</CardTitle>
            <CardDescription>
                Lets create an agency for you business. You can edit agency settings
                later from the agency settings tab.
            </CardDescription>
        </CardHeader>
        <CardContent>
        <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField 
         name="subAccountLogo" 
         control = {form.control} 
         disabled = {isLoading}
         render={({ field })=>(
            <FormItem>
                <FormLabel>Agency Logo</FormLabel>
                <FormControl>
                    <FileUpload 
                        value = {field.value}
                        onChange={field.onChange}/>
                </FormControl>
                <FormMessage/>
            </FormItem>
         )}
        />
        {/* <-- Agency name and email */}
        <div className={FlexContain}>
        <FormField
         name = "subName"
         control = {form.control}
         disabled={isLoading}
         render = { ({field}) => (
            <FormItem>
                <FormLabel>Agency name</FormLabel>
                <FormControl>
                    <Input
                     placeholder="Your agency name" {...field}/>
                </FormControl>
                <FormMessage/>
            </FormItem>
         )}
        />
        <FormField
         name = "subCompanyEmail"
         control = {form.control}
         disabled={isLoading}
         render = { ({field}) => (
            <FormItem>
                <FormLabel>Agency email</FormLabel>
                <FormControl>
                    <Input
                     placeholder="Company email" {...field}/>
                </FormControl>
                <FormMessage/>
            </FormItem>
         )}
        />
        </div>

        {/* <-- Agency Phone number */}
        <div className={FlexContain}>
        <FormField
         name = "subCompanyPhone"
         control = {form.control}
         disabled={isLoading}
         render = { ({field}) => (
            <FormItem>
                <FormLabel>Agency Phone Number</FormLabel>
                <FormControl>
                    <Input
                     placeholder="Phone" {...field}/>
                </FormControl>
                <FormMessage/>
            </FormItem>
         )}
        />
        </div>
        {/* <-- Address */}
        <FormField
         name="subAddress"
         disabled={isLoading}
         control={form.control}
         render={({ field }) => (
           <FormItem className="flex-1">
             <FormLabel>Address</FormLabel>
             <FormControl>
               <Input placeholder="123 st..." {...field}/>
             </FormControl>
             <FormMessage />
           </FormItem>
         )}
        />
        {/* <-- City & State */}
        <div className={FlexContain}>
        <FormField
         name = "city"
         control = {form.control}
         disabled={isLoading}
         render = { ({field}) => (
            <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                    <Input
                     placeholder="City" {...field}/>
                </FormControl>
                <FormMessage/>
            </FormItem>
         )}
        />
         <FormField
         name = "state"
         control = {form.control}
         disabled={isLoading}
         render = { ({field}) => (
            <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                    <Input
                     placeholder="State" {...field}/>
                </FormControl>
                <FormMessage/>
            </FormItem>
         )}
        />
        </div>
        {/* <-- Country & Zipcode */}
        <div className={FlexContain}>
        <FormField
         name = "country"
         control = {form.control}
         disabled={isLoading}
         render = { ({field}) => (
            <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                    <Input
                     placeholder="Country" {...field}/>
                </FormControl>
                <FormMessage/>
            </FormItem>
         )}
        />
         <FormField
         name = "zipCode"
         control = {form.control}
         disabled={isLoading}
         render = { ({field}) => (
            <FormItem>
                <FormLabel>Zipcode</FormLabel>
                <FormControl>
                    <Input
                     placeholder="Zipcode" {...field}/>
                </FormControl>
                <FormMessage/>
            </FormItem>
         )}
        />
        </div>
     
        <Button
         type="submit"
         disabled={isLoading}
        >
        {isLoading ? <Loading /> : 'Save Agency Information'}
        </Button>
    </form>
    </Form>

 
    </CardContent>
    </Card>
    </AlertDialog>
    )
}
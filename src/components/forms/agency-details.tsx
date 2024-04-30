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
import { TAgency } from "@/lib/types";

type Props = {
    agencyId?:string
    data?:TAgency
}
const FormSchema = z.object({
    name: z.string().min(2, {message:'Agency name must be atleast 2 chars'}),
    companyEmail: z.string().min(1),
    companyPhone: z.string().min(1),
    whiteLabel: z.boolean(),
    address: z.string().min(1),
    city: z.string().min(1),
    zipCode: z.string().min(1),
    state: z.string().min(1),
    country: z.string().min(1),
    agencyLogo: z.string().min(1),
});
export type AgencyCredentials = z.infer<typeof FormSchema>;


export function AgencyDetails({agencyId, data}:Props){
    const router = useRouter();
    const { toast } = useToast()
    const form = useForm<z.infer<typeof FormSchema>>({
        mode:'onChange',
        resolver:zodResolver(FormSchema),
        defaultValues:{
            name: data?.name,
            companyEmail: (data?.companyEmail) as string,
            companyPhone:  data?.companyPhone as string,
            whiteLabel: true || data?.whiteLabel ,
            address:  data?.address as string,
            city: data?.city as string,
            zipCode: data?.zipCode as string,
            state:  data?.state as string,
            country:  data?.country as string,
            agencyLogo:data?.agencyLogo as string,
        }
    })
    const isLoading = form.formState.isSubmitting;
    const FlexContain = `grid grid-cols-1 md:grid-cols-2 gap-4`;
    const handleSubmit = async(values:z.infer<typeof FormSchema>)=>{
        try{
            console.log('from agency', values)
            if(!agencyId){
                const response = await InsertAgencyCredentials(values);
                if(!response) return;
                toast({title:'Created Agency', description:`${values.name} has been created successfully`});
            }else{
                const response = await UpdateAgencyCredentials(agencyId, values);
                if(!response) throw new Error();
                toast({title:'update Agency', description:`${values.name} has been updated successfully`});
            }
           
        }catch(err){
            console.log(err);
            toast({
                variant: 'destructive',
                title: 'Oppse!',
                description: 'could not create/update your agency',
            })
        }finally{
            router.refresh();
        }
    }
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
         name="agencyLogo" 
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
         name = "name"
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
         name = "companyEmail"
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
         name = "companyPhone"
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
        {/* <-- WhiteLabel */}
        <FormField
         name = "whiteLabel"
         control = {form.control}
         disabled={isLoading}
         render = { ({field}) => (
            <FormItem 
             className="flex flex-row items-center justify-between rounded-lg border gap-4 p-4">
                <div>
                    <FormLabel>Whitelabel Agency</FormLabel>
                    <FormDescription>
                    Turning on whilelabel mode will show your agency logo
                    to all sub accounts by default. You can overwrite this
                    functionality through sub account settings.
                    </FormDescription>
                </div>
                <FormControl>
                    <Switch 
                     checked ={field.value} 
                     onCheckedChange={field.onChange}/>
                </FormControl>
                <FormMessage/>
            </FormItem>
         )}
        />
         {/* <-- Address */}
        <FormField
         name="address"
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
       
        {agencyId && (
         <div className="flex flex-col gap-2">
            <FormLabel>Create A Goal</FormLabel>
            <FormDescription>
                ✨ Create a goal for your agency. As your business grows
                your goals grow too so dont forget to set the bar higher!
            </FormDescription>
            <NumberInput 
             className="bg-background !border !border-input rounded-md" 
             min={1}
             defaultValue={5}
             placeholder="Sub Account Goal"
             />
         </div>   
        )}
        <Button
         type="submit"
         disabled={isLoading}
        >
        {isLoading ? <Loading /> : 'Save Agency Information'}
        </Button>
    </form>
    </Form>

    { agencyId && (
        <div className="flex flex-row items-center justify-between rounded-lg  border border-destructive gap-4 p-4 mt-4"> 
        <div>
            <div className="py-1">Danger Zone</div>
            <div className="text-muted-foreground">
                Deleting your agency cannot be undone. This will also delete all
                sub accounts and all data related to your sub accounts. Sub
                accounts will no longer have access to funnels, contacts etc.
            </div>
        </div>
        <AlertDialogTrigger 
         disabled = {isLoading} 
         className="text-destructive p-2 text-center rounded-md hover:bg-destructive hover:text-white whitespace-nowrap">
            Delete Agency
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the agency account and all related sub accounts.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive hover:bg-destructive/50">Delete</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </div>
    )}
        </CardContent>
    </Card>
    </AlertDialog>
    )
}
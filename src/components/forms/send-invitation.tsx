"use client"
import Loading from "../global/loading";
import FileUpload from "../global/file-upload";
import { zodResolver } from "@hookform/resolvers/zod";
import {  useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { UserRole } from "@/lib/enum";

const FormSchema = z.object({
    email: z.string().email(),
    role: z.enum([UserRole.AGENCY_ADMIN, UserRole.SUBACCOUNT_USER, UserRole.SUBACCOUNT_GUEST])
})

type FormSchemaType = z.infer<typeof FormSchema>
export default function SendInvitation(){
 const {toast} = useToast();
 const form = useForm<FormSchemaType>({
    resolver:zodResolver(FormSchema),
    mode:'onChange',
    defaultValues:{
        email:'',
        role:UserRole.SUBACCOUNT_USER
    }
 });

 const loading = form.formState.isLoading;
 const handleSubmit = async(values:FormSchemaType) =>{
    try{
        console.log(values)
        toast({title:'Created Agency'})
    }catch(err){
        console.log(err);
        toast({
            variant: 'destructive',
            title: 'Oppse!',
            description: 'could not create your agency',
        })
    }
 }
 
 return(
 <Card>
 <CardHeader>
    <CardTitle>Invitation</CardTitle>
    <CardDescription>
      An invitation will be sent to the user. Users who already have an
      invitation sent out to their email, will not receive another
      invitation.
    </CardDescription>
 </CardHeader>
 <CardContent>
 {/*<--- Form start here ---*/}
 <Form {...form}>
 <form
  className="space-y-5"  
  onSubmit={form.handleSubmit(handleSubmit)}
 >
    <FormField
     disabled = {loading}
     control = {form.control}
     name = "email"
     render ={ ({field}) =>(
        <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
                <Input placeholder="Email" {...field}/>
            </FormControl>
            <FormMessage/>
        </FormItem>
     )}
    />
    <FormField
     disabled={loading}
     control={form.control}
     name="role"
     render={({ field }) => (
       <FormItem className="flex-1">
         <FormLabel>User Role</FormLabel>
         <Select 
          defaultValue={field.value}
          disabled = {field.value == UserRole.AGENCY_OWNER}
          onValueChange={(value)=> field.onChange(value)}
         >
         <FormControl>
             <SelectTrigger>
                 <SelectValue placeholder="Select user role..." />
             </SelectTrigger>
         </FormControl>
         <SelectContent>
         { [ UserRole.AGENCY_ADMIN, UserRole.SUBACCOUNT_USER, UserRole.SUBACCOUNT_GUEST].map( (role, index)=>(
             <SelectItem key ={`selectItem-${index+1}`} value={role}>
                 {role}
             </SelectItem>
         )) 
         }
         </SelectContent>
         </Select>
       </FormItem>
     )}
    />
    <Button disabled={loading} type ="submit">
        {loading? <Loading/> : 'Send Invitation'}
    </Button>    
 </form>   
 </Form>
 </CardContent>
 </Card>
 )
 
}
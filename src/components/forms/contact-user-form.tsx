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
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { UserRole } from "@/lib/enum";

// Temporarily
const FormSchema = z.object({
   name: z.string(),
   email:z.string()
})

type FormSchemaType = z.infer<typeof FormSchema>
export default function ContactUserForm(){
 const {toast} = useToast();
 const form = useForm<FormSchemaType>({
    resolver:zodResolver(FormSchema),
    mode:'onChange',
    defaultValues:{
       name:'',
       email:''
    }
 });

 const loading = form.formState.isLoading;
 const handleSubmit = async(values:FormSchemaType) =>{
    try{
        console.log(values)
        toast({title:'Save contact details'})
    }catch(err){
        console.log(err);
        toast({
            variant: 'destructive',
            title: 'Oppse!',
            description: 'could not save contact details.',
        })
    }
 }
 
 return(
 <Card>
 <CardHeader>
    <CardTitle>Contact Info</CardTitle>
    <CardDescription>
        You can assign tickets to contacts and set a value for each contact in
        the ticket.
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
     name = "name"
     render ={ ({field}) =>(
        <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
                <Input placeholder=" Name" {...field}/>
            </FormControl>
            <FormMessage/>
        </FormItem>
     )}
    />
    <FormField
     disabled = {loading}
     control = {form.control}
     name = "email"
     render ={ ({field}) =>(
        <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
                <Input placeholder="Email" {...field}/>
            </FormControl>
            <FormMessage/>
        </FormItem>
     )}
    />
    <Button disabled={loading} type ="submit">
        {loading? <Loading/> : 'Save Contact Details'}
    </Button>    
 </form>   
 </Form>
 </CardContent>
 </Card>
 )
 
}
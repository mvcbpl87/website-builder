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

const FormSchema = z.object({
 link: z.string().min(1, { message: 'Media File is required' }),
 name: z.string().min(1, { message: 'Name is required' }),
})

type FormSchemaType = z.infer<typeof FormSchema>
export default function UploadMediaForm(){
 const {toast} = useToast();
 const form = useForm<FormSchemaType>({
    resolver:zodResolver(FormSchema),
    mode:'onChange',
    defaultValues:{
        link:'', name: ''
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
    <CardTitle>Media Information</CardTitle>
    <CardDescription>
        Please enter the details for your file
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
            <FormLabel>Email</FormLabel>
            <FormControl>
                <Input placeholder="Your file name" {...field}/>
            </FormControl>
            <FormMessage/>
        </FormItem>
     )}
    />
    <FormField
     disabled={loading}
     control={form.control}
     name="link"
     render={({ field }) => (
       <FormItem className="flex-1">
         <FormLabel>Media File</FormLabel>
            <FormControl>
                <FileUpload onChange={field.onChange}/>
            </FormControl>
            <FormMessage/>
       </FormItem>
     )}
    />
    <Button disabled={loading} type ="submit">
        {loading? <Loading/> : 'Upload Media'}
    </Button>    
 </form>   
 </Form>
 </CardContent>
 </Card>
 )
 
}
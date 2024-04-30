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

// Temporarily
const FormSchema = z.object({
   name: z.string()
})

type FormSchemaType = z.infer<typeof FormSchema>
export default function CreatePipelineForm(){
 const {toast} = useToast();
 const form = useForm<FormSchemaType>({
    resolver:zodResolver(FormSchema),
    mode:'onChange',
    defaultValues:{
       name:'',
    }
 });

 const loading = form.formState.isLoading;
 const handleSubmit = async(values:FormSchemaType) =>{
    try{
        console.log(values)
        toast({title:'Created Pipeline'})
    }catch(err){
        console.log(err);
        toast({
            variant: 'destructive',
            title: 'Oppse!',
            description: 'could not create a new pipeline',
        })
    }
 }
 
 return(
 <Card className="bg-background/80 backdrop-blur-md">
 <CardHeader>
    <CardTitle>Pipeline Details</CardTitle>
    <CardDescription></CardDescription>
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
            <FormLabel>Pipeline Name</FormLabel>
            <FormControl>
                <Input placeholder="Name" {...field}/>
            </FormControl>
            <FormMessage/>
        </FormItem>
     )}
    />
    <Button disabled={loading} type ="submit">
        {loading? <Loading/> : 'Save'}
    </Button>    
 </form>   
 </Form>
 </CardContent>
 </Card>
 )
 
}
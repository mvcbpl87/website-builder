'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle,} from '../ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Loading from '../global/loading';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import FileUpload from '../global/file-upload';
import { UserRole } from '@/lib/enum';
import {z} from "zod";
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useToast } from '../ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Separator } from '../ui/separator';
import { Switch } from '../ui/switch';
import { TUser } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { UpdateUserCredentials } from '@/lib/drizzle/queries';

type Props = {
    agencyId?:string
    userData?:TUser
}
const userDataSchema = z.object({
    userName: z.string().min(1),
    userEmail: z.string().min(2),
    userAvatarUrl: z.string(),
    role: z.enum([UserRole.AGENCY_ADMIN, UserRole.AGENCY_OWNER, UserRole.SUBACCOUNT_USER, UserRole.SUBACCOUNT_GUEST])
});

export type UserCredentialsFormType = z.infer<typeof userDataSchema>
export default function UserDetails({userData, agencyId}:Props){
    const router = useRouter();
    const [subAccountPermission, setSubAccountPermission] = useState(null);
    const [roleState, setRoleState] = useState('');
    const [loadingPermissions, setLoadingPermissions] = useState();
    const [authUserData, setAuthUserData] = useState(null);
    const [isMounted, setMounted] = useState(false);
    useEffect(()=>setMounted(true),[]);

    const { toast } = useToast();
   
    const form = useForm<z.infer<typeof userDataSchema>>({
        resolver: zodResolver(userDataSchema),
        mode: 'onChange',
        defaultValues:{
            userName: userData?.name,
            userEmail: userData?.email,
            userAvatarUrl: userData?.avatarUrl,
            role: userData?.role || UserRole.AGENCY_OWNER
        }
    })
    const loading = form.formState.isSubmitting;
    const handleSubmit = async(values:z.infer<typeof userDataSchema>)=>{
        try{
            if(agencyId){
                const response = await UpdateUserCredentials(agencyId, values);
                if(!response) throw new Error('');
                toast({ 
                    title: 'Success',
                    description: 'Update User Information',})
            }
          
        }catch(err){
            console.log(err);
            toast({
                variant: 'destructive',
                title: 'Oppse!',
                description: 'Could not update user information',
            })
        }finally{
            router.refresh()
        }
    }
    if(!isMounted) return
    return(
    <Card className="w-full bg-muted/10">
    <CardHeader>
        <CardTitle>User Details</CardTitle>
        <CardDescription>Add or update your information</CardDescription>
    </CardHeader>
    <CardContent>
        
    <Form {...form}>
    <form className="space-y-5" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
        disabled={loading}
        control={form.control}
        name="userAvatarUrl"
        render={({ field }) => (
            <FormItem>
            <FormLabel>Profile picture</FormLabel>
            <FormControl>
                <FileUpload 
                  value = {field.value}
                 onChange={field.onChange}/>
            </FormControl>
            <FormMessage />
            </FormItem>
        )}
        />
        <FormField
        disabled={loading}
        control={form.control}
        name="userName"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>User full name</FormLabel>
            <FormControl>
              <Input
                // required
                placeholder="My name"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />
        <FormField
            disabled={loading}
            control={form.control}
            name="userEmail"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    readOnly={
                      userData?.role === UserRole.AGENCY_OWNER ||
                      form.formState.isSubmitting
                    }
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
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
                 onValueChange={(value)=> setRoleState(value)}
                >
                <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select user role..." />
                    </SelectTrigger>
                </FormControl>
                <SelectContent>
                { (userData?.role && userData?.role === UserRole.AGENCY_OWNER) &&
                  <SelectItem value={UserRole.AGENCY_OWNER}>
                  {UserRole.AGENCY_OWNER}
                  </SelectItem>
                }
                { [ UserRole.AGENCY_ADMIN, UserRole.SUBACCOUNT_USER, UserRole.SUBACCOUNT_GUEST].map( (role, index)=>(
                    <SelectItem key ={`selectItem-${index+1}`} value={role}>
                        {role}
                    </SelectItem>
                ))

                }
                </SelectContent>
                </Select>
                <p className="text-muted-foreground">{roleState}</p>
              </FormItem>
            )}
        />
        <Button disabled={loading} type ="submit">
            {loading? <Loading/> : 'Save User Details'}
        </Button>

    { userData?.role === UserRole.AGENCY_OWNER 
      && (<div >
            <Separator className='my-4'/>
            <FormLabel>User Permissions</FormLabel>
            <FormDescription className="mb-4">
                You can give Sub Account access to team member by turning on
                access control for each Sub Account. This is only visible to
                agency owners
            </FormDescription>
            <div className='flex items-center justify-between rounded-lg border p-4'>
                <div>Test Subaccount here</div>
                <Switch />
            </div>
        </div>)
        }
    </form>
    </Form>
    </CardContent>
    </Card>
    )
}
'use client'
import React, { useEffect } from 'react'
import { z } from 'zod'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Loading from '../global/loading'
import { useToast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'
import { CopyPlusIcon, Trash } from 'lucide-react'

const FormSchema = z.object({
    name:z.string(),
    pathName:z.string()

})
type FormSchemaType = z.infer<typeof FormSchema>
export default function  CreateFunnelPage (){
  const { toast } = useToast()
  const router = useRouter()
  //ch
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      pathName: '',
    },
  })

//   useEffect(() => {
//     if (defaultData) {
//       form.reset({ name: defaultData.name, pathName: defaultData.pathName })
//     }
//   }, [defaultData])

  const onSubmit = async(values:FormSchemaType) =>{
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Funnel Page</CardTitle>
        <CardDescription>
          Funnel pages are flow in the order they are created by default. You
          can move them around to change their order.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              disabled={form.formState.isSubmitting}
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
            //   disabled={form.formState.isSubmitting || order === 0}
             disabled={form.formState.isSubmitting }
              control={form.control}
              name="pathName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Path Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Path for the page"
                      {...field}
                      value={field.value?.toLowerCase()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-2">
              <Button
                className="w-22 self-end"
                disabled={form.formState.isSubmitting}
                type="submit"
              >
                {form.formState.isSubmitting ? <Loading /> : 'Save Page'}
              </Button>
              {/* defaultData?.id */}
              {true && (
                <Button
                  variant={'outline'}
                  className="w-22 self-end border-destructive text-destructive hover:bg-destructive"
                  disabled={form.formState.isSubmitting}
                  type="button"
                //   onClick={async () => {
                //     const response = await deleteFunnelePage(defaultData.id)
                //     await saveActivityLogsNotification({
                //       agencyId: undefined,
                //       description: `Deleted a funnel page | ${response?.name}`,
                //       subaccountId: subaccountId,
                //     })
                //     router.refresh()
                //   }}
                >
                  {form.formState.isSubmitting ? <Loading /> : <Trash />}
                </Button>
              )}
              {/* defaultData?.id */}
              { true && (
                <Button
                  variant={'outline'}
                  size={'icon'}
                  disabled={form.formState.isSubmitting}
                  type="button"
                //   onClick={async () => {
                //     const response = await getFunnels(subaccountId)
                //     const lastFunnelPage = response.find(
                //       (funnel) => funnel.id === funnelId
                //     )?.FunnelPages.length

                //     await upsertFunnelPage(
                //       subaccountId,
                //       {
                //         ...defaultData,
                //         id: v4(),
                //         order: lastFunnelPage ? lastFunnelPage : 0,
                //         visits: 0,
                //         name: `${defaultData.name} Copy`,
                //         pathName: `${defaultData.pathName}copy`,
                //         content: defaultData.content,
                //       },
                //       funnelId
                //     )
                //     toast({
                //       title: 'Success',
                //       description: 'Saves Funnel Page Details',
                //     })
                //     router.refresh()
                //   }}
                >
                  {form.formState.isSubmitting ? <Loading /> : <CopyPlusIcon />}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

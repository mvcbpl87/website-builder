"use client"
import { Button } from '@/components/ui/button'
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
} from '@/components/ui/alert-dialog'
import { toast } from '@/components/ui/use-toast'
import CreatePipelineForm from '@/components/forms/create-pipeline-form'

type Props = {
    subAccountId?: string
    pipelines?: any[]
    pipelineId?: string
}

export default function PipelineSettings(){
 return(
 <AlertDialog>
    <div className="flex items-center justify-between mb-4">
    <AlertDialogTrigger asChild>
        <Button variant="destructive" >
            Delete Pipeline
        </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Delete</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
    </div>
    <CreatePipelineForm/>
 </AlertDialog>
 )
}
'use client'

import * as React from 'react';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from '@/components/ui/form'
  import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
  } from '@/components/ui/card';
  import { toast } from '../ui/use-toast'
import { useModal } from '@/providers/modal-provider'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { LaneFormSchema } from '@/lib/types';
import { Lane } from '@prisma/client';
import { getPipelineDetails, saveActivityLogsNotification, upsertLane } from '@/lib/queries';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Loading from '../global/loading';

export interface ILaneFormProps {
    defaultData?: Lane
    pipelineId: string
}

export function LaneForm ({defaultData, pipelineId}: ILaneFormProps) {
    const { setClose } = useModal()
    const router = useRouter()
    const form = useForm<z.infer<typeof LaneFormSchema>>({
      mode: 'onChange',
      resolver: zodResolver(LaneFormSchema),
      defaultValues: {
        name: defaultData?.name || '',
      },
    })
  
    React.useEffect(() => {
      if (defaultData) {
        form.reset({
          name: defaultData.name || '',
        })
      }
    }, [defaultData])
  
    const isLoading = form.formState.isLoading
  
    const onSubmit = async (values: z.infer<typeof LaneFormSchema>) => {
      if (!pipelineId) return
      try {
        const response = await upsertLane({
          ...values,
          id: defaultData?.id,
          pipelineId: pipelineId,
          order: defaultData?.order,
        })
  
        const d = await getPipelineDetails(pipelineId)
        if (!d) return
  
        await saveActivityLogsNotification({
          agencyId: undefined,
          description: `Updated a lane | ${response?.name}`,
          subaccountId: d.subAccountId,
        })
  
        toast({
          title: 'Success',
          description: 'Saved pipeline details',
        })
  
        router.refresh()
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Oppse!',
          description: 'Could not save pipeline details',
        })
      }
      setClose()
    }
  return (
    <Card className="w-full ">
    <CardHeader>
      <CardTitle>Lane Details</CardTitle>
    </CardHeader>
    <CardContent>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            disabled={isLoading}
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lane Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Lane Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="w-20 mt-4"
            disabled={isLoading}
            type="submit"
          >
            {form.formState.isSubmitting ? <Loading /> : 'Save'}
          </Button>
        </form>
      </Form>
    </CardContent>
  </Card>
  );
}

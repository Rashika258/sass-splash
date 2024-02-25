import * as React from 'react';
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '../ui/button';
import Loading from '../global/loading';
import { FileUpload } from '../global/file-upload';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useModal } from '@/providers/modal-provider';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { CreateFunnelFormSchema } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { saveActivityLogsNotification, upsertFunnel } from '@/lib/queries';
import { v4 } from 'uuid';
import { toast } from '../ui/use-toast';
import { Funnel } from '@prisma/client';

export interface IFunnelFormProps {
    defaultData?: Funnel
    subAccountId: string
}

export function FunnelForm ({defaultData, subAccountId}: IFunnelFormProps) {
    const { setClose } = useModal()
    const router = useRouter()
    const form = useForm<z.infer<typeof CreateFunnelFormSchema>>({
      mode: 'onChange',
      resolver: zodResolver(CreateFunnelFormSchema),
      defaultValues: {
        name: defaultData?.name || '',
        description: defaultData?.description || '',
        favicon: defaultData?.favicon || '',
        subDomainName: defaultData?.subDomainName || '',
      },
    })
  
    React.useEffect(() => {
      if (defaultData) {
        form.reset({
          description: defaultData.description || '',
          favicon: defaultData.favicon || '',
          name: defaultData.name || '',
          subDomainName: defaultData.subDomainName || '',
        })
      }
    }, [defaultData])
  
    const isLoading = form.formState.isLoading
  
    const onSubmit = async (values: z.infer<typeof CreateFunnelFormSchema>) => {
      if (!subAccountId) return
      const response = await upsertFunnel(
        subAccountId,
        { ...values, liveProducts: defaultData?.liveProducts || '[]' },
        defaultData?.id || v4()
      )
      await saveActivityLogsNotification({
        agencyId: undefined,
        description: `Update funnel | ${response.name}`,
        subaccountId: subAccountId,
      })
      if (response)
        toast({
          title: 'Success',
          description: 'Saved funnel details',
        })
      else
        toast({
          variant: 'destructive',
          title: 'Oppse!',
          description: 'Could not save funnel details',
        })
      setClose()
      router.refresh()
    }
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Funnel Details</CardTitle>
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
                  <FormLabel>Funnel Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading}
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Funnel Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit more about this funnel."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading}
              control={form.control}
              name="subDomainName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub domain</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Sub domain for funnel"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading}
              control={form.control}
              name="favicon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Favicon</FormLabel>
                  <FormControl>
                    <FileUpload
                      apiEndPoint="subaccountLogo"
                      value={field.value}
                      onChange={field.onChange}
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

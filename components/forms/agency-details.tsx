"use client";

import { Agency } from "@prisma/client";
import * as React from "react";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { AlertDialog } from "../ui/alert-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod"
import { Form } from "../ui/form";

export interface IAgencyDetailsFormProps {
  data?: Partial<Agency>;
}

const FormSchema = z.object({
    name: z.string().min(2, { message: 'Agency name must be atleast 2 chars.' }),
    companyEmail: z.string().min(1),
    companyPhone: z.string().min(1),
    whiteLabel: z.boolean(),
    address: z.string().min(1),
    city: z.string().min(1),
    zipCode: z.string().min(1),
    state: z.string().min(1),
    country: z.string().min(1),
    agencyLogo: z.string().min(1),
})

export default function AgencyDetails({ data }: IAgencyDetailsFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [deletingAgency, setDeletingAgency] = React.useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues:{
        name: data?.name,
        companyEmail: data?.companyEmail,
        companyPhone: data?.companyPhone,
        whiteLabel: data?.whiteLabel || false,
        address: data?.address,
        city: data?.city,
        zipCode: data?.zipCode,
        state: data?.state,
        country: data?.country,
        agencyLogo: data?.agencyLogo,
    }
  })

  React.useEffect(()=>{
    if(data) {
        form.reset(data)
    }
  },[data])

  const handleSubmit = async () =>{

  }

  return (
    <AlertDialog>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Agency Information</CardTitle>
          <CardDescription>
            Lets create an agency for you business. You can edit agency settings
            later from the agency settings tab.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4"></form>
            </Form>
        </CardContent>
      </Card>
    </AlertDialog>
  );
}

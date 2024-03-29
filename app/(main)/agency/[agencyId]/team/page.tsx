import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import * as React from "react";
import DataTable from "./data-table";
import { Plus } from "lucide-react";
import { SendInvitationForm } from "@/components/forms/send-invitation";
import { columns } from "./columns";

export interface ITeamPageProps {
  params: { agencyId: string };
}

export default async function TeamPage({ params }: ITeamPageProps) {
  const authUser = await currentUser();
  const teamMembers = await db.user.findMany({
    where: {
      Agency: {
        id: params.agencyId,
      },
    },
    include: {
      Agency: { include: { SubAccount: true } },
      Permissions: { include: { SubAccount: true } },
    },
  });

  if (!authUser) return null;
  const agencyDetails = await db.agency.findUnique({
    where: {
      id: params.agencyId,
    },
    include: {
      SubAccount: true,
    },
  });

  if (!agencyDetails) return;
  return (
    <DataTable
      actionButtonText={
        <>
          <Plus size={15} />
          Add
        </>
      }
      modalChildren={<SendInvitationForm agencyId={agencyDetails.id} />}
      filterValue="name"
      columns={columns}
      data={teamMembers}
    ></DataTable>
  );
}

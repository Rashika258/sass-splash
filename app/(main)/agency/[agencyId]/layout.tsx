import { verifyAndAcceptInvitation } from "@/lib/queries";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import * as React from "react";

export interface ILayoutProps {
  children: React.ReactNode;
  params: {
    agencyId: string;
  };
}

export default async function Layout({ children, params }: ILayoutProps) {
  const agencyId = await verifyAndAcceptInvitation();
  const user = await currentUser();
  if (!user) {
    return redirect("/");
  }

  if (!agencyId) {
    return redirect("/agency");
  }

  if (
    user.privateMetadata.role !== "AGENCY_OWNER" &&
    user.privateMetadata.role !== "AGENCY_ADMIN"
  )
    return <div>Layout</div>;
}

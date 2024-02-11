import { getAuthUserDetails, verifyAndAcceptInvitation } from "@/lib/queries";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const Agency = async () => {
  const authUser = await currentUser();
  if (!authUser) return redirect("/sign-in");

  const agencyId = await verifyAndAcceptInvitation()
console.log("agencyId=================", agencyId);

  // get user details
  const user = await getAuthUserDetails();
  return <div>Agency</div>;
};

export default Agency;

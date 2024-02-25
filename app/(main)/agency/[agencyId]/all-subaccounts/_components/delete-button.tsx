import {
  deleteSubAccount,
  getSubaccountDetails,
  saveActivityLogsNotification,
} from "@/lib/queries";
import { useRouter } from "next/navigation";
import * as React from "react";

export interface IDeleteButtonProps {
  subaccountId: string;
}

export function DeleteButton({ subaccountId }: IDeleteButtonProps) {
  const router = useRouter();
  return (
    <div
      className="text-white"
      onClick={async () => {
        const response = await getSubaccountDetails(subaccountId);
        await saveActivityLogsNotification({
          agencyId: undefined,
          description: `Deleted a subaccount | ${response?.name}`,
          subaccountId,
        });
        await deleteSubAccount(subaccountId);
        router.refresh();
      }}
    >
      Delete Sub Account
    </div>
  );
}

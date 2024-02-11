import { getAuthUserDetails } from '@/lib/queries';
import * as React from 'react';

export interface ISidebarProps {
    id: string,
    type: 'agency' | 'subaccount'
}

export default async function Sidebar ({id, type}: ISidebarProps) {
    const user = await getAuthUserDetails();
    if(!user) return null;

    if(!user.Agency) return;

    const details = type === "agency" ? user?.Agency : user?.Agency?.SubAccount.find((subAccount) => subAccount.id === id )

    const isWhiteLabelAgency = user?.Agency?.whiteLabel;
    if(!details) return;

    let sideBarLogo = user?.Agency.agencyLogo || '/assets/plura-logo.svg';

    if(!isWhiteLabelAgency) {
        if(type === "subaccount") {
            sideBarLogo = user?.Agency?.SubAccount?.find((subAccount) => subAccount.id === id)?.subAccountLogo || user.Agency.agencyLogo
        }
    }
  return (
    <div>
      
    </div>
  );
}

import { verifyAndAcceptInvitation } from '@/lib/queries';
import { currentUser } from '@clerk/nextjs';
import * as React from 'react';

export interface ILayoutProps {
    children: React.ReactNode
    params: {
        agencyId : string
    }
}

export default async function Layout ({children, params}: ILayoutProps) {
    const agencyId = await verifyAndAcceptInvitation();
    const user = await currentUser();
    if(!user) {
        
    }
  return (
    <div>
      
    </div>
  );
}

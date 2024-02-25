import { getDomainContent } from '@/lib/queries';
import EditorProvider from '@/providers/editor/editor-provider';
import { notFound } from 'next/navigation';
import * as React from 'react';

export interface IPageProps {
  params: { domain: string; path: string }
}

export async function Page ({params}: IPageProps) {
  const domainData = await getDomainContent(params.domain.slice(0, -1))
  const pageData = domainData?.FunnelPages.find(
    (page) => page.pathName === params.path
  )

  if (!pageData || !domainData) return notFound()

  return (
    <EditorProvider
    subaccountId={domainData.subAccountId}
    pageDetails={pageData}
    funnelId={domainData.id}
  >
    <FunnelEditor
      funnelPageId={pageData.id}
      liveMode={true}
    />
  </EditorProvider>
  );
}

import Unauthorized from '@/components/unauthorized';
import * as React from 'react';

export interface IPageProps {
}

export default function Page (props: IPageProps) {
  return (
    <Unauthorized />
  );
}

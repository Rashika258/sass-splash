import { ProgressCircle } from '@tremor/react';
import * as React from 'react';

export interface ICircularProgressProps {
    value : number,
    description: React.ReactNode
}

export default function CircularProgress ({description, value = 0}: ICircularProgressProps) {
  return (
    <div className="flex gap-4 items-center">
    <ProgressCircle
      showAnimation={true}
      value={value}
      radius={70}
      strokeWidth={20}
    >
      {value}%
    </ProgressCircle>
    <div>
      <b>Closing Rate</b>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
  );
}

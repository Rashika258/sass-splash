import * as React from 'react';
import { Button } from '../ui/button';
import CustomModal from '../global/custom-modal';
import { UploadMediaForm } from '../forms/upload-media';
import { useModal } from '@/providers/modal-provider';

export interface IMediaUploadButtonProps {
    subaccountId: string
}

export default function MediaUploadButton ({subaccountId}: IMediaUploadButtonProps) {
    const { isOpen, setOpen, setClose } = useModal()
  return (
    <Button
      onClick={() => {
        setOpen(
          <CustomModal
            title="Upload Media"
            subheading="Upload a file to your media bucket"
          >
            <UploadMediaForm subaccountId={subaccountId}></UploadMediaForm>
          </CustomModal>
        )
      }}
    >
      Upload
    </Button>
  );
}

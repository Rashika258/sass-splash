
'use client'
import { useModal } from "@/providers/modal-provider";
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export interface ICustomModalProps {
  title: string;
  subheading: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function CustomModal({
  title,
  subheading,
  defaultOpen,
  children,
}: ICustomModalProps) {
  const { isOpen, setClose } = useModal();
  return (
    <Dialog open={isOpen || defaultOpen} onOpenChange={setClose}>
      <DialogContent className="overflow-scroll md:max-h-[700px] md:h-fit h-screen bg-card">
        <DialogHeader className="pt-8 text-left">
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          <DialogDescription>{subheading}</DialogDescription>
          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

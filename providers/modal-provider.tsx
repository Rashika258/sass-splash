"use client";

import { PricesList, TicketDetails } from "@/lib/types";
import { Agency, Contact, Plan, User } from "@prisma/client";
import * as React from "react";

interface IModalProviderProps {
  children: React.ReactNode;
}

export type ModalData = {
  user?: User;
  agency?: Agency;
  ticket?: TicketDetails[0];
  contact?: Contact;
  plans?: {
    defaultPriceId: Plan;
    plans: PricesList["data"];
  };
};

type ModalContextType = {
  data: ModalData;
  isOpen: boolean;
  setOpen: (modal: React.ReactNode, fetchData?: () => Promise<any>) => void;
  setClose: () => void;
};

export const ModalContext = React.createContext<ModalContextType>({
  data: {},
  isOpen: false,
  setOpen: (modal: React.ReactNode, fetchData?: () => Promise<any>) => {},
  setClose: () => {},
});

const ModalProvider: React.FunctionComponent<IModalProviderProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [data, setData] = React.useState<ModalData>({});
  const [showingModal, setShowingModal] = React.useState<React.ReactNode>(null);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  const setOpen = async (
    modal: React.ReactNode,
    fetchData?: () => Promise<any>
  ) => {
    if (modal) {
      if (fetchData) {
        setData({ ...data, ...(await fetchData()) } || {});
      }
      setShowingModal(modal);
      setIsOpen(true);
    }
  };
  const setClose = () => {
    setIsOpen(false);
    setData({});
  };
  if (!isMounted) return null;
  return (
    <ModalContext.Provider value={{ data, setOpen, setClose, isOpen }}>
      {children}
      {showingModal}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within the modal provider");
  }
  return context;
};

export default ModalProvider;

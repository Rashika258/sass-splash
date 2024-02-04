import Navigation from "@/components/site/navigation";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="h-full w-full">
      <Navigation />
      {children}
    </main>
  );
};

export default layout;

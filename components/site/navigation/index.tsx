import { User } from "@clerk/nextjs/server";
import Image from "next/image";
import React from "react";

type NavigationProps = {
  user?: null | User;
};

const Navigation = ({ user }: NavigationProps) => {
  return (
    <div className="p-4 flex items-center justify-between relative">
      <aside className="flex items-center gap-2">
        <Image
          src={"./assets/plura-logo.svg"}
          width={40}
          height={40}
          alt="Logo"
        />
        <span className="text-xl font-bold">Splash</span>
        
      </aside>
      <nav className="hidden mg:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
<ul className="flex items-center justify-center gap-8">
    
</ul>
      </nav>
    </div>
  );
};

export default Navigation;

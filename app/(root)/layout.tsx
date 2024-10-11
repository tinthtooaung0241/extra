import AsideNavBar from "@/components/aside-navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const SetUpPageLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  return (
    <div className="mx-auto my-4 max-w-7xl">
      <AsideNavBar />
      <main className="flex-1 px-4 pt-4 md:ml-64">{children}</main>
    </div>
  );
};

export default SetUpPageLayout;

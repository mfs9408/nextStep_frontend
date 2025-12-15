"use client";
import CreateResumeView from "@/views/CreateResumeView/CreateResumeView";
import { useSessionContext } from "@/components/SessionProvider";
import React from "react";

const Page = () => {
  const { user } = useSessionContext();

  if (!user) {
    return;
  }

  return <CreateResumeView user={user} />;
};

export default Page;

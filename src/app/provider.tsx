"use client";

import React, { type PropsWithChildren } from "react";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";

export type ProvidersProps = PropsWithChildren;

export const Providers = (props: ProvidersProps) => {
  return (
    <SessionProvider>
      <Toaster />
      {props.children}
    </SessionProvider>
  );
};

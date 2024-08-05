/* eslint-disable @next/next/no-img-element */
"use client";

import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "./ui/button";

const ButtonSignin = ({
  text = "Get started",
}: {
  text?: string;
  extraStyle?: string;
}) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleClick = async () => {
    if (status === "authenticated") {
      router.push("/dashboard");
    } else {
      await signIn(undefined, { callbackUrl: "/dashboard" });
    }
  };

  if (status === "authenticated") {
    return (
      <Link
        href={"/dashboard"}
        className={buttonVariants({ variant: "outline" })}
      >
        {session.user?.image ? (
          <img
            src={session.user?.image}
            alt={session.user?.name ?? "Account"}
            className="h-6 w-6 shrink-0 rounded-full"
            referrerPolicy="no-referrer"
            width={24}
            height={24}
          />
        ) : (
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
            {session.user?.name?.charAt(0) ?? session.user?.email?.charAt(0)}
          </span>
        )}
        {session.user?.name ?? session.user?.email ?? "Account"}
      </Link>
    );
  }

  return <Button onClick={handleClick}>{text}</Button>;
};

export default ButtonSignin;

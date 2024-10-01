"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import { getFirstLetterOfName, isValidURL } from "@/lib/utils";
import useCurrentUser from "@/hooks/api/useCurrentUser";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const User = () => {
  const router = useRouter();
  const { data: userData } = useCurrentUser();
  const letter = getFirstLetterOfName(userData?.data?.name as string);

  const src = `https://ui-avatars.com/api/?name=${
    userData?.data?.name || "-"
  }&background=random`;

  const generateURL = (img: string) => {
    return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID}/files/${img}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
  };

  const profile = useMemo(() => {
    if (userData?.data?.profileImage) {
      if (isValidURL(userData?.data?.profileImage)) {
        return userData?.data?.profileImage;
      }
      return generateURL(userData?.data?.profileImage);
    }
    return src;
    // eslint-disable-next-line
  }, [userData?.data?.profileImage]);
  console.log(profile);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-9 w-9 cursor-pointer">
          <AvatarImage src={profile} />
          <AvatarFallback >{letter}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>{userData?.data?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => {
            router.push("/dashboard");
          }}
        >
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => {
            router.push("/settings");
          }}
        >
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default User;

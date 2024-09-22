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
import { getFirstLetterOfName } from "@/lib/utils";
import useCurrentUser from "@/hooks/api/useCurrentUser";
import { useRouter } from "next/navigation";

const User = () => {
  const router = useRouter();
  const { data: userData } = useCurrentUser();
  const letter = getFirstLetterOfName(userData?.data?.name as string);
  const src = `https://ui-avatars.com/api/?name=${
    userData?.data?.name || "-"
  }&background=random`;

  const profile =
    userData?.data?.profileImage || src || "/placeholder-user.jpg";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-9 w-9 cursor-pointer">
          <AvatarImage src={profile} />
          <AvatarFallback>{letter}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>{userData?.data?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => {
            router.push("/settings");
          }}
        >
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="cursor-pointer" 
          onClick={() => signOut()}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default User;

"use client"

import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Separator } from "./ui/separator";
import { navItems } from "@/constants";
import Link from "next/link";
import FileUploader from "./FileUploader";
import { Button } from "./ui/button";
import { signOutUser } from "@/lib/actions/user.actions";

const MobileNavigation = ({ ownerId, accountId, fullName, email, avatar }: { ownerId: string, accountId: string, fullName: string, email: string, avatar: string }) => {

    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    return (
        <header className="flex h-[60px] justify-between px-5 sm:hidden">
            <Image src="/assets/icons/logo-full-brand.svg" alt="logo" width={120} height={52} className="h-auto" />

            <Sheet open={open} onOpenChange={setOpen}>
  <SheetTrigger>
    <Image src="/assets/icons/menu.svg" alt="Search" width={30} height={30} />
    </SheetTrigger>
  <SheetContent className="pt-0 h-screen px-3">
      <SheetTitle>
            <div className="my-3 flex items-center gap-2 rounded-full p-1 text-[#333F4E] sm:justify-center sm:bg-[#FA7275]/10 lg:justify-start lg:p-3">
                <Image src={avatar} alt="user avatar" width={44} height={44} className="aspect-square w-10 rounded-full object-cover" />
                <div className="sm:hidden lg:block">
                    <p className="text-[14px] leading-[20px] font-semibold capitalize">{fullName}</p>
                    <p className="text-[12px] leading-[16px] font-normal">{email}</p>
                </div>
            </div>
            <Separator />
        </SheetTitle>

        <nav className="text-[16px] leading-[24px] font-semibold flex-1 gap-1 text-[#FA7275]">
            <ul className="flex flex-1 flex-col gap-4">
            {navItems.map(({ url, name, icon }) => {
                        return (
                            <Link key={name} href={url} className="lg:w-full">
                                <li className={`flex text-[#333F4E] gap-4 w-full justify-start items-center h5 px-6 h-[52px] rounded-full ${pathname === url && "bg-[#FA7275] text-white shadow-drop-2"}`}>
                                    <Image src={icon} alt={name} width={24} height={24} className={`w-6 filter invert opacity-25 ${pathname === url && "invert-0 opacity-100"}`} />
                                    <p>{name}</p>
                                </li>
                            </Link>
                        )
                    })}
            </ul>
        </nav>

        <Separator />

        <div className="flex flex-col justify-between gap-5 pb-5">
            <FileUploader ownerId={ownerId} accountId={accountId} />

            <Button type="submit" className="text-[16px] leading-[24px] font-semibold flex h-[52px] w-full items-center gap-4 rounded-full bg-[#FA7275]/10 px-6 text-[#FA7275] shadow-none transition-all hover:bg-[#FA7275]/20" onClick={async () => await signOutUser()}>
                <Image src="/assets/icons/logout.svg" alt="Logout" width={24} height={24} />
            </Button>
        </div>

  </SheetContent>
</Sheet>
        </header>
    )
}

export default MobileNavigation;
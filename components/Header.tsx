import { Button } from "@/components/ui/button";
import Image from "next/image";
import Search from "@/components/Search";
import FileUploader from "@/components/FileUploader";
import { signOutUser } from "@/lib/actions/user.actions";

const Header = ({ userId, accountId }: { userId: string, accountId: string }) => {
    return (
        <header className="hidden items-center justify-between gap-5 p-5 sm:flex lg:py-7 xl:gap-10 w-full">
            <Search />

            <div className="flex items-center min-w-fit gap-4">
                <FileUploader ownerId={userId} accountId={accountId} />

                <form action={async () => {
                    'use server'

                    await signOutUser()
                }}>
                    <Button type="submit" className="flex-center h-[52px] min-w-[54px] items-center rounded-full bg-[#FA7275]/10 p-0 text-[#FA7275] shadow-none transition-all hover:bg-[#FA7275]/20">
                        <Image src="/assets/icons/logout.svg" alt="Logout" width={24} height={24} className="w-6" />
                    </Button>
                </form>
            </div>
        </header>
    )
}

export default Header;
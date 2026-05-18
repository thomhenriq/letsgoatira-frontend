import Image from "next/image";
import { Link } from "./link";

export function Header() {
    return (
        <header className="w-full p-4 border border-zinc-200 rounded-sm mt-4 md:mt-8 flex items-center bg-zinc-50 gap-4">
            <Image src="/logo.png" alt="Let's Go Atira Logo" width={518} height={171} className="w-32 md:w-40 shrink-0" />

            <div className="w-full justify-end items-center flex gap-3 md:gap-4 flex-wrap">
                <Link href="https://github.com/thomhenriq/letsgoatira-backend">
                    Github API
                </Link>
                <Link href="https://github.com/thomhenriq/letsgoatira-frontend">
                    Github Web
                </Link>
            </div>
        </header>
    )
}
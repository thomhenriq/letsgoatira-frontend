import Image from "next/image";
import { Link } from "./link";

export function Header() {
    return (
        <header className="w-full p-4 border border-zinc-200 rounded-sm mt-8 flex items-center bg-zinc-50">
            <Image src="/logo.png" alt="Let's Go Atira Logo" width={518} height={171} className="w-40" />

            <div className="w-full justify-end items-center flex gap-4">
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
import { Link } from "./link";

export function Sidebar() {
    return (
        <aside className="col-span-1 p-4 border border-zinc-200 rounded-sm h-fit bg-zinc-50">
            <nav className="flex md:flex-col flex-row gap-1">
                <Link href='/'>
                    Home
                </Link>
                <Link href='/eventos'>
                    Eventos
                </Link>
                <Link href='/membros'>
                    Membros
                </Link>
            </nav>
        </aside>
    )
}
import { Header } from "@/components/header";
import { Link } from "@/components/link";
import { Sidebar } from "@/components/sidebar";
import { PropsWithChildren } from "react";

export default function AppLayout({ children }: PropsWithChildren) {
    return (
        <div className="max-w-6xl mx-auto w-full h-screen space-y-8">
            <Header />
            <div className="w-full grid grid-cols-4 gap-8">
                <Sidebar />
                <main className="col-span-3 p-4 border border-zinc-200 rounded-sm overflow-x-hidden bg-zinc-50">
                    {children}
                </main>
            </div>
        </div>
    )
}
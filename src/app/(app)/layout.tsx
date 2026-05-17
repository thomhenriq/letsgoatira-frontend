import { Header } from "@/components/header";
import { PropsWithChildren } from "react";

export default function AppLayout({ children }: PropsWithChildren) {
    return (
        <div className="max-w-6xl mx-auto w-full h-screen space-y-8">
            <Header />
            <main className="p-4 border border-zinc-200 rounded-sm overflow-x-hidden bg-zinc-50">
                {children}
            </main>
        </div>
    )
}
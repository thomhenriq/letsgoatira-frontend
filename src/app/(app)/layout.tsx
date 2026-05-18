import { Header } from "@/components/header";
import { NewEventDialog } from "@/components/new-event-dialog";
import { NewMemberDialog } from "@/components/new-member-dialog";
import { Sidebar } from "@/components/sidebar";
import { PropsWithChildren } from "react";

export default function AppLayout({ children }: PropsWithChildren) {
    return (
        <div className="max-w-6xl mx-auto w-full min-h-screen px-4 pb-8 space-y-4 md:space-y-8">
            <Header />
            <div className="w-full flex flex-col gap-4 md:grid md:grid-cols-4 md:gap-8">
                <Sidebar />
                <div className="md:col-span-3 space-y-4">
                    <div className="flex gap-3 items-center justify-end">
                        <NewEventDialog />
                        <NewMemberDialog />
                    </div>
                    <main className="p-4 border border-zinc-200 rounded-sm overflow-x-hidden bg-zinc-50">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    )
}
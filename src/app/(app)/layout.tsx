import { PropsWithChildren } from "react";

export default function AppLayout({children}: PropsWithChildren) {
    return (
        <div className="max-w-6xl mx-auto w-full h-screen">
            {children}
        </div>
    )
}
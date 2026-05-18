import { ButtonHTMLAttributes } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ children, ...props }: ButtonProps) {
    return (
        <button className="flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors bg-primary text-white hover:bg-primary/90" {...props}>
            {children}
        </button>
    )
}

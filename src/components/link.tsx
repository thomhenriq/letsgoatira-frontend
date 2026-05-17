import BaseLink, { LinkProps } from "next/link";
import { PropsWithChildren } from "react";

export function Link({ children, ...props }: LinkProps & PropsWithChildren) {
    return (
        <BaseLink {...props} className="block text-sm hover:underline hover:text-primary">
            {children}
        </BaseLink>
    )
}

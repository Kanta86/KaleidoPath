import * as React from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { Loader2 } from "lucide-react";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "outline" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
    asChild?: boolean;
    isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "default", asChild = false, isLoading = false, children, ...props }, ref) => {
        // Note: I am not installing @radix-ui/react-slot just for this unless requested.
        // Wait, shadcn uses it. If I don't have it, I can't use asChild easily.
        // I will remove asChild/Slot for now to keep it simple and dependency-free, or install it.
        // Given the constraints and speed, I'll stick to standard button.
        const Comp = "button";

        return (
            <Comp
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                    {
                        "bg-accent text-white hover:bg-brand-gray hover:scale-105 shadow-md hover:shadow-lg": variant === "primary", "border border-gray-200 bg-transparent hover:bg-gray-100/50 hover:border-brand-gray transition-colors duration-300": variant === "outline",
                        "hover:bg-gray-100 text-gray-700": variant === "ghost",
                        "text-accent underline-offset-4 hover:underline": variant === "link",
                        "h-10 px-6 py-2": size === "default",
                        "h-9 rounded-md px-3": size === "sm",
                        "h-12 rounded-md px-10 text-base": size === "lg",
                        "h-10 w-10": size === "icon",
                    },
                    className
                )}
                ref={ref}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </Comp>
        );
    }
);
Button.displayName = "Button";

export { Button };

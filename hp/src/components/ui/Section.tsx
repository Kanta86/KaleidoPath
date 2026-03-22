import { cn } from "@/lib/utils";
import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    containerClassName?: string;
    id?: string;
}

export function Section({
    children,
    className,
    containerClassName,
    id,
    ...props
}: SectionProps) {
    return (
        <section
            id={id}
            className={cn("w-full py-16 md:py-24", className)}
            {...props}
        >
            <div
                className={cn(
                    "container mx-auto px-4 md:px-6",
                    containerClassName
                )}
            >
                {children}
            </div>
        </section>
    );
}

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    subtitle?: string;
    centered?: boolean;
}

export function SectionHeader({
    title,
    subtitle,
    centered = true,
    className,
    ...props
}: SectionHeaderProps) {
    return (
        <div
            className={cn(
                "mb-12 flex flex-col gap-4",
                centered && "items-center text-center",
                className
            )}
            {...props}
        >
            <h2 className="relative inline-block text-3xl font-bold tracking-tighter md:text-4xl">
                {title}
                <span className="absolute -bottom-2 left-0 h-1 w-full bg-accent opacity-30" />
            </h2>
            {subtitle && (
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    {subtitle}
                </p>
            )}
        </div>
    );
}

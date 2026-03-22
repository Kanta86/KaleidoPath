"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { GOOGLE_FORM_URL } from "@/lib/constants";

export function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const navigation = [
        { name: "Services", href: "/services" },
        { name: "Work", href: "/work" },
        { name: "Method", href: "/method" },
        { name: "Partners", href: "/partners" },
        { name: "About", href: "/about" },
    ];

    const goContact = () => {
        window.open(GOOGLE_FORM_URL, "_blank");
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2">
                    {/* Using text specific style or img tag if logo.svg is ready */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/kplogo.png" alt="KaleidoPath" className="h-8 md:h-10" />
                </Link>
                <nav className="hidden md:flex gap-6 items-center">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium transition-colors hover:text-accent"
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Button onClick={goContact}>無料相談する</Button>
                </nav>
                <button
                    className="md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>
            {isOpen && (
                <div className="border-b bg-background md:hidden">
                    <div className="container flex flex-col gap-4 p-4">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium hover:text-accent"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Button onClick={() => { setIsOpen(false); goContact(); }} className="w-full">
                            無料相談する
                        </Button>
                    </div>
                </div>
            )}
        </header>
    );
}

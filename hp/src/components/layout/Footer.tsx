import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto flex flex-col items-center gap-4 py-10 md:h-24 md:flex-row md:justify-between md:py-0 px-4 md:px-6">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <Link href="/">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/kplogo.png" alt="KaleidoPath" className="h-6" />
                    </Link>
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        © 2024 KaleidoPath Inc. All rights reserved.
                    </p>
                </div>
                <div className="flex gap-4">
                    <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
                        Contact
                    </Link>
                </div>
            </div>
        </footer>
    );
}

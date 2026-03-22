import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";
import { WorkCase } from "@/content/work";
import { Badge } from "lucide-react"; // Wait, I meant badge UI? I don't have Badge UI. I'll make a simple span.
// I will create a simple Badge-like span.

export function WorkCard({ work }: { work: WorkCase }) {
    return (
        <Link href={`/work/${work.slug}`} className="group block h-full">
            <Card className="h-full overflow-hidden border-0 bg-transparent shadow-none hover:shadow-xl transition-all duration-500 rounded-xl relative">
                <div className="aspect-video w-full overflow-hidden bg-gray-100 relative rounded-xl">
                    <div className="absolute inset-0 bg-brand-gray/0 transition-colors duration-500 group-hover:bg-brand-gray/10 z-10" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={work.thumbnail}
                        alt={work.title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-gray rounded-full shadow-sm z-20">
                        {work.category}
                    </div>
                </div>
                <CardHeader className="px-2 pt-6">
                    <CardTitle className="text-xl group-hover:text-accent transition-colors duration-300">
                        {work.title}
                    </CardTitle>
                    <CardDescription className="text-brand-gray">{work.industry}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-gray-500 line-clamp-3">
                        {work.summary}
                    </p>
                </CardContent>
            </Card>
        </Link>
    );
}

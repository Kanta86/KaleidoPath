import { Section } from "@/components/ui/Section";
import { workCases } from "@/content/work";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface PageProps {
    params: { slug: string };
}

export async function generateStaticParams() {
    return workCases.map((work) => ({
        slug: work.slug,
    }));
}

export default function WorkDetailPage({ params }: PageProps) {
    const work = workCases.find((w) => w.slug === params.slug);

    if (!work) {
        notFound();
    }

    return (
        <div className="pt-20">
            <div className="bg-gray-900 text-white py-10 px-4">
                <div className="container mx-auto">
                    <Link href="/work" className="inline-flex items-center text-sm text-gray-400 hover:text-accent mb-6">
                        <ArrowLeft className="mr-2 h-4 w-4" /> 事例一覧に戻る
                    </Link>
                    <div className="flex gap-4 items-center mb-4">
                        <span className="bg-accent text-white px-3 py-1 text-sm font-bold rounded-full">{work.category}</span>
                        <span className="text-gray-300">{work.industry}</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold mb-8 leading-tight text-gray-100">{work.title}</h1>
                </div>
            </div>

            <div className="h-[40vh] w-full bg-gray-200 relative">
                <img src={work.thumbnail} alt={work.title} className="w-full h-full object-cover" />
            </div>

            <Section>
                <div className="grid md:grid-cols-3 gap-12">
                    <div className="md:col-span-1 space-y-8">
                        <div className="p-6 bg-gray-900 text-white rounded-lg border border-gray-800">
                            <h3 className="font-bold mb-4 text-lg border-b border-gray-700 pb-2 text-gray-100">Project Info</h3>
                            <dl className="space-y-4">
                                <div>
                                    <dt className="text-sm text-gray-400">Goal</dt>
                                    <dd className="font-medium text-gray-200">{work.goal}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm text-gray-400">Industry</dt>
                                    <dd className="font-medium text-gray-200">{work.industry}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-12">
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-accent">Summary</h2>
                            <p className="text-lg leading-relaxed text-gray-700">{work.summary}</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-bold mb-3">課題 (Problem)</h3>
                                <p className="text-gray-600">{work.problem}</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-3">アプローチ (Approach)</h3>
                                <p className="text-gray-600">{work.approach}</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-3">実装内容 (Implementation)</h3>
                            <p className="text-gray-600 leading-relaxed bg-gray-50 p-6 rounded-lg border-l-4 border-accent">
                                {work.implementation}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-3">成果 (Results)</h3>
                            <p className="text-gray-600 leading-relaxed">{work.results}</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-3">Learnings</h3>
                            <div className="bg-accent/5 p-6 rounded-lg text-accent font-medium">
                                &ldquo;{work.learnings}&rdquo;
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-20 text-center">
                    <Link href="/work">
                        <Button variant="outline">他の事例を見る</Button>
                    </Link>
                </div>
            </Section>
        </div>
    );
}

import { Section, SectionHeader } from "@/components/ui/Section";
import { WorkCard } from "@/components/features/WorkCard";
import { workCases } from "@/content/work";

export default function WorkPage() {
    return (
        <div className="pt-20">
            <div className="bg-gray-900 text-white py-20 px-4 text-center">
                <h1 className="text-4xl font-bold mb-4">Work</h1>
                <p className="text-gray-300">導入事例</p>
            </div>

            <Section>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {workCases.map((work) => (
                        <WorkCard key={work.slug} work={work} />
                    ))}
                </div>
            </Section>
        </div>
    );
}

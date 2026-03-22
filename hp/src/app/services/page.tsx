import { Section, SectionHeader } from "@/components/ui/Section";
import { Users, Lightbulb, FlaskConical } from "lucide-react";

export default function ServicesPage() {
    return (
        <div className="pt-20">
            <div className="bg-gray-900 text-white py-20 px-4 text-center">
                <h1 className="text-4xl font-bold mb-4">Services</h1>
                <p className="text-gray-300">提供価値</p>
            </div>

            <Section>
                <SectionHeader title="Our Approach" subtitle="五感の中で最も記憶と感情に働きかける「嗅覚」へのアプローチ" />
                <div className="max-w-3xl mx-auto space-y-8 text-lg leading-relaxed text-gray-700">
                    <p>
                        私たちは、空間の香り演出から、プロダクトへの香り付け、そしてブランドオリジナルの香りの開発まで、
                        ブランドやIPとコミュニティの絆を深める「香り」を軸にした包括的なソリューションを提供します。
                    </p>
                    <p>
                        視覚・聴覚の情報が溢れる現代に、嗅覚は脳の情動領域（大脳辺縁系）にダイレクトに作用する香りを用いて
                        理屈を超えた直感的な「好き」や深い記憶を形成することが可能です。
                    </p>
                </div>
            </Section>

            <Section className="bg-gray-50 dark:bg-gray-900">
                <div className="grid gap-12 md:grid-cols-1 max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="bg-white p-6 rounded-xl shadow-sm md:w-1/3 flex flex-col items-center text-center">
                            <Users className="h-16 w-16 text-accent mb-4" />
                            <h3 className="text-xl font-bold">空間演出</h3>
                        </div>
                        <div className="md:w-2/3">
                            <h3 className="text-2xl font-bold mb-4">Space Scenting</h3>
                            <p className="text-gray-600 mb-4">
                                小売店、ホテルやサービス施設、オフィスや共創空間などの場に、目的に合わせた香りを導入します。
                                体験や予算に合わせて業務用ディフューザーからアロマストーンまで、広さや目的に合わせた形状で香りを拡散させます。
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2">
                                <li>ブランディング：企業イメージを直感的に記憶に刻む</li>
                                <li>機能性：集中力向上、リラックス、交流促進、生産性向上</li>
                                <li>コミュニケーション：滞在時間延長、購買意欲促進、体感時間の増減、クレーム減少</li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="bg-white p-6 rounded-xl shadow-sm md:w-1/3 flex flex-col items-center text-center">
                            <Lightbulb className="h-16 w-16 text-accent mb-4" />
                            <h3 className="text-xl font-bold">IPコラボレーション</h3>
                        </div>
                        <div className="md:w-2/3">
                            <h3 className="text-2xl font-bold mb-4">IP Collaboration</h3>
                            <p className="text-gray-600 mb-4">
                                アーティスト、アニメ、映画などの世界観を香りで表現し、ファンに新しい体験を提供します。
                                イベント会場での空間演出や、キャラクターイメージ香水のグッズ化などをトータルプロデュースします。
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2">
                                <li>グッズ製作：香水やピローミスト、バスボムなど文脈や特徴、創りたい体験に合う香りの種類と形状で提供</li>
                                <li>イベントの演出：屋内外のライブやイベントの空間の香り演出</li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="bg-white p-6 rounded-xl shadow-sm md:w-1/3 flex flex-col items-center text-center">
                            <FlaskConical className="h-16 w-16 text-accent mb-4" />
                            <h3 className="text-xl font-bold">共創プロジェクト</h3>
                        </div>
                        <div className="md:w-2/3">
                            <h3 className="text-2xl font-bold mb-4">Co-Creation</h3>
                            <p className="text-gray-600 mb-4">
                                地域の特産品や企業の廃材などを活用したオリジナルの香料開発を行います。
                                ストーリーのある香りは、ブランドの深みを増し、SDGsの文脈でも高い評価を得ています。
                            </p>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}

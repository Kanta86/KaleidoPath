import { Section, SectionHeader } from "@/components/ui/Section";

export default function MethodPage() {
    return (
        <div className="pt-20">
            <div className="bg-gray-900 text-white py-20 px-4 text-center">
                <h1 className="text-4xl font-bold mb-4">Method</h1>
                <p className="text-gray-300">進め方</p>
            </div>

            <Section>
                <SectionHeader title="Process" subtitle="導入までの流れ" />
                <div className="relative border-l-2 border-accent/20 ml-4 md:ml-10 space-y-12 py-4">
                    {[
                        { title: "ヒアリング・現地調査", desc: "お客様の理想や課題、ブランドイメージ、空間の特性（空調、気流、広さ）を詳細に調査します。" },
                        { title: "プランニング・ご提案", desc: "コンセプトに合う香りの候補と、最適な拡散機器の設置プランをご提案します。デモンストレーションも可能です。" },
                        { title: "トライアル導入", desc: "1〜2週間のお試し期間を設け、実際の空間での香りの強さや反応を確認・調整します。" },
                        { title: "本契約・設置施工", desc: "調整結果をもとに本設置を行います。安全かつ香りが適切な強さで香る設置位置を確保します。" },
                        { title: "アフターフォロー", desc: "定期的な香料の補充、機器のメンテナンス、季節に合わせた香りの変更提案を行います。" }
                    ].map((item, i) => (
                        <div key={i} className="relative pl-8 md:pl-12">
                            <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-accent ring-4 ring-white" />
                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                            <p className="text-gray-600">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </Section>

            <Section className="bg-gray-50 dark:bg-gray-900">
                <SectionHeader title="Safety & Quality" subtitle="徹底した品質管理" />
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div className="bg-white p-8 rounded-lg shadow-sm">
                        <h3 className="text-xl font-bold mb-4 text-accent">IFRA基準の遵守</h3>
                        <p className="text-gray-600 mb-4">
                            国際香粧品香料協会（IFRA）の厳格なガイドラインに準拠した香料を使用しています。
                            人体や環境への安全性が確認された原料で調香するため、安心してご利用いただけます。
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-sm">
                        <h3 className="text-xl font-bold mb-4 text-accent">日本への適性</h3>
                        <p className="text-gray-600 mb-4">
                            130年以上日本に香りを提供してきた、香りの調香・選定ノウハウと、徹底した品質へのこだわりがあります。
                            繊細な日本人の感性に合う、優しく奥深い香りが特徴です。
                        </p>
                    </div>
                </div>
            </Section>
        </div>
    );
}

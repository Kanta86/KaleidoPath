import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export default function PartnersPage() {
    const goContact = () => {
        // Should be client component to use onClick properly or wrapped. 
        // Since this is server component, I'll use Link or just simple text instructions.
        // For consistency with other pages, I will omit the button logic here and just link to contact or use styles.
    };

    return (
        <div className="pt-20">
            <div className="bg-gray-900 text-white py-20 px-4 text-center">
                <h1 className="text-4xl font-bold mb-4">Partners</h1>
                <p className="text-gray-300">協業パートナーの皆様へ</p>
            </div>

            <Section>
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <p className="text-lg leading-relaxed">
                        KaleidoPathでは、空間デザイン、インテリアコーディネート、イベント企画などを手掛ける企業様との
                        協業を積極的に推進しています。
                    </p>
                    <p className="text-gray-600">
                        「空間に香りをプラスしたい」「クライアントへの提案の幅を広げたい」といったご要望があれば、
                        専門家としてサポートさせていただきます。
                    </p>
                </div>
            </Section>

            <Section className="bg-gray-50">
                <SectionHeader title="Collaboration Menu" subtitle="協業メニュー例" />
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div className="bg-white p-6 rounded-lg border">
                        <h3 className="font-bold mb-2">空間デザイナー様向け</h3>
                        <p className="text-sm text-gray-600">
                            設計段階からの機材設置計画サポート、コンセプトに合わせた香りの提案。
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg border">
                        <h3 className="font-bold mb-2">イベント制作会社様向け</h3>
                        <p className="text-sm text-gray-600">
                            イベント演出としての香りの導入、短期レンタルのご提供。
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg border">
                        <h3 className="font-bold mb-2">アパレル・小売店様向け</h3>
                        <p className="text-sm text-gray-600">
                            OEMによるオリジナルグッズ（キャンドル、ミスト等）の開発・製造。
                        </p>
                    </div>
                </div>

                <div className="mt-12 text-center p-8 bg-accent/5 rounded-lg max-w-2xl mx-auto">
                    <h3 className="font-bold mb-4">パートナーシップに関するお問い合わせ</h3>
                    <p className="mb-6 text-sm">
                        協業のご相談も、お問い合わせフォームより承っております。<br />
                        「パートナーシップについて」と記載の上、ご連絡ください。
                    </p>
                    {/* The CTA is standardized in the Footer/Layout, so no need to duplicate button here unless emphasized */}
                </div>
            </Section>
        </div>
    );
}

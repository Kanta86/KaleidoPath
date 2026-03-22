import { Section, SectionHeader } from "@/components/ui/Section";

export default function AboutPage() {
    return (
        <div className="pt-20">
            <div className="bg-gray-900 text-white py-20 px-4 text-center">
                <h1 className="text-4xl font-bold mb-4">About Us</h1>
                <p className="text-gray-300">会社概要</p>
            </div>

            <Section>
                <SectionHeader title="Vision" subtitle="目指す世界" />
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h3 className="text-2xl font-bold mb-6">誰もが自己表現を通じて、自分らしくい続けられる世界を創る。</h3>
                    <p className="text-lg leading-relaxed text-gray-700">
                        kaleidoはギリシャ語を起源とする2つの単語“kal” 「美しい」 “eidos” 「型」 からなる、<br />
                        「変幻極まりない、二度と同じ形には出来ない」という意味を持つ接頭辞。<br />
                        万華鏡(kaleidoscope)のように、それぞれらしい美しいあり方(=道、path)を支援します。<br />

                    </p>
                </div>
            </Section>

            <Section>
                <SectionHeader title="Mission" subtitle="私たちの使命" />
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h3 className="text-2xl font-bold mb-6">香りで人のつながりや関係性をよりよくする。</h3>
                    <p className="text-lg leading-relaxed text-gray-700">
                        私たちは、香りが持つ「記憶への働きかけ」と「感情を動かす力」を信じています。<br />
                        目に見えない香りのデザインを通じて、人と人、人とブランドやIP、人と場所の間に<br />
                        深く、永く続く絆を紡ぎ出します。
                    </p>
                </div>
            </Section>

            <Section>
                <SectionHeader title="CEO Profile" subtitle="代表プロフィール" />
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h3 className="text-2xl font-bold mb-6">香りとコミュニティマネジメントのプロとして価値提供します。</h3>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/generated/ceoprofile.jpg" alt="清水 寛太" className="w-48 h-48 mx-auto mb-6 rounded-2xl object-cover" />
                    <p className="text-lg leading-relaxed text-gray-700">
                        清水 寛太（Kanta Shimizu）<br />
                        埼玉県出身 早稲田大学大学院修了<br />
                        <br />
                        経歴<br />
                        ライオン株式会社入社<br />
                        衣類用洗剤の開発や他社協業による洗濯機のコース開発に従事<br />
                        組織風土変革と人材育成のPJT立上<br />
                        研究部門の新規事業開発の推進および支援に従事<br />
                        香りなどの五感と、感情や行動の研究に従事<br />
                        <br />

                        副業にてベンチャーのデジタルマーケティング戦略立案・実行<br />
                        副業にてメンズコスメの商品開発・サービス開発<br />
                        副業にてアルファドライブ社で新規事業開発支援<br />

                        現在、出向起業にて株式会社KaleidoPathを立上げ<br />
                    </p>
                </div>
            </Section>



            <Section className="bg-gray-50">
                <SectionHeader title="Company Info" subtitle="会社情報" />
                <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm border">
                    <dl className="divide-y">
                        <div className="grid grid-cols-1 md:grid-cols-3 py-4">
                            <dt className="font-bold text-gray-900">会社名</dt>
                            <dd className="col-span-2 text-gray-600">株式会社KaleidoPath (KaleidoPath Inc.)</dd>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 py-4">
                            <dt className="font-bold text-gray-900">代表者</dt>
                            <dd className="col-span-2 text-gray-600">代表取締役 CEO  清水　寛太</dd>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 py-4">
                            <dt className="font-bold text-gray-900">設立</dt>
                            <dd className="col-span-2 text-gray-600">2024年12月</dd>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 py-4">
                            <dt className="font-bold text-gray-900">所在地</dt>
                            <dd className="col-span-2 text-gray-600">〒107-0066 東京都港区南青山1-1-1 新青山ビル西館7階</dd>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 py-4">
                            <dt className="font-bold text-gray-900">事業内容</dt>
                            <dd className="col-span-2 text-gray-600">
                                <ul className="list-disc list-inside space-y-1">
                                    <li>空間の香り演出</li>
                                    <li>オリジナルフレグランスや香るグッズの企画・開発</li>
                                    <li>香りに関するイベント・プロモーション企画</li>
                                </ul>
                            </dd>
                        </div>
                    </dl>
                </div>
            </Section>
        </div>
    );
}

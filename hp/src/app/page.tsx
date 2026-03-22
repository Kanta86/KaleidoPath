"use client";

import { Button } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { WorkCard } from "@/components/features/WorkCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { workCases } from "@/content/work";
import { ArrowRight, CheckCircle2, FlaskConical, Lightbulb, Users } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GOOGLE_FORM_URL } from "@/lib/constants";

export default function Home() {
  const featuredWorks = workCases.slice(0, 3);

  return (
    <div className="flex flex-col bg-white">
      {/* Dynamic Hero Section */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-white text-center text-brand-gray">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute -top-[20%] -left-[20%] h-[140%] w-[140%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-100 via-white to-white opacity-80"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,1))]" />
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="mb-8 text-5xl font-bold tracking-tighter sm:text-6xl md:text-8xl lg:text-9xl text-brand-gray leading-[1.1]">
              香りで<br />
              コミュニティの<br />
              <span className="text-accent relative inline-block">
                熱量を
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent opacity-30" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
              <br />
              最大化する
            </h1>
          </motion.div>

          <motion.p
            className="mb-10 mx-auto max-w-[700px] text-brand-gray md:text-xl font-medium leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            記憶と感情に直結する「嗅覚」へのアプローチで、<br className="hidden md:inline" />
            空間やIPの価値を高め、象徴とコミュニティの絆を深めます。
          </motion.p>

          <motion.div
            className="flex flex-col gap-4 sm:flex-row sm:justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-10 text-base font-bold text-white shadow-lg transition-all hover:bg-brand-gray hover:scale-105 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              無料相談する
            </a>
            <Link
              href="/work"
              className="inline-flex h-12 items-center justify-center rounded-full border border-gray-200 bg-white px-10 text-base font-medium text-brand-gray transition-all hover:bg-gray-50 hover:border-brand-gray focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
            >
              事例を見る
            </Link>
          </motion.div>
        </div>
      </section>

      {/* What we do */}
      <Section id="services" className="bg-white">
        <ScrollReveal className="w-full">
          <SectionHeader title="What we do" subtitle="提供価値" />
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <Users className="h-12 w-12 text-accent" />,
                title: "空間演出",
                desc: "オフィスや店舗のコンセプトに合わせた香りで、居心地とブランド体験を向上させます。",
              },
              {
                icon: <Lightbulb className="h-12 w-12 text-accent" />,
                title: "IPコラボレーション",
                desc: "アニメや映画の世界観を香りで再現。ファンに深い没入感と感動を提供します。",
              },
              {
                icon: <FlaskConical className="h-12 w-12 text-accent" />,
                title: "共創プロジェクト",
                desc: "地域素材や企業DNAを活用したオリジナルフレグランス開発で、新たな価値を創造します。",
              },
            ].map((item, i) => (
              <div key={i} className="group flex flex-col items-center text-center p-8 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="mb-6 rounded-full bg-white p-6 shadow-sm group-hover:scale-110 transition-transform duration-300 border border-gray-100">{item.icon}</div>
                <h3 className="mb-3 text-xl font-bold">{item.title}</h3>
                <p className="text-sm text-brand-gray leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </Section>

      {/* Proof */}
      <Section className="bg-gray-50">
        <ScrollReveal width="100%">
          <div className="mb-12 flex flex-col gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Why Choose Us</h2>
            <p className="text-gray-500">選ばれる理由</p>
          </div>
          <div className="grid gap-12 md:grid-cols-3 max-w-6xl mx-auto">
            {[
              { title: "学術的知見やエビデンスに基づく設計", desc: "ただの感覚ではなく、感性工学、心理学、建築、論文情報、他社事例分析など、データと理論に基づく調香と空間設計を行います。" },
              { title: "体験に最適な香りの種類・形状の提供", desc: "空間用ディフューザーから香水などのグッズまで、最適な提案を実現し、IFRA規制などの安全性にも対応しています。" },
              { title: "香りのプロフェッショナルネットワーク", desc: "100名近い調香師、臭気判定士、研究者との提携、OEMメーカーとの連携により設計から導入後のメンテナンスや運用まで、ワンストップでサポートします。" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-4 p-6 border-l border-gray-400 hover:border-accent transition-colors duration-300">
                <CheckCircle2 className="h-8 w-8 text-accent" />
                <div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </Section>

      {/* Featured Work */}
      <Section>
        <ScrollReveal className="w-full">
          <SectionHeader title="Featured Work" subtitle="最新の事例" />
          <div className="grid gap-8 md:grid-cols-3">
            {featuredWorks.map((work) => (
              <WorkCard key={work.slug} work={work} />
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link href="/work">
              <Button variant="outline" size="lg" className="rounded-full">全ての事例を見る <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </div>
        </ScrollReveal>
      </Section>

      {/* Method */}
      <Section className="bg-gray-50">
        <ScrollReveal width="100%">
          <SectionHeader title="Method" subtitle="導入プロセス" />
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { step: "01", title: "ヒアリング", desc: "課題や目的、ターゲット層を詳細にお伺いします。" },
              { step: "02", title: "プランニング", desc: "コンセプト立案と、それに最適な香りの選定・試作を行います。" },
              { step: "03", title: "トライアル", desc: "実際の空間で香りの広がりや感じ方を検証・調整します。" },
              { step: "04", title: "導入・運用", desc: "本導入後も定期的なメンテナンスと効果測定を実施します。" },
            ].map((item, i) => (
              <div key={i} className="relative p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="text-6xl font-bold text-gray-200 absolute -top-4 -right-4 font-sans italic">{item.step}</div>
                <h3 className="text-lg font-bold mb-3 relative z-10 border-b-2 border-accent inline-block pb-1">{item.title}</h3>
                <p className="text-sm text-brand-gray relative z-10 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </Section>

      {/* FAQ */}
      <Section>
        <ScrollReveal width="100%">
          <SectionHeader title="FAQ" subtitle="よくある質問" />
          <div className="mx-auto max-w-[800px] space-y-6">
            {[
              { q: "香りの持続時間はどのくらいですか？", a: "求める体験に最適な香りの持続時間・強度を、空間の広さや空調環境をもとに設計します。" },
              { q: "オリジナルの香りを作ることはできますか？", a: "はい、可能です。貴社のブランドイメージに合わせたオーダーメイドの調香を承ります。" },
              { q: "導入までの期間は？", a: "既製香料の場合は最短2週間、オリジナル調香の場合は約2〜3ヶ月が目安です。" },
              { q: "コストはどのくらいかかりますか？", a: "空間規模や導入機器、香りの種類によりますが、初期費用10万円、月額1万円程度の実績もございます。ご予算に合わせた提案も可能ですので気軽にお問い合わせください。" },
              { q: "人体への影響はありますか？", a: "専門家による設計のもと、人体に安全な原料の使用や、アレルギーの確認なども事前に実施いたしますのでご安心ください。" },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl bg-gray-50 p-6 hover:bg-gray-100 transition-colors duration-200 text-center">
                <h4 className="font-bold mb-3 flex items-center justify-center gap-3">
                  <span className="h-6 w-6 rounded-lg bg-brand-gray text-white flex items-center justify-center text-xs shrink-0">Q</span>
                  {item.q}
                </h4>
                <p className="text-sm text-brand-gray leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </Section>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { GOOGLE_FORM_URL } from "@/lib/constants";

export function CTASection() {
    const goContact = () => {
        window.open(GOOGLE_FORM_URL, "_blank");
    };

    return (
        <Section className="bg-gray-900 text-white">
            <div className="flex flex-col items-center text-center gap-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-100">
                    体験を香りで彩る
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    空間演出から商品開発まで、貴社の求める体験に合わせた最適な香りをご提案します。
                    まずはお気軽にご相談ください。
                </p>
                <Button size="lg" onClick={goContact} className="mt-4">
                    無料相談する
                </Button>
            </div>
        </Section>
    );
}

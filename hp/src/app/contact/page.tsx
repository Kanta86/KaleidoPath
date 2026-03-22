import { redirect } from "next/navigation";
import { GOOGLE_FORM_URL } from "@/lib/constants";

export default function ContactPage() {
    if (GOOGLE_FORM_URL) {
        redirect(GOOGLE_FORM_URL);
    }

    return (
        <div className="pt-32 text-center container mx-auto px-4">
            <h1 className="text-2xl font-bold mb-4">お問い合わせ</h1>
            <p className="mb-8">お問い合わせフォームへ移動します...</p>
            <a href={GOOGLE_FORM_URL} className="text-accent hover:underline underline-offset-4">
                ページが切り替わらない場合はこちらをクリックしてください
            </a>
        </div>
    );
}

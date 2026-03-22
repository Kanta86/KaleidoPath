import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex h-[80vh] flex-col items-center justify-center text-center px-4">
            <h2 className="text-4xl font-bold mb-4">404 Not Found</h2>
            <p className="text-gray-500 mb-8">お探しのページは見つかりませんでした。</p>
            <Link href="/">
                <Button>トップページに戻る</Button>
            </Link>
        </div>
    );
}

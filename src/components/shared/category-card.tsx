import Image from "next/image";
import Link from "next/link";
import { Category } from "@/utils/types";

export function CategoryCard({ category }: { category: Category }) {
    return (
        <Link href={`/categories/${category._id}`} className="card-surface group flex flex-col items-center gap-3 p-4 text-center transition hover:-translate-y-1">
            {category.image ? (
                <div className="relative h-20 w-20 overflow-hidden rounded-full border border-gray-200">
                    <Image src={category.image} alt={category.name} fill className="object-cover" sizes="80px" />
                </div>
            ) : null}
            <span className="text-sm font-semibold text-ink">{category.name}</span>
        </Link>
    );
}

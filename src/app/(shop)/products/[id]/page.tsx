"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getProduct, getProducts } from "@/services/product.service";
import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/shared/product-image";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { ProductCard } from "@/components/shared/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useMemo } from "react";
import { clsx } from "clsx";

export default function ProductDetailPage() {
    const params = useParams();
    const productId = params?.id as string;
    const { add: addToCart } = useCart();
    const { add: addToWishlist, wishlist, remove: removeFromWishlist } = useWishlist();

    const productQuery = useQuery({ queryKey: ["product", productId], queryFn: () => getProduct(productId), enabled: Boolean(productId) });
    const relatedQuery = useQuery({
        queryKey: ["related", productQuery.data?.category?._id],
        queryFn: () => getProducts({ category: productQuery.data?.category?._id, limit: 4 }),
        enabled: Boolean(productQuery.data?.category?._id)
    });

    const product = productQuery.data;
    const [isAnimating, setIsAnimating] = useState(false);
    const [localWishlistState, setLocalWishlistState] = useState<boolean | null>(null);

    const isInWishlist = useMemo(() => {
        if (localWishlistState !== null) {
            return localWishlistState;
        }
        return wishlist?.some((item) => item._id === product?._id) ?? false;
    }, [wishlist, product?._id, localWishlistState]);

    const handleWishlistToggle = () => {
        if (!product?._id) return;
        setIsAnimating(true);
        const newState = !isInWishlist;
        setLocalWishlistState(newState);
        
        if (newState) {
            addToWishlist(product._id);
        } else {
            removeFromWishlist(product._id);
        }
        
        setTimeout(() => {
            setIsAnimating(false);
            setTimeout(() => setLocalWishlistState(null), 100);
        }, 300);
    };

    if (productQuery.isLoading || !product) {
        return (
            <div className="container-responsive space-y-6">
                <Skeleton className="h-10 w-48" />
                <div className="grid gap-6 lg:grid-cols-2">
                    <Skeleton className="h-96 w-full" />
                    <div className="space-y-4">
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-10 w-32" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container-responsive space-y-10">
            <div className="grid gap-8 lg:grid-cols-2">
                <div className="card-surface relative aspect-[4/5] overflow-hidden">
                    <ProductImage src={product.imageCover} alt={product.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
                </div>
                <div className="space-y-4">
                    <p className="text-sm font-semibold text-primary-700">{product.brand?.name}</p>
                    <h1 className="text-3xl font-bold text-ink">{product.title}</h1>
                    <p className="text-sm text-slate-600">{product.description}</p>
                    <div className="flex items-center gap-3 text-2xl font-semibold text-ink">
                        <span>${product.priceAfterDiscount ?? product.price}</span>
                        {product.priceAfterDiscount ? <span className="text-base text-slate-400 line-through">${product.price}</span> : null}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                        <span>Category: {product.category?.name}</span>
                        <span>Rating: {product.ratingsAverage ?? "-"}</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Button 
                            onClick={() => addToCart(product._id)}
                            className="group/btn transition-all duration-300 hover:scale-105 active:scale-95"
                        >
                            <svg className="h-4 w-4 transition-transform duration-300 group-hover/btn:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Add to cart
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleWishlistToggle}
                            className={clsx(
                                "relative transition-all duration-300 hover:scale-105 active:scale-95",
                                isInWishlist && "border-accent-rose text-accent-rose hover:bg-accent-rose/5",
                                isAnimating && "animate-pulse"
                            )}
                        >
                            <svg 
                                className={clsx(
                                    "h-4 w-4 transition-all duration-300",
                                    isInWishlist && "scale-110",
                                    isAnimating && "animate-bounce"
                                )}
                                fill={isInWishlist ? "currentColor" : "none"} 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            {isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                            {isAnimating && (
                                <span className="absolute inset-0 rounded-lg bg-accent-rose/10 animate-ping" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="section-title">Related products</h2>
                {relatedQuery.isLoading ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, idx) => (
                            <Skeleton key={idx} className="h-72 rounded-xl" />
                        ))}
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {relatedQuery.data?.data.map((p) => (
                            <ProductCard key={p._id} product={p} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

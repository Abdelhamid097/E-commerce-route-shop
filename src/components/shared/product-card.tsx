"use client";

import Link from "next/link";
import { Product } from "@/utils/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/shared/product-image";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { clsx } from "clsx";
import { useMemo, useState } from "react";

export function ProductCard({ product }: { product: Product }) {
    const { add: addToCart } = useCart();
    const { wishlist, add: addToWishlist, remove: removeFromWishlist } = useWishlist();
    const [isAnimating, setIsAnimating] = useState(false);
    const [localWishlistState, setLocalWishlistState] = useState<boolean | null>(null);

    const isInWishlist = useMemo(() => {
        // Use local state if available (for immediate feedback), otherwise check wishlist
        if (localWishlistState !== null) {
            return localWishlistState;
        }
        return wishlist?.some((item) => item._id === product._id) ?? false;
    }, [wishlist, product._id, localWishlistState]);

    const handleWishlistToggle = () => {
        setIsAnimating(true);
        const newState = !isInWishlist;
        setLocalWishlistState(newState);
        
        if (newState) {
            addToWishlist(product._id);
        } else {
            removeFromWishlist(product._id);
        }
        
        // Reset animation after a short delay
        setTimeout(() => {
            setIsAnimating(false);
            // Sync with actual wishlist state after mutation completes
            setTimeout(() => setLocalWishlistState(null), 100);
        }, 300);
    };

    return (
        <div className="card-surface group flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
            <Link href={`/products/${product._id}`} className="relative block aspect-[4/5] w-full overflow-hidden rounded-t-xl">
                <ProductImage src={product.imageCover} alt={product.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width:768px) 100vw, 25vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {product.priceAfterDiscount ? (
                    <Badge className="absolute left-3 top-3 z-10 bg-accent-rose text-white shadow-lg animate-in fade-in slide-in-from-top-2">
                        <span className="inline-flex items-center gap-1">
                            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                            </svg>
                            Sale
                        </span>
                    </Badge>
                ) : null}
            </Link>
            <div className="flex flex-1 flex-col gap-3 px-4 pb-4 pt-3">
                <div className="flex items-center justify-between gap-2 text-xs text-gray-500">
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 font-medium text-ink transition-colors group-hover:bg-gray-200">{product.category?.name}</span>
                    <span className="inline-flex items-center gap-1">
                        <svg className="h-3.5 w-3.5 fill-amber-400 text-amber-400 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-semibold text-ink">{product.ratingsAverage ?? "-"}</span>
                    </span>
                </div>
                <Link href={`/products/${product._id}`} className="line-clamp-2 text-sm font-semibold text-ink transition-all duration-300 hover:text-accent-midnight hover:translate-x-1">
                    {product.title}
                </Link>
                <div className="mt-auto flex items-center justify-between">
                    <div className="flex flex-col transition-all duration-300 group-hover:scale-105">
                        {product.priceAfterDiscount ? (
                            <>
                                <span className="text-lg font-bold text-ink transition-colors group-hover:text-accent-midnight">${product.priceAfterDiscount}</span>
                                <span className="text-xs text-gray-400 line-through">${product.price}</span>
                            </>
                        ) : (
                            <span className="text-lg font-bold text-ink transition-colors group-hover:text-accent-midnight">${product.price}</span>
                        )}
                    </div>
                    <button
                        aria-label="Wishlist toggle"
                        className={clsx(
                            "relative rounded-full border-2 p-2.5 transition-all duration-300 hover:scale-110 active:scale-95",
                            isInWishlist 
                                ? "border-accent-rose bg-accent-rose/10 text-accent-rose shadow-md" 
                                : "border-gray-300 bg-white text-gray-400 hover:border-accent-rose hover:bg-accent-rose/5 hover:text-accent-rose",
                            isAnimating && "animate-pulse"
                        )}
                        onClick={handleWishlistToggle}
                    >
                        <svg 
                            className={clsx(
                                "h-5 w-5 transition-all duration-300",
                                isInWishlist && "scale-110",
                                isAnimating && "animate-bounce"
                            )} 
                            fill={isInWishlist ? "currentColor" : "none"} 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {isAnimating && (
                            <span className="absolute inset-0 rounded-full bg-accent-rose/20 animate-ping" />
                        )}
                    </button>
                </div>
                <Button 
                    onClick={() => addToCart(product._id)} 
                    className="w-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] group/btn"
                >
                    <svg className="h-4 w-4 transition-transform duration-300 group-hover/btn:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="transition-all duration-300 group-hover/btn:translate-x-0.5">Add to Cart</span>
                </Button>
            </div>
        </div>
    );
}

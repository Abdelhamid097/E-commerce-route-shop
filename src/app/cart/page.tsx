"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { QuantityInput } from "@/components/shared/quantity-input";
import { ProductImage } from "@/components/shared/product-image";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { PageShell } from "@/components/layout/page-shell";

export default function CartPage() {
    const { cart, isLoading, update, remove } = useCart();
    const { isAuthenticated, loading: authLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.replace("/login");
        }
    }, [isAuthenticated, authLoading, router]);

    if (authLoading) {
        return (
            <PageShell>
                <div className="container-responsive space-y-4">
                    <Skeleton className="h-8 w-40" />
                    <Skeleton className="h-40 w-full" />
                </div>
            </PageShell>
        );
    }

    if (!isAuthenticated) return null;

    const content = !cart || cart.products.length === 0 ? (
        <div className="container-responsive">
            <EmptyState title="Your cart is empty" description="Add products to your cart to start checkout." />
        </div>
    ) : (
        <div className="container-responsive grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
                <h1 className="section-title">Cart</h1>
                <div className="card-surface divide-y divide-gray-200">
                    {cart.products.map((item, index) => (
                        <div 
                            key={item._id} 
                            className="group flex gap-4 p-5 transition-all duration-300 hover:bg-gray-50 animate-in"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <Link href={`/products/${item.product._id}`} className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border-2 border-gray-200 transition-all duration-300 group-hover:border-gray-300 group-hover:shadow-md">
                                <ProductImage src={item.product.imageCover} alt={item.product.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="100px" />
                            </Link>
                            <div className="flex flex-1 flex-col gap-3">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1 min-w-0">
                                        <Link href={`/products/${item.product._id}`}>
                                            <h3 className="text-base font-semibold text-ink transition-colors hover:text-accent-midnight line-clamp-1">{item.product.title}</h3>
                                        </Link>
                                        <p className="mt-1 text-xs text-gray-500">{item.product.category?.name}</p>
                                    </div>
                                    <button 
                                        className="flex-shrink-0 rounded-lg p-2 text-gray-400 transition-all duration-300 hover:bg-red-50 hover:text-red-600 hover:scale-110 active:scale-95" 
                                        onClick={() => remove(item.product._id)}
                                        aria-label="Remove item"
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <QuantityInput value={item.count} onChange={(value) => update(item.product._id, value)} />
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-ink transition-colors group-hover:text-accent-midnight">${item.price}</p>
                                        <p className="text-xs text-gray-500">${(item.price / item.count).toFixed(2)} each</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <div className="card-surface sticky top-4 space-y-4 p-6 transition-all duration-300 hover:shadow-lg">
                    <h2 className="text-xl font-semibold text-ink">Order Summary</h2>
                    <div className="space-y-3 border-t border-b border-gray-200 py-4">
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>Subtotal ({cart.numOfCartItems} {cart.numOfCartItems === 1 ? "item" : "items"})</span>
                            <span className="font-medium text-ink">${cart.totalCartPrice}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>Shipping</span>
                            <span className="font-medium text-green-600">Free</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                        <span className="text-lg font-semibold text-ink">Total</span>
                        <span className="text-2xl font-bold text-ink">${cart.totalCartPrice}</span>
                    </div>
                    <Link href="/checkout">
                        <Button className="w-full text-base py-3 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            Proceed to Checkout
                        </Button>
                    </Link>
                    <Link href="/products" className="block text-center text-sm text-accent-midnight hover:text-accent-black font-medium transition-all">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );

    return (
        <PageShell>
            {isLoading ? (
                <div className="container-responsive space-y-4">
                    <Skeleton className="h-8 w-40" />
                    <Skeleton className="h-40 w-full" />
                </div>
            ) : (
                content
            )}
        </PageShell>
    );
}

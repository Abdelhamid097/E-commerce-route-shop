"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getUserOrders } from "@/services/order.service";
import { useAuth } from "@/context/auth-context";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { PageShell } from "@/components/layout/page-shell";

export default function OrdersPage() {
    const { user, token, isAuthenticated, loading: authLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.replace("/login");
        }
    }, [isAuthenticated, authLoading, router]);

    const ordersQuery = useQuery({
        queryKey: ["orders", user?._id],
        queryFn: () => getUserOrders(user!._id),
        enabled: !authLoading && Boolean(user?._id && token),
        refetchOnMount: "always",
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        staleTime: 0,
        retry: 1
    });

    // Show loading state while auth is loading, but don't redirect yet
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

    // Only redirect if auth is done loading and user is not authenticated
    if (!isAuthenticated) return null;

    if (ordersQuery.isError) {
        return (
            <PageShell>
                <div className="container-responsive">
                    <EmptyState title="Could not load orders" description="Please refresh or try again." />
                </div>
            </PageShell>
        );
    }

    const content = !ordersQuery.data || ordersQuery.data.length === 0 ? (
        <div className="container-responsive">
            <EmptyState title="No orders yet" description="Place your first order to see it here." />
        </div>
    ) : (
        <div className="container-responsive space-y-4">
            <h1 className="section-title">Orders</h1>
            <div className="space-y-4">
                {ordersQuery.data.map((order, index) => (
                    <div 
                        key={order._id} 
                        className="card-surface group space-y-3 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="flex flex-wrap items-center gap-3 border-b border-gray-200 pb-3">
                            <div className="flex items-center gap-2">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="font-semibold text-ink">Order #{order._id.slice(-6).toUpperCase()}</span>
                                    <p className="text-xs text-gray-500">Placed {new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                                </div>
                            </div>
                            <div className="ml-auto flex flex-wrap gap-2">
                                <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                                    order.isPaid ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                                }`}>
                                    {order.isPaid ? "✓ Paid" : "⏱ Pending"}
                                </span>
                                <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                                    order.isDelivered ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                                }`}>
                                    {order.isDelivered ? "✓ Delivered" : "🚚 In Transit"}
                                </span>
                                <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                                    {order.paymentMethodType === "cash" ? "💵 Cash" : "💳 Card"}
                                </span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            {order.cartItems.map((item) => (
                                <div key={item._id} className="flex items-center justify-between rounded-lg bg-gray-50 p-3 text-sm transition-colors hover:bg-gray-100">
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-xs font-semibold text-ink border border-gray-200">
                                            {item.count}x
                                        </span>
                                        <span className="font-medium text-ink truncate">{item.product.title}</span>
                                    </div>
                                    <span className="font-semibold text-ink">${item.price}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between border-t border-gray-200 pt-4 text-lg font-bold text-ink">
                            <span>Total Order</span>
                            <span>${order.totalOrderPrice}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <PageShell>
            {ordersQuery.isLoading ? (
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

"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addToWishlist, getWishlist, removeFromWishlist } from "@/services/wishlist.service";
import { Product } from "@/utils/types";
import { useAuth } from "@/context/auth-context";
import { toast } from "sonner";

const WishlistContext = createContext<{
    wishlist?: Product[];
    isLoading: boolean;
    add: (productId: string) => void;
    remove: (productId: string) => void;
}>({
    isLoading: false,
    add: () => undefined,
    remove: () => undefined
});

export function WishlistProvider({ children }: { children: ReactNode }) {
    const { token } = useAuth();
    const queryClient = useQueryClient();

    const { data: wishlist, isLoading, refetch } = useQuery({
        queryKey: ["wishlist", token],
        queryFn: getWishlist,
        enabled: Boolean(token)
    });

    useEffect(() => {
        if (token) {
            refetch();
        }
    }, [refetch, token]);

    const { mutate: addItem } = useMutation({
        mutationFn: addToWishlist,
        onMutate: async (productId) => {
            // Cancel any outgoing refetches
            await queryClient.cancelQueries({ queryKey: ["wishlist", token] });
            
            // Snapshot the previous value
            const previousWishlist = queryClient.getQueryData<Product[]>(["wishlist", token]);
            
            // Optimistically update to the new value
            queryClient.setQueryData<Product[]>(["wishlist", token], (old = []) => {
                // Check if product is already in wishlist
                if (old.some(item => item._id === productId)) {
                    return old;
                }
                // We'll add a placeholder product - the API will return the full product
                return old;
            });
            
            return { previousWishlist };
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["wishlist", token], data);
            queryClient.invalidateQueries({ queryKey: ["wishlist", token] });
            toast.success("Added to wishlist");
        },
        onError: (err, productId, context) => {
            // Rollback on error
            if (context?.previousWishlist) {
                queryClient.setQueryData(["wishlist", token], context.previousWishlist);
            }
            toast.error("Failed to add to wishlist");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["wishlist", token] });
        }
    });

    const { mutate: removeItem } = useMutation({
        mutationFn: removeFromWishlist,
        onMutate: async (productId) => {
            // Cancel any outgoing refetches
            await queryClient.cancelQueries({ queryKey: ["wishlist", token] });
            
            // Snapshot the previous value
            const previousWishlist = queryClient.getQueryData<Product[]>(["wishlist", token]);
            
            // Optimistically update to the new value
            queryClient.setQueryData<Product[]>(["wishlist", token], (old = []) => {
                return old.filter(item => item._id !== productId);
            });
            
            return { previousWishlist };
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["wishlist", token], data);
            queryClient.invalidateQueries({ queryKey: ["wishlist", token] });
            toast.success("Removed from wishlist");
        },
        onError: (err, productId, context) => {
            // Rollback on error
            if (context?.previousWishlist) {
                queryClient.setQueryData(["wishlist", token], context.previousWishlist);
            }
            toast.error("Failed to remove from wishlist");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["wishlist", token] });
        }
    });

    const value = useMemo(
        () => ({
            wishlist,
            isLoading,
            add: (productId: string) => addItem(productId),
            remove: (productId: string) => removeItem(productId)
        }),
        [addItem, isLoading, removeItem, wishlist]
    );

    return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
    const ctx = useContext(WishlistContext);
    if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
    return ctx;
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";

const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/brands", label: "Brands" },
    { href: "/categories", label: "Categories" },
    { href: "/orders", label: "Orders" }
];

export function Navbar() {
    const pathname = usePathname();
    const { cart } = useCart();
    const { wishlist } = useWishlist();
    const { isAuthenticated, logout, user } = useAuth();

    return (
        <header className="bg-white text-ink shadow-sm border-b border-gray-200">
            <div className="container-responsive flex items-center justify-between gap-6 py-4">
                <Link href="/" className="rounded-xl bg-gray-100 px-4 py-2 text-xl font-semibold text-ink shadow-sm hover:bg-gray-200 transition">
                    Route Shop
                </Link>
                <nav className="hidden items-center gap-2 md:flex">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={clsx(
                                "rounded-full px-4 py-2 text-sm font-medium text-ink transition hover:bg-gray-100",
                                pathname === link.href && "bg-gray-100 text-ink shadow-sm"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
                <div className="flex items-center gap-3">
                    <Link href="/wishlist" className="relative rounded-full px-3 py-2 text-sm font-medium text-ink transition hover:bg-gray-100">
                        Wishlist
                        {wishlist?.length ? (
                            <span className="absolute -right-3 -top-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-accent-midnight text-white px-1 text-[11px] font-semibold shadow-md">
                                {wishlist.length}
                            </span>
                        ) : null}
                    </Link>
                    <Link href="/cart" className="relative rounded-full px-3 py-2 text-sm font-medium text-ink transition hover:bg-gray-100">
                        Cart
                        {cart?.numOfCartItems ? (
                            <span className="absolute -right-3 -top-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-accent-midnight text-white px-1 text-[11px] font-semibold shadow-md">
                                {cart.numOfCartItems}
                            </span>
                        ) : null}
                    </Link>
                    {isAuthenticated ? (
                        <div className="flex items-center gap-2">
                            <span className="hidden text-sm text-ink sm:inline">Hi, {user?.name}</span>
                            <Button
                                variant="outline"
                                onClick={logout}
                                className="border-gray-300 text-ink hover:bg-gray-50 focus-visible:outline-gray-400"
                            >
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="rounded-full bg-accent-midnight text-white px-4 py-2 text-sm font-semibold shadow-sm transition hover:bg-accent-black hover:shadow-md"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}

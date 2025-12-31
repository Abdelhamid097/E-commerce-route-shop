"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { useState } from "react";
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
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
    const closeMobileMenu = () => setMobileMenuOpen(false);

    return (
        <header className="bg-white text-ink shadow-sm border-b border-gray-200 sticky top-0 z-50">
            <div className="container-responsive">
                {/* Main Navbar */}
                <div className="flex items-center justify-between gap-3 py-3 md:py-4">
                    {/* Logo - Smaller on mobile */}
                    <Link 
                        href="/" 
                        className="rounded-xl bg-gray-100 px-3 py-1.5 md:px-4 md:py-2 text-base md:text-xl font-semibold text-ink shadow-sm hover:bg-gray-200 transition whitespace-nowrap"
                        onClick={closeMobileMenu}
                    >
                        Route Shop
                    </Link>

                    {/* Desktop Navigation */}
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

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-2 md:gap-3">
                        {/* Wishlist - Icon on mobile, text on desktop */}
                        <Link 
                            href="/wishlist" 
                            className="relative rounded-full p-2 md:px-3 md:py-2 text-ink transition hover:bg-gray-100"
                            aria-label="Wishlist"
                        >
                            <svg 
                                className="w-5 h-5 md:hidden" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span className="hidden md:inline text-sm font-medium">Wishlist</span>
                            {wishlist?.length ? (
                                <span className="absolute -right-1 -top-1 md:-right-3 md:-top-2 inline-flex h-5 w-5 md:min-w-[20px] items-center justify-center rounded-full bg-accent-midnight text-white px-1 text-[10px] md:text-[11px] font-semibold shadow-md">
                                    {wishlist.length}
                                </span>
                            ) : null}
                        </Link>

                        {/* Cart - Icon on mobile, text on desktop */}
                        <Link 
                            href="/cart" 
                            className="relative rounded-full p-2 md:px-3 md:py-2 text-ink transition hover:bg-gray-100"
                            aria-label="Cart"
                        >
                            <svg 
                                className="w-5 h-5 md:hidden" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="hidden md:inline text-sm font-medium">Cart</span>
                            {cart?.numOfCartItems ? (
                                <span className="absolute -right-1 -top-1 md:-right-3 md:-top-2 inline-flex h-5 w-5 md:min-w-[20px] items-center justify-center rounded-full bg-accent-midnight text-white px-1 text-[10px] md:text-[11px] font-semibold shadow-md">
                                    {cart.numOfCartItems}
                                </span>
                            ) : null}
                        </Link>

                        {/* Auth Section */}
                        {isAuthenticated ? (
                            <div className="hidden md:flex items-center gap-2">
                                <span className="text-sm text-ink">Hi, {user?.name}</span>
                                <Button
                                    variant="outline"
                                    onClick={logout}
                                    className="border-gray-300 text-ink hover:bg-gray-50 focus-visible:outline-gray-400 text-sm px-3 py-1.5"
                                >
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="hidden md:block rounded-full bg-accent-midnight text-white px-4 py-2 text-sm font-semibold shadow-sm transition hover:bg-accent-black hover:shadow-md"
                            >
                                Login
                            </Link>
                        )}

                        {/* Mobile Menu Toggle Button */}
                        <button
                            onClick={toggleMobileMenu}
                            className="md:hidden rounded-full p-2 text-ink hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-gray-300"
                            aria-label="Toggle menu"
                            aria-expanded={mobileMenuOpen}
                        >
                            {mobileMenuOpen ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={clsx(
                        "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
                        mobileMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                    )}
                >
                    <nav className="border-t border-gray-200 py-4 space-y-2">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={closeMobileMenu}
                                className={clsx(
                                    "block rounded-lg px-4 py-3 text-base font-medium text-ink transition hover:bg-gray-100 transition",
                                    pathname === link.href && "bg-gray-100 text-ink shadow-sm"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                        {isAuthenticated ? (
                            <>
                                <div className="border-t border-gray-200 pt-2 mt-2">
                                    <div className="px-4 py-2 text-sm text-ink">
                                        Hi, {user?.name}
                                    </div>
                                    <button
                                        onClick={() => {
                                            logout();
                                            closeMobileMenu();
                                        }}
                                        className="w-full text-left rounded-lg px-4 py-3 text-base font-medium text-ink transition hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <Link
                                href="/login"
                                onClick={closeMobileMenu}
                                className="block rounded-lg bg-accent-midnight text-white px-4 py-3 text-base font-semibold text-center shadow-sm transition hover:bg-accent-black hover:shadow-md mt-2"
                            >
                                Login
                            </Link>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
}

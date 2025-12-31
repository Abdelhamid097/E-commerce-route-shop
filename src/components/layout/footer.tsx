import Link from "next/link";

const currentYear = new Date().getFullYear();

const quickLinks = [
    { href: "/products", label: "Products" },
    { href: "/categories", label: "Categories" },
    { href: "/brands", label: "Brands" },
    { href: "/orders", label: "Orders" },
    { href: "/wishlist", label: "Wishlist" },
    { href: "/cart", label: "Cart" }
];

const helpLinks = [
    { href: "/contact", label: "Contact" },
    { href: "/faq", label: "FAQ" },
    { href: "/returns", label: "Returns" },
    { href: "/shipping", label: "Shipping" }
];

export function Footer() {
    return (
        <footer className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-sm text-white">
            <div className="container-responsive grid gap-8 py-12 md:grid-cols-4">
                <div className="space-y-3">
                    <h2 className="text-base font-semibold text-white">Route Shop</h2>
                    <p className="text-white/80">
                        Your one-stop shop for authentic products, fast shipping, and secure checkout powered by Route APIs.
                    </p>
                    <div className="flex gap-2 text-xs text-white/80">
                        <span className="rounded-full bg-white/10 px-3 py-1">Secure checkout</span>
                        <span className="rounded-full bg-white/10 px-3 py-1">24/7 support</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-white">Shop</h3>
                    <div className="grid grid-cols-2 gap-2 text-white/80">
                        {quickLinks.map((link) => (
                            <Link key={link.href} href={link.href} className="rounded-md px-1 py-1 transition hover:bg-white/10 hover:text-white">
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-white">Help</h3>
                    <div className="grid grid-cols-2 gap-2 text-white/80">
                        {helpLinks.map((link) => (
                            <Link key={link.href} href={link.href} className="rounded-md px-1 py-1 transition hover:bg-white/10 hover:text-white">
                                {link.label}
                            </Link>
                        ))}
                    </div>
                    <div className="text-xs text-white/70">
                        <p>Support: support@route.shop</p>
                        <p>Phone: +20 111 222 333</p>
                    </div>
                </div>

                <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-white">Stay in the loop</h3>
                    <p className="text-white/80">Get the latest deals and releases. No spam, ever.</p>
                    <form className="flex flex-col gap-2 sm:flex-row">
                        <input
                            type="email"
                            name="newsletter"
                            placeholder="Enter your email"
                            className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/60 outline-none focus:border-white focus:ring-0"
                        />
                        <button
                            type="submit"
                            className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-500"
                        >
                            Subscribe
                        </button>
                    </form>
                    <div className="text-xs text-white/70">
                        <p>We accept major cards and offer cash on delivery.</p>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/10 bg-primary-900/80">
                <div className="container-responsive flex flex-col gap-2 py-4 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
                    <span>© {currentYear} Route Shop. All rights reserved.</span>
                    <span>Built with Next.js, React Query, and Tailwind CSS.</span>
                </div>
            </div>
        </footer>
    );
}

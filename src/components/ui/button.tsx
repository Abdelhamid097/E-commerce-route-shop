"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";

const base = "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
const variants = {
    solid: "bg-accent-midnight text-white shadow-md hover:bg-accent-black hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-accent-midnight",
    ghost: "bg-transparent text-ink hover:bg-gray-100 active:bg-gray-200 focus-visible:outline-gray-400",
    outline: "border-2 border-gray-300 text-ink hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 focus-visible:outline-gray-400"
};

export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof variants }>(
    function Button({ className, variant = "solid", ...props }, ref) {
        return <button ref={ref} className={clsx(base, variants[variant], className)} {...props} />;
    }
);

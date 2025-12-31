"use client";

import { forwardRef, InputHTMLAttributes } from "react";
import { clsx } from "clsx";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input(
    { className, ...props },
    ref
) {
    return (
        <input
            ref={ref}
            className={clsx(
                "block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-ink shadow-sm transition placeholder:text-gray-400 focus:border-accent-midnight focus:outline-none focus:ring-2 focus:ring-accent-midnight/20",
                className
            )}
            {...props}
        />
    );
});

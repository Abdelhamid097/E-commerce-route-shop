"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface ProductImageProps {
    src: string | undefined | null;
    alt: string;
    fill?: boolean;
    className?: string;
    sizes?: string;
    width?: number;
    height?: number;
}

// Simple placeholder SVG as data URL
const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23f1f5f9' width='400' height='400'/%3E%3Ctext fill='%2394a3b8' font-family='system-ui' font-size='16' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E";

export function ProductImage({ src, alt, fill, className, sizes, width, height }: ProductImageProps) {
    const [imgSrc, setImgSrc] = useState<string>(() => {
        // Use placeholder if src is missing or invalid
        if (!src || src.trim() === "" || src === "undefined" || src === "null") {
            return PLACEHOLDER_IMAGE;
        }
        return src;
    });
    const [hasError, setHasError] = useState(false);

    // Update imgSrc when src prop changes
    useEffect(() => {
        if (!src || src.trim() === "" || src === "undefined" || src === "null") {
            setImgSrc(PLACEHOLDER_IMAGE);
            setHasError(false);
        } else if (src !== imgSrc && !hasError) {
            setImgSrc(src);
        }
    }, [src, imgSrc, hasError]);

    const handleError = () => {
        if (!hasError) {
            setHasError(true);
            setImgSrc(PLACEHOLDER_IMAGE);
        }
    };

    const imageProps = {
        src: imgSrc,
        alt,
        className,
        onError: handleError,
        unoptimized: imgSrc === PLACEHOLDER_IMAGE || imgSrc.startsWith("data:")
    };

    if (fill) {
        return <Image {...imageProps} fill sizes={sizes} />;
    }

    return <Image {...imageProps} width={width} height={height} sizes={sizes} />;
}


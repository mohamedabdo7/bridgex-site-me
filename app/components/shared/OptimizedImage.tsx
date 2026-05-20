"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/app/lib/utils";
import { UNSPLASH_IMAGES } from "@/app/lib/unsplash-images";

interface OptimizedImageProps extends Omit<ImageProps, "onLoad"> {
  fallback?: string;
  wrapperClassName?: string;
}

export function OptimizedImage({
  src,
  alt,
  className,
  wrapperClassName,
  fallback = UNSPLASH_IMAGES.placeholder,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", wrapperClassName)}>
      <Image
        src={error ? fallback : src}
        alt={alt}
        className={cn(
          "transition-all duration-500",
          isLoading ? "scale-105 blur-sm" : "scale-100 blur-0",
          className,
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => setError(true)}
        {...props}
      />
      {isLoading && <div className="absolute inset-0 bg-muted animate-pulse" />}
    </div>
  );
}
// "use client";

// import Image, { type ImageProps } from "next/image";
// import { useState } from "react";
// import { cn } from "@/app/lib/utils";

// interface OptimizedImageProps extends Omit<ImageProps, "onLoad"> {
//   fallback?: string;
// }

// export function OptimizedImage({
//   src,
//   alt,
//   className,
//   fallback = "/images/placeholder.jpg",
//   ...props
// }: OptimizedImageProps) {
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(false);

//   return (
//     <div className={cn("relative overflow-hidden", className)}>
//       <Image
//         src={error ? fallback : src}
//         alt={alt}
//         className={cn(
//           "transition-all duration-500",
//           isLoading ? "scale-105 blur-sm" : "scale-100 blur-0",
//         )}
//         onLoad={() => setIsLoading(false)}
//         onError={() => setError(true)}
//         {...props}
//       />
//       {isLoading && <div className="absolute inset-0 bg-muted animate-pulse" />}
//     </div>
//   );
// }

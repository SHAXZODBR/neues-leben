"use client";

import { Share2, Check } from "lucide-react";
import { useState } from "react";

interface BlogShareButtonProps {
  title: string;
  url: string;
}

export function BlogShareButton({ title, url }: BlogShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    // Try to use native Web Share API first (works great on mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
      } catch (error) {
        // Share cancelled or failed - silently handle
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error("Failed to copy:", error);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary"
      aria-label="Share article"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          Copied!
        </>
      ) : (
        <>
          <Share2 className="h-4 w-4" />
          Share
        </>
      )}
    </button>
  );
}

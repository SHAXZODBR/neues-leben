"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";

type ShareButtonProps = {
  title: string;
  description?: string;
};

export function ShareButton({ title, description }: ShareButtonProps) {
  const [message, setMessage] = useState<string | null>(null);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (!url) return;

    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text: description,
          url,
        });
        setMessage("Shared!");
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setMessage("Link copied to clipboard");
      } else {
        setMessage("Sharing not supported in this browser");
      }
    } catch (error) {
      setMessage("Share cancelled");
    } finally {
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className="flex flex-col items-start">
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary"
        aria-label="Share article"
      >
        <Share2 className="h-4 w-4" />
        Share
      </button>
      {message && <p className="mt-2 text-xs text-muted-foreground">{message}</p>}
    </div>
  );
}







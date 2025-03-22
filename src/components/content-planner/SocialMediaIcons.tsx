
import { FC } from "react";
import { Instagram as InstagramIcon, Pin as PinterestIcon } from "lucide-react";

// Custom icons for platforms that don't have direct equivalents in lucide-react
const TikTokIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    width="100%"
    height="100%"
    className={className}
    fill="currentColor"
  >
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
  </svg>
);

const XIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    width="100%"
    height="100%"
    className={className}
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface SocialMediaIconProps {
  platform: string;
  className?: string;
}

export const SocialMediaIcon: FC<SocialMediaIconProps> = ({ platform, className = "" }) => {
  const normalizedPlatform = platform.toLowerCase();
  
  switch (normalizedPlatform) {
    case "instagram":
      return <InstagramIcon className={className} />;
    case "tiktok":
      return <TikTokIcon className={className} />;
    case "twitter":
    case "x":
      return <XIcon className={className} />;
    case "pinterest":
      return <PinterestIcon className={className} />;
    default:
      // Default circle with first letter
      return (
        <div className={`rounded-full flex items-center justify-center ${className}`}>
          {platform.charAt(0).toUpperCase()}
        </div>
      );
  }
};

export const getPlatformColorClass = (platform: string): string => {
  const normalizedPlatform = platform.toLowerCase();
  
  switch (normalizedPlatform) {
    case "instagram":
      return "bg-gradient-to-tr from-purple-600 via-pink-600 to-yellow-400";
    case "tiktok":
      return "bg-black";
    case "twitter":
    case "x":
      return "bg-black";
    case "pinterest":
      return "bg-red-600";
    case "linkedin":
      return "bg-blue-600";
    case "facebook":
      return "bg-blue-500";
    case "youtube":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

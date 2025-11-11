import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface UserAvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
}

function getInitials(name: string): string {
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function getGradientFromName(name: string): string {
  const hash = name.split("").reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  const hue = Math.abs(hash % 360);
  return `linear-gradient(135deg, hsl(${hue}, 70%, 50%), hsl(${(hue + 40) % 360}, 70%, 60%))`;
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-16 w-16 text-lg",
};

export function UserAvatar({ name, size = "md" }: UserAvatarProps) {
  return (
    <Avatar className={sizeClasses[size]} data-testid="avatar-user">
      <AvatarFallback
        style={{ background: getGradientFromName(name) }}
        className="text-white font-semibold"
      >
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
}

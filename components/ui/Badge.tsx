import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  variant?: "default" | "accent" | "outline";
  className?: string;
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    default: "bg-ink-100 text-ink-700 dark:bg-ink-800 dark:text-ink-300",
    accent: "bg-signal-50 text-signal-700 dark:bg-signal-900/30 dark:text-signal-300",
    outline: "border border-ink-200 text-ink-600 dark:border-ink-700 dark:text-ink-400",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

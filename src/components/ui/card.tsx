import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-[28px] border border-[color:var(--border)] bg-[color:var(--surface)] shadow-[0_24px_65px_-40px_rgba(15,23,42,0.45)] ${className}`.trim()}
      {...props}
    />
  );
}
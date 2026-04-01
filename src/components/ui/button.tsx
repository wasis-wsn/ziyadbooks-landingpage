import Link from "next/link";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  target?: string;
  rel?: string;
}

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--primary)]";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[color:var(--secondary)] text-white shadow-[0_16px_35px_-18px_rgba(245,124,0,0.7)] hover:-translate-y-0.5 hover:bg-[#ef6f00]",
  secondary:
    "border border-[color:var(--border)] bg-white text-[color:var(--foreground)] shadow-sm hover:-translate-y-0.5 hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]",
  ghost: "bg-transparent text-[color:var(--foreground)] hover:bg-black/5",
};

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  target,
  rel,
  type = "button",
  ...props
}: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  if (href) {
    return (
      <Link className={classes} href={href} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type={type} {...props}>
      {children}
    </button>
  );
}
"use client";
import React from "react";

const base =
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";
const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-base",
  lg: "h-12 px-6 text-lg",
};
const variants = {
  primary:
    "bg-red-500 text-white font-semibold rounded-lg shadow-md transition-transform hover:scale-110 hover:bg-red-600 focus:ring-2 ",
  secondary:
    "bg-transparent border-2 border-red-500 text-red-500 font-semibold rounded-lg transition-colors hover:bg-red-500 hover:text-white focus:ring-2",
};

export default function Button({
  children,
  href,           
  download,        
  variant = "primary",
  size = "md",
  type = "button",
  onClick,
  targetId,
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon = null,
  rightIcon = null,
  className = "",
  ariaLabel,
}) {
  const classes = [
    base,
    sizes[size] || sizes.md,
    variants[variant] || variants.primary,
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (targetId) {
      const section = document.getElementById(targetId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  if (href) {
    return (
      <a
        href={href}
        download={download}
        aria-label={ariaLabel}
        className={classes}
      >
        {leftIcon ? <span className="mr-2 inline-flex">{leftIcon}</span> : null}
        {loading ? "Loading ..." : children}
        {rightIcon ? <span className="ml-2 inline-flex">{rightIcon}</span> : null}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      className={classes}
    >
      {leftIcon ? <span className="mr-2 inline-flex">{leftIcon}</span> : null}
      {loading ? "Loading ..." : children}
      {rightIcon ? <span className="ml-2 inline-flex">{rightIcon}</span> : null}
    </button>
  );
}
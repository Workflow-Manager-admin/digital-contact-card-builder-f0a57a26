import type { HTMLProps } from "react";

/**
 * PUBLIC_INTERFACE
 * A minimalist input component for consistent app-wide design.
 */
export function Input(props: HTMLProps<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={
        "input bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 outline-none text-sm focus:border-primary focus:ring-primary focus:ring-2 transition-all " +
        (props.className || "")
      }
    />
  );
}

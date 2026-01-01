import { ButtonHTMLAttributes } from "react";

type ButtonProps = {
  variant?: "default" | "solid" | "outline" | "destructive";
  children: React.ReactNode;
  additionalStyles?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

interface StyledVariantsType {
  default: string;
  destructive: string;
  solid: string;
  outline: string;
}
export default function Button({
  variant = "default",
  children,
  additionalStyles = "rounded-lg py-3 px-4 ",
  ...props
}: ButtonProps) {
  const styledVariants: StyledVariantsType = {
    default: "bg-blue-light text-white hover:bg-blue-dark ",
    solid:
      "bg-neutral-100 dark:bg-nutral-800 text-neutral-950 dark:text-white hover:border hover:border-neutral-300 hover:bg-white hover:text-neutral-950  ",
    destructive: "bg-red-light text-white hover:brightness-90 ",

    outline:
      "border border-neutral-300 bg-white text-neutral-950 hover:border-none hover:bg-neutral-100 hover:text-neutral-600",
  };
  return (
    <button
      className={`inline-flex items-center justify-center gap-1.5 text-sm leading-[120%] -tracking-[0.2px] font-medium disabled:bg-neutral-100 disabled:text-neutral-300 dark:disabled:bg-neutral-800 dark:disabled:text-neutral-white disabled:cursor-not-allowed cursor-pointer ${styledVariants[variant]} ${additionalStyles} transition-all duration-300 ease`}
      {...props}
    >
      {children}
    </button>
  );
}

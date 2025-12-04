import { ButtonHTMLAttributes } from "react";

type ButtonProps = {
  variant?: "default" | "outline" | "success" | "destructive" | "text";
  children: React.ReactNode;
  additionalStyles?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

interface StyledVariantsType {
  default: string;
  destructive: string;
  success: string;
  outline: string;
  text: string;
}
export default function Button({
  variant = "default",
  children,
  additionalStyles = "cursor-pointer",
  ...props
}: ButtonProps) {
  const styledVariants: StyledVariantsType = {
    default: "bg-blue-light text-white hover:bg-raba-orange/90 active:scale-95",
    destructive:
      "bg-red-secondary text-white hover:brightness-90 active:scale-95",
    success: "bg-green-accent text-white hover:brightness-90 active:scale-95",
    outline:
      "border border-neutral-350 bg-white text-neutral-350 hover:brightness-90 active:scale-95",
    text: "text-blue-secondary hover:brightness-90 active:scale-95",
  };
  return (
    <button
      className={`flex items-center gap-1.5 text-base leading-4.5 font-medium p-2.5 rounded-lg ${styledVariants[variant]} ${additionalStyles} smooth-transition`}
      {...props}
    >
      {children}
    </button>
  );
}

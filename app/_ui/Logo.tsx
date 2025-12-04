import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/images/logo.svg"
      width={95}
      height={28}
      alt="Notes"
      className="w-24 h-auto"
    />
  );
}

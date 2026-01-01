import AuthForm from "../_components/AuthForm";

export default function Page() {
  return (
    <div className="bg-neutral-100 min-h-screen flex items-center justify-center px-6 md:px-10 py-[22px] md:py-[44px] lg:py-[88px]">
      <AuthForm mode="signup" />
    </div>
  );
}

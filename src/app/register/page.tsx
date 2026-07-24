import { AuthLayout } from "@/components/auth/AuthLayout";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout title="Get Started Free" subtitle="Create your account to start writing and worldbuilding">
      <RegisterForm />
    </AuthLayout>
  );
}

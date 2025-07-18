import SignInForm from "@/components/forms/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignInPage() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="font-bold text-xl">Welcome Back</CardTitle>
        <CardDescription>Login to continue with bookings</CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
    </Card>
  );
}

import AuthLayout from "@/layouts/auth-layout";
import { IconArrowLeft, IconMail } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "@/config/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { forgotPasswordSchema } from "../schemas/forgot-password-schema";
import { useForgotPassword } from "../hooks/useForgotPassword";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const forgotPasswordMutate = useForgotPassword();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleReset = async (values) => {
    try {
      await forgotPasswordMutate.mutateAsync(values);
      navigate("/verify-otp");
    } catch (error) {
      toast.error("Forgot password error", { description: error.message });
    }
  };

  return (
    <AuthLayout>
      <div className="w-full lg:w-[30rem] pt-10 p-5 border-[1px] border-[#CCCCCC] rounded-lg shadow-md">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleReset)}
            className="flex flex-col gap-4"
          >
            <div>
              <h2 className="text-2xl font-bold text-primary">
                Forgot Password
              </h2>
              <p className="my-2 text-sm text-gray-800/80">
                Please enter your email and we'll send your OTP code.
              </p>
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="email"
                        icon={<IconMail className="text-gray-400" />}
                        type="text"
                        label="Email"
                        placeholder="Masukkan Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <Button
              type="submit"
              className="text-white font-semibold text-base bg-primary"
            >
              Reset Password
            </Button>
          </form>
        </Form>
        <Link
          to={"/login"}
          className="pt-5 flex gap-2 items-center text-xs font-semibold text-primary underline"
        >
          <IconArrowLeft size={24} />
          Kembali ke halaman Login
        </Link>
      </div>
    </AuthLayout>
  );
}

import AuthLayout from "@/layouts/auth-layout";
import { IconArrowLeft, IconLock, IconMail } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "@/config/api";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useState } from "react";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const otp = sessionStorage.getItem("otp");

  const formSchema = z
    .object({
      password: z
        .string()
        .min(4, { message: "Password at least has 4 character" }),
      confirmPassword: z
        .string()
        .min(1, { message: "Confirm Password is required" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password do not match",
      path: ["confirmPassword"],
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleResetPassword = async (values) => {
    try {
      setLoading(true);
      const result = await fetch(`${baseUrl}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp: otp,
          password: values.password,
          confirmPassword: values.confirmPassword,
        }),
      });

      if (result.ok) {
        toast.success("Berhasil Reset Password Akun Anda");

        setTimeout(() => {
          navigate("/login");
        }, 2500);
      } else {
        const data = await result.json();
        form.setError("password", {
          message: data?.message || "Failed for reset password .",
        });

        if (data?.message.toLowerCase().includes("token")) {
          toast("Reset link has expired", {
            description:
              "Please re-enter your email to receive a new reset link.",
            action: {
              label: "Go to Forgot Password",
              onClick: () => navigate("/forgot-password"),
            },
          });
        }
      }
    } catch (error) {
      console.error("Reset password error:", error);
      form.setError("password", {
        message: "Something error.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full lg:w-[30rem] pt-10 p-5 border-[1px] border-[#CCCCCC] rounded-lg shadow-md">
        <Form {...form}>
          <form
            action=""
            onSubmit={form.handleSubmit(handleResetPassword)}
            className="flex flex-col gap-4"
          >
            <div>
              <h2 className="text-2xl font-bold text-primary">
                Create New Password
              </h2>
              <p className="my-2 text-sm text-gray-600/80">
                Enter your password for your account
              </p>
            </div>

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <Input
                      id="password"
                      icon={<IconLock className="text-gray-400" />}
                      type="password"
                      label="Password"
                      placeholder="Masukkan Password"
                      autoComplete="new-password"
                      aria-invalid={!!form.formState.errors.password}
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => {
                return (
                  <FormItem>
                    <Input
                      id="confirmPassword"
                      icon={<IconLock className="text-gray-400" />}
                      type="password"
                      label="Confirm Password"
                      placeholder="Masukkan Confirm Password"
                      autoComplete="new-password"
                      aria-invalid={!!form.formState.errors.confirmPassword}
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <Button
              type="submit"
              className="text-white font-semibold text-base bg-primary"
            >
              {loading ? "Loading..." : "Reset Password"}
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

import AuthLayout from "@/layouts/auth-layout";
import { IconLoader2, IconLock, IconMail } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/login-schema";
import { useLogin } from "../hooks/useLogin";

export default function LoginPage() {
  const loginMutation = useLogin();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = (values) => loginMutation.mutate(values);

  return (
    <AuthLayout>
      <div className="w-full lg:w-[30rem] pt-10 p-5 border-[1px] border-[#CCCCCC] rounded-lg shadow-md">
        <Form {...form}>
          <form
            action=""
            onSubmit={form.handleSubmit(handleLogin)}
            className="flex flex-col gap-4"
          >
            <div>
              <p className="text-sm font-semibold">Welcome to</p>
              <h2 className="text-3xl font-bold text-primary">Tokolabs</h2>
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
                        aria-invalid={!!form.formState.errors.email}
                        autoComplete="username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="password"
                        icon={<IconLock className="text-gray-400" />}
                        type="password"
                        label="Password"
                        placeholder="Masukkan Password"
                        aria-invalid={!!form.formState.errors.password}
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Checkbox id="rememberMe" />
                <label htmlFor="rememberMe" className="text-xs font-medium">
                  Remember Me
                </label>
              </div>

              <Link
                to="/forgot-password"
                className="text-xs font-semibold text-primary"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              className="text-white font-semibold text-base bg-primary"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <IconLoader2 className="animate-spin mr-2" />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </AuthLayout>
  );
}

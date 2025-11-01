import AuthLayout from "@/layouts/auth-layout";
import { IconArrowLeft, IconLoader2, IconLock, IconMail, IconUser } from "@tabler/icons-react";
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
import { registerSchema } from "../schemas/register-schema";
import { useRegister } from "../hooks/useRegister";

export default function RegisterPage() {
    const registerMutation = useRegister();

    const form = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const handleRegister = (values) => registerMutation.mutate(values);

    return (
        <AuthLayout>
            <div className="w-full lg:w-[30rem] pt-10 p-5 border-[1px] border-[#CCCCCC] rounded-lg shadow-md">
                <Form {...form}>
                    <form
                        action=""
                        onSubmit={form.handleSubmit(handleRegister)}
                        className="flex flex-col gap-4"
                    >
                        <div>
                            <p className="text-sm font-semibold">Welcome to</p>
                            <h2 className="text-3xl font-bold text-primary">LINCY</h2>
                        </div>

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                id="name"
                                                icon={<IconUser className="text-gray-400" />}
                                                type="text"
                                                label="Name"
                                                placeholder="Your Name"
                                                aria-invalid={!!form.formState.errors.email}
                                                autoComplete="name"
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
                                                placeholder="Your Email"
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
                                                placeholder="Your Password"
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

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                id="password"
                                                icon={<IconLock className="text-gray-400" />}
                                                type="password"
                                                label="Confirm Password"
                                                placeholder="Repeat Your Password"
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

                        <Button
                            type="submit"
                            className="text-white font-semibold text-base bg-primary"
                            disabled={registerMutation.isPending}
                        >
                            {registerMutation.isPending ? (
                                <IconLoader2 className="animate-spin mr-2" />
                            ) : (
                                "Register"
                            )}
                        </Button>
                    </form>
                </Form>
                <Link
                    to={"/login"}
                    className="pt-5 flex gap-2 items-center text-xs font-semibold text-primary underline"
                >
                    <IconArrowLeft size={24} />
                    Back to Login
                </Link>
            </div>
        </AuthLayout>
    );
}

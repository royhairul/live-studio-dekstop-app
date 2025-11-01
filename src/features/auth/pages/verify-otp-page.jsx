import AuthLayout from "@/layouts/auth-layout";
import { IconArrowLeft, IconLock, IconMail } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { apiEndpoints, baseUrl } from "@/config/api";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "axios";

export default function VerifyTokenPage() {
  const navigate = useNavigate();
  const email = sessionStorage.getItem("email") || "not found";
  const [Loading, setLoading ] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const formSchema = z.object({
    otp: z.string().min(6, { message: "Your OTP must be 6 character." }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  const handleVerify = async (values) => {

      try {
        setLoading(true);
        const result = await axios.post(apiEndpoints.auth.verifyOTP(), values, {
          headers: {
            "Content-Type": "application/json",
          },
        });        

    if (result.status === 200) {
      sessionStorage.setItem("otp", values.otp);
      setTimeout(() => {
        navigate("/reset-password");
      }, 1000);
    } else {
      const data = await result.json();
      form.setError("otp", {
        message: data?.message || "Gagal melakukan verify token.",
      });
    }
  } catch (error) {
    console.error("Verify Token error:", error);
    form.setError("otp", {
      message: "Terjadi kesalahan saat melakukan verify.",
    });
  } finally{
    setLoading(false);
  }
};

const handleResend = async () => {
  const email = sessionStorage.getItem("email");

  if (!email) {
    toast("Email not found");
  }

  try {
    setResendLoading(true);
    const result = await fetch(`${baseUrl}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (result.ok) {
      console.log("success");
      toast.success("OTP has resend to your email.");
    } else {
      console.log("error");
      toast.error("Failed to resend OTP");
      const data = await result.json();
      form.setError("email", {
        message: data?.message || "Reset password gagal.",
      });
    }
  } catch (error) {
    console.error("Reset Password error:", error);
    form.setError("email", {
      message: "Terjadi kesalahaan untuk reset password.",
    });
  } finally {
    setResendLoading(false);
  }
};

return (
  <AuthLayout>
    <div className="w-full lg:w-[30rem] pt-10 p-5 border-[1px] border-[#CCCCCC] rounded-lg shadow-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleVerify)}
          className="flex flex-col gap-4"
        >
          <div>
            <h2 className="text-2xl font-bold text-primary">
              OTP Verification
            </h2>
            <p className="text-sm my-2">
              Enter the OTP sent to{" "}
              <span className="font-semibold">{email}</span>
            </p>
          </div>

          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => {
              return (
                <FormItem>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Button
            type="submit"
            className="text-white font-semibold text-base bg-primary"
          >
            {Loading ? "Loading..." : "Verify"}
          </Button>

          <p className=" flex items-center gap-2">
            <span className="text-sm">If you don't receive a code ?</span>
            <Button
              onClick={handleResend}
              className="p-0 text-sm font-semibold text-primary bg-transparent hover:bg-transparent hover:underline disabled:opacity-50"
            >
              {resendLoading ? "Loading..." : "Resend"}
            </Button>
          </p>
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

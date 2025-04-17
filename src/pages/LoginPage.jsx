import AuthLayout from "@/layouts/AuthLayout";
import Input from "@/components/Input";
import { RiMailLine, RiLockLine } from "@remixicon/react";
import { Checkbox, Link, Button } from "@heroui/react";

const LoginPage = () => {
  return (
    <AuthLayout>
      <div className="w-[30rem] pt-10 p-5 flex flex-col gap-4 border-[1px] border-[#CCCCCC] rounded-lg">
        <div className="">
          <p className="text-sm font-semibold">Welcome to</p>
          <h2 className="text-3xl font-bold text-appPrimary">Tokolabs</h2>
        </div>

        <Input
          type="email"
          icon={<RiMailLine size={24} color="#464646" />}
          label="Email"
          placeholder="Masukkan Email"
        />

        <Input
          type="password"
          icon={<RiLockLine size={24} color="#464646" />}
          label="Password"
          placeholder="Masukkan Password"
        />

        <div className="flex justify-between items-center">
          <Checkbox classNames={{ label: "text-xs" }}>Remember Me</Checkbox>

          <Link href="#" className="text-xs font-semibold text-appPrimary">
            Forgot Password?
          </Link>
        </div>

        <Button className="text-white font-semibold text-base bg-appPrimary">
          Login
        </Button>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;

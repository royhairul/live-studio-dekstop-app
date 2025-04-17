import vectorStart from "@/assets/vector-start.svg";

const AuthLayout = ({ children }) => {
  return (
    <div className="w-full h-screen flex">
      <div className="w-1/2 flex justify-center items-center">
        <img src={vectorStart} className="bg-cover" />
      </div>
      <div className="w-1/2 bg-white grid place-content-center">{children}</div>
    </div>
  );
};

export default AuthLayout;

export default function AuthLayout({ children }) {
  return (
    <div className="w-full h-screen flex flex-col lg:flex-row bg-white">
      {/* Bagian Gambar */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-4">
        <img
          src="/assets/vector-start.svg"
          alt="Auth Illustration"
          className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full h-auto"
        />
      </div>

      {/* Bagian Form */}
      <div className="w-full lg:w-1/2 grid place-content-center p-6">
        {children}
      </div>
    </div>
  );
}

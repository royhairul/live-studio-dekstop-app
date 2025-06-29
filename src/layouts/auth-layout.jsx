export default function AuthLayout({ children }) {
  return (
    <>
      <div className="w-full h-screen flex lg:flex-row flex-col bg-white">
        <div className="w-1/2 flex justify-center items-center">
          <img src="/assets/vector-start.svg" className="bg-cover" />
        </div>
        <div className="w-1/2 grid place-content-center">{children}</div>
      </div>
    </>
  );
}

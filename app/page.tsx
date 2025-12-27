import Image from "next/image";
import Link from "next/link";

export default function Main() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex items-center">
        <div className="flex min-w-1/2 max-w-fit gap-5 m-10">
          <Image
            src="/logo.png"
            alt="Logo"
            width={100}
            height={50}
            className="rounded-2xl shadow-md"
          />
          <div>
            <h1 className="text-8xl font-extrabold">Welcome to Tabs!</h1>
            <hr className="border" />
            <p className="text-md font-extrabold ml-5">
              a subscription tracker
            </p>
          </div>
        </div>
        <Link
          href="/home"
          className="bg-gray-500 text-white hover:bg-black rounded-2xl p-5 font-extrabold"
        >
          VISIT
        </Link>
      </div>
    </div>
  );
}

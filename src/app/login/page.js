"use client";
import Lottie from "react-lottie";
import { FcGoogle } from "react-icons/fc";
import * as GirlLogin from "../../assets/animations/GirlLogin.json";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useUser } from "@/utils/contexts";
import { useRouter } from "next/navigation";
import { validateInput } from "@/utils/constants";

const Login = () => {
  const router = useRouter();
  const { Login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const isValid = validateInput(email, password);
      console.log(isValid.success);
      if (isValid.success) {
        const res = await Login(email, password);
        if (!res.success) {
          toast.error(res.message);
          return;
        } else {
          toast.success(res.message);
          router.push("/dashboard");
        }
        return;
      }
      toast.error(isValid.message);
      return;
    } catch (e) {
      toast.error(e.message.toString());
    }
  };

  return (
    <main className="flex justify-between bg-gray-800 align-middle h-screen overflow-hidden">
      <div
        id="leftContainer"
        className="flex md:w-1/3 flex-col h-full shadow-lg shadow-black bg-gray-900  align-middle md:rounded-r-3xl justify-center items-center px-16"
      >
        <div className="flex flex-col">
          <div>
            <p className="text-secondaryTextColor">Welcome Back,</p>
            <p className="text-sm text-gray-400">
              Continue with Google or enter your details
            </p>
          </div>
          <button
            onClick={() => {}}
            className="flex border rounded justify-center p-2 my-4"
            disabled
          >
            <FcGoogle size={22} />
            <span className="ml-2 text-secondaryTextColor">
              Log in with Google
            </span>
          </button>
        </div>
        <div className="flex my-2">
          <div className="border-b w-full mb-3 mx-4 border-gray-600"></div>
          <div className="text-lg text-gray-400">or</div>
          <div className="border-b w-full mb-3 mx-4 border-gray-600"></div>
        </div>
        <div className="flex flex-col">
          <input
            className="border-b-2 focus:outline-none text-white border-gray-600 p-2 rounded-md bg-gray-800 my-4"
            placeholder="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border-b-2 focus:outline-none text-white border-gray-600 p-2 rounded-md bg-gray-800 my-4"
            placeholder="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-between">
            <div className="flex align-middle">
              {/* <input placeholder="Password" type="checkbox" />
							<p className="mx-2 text-secondaryTextColor">Remember me</p> */}
            </div>
            <div className="text-secondaryTextColor underline">
              Forgot Password
            </div>
          </div>
          <button
            type="submit"
            onClick={handleLogin}
            className="flex border rounded justify-center text-secondaryTextColor p-2 my-6"
          >
            Log in
          </button>
          <div className="flex justify-between align-middle text-secondaryTextColor">
            <div className="">Don&apos;t have an Account?</div>
            <Link href="/signup" className="underline ml-2">
              Sign up for Free
            </Link>
          </div>
        </div>
      </div>
      <div id="rightContainer" className="hidden w-2/3 md:flex justify-center">
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: GirlLogin,
          }}
          height={"100vh"}
          width={"w-full"}
        />
      </div>
    </main>
  );
};
export default Login;

"use client";
import React, { useState } from "react";
import Lottie from "react-lottie";
import { FcGoogle } from "react-icons/fc";
import * as RocketSignup from "../../assets/animations/RocketSignup.json";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useUser } from "@/utils/contexts";
import { validateInput } from "@/utils/constants";

const Signup = () => {
  const router = useRouter();
  const { SignUp } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [cpassword, setCPassword] = useState("");
  const handleSignup = async (e) => {
    try {
      e.preventDefault();
      if (cpassword !== password) {
        toast.error(`Passwords don't match`);
        return;
      }
      const isValid = validateInput(email, password);
      if (isValid.success) {
        const res = await SignUp(userName, email, password);
        if (res.success) {
          toast.success("Signup Success ! please login to continue");
          router.push("/login");
          return;
        }
        toast.error(res.message);
        return;
      }
      toast.error(isValid.message);
      return;
    } catch (e) {
      toast.error(e.message.toString());
    }
  };
  const getSantizedInput = (value, setter) => {
    const regex = /^[A-Za-z0-9._@-]+$/;
    console.log(regex.test(value));
    if (regex.test(value) || value == "") {
      setter(value);
      return;
    }
    toast.error("Only letters , digits and @._- are allowed", {
      id: "input error",
    });
    return;
  };
  return (
    <main className="flex justify-between bg-gray-800  align-middle h-[100vh] overflow-hidden">
      <div id="leftContainer" className="w-2/3 hidden md:flex justify-center">
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: RocketSignup,
          }}
          height={"100vh"}
          width={"w-full"}
        />
      </div>
      <div
        id="rightContainer"
        className="flex md:w-1/3 flex-col shadow-lg shadow-black bg-gray-900 align-middle justify-center md:rounded-l-3xl px-16"
      >
        <div className="flex flex-col">
          <div className="text-xl space-y-2">
            <p className="text-secondaryTextColor">Welcome,</p>
            <p className="text-sm text-gray-400">
              Continue with Google or enter your details
            </p>
          </div>
          <button
            onClick={() => {}}
            className="flex border rounded justify-center outline-none p-2 my-4"
            disabled
          >
            <FcGoogle size={22} />
            <span className="ml-2 text-secondaryTextColor">
              Sign up with Google
            </span>
          </button>
        </div>
        <div className="flex my-2">
          <div className="border-b w-full mb-3 mx-4 border-gray-600"></div>
          <div className="text-lg text-gray-400">or</div>
          <div className="border-b w-full mb-3 mx-4 border-gray-600"></div>
        </div>
        <form onSubmit={handleSignup} className="flex flex-col">
          <input
            className="border-b-2 focus:outline-none text-white border-gray-600 p-2 rounded-md bg-gray-800 my-4"
            placeholder="Username"
            type="text"
            required
            value={userName}
            onChange={(e) => getSantizedInput(e.target.value, setUserName)}
          />
          <input
            className="border-b-2 focus:outline-none text-white border-gray-600 p-2 rounded-md bg-gray-800 my-4"
            placeholder="Email"
            type="email"
            required
            value={email}
            onChange={(e) => getSantizedInput(e.target.value, setEmail)}
          />
          <input
            className="border-b-2 focus:outline-none text-white border-gray-600 p-2 rounded-md bg-gray-800 my-4"
            placeholder="Password"
            type="password"
            required
            value={password}
            onChange={(e) => getSantizedInput(e.target.value, setPassword)}
          />
          <input
            className="border-b-2 focus:outline-none text-white border-gray-600 p-2 rounded-md bg-gray-800 my-4"
            placeholder="Confirm Password"
            type="password"
            required
            value={cpassword}
            onChange={(e) => getSantizedInput(e.target.value, setCPassword)}
          />
          <button className="flex border rounded justify-center text-secondaryTextColor p-2 my-6">
            Sign up
          </button>
          <div className="flex justify-between text-secondaryTextColor">
            <div>Already have an Account?</div>
            <Link href="/login" className="underline">
              Login Here
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Signup;

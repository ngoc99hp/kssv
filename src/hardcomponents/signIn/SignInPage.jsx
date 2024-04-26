import React from "react";
import { useState } from "react";
import { useSignIn } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";

const SignInPage = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [progress, setProgress] = useState("");

  async function logIn(e) {
    e.preventDefault();
    setProgress("");
    if (email === "") {
      setProgress("blankEmail");
    } else {
      try {
        const result = await signIn.create({
          identifier: email,
          password,
        });
        if (result.status === "complete") {
          setActive({
            session: result.createdSessionId,
            beforeEmit: () => {
              const redirectUrl = new URLSearchParams(location.search).get(
                "redirect_url"
              );
              window.location.href = redirectUrl || "/";
            },
          });
        }
      } catch (err) {
        if (email === "") setProgress("blankEmail");
        else setProgress(err.errors[0].message);
      }
    }
  }

  return (
    <div className="h-screen flex justify-center items-center bg-[#e8e8e8]">
      <div className="max-w-md relative flex flex-col p-6 rounded-md text-black bg-white">
        <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">
          Welcome back to <span className="text-[#7747ff]">App</span>
        </div>
        <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">
          Log in to your account
        </div>
        <form className="flex flex-col gap-3" onSubmit={logIn}>
          <div className="block relative">
            <label
              htmlFor="email"
              className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
            />
            {progress === "blankEmail" ? (
              <p style={{ color: "red", fontSize: "14px" }}>
                Vui lòng nhập email!
              </p>
            ) : progress === "Couldn't find your account." ? (
              <p style={{ color: "red", fontSize: "14px" }}>
                Tài khoản không tồn tại!
              </p>
            ) : (
              <></>
            )}
          </div>
          <div className="block relative">
            <label
              htmlFor="password"
              className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              autoComplete="on"
              className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
            />
            {progress === "Enter password." && email !== "" ? (
              <p style={{ color: "red", fontSize: "14px" }}>
                Vui lòng nhập mật khẩu!
              </p>
            ) : progress ===
              "Password is incorrect. Try again, or use another method." ? (
              <p style={{ color: "red", fontSize: "14px" }}>
                Mật khẩu không chính xác!
              </p>
            ) : (
              <></>
            )}
          </div>
          {/* <div>
            <a className="text-sm text-[#7747ff]" href="#">
              Forgot your password?
            </a>
          </div> */}
          <div className="flex justify-center">
            {!isLoaded ? (
              <div className="flex flex-row gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-700 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-2 h-2 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
              </div>
            ) : (
              <button
                type="submit"
                className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal"
              >
                Submit
              </button>
            )}
          </div>
        </form>
        {/* <div class="text-sm text-center mt-[1.6rem]">
          Don’t have an account yet?{" "}
          <a class="text-sm text-[#7747ff]" href="#">
            Sign up for free!
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default SignInPage;

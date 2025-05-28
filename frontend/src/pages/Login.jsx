import { useNavigate } from "react-router-dom";
import AuthImagePattern from "../components/AuthImage";

export default function Login() {
  const navigate = useNavigate()
  return (
    <div className="">
      <div className="grid grid-cols-[30%_auto] gap-[2%] content-start p-5">
        
        {/* Left side: Login Form */}
        <div className="bg-[#191e24] p-10 rounded-2xl text-white">
          <h1 className="text-2xl py-2 text-center">Log In</h1>
          
          <form className="space-y-4">

            {/* Email */}
            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                className="input w-full"
                required
                placeholder="mail@site.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1">Password</label>
              <input
                type="password"
                className="input w-full"
                required
                placeholder="Password"
                minLength="8"
                title="Enter your password"
              />
            </div>
            <p className="text-sm mt-4 text-gray-400">Forgot Password? <a className="cursor-pointer hover:underline text-sm mt-4 text-blue-400" onClick={e=>navigate("/forgot-password")}>Reset</a></p>
            {/* Submit Button */}
            <button
              className="btn btn-neutral btn-outline bg-white text-[#1d232a] w-full mt-2"
              type="submit"
            >
              Log In
            </button>

            {/* Don't have an account */}
            <p className="text-center text-sm mt-4 text-gray-400">
              Don't have an account?{" "}
              <a onClick={e=>navigate("/signup")} className="text-blue-400 hover:underline cursor-pointer">
                Sign up
              </a>
            </p>
          </form>
        </div>

        {/* Right side image/description */}
        <div className="grow">
          <AuthImagePattern
            title="Welcome Back"
            subtitle="Log in to continue sharing, discovering, and connecting with your community."
          />
        </div>
      </div>
    </div>
  );
}

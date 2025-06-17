import { useNavigate } from "react-router-dom"
import AuthImagePattern from "../components/AuthImage"

export default function SignUp() {
  const navigate = useNavigate()
  return (
    <div className=''>
      <div className="grid grid-cols-[30%_auto] max-sm:grid-cols-1 gap-[2%] content-start p-5">
        <div className="bg-[#191e24] p-10 rounded-2xl text-white">
          <h1 className="text-2xl py-2 text-center">Sign Up</h1>
          
          <form className="space-y-4">

            {/* Username */}
            <div>
              <label className="block mb-1">Username</label>
              <input
                type="text"
                className="input w-full"
                required
                placeholder="Username"
                pattern="[A-Za-z][A-Za-z0-9\-]*"
                minLength="3"
                maxLength="30"
                title="Only letters, numbers or dash"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1">Your Email</label>
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
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must include number, lowercase and uppercase letter"
              />
            </div>

            {/* Submit */}
            <button className="btn btn-neutral btn-outline bg-white text-[#1d232a] w-full mt-2" type="submit">
              Create Account
            </button>

            {/* Already have an account */}
            <p className="text-center text-sm mt-4 text-gray-400">
              Already have an account? <a onClick={e=>navigate("/login")} className="text-blue-400 hover:underline cursor-pointer">Log in</a>
            </p>

          </form>
        </div>

        {/* Right side visual */}
        <div className="grow">
          <AuthImagePattern
            title="Join our community"
            subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
          />
        </div>
      </div>
    </div>
  )
}

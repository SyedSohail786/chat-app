import { useNavigate } from "react-router-dom";
import AuthImagePattern from "../components/AuthImage";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const apiUrl = import.meta.env.VITE_BACKEND_URL;

export default function Login() {
  const navigate = useNavigate()
    const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail(e.target.email.value)
    
    
    // const obj ={email}
    if (step === 1 && email) {
      // TODO: send OTP to email
      axios.post(`${apiUrl}/auth/forgotPassword`,{email})
      .then((res)=>{
        if(res.data.code==201) return toast.error("No user found with this email");
        if(res.status==200){
           setStep(2);
           toast.success("OTP sent to your email");
        }
      })
     
    } else if (step === 2 && otp) {
      // TODO: verify OTP
      console.log(otp)
      setOtp(e.target.otp.value)
      // axios.post(apiUrl+)
      setStep(3);
    } else if (step === 3 && newPassword.length >= 8) {
      // TODO: update password
      // console.log(password)
      setNewPassword(e.target.password.value)
      navigate("/login");
    }
  };
  return (
    <div className="">
      <div className="grid grid-cols-[30%_auto] max-sm:grid-cols-1 gap-[2%] content-start p-5">
        
        {/* Left side: Login Form */}
        <div className="bg-[#191e24] p-10 rounded-2xl text-white w-full">
      <h1 className="text-2xl py-2 text-center">Reset Password</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Step 1: Email */}
        {step >= 1 && (
          <div>
            <label className="block mb-1">Enter your Email</label>
            <input
            name="email"
              type="email"
              className="input w-full"
              required
              placeholder="mail@site.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        )}

        {/* Step 2: OTP */}
        {step >= 2 && (
          <div>
            <label className="block mb-1">Enter OTP</label>
            <input
            name="otp"
              type="text"
              className="input w-full"
              required
              placeholder="6-digit OTP"
              maxLength="6"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
        )}

        {/* Step 3: New Password */}
        {step >= 3 && (
          <div>
            <label className="block mb-1">Set New Password</label>
            <input
            name="password"
              type="password"
              className="input w-full"
              required
              placeholder="Create new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              minLength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="At least one number, one lowercase and one uppercase letter"
            />
          </div>
        )}

        <button
          type="submit"
          className="btn btn-neutral btn-outline bg-white text-[#1d232a] w-full mt-2"
        >
          {step === 1
            ? "Send OTP"
            : step === 2
            ? "Verify OTP"
            : "Reset Password"}
        </button>

        <p className="text-center text-sm mt-4 text-gray-400">
          Remember your password?{" "}
          <a onClick={e=>navigate("/login")} className="text-blue-400 hover:underline cursor-pointer">
            Log in
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

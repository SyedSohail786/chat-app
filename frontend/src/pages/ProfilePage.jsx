import { useNavigate } from "react-router-dom"
import { Camera, Mail, User } from "lucide-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
const apiUrl = import.meta.env.VITE_BACKEND_URL;

const ProfilePage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([])
  const [loadingUsers, setLoadingUsers] = useState(false)
  useEffect(() => {
        const token = Cookies.get("chatApp");
        if (token && token !== "undefined" && token !== "null") {
          return
        }else{
          navigate("/login")
        }
      }, []);

      useEffect(()=>{
        setLoadingUsers(true)
          const token = Cookies.get("chatApp")
          axios.get(apiUrl+"/users",{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res)=>{
          setUsers(res.data.users)
          setLoadingUsers(false)
    })
      },[])


  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const token = Cookies.get("chatApp");
    
    if (file && token) {
      const formData = new FormData();
      formData.append("profilePic", file);
      axios.put(`${apiUrl}/profile-update`,formData,{
        headers:{
          Authorization: `Bearer ${token}`
         }
      }).then((res)=>{
        const url = res.data.profilePic
        setImage(url);
      })
      
      
    }
  };

  return (
    <div className="h-screen">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={
                  image ||
                  "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                }
                alt="Profile"
                className="size-32 rounded-full object-cover border-4"
              />
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200"
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">Click the camera icon to update your photo</p>
          </div>

          {/* other info */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">Syed Sohail</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">sohail786@gmail.com</p>
            </div>
          </div>

          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>10 Dec 2025</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

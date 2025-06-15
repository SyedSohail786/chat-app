import AllChats from "../components/AllChats";
import "../index.css"

export default function HomePage() {
  return (
    <>
    <div className="max-w-[1450px] mx-auto  border rounded grid grid-cols-[20%_auto]" style={{ height: 'calc(100vh - 90px)' }}>
      {/* all chats, left section */}
     <AllChats/>
      {/* chat section, right side */}

      <div>
        <div className="py-2 px-2 border-b  flex">
          <img
                src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                className="w-12 rounded-full mx-3 border-2"
                alt="profile"
              />
              <div>
                <h1 className="text-xl">Syed Sohail</h1>
                  <h1 className="text-[12px]">Online</h1>
              </div>
        </div>
        



        
      </div>
    </div>
    </>
  );
}

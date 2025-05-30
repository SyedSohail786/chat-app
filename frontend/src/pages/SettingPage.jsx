import { ThemeSet } from "../store/ThemeStore"
import { THEMES } from "../Themes/themes"

export default function SettingPage() {

  const previewMessage = [
    { id: 1, msg: "Hey how are you?", isSent: "false" },
    { id: 2, msg: "I am good, what about you?", isSent: "true" }

  ]
  const { theme, setTheme } = ThemeSet()
  return (
    <div className="h-full p-10 ">
      <div className="h-full  border rounded-2xl p-5 grid grid-cols-2">

        <div>
          <h1 className="text-3xl my-2 ">The<span className="text-primary">me's</span></h1>
          <p className="text-sm">Select The Theme You Want</p>
          {/* Themes Section */}
          <div className="grid grid-cols-4 border rounded-2xl mt-5 p-2">
            {
              THEMES.map((items, index) => {
                return (
                  <button key={index} className={`${theme == items ? "bg-base-300" : "hover:bg-primary"} rounded-2xl transition-colors p-2 capitalize  mr-2 mb-1 gap-2 text-sm`} onClick={() => setTheme(items)}>
                    <div className="relative h-8 w-full rounded-md border p-2" data-theme={items}>
                      {items}
                    </div>
                  </button>
                )
              })
            }

          </div>


        </div>
        {/* Chat PReview */}
        <div>

        </div>


      </div>

    </div>
  )
}

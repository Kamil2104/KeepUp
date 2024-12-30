import React from "react"

import Sidebar from "./pages/Sidebar"
import Dashboard from "./pages/Dashboard"

const App: React.FC = React.memo(() => {
  return (
    <section className="flex flex-row w-screen h-screen bg-slate-100">
      <Sidebar />
      <Dashboard />
    </section>
  )
})

export default App
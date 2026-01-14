import { BrowserRouter,Routes, Route } from "react-router"
import Dashboard from "./pages/dashboard"
import Settings from "./pages/settings"
import Pos from "./pages/pos"
import Inventory from "./pages/inventory"
import Applayout from "./Applayout"

import {Toaster} from "react-hot-toast"



function App() {
  return (
    <>
    <Toaster/>
    <BrowserRouter>
      <Routes>
        <Route element={<Applayout/>}>
          <Route index element={<Dashboard/>} />
          <Route path="settings" element={<Settings/>} />
          <Route path="pos" element={<Pos/>} />
          <Route path="inventory" element={<Inventory/>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

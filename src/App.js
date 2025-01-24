import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Menu from "./pages/Menu"
import Location from "./pages/Location"
import Reservations from "./pages/Reservations"
import { NavbarProvider } from "./context/NavbarContext"

function App() {
  return (
    <NavbarProvider>
      <Router>
        <div className="App bg-gray-100 min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/location" element={<Location />} />
              <Route path="/reservations" element={<Reservations />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </NavbarProvider>
  )
}

export default App


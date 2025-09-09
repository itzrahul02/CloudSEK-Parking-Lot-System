import { Link, useLocation } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAddressCard, faCar, faCreditCard, faBars, faTimes } from "@fortawesome/free-solid-svg-icons"
import React, { useState } from "react"

export function Navbar() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow px-6 py-4">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-sm md:text-base lg:text-lg flex items-center gap-2">
          <FontAwesomeIcon icon={faAddressCard} />
          Parking Lot Admin
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6">
          <Link
            to="/"
            className={`${
              location.pathname === "/"
                ? "font-bold border-b-2 border-black"
                : ""
            }`}
          >
            <FontAwesomeIcon icon={faCar} className="mr-1" />
            Layout
          </Link>

          <Link
            to="/billing"
            className={`${
              location.pathname === "/billing"
                ? "font-bold border-b-2 border-black"
                : ""
            }`}
          >
            <FontAwesomeIcon icon={faCreditCard} className="mr-1" /> Billing
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mt-4 flex flex-col gap-4 md:hidden">
          <Link
            to="/"
            className={`${
              location.pathname === "/"
                ? "font-bold border-b-2 border-black"
                : ""
            }`}
            onClick={() => setIsOpen(false)}
          >
            <FontAwesomeIcon icon={faCar} className="mr-1" />
            Layout
          </Link>

          <Link
            to="/billing"
            className={`${
              location.pathname === "/billing"
                ? "font-bold border-b-2 border-black"
                : ""
            }`}
            onClick={() => setIsOpen(false)}
          >
            <FontAwesomeIcon icon={faCreditCard} className="mr-1" /> Billing
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar

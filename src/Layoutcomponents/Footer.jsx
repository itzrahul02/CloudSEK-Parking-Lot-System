import React, { useState, useEffect } from "react"

function Footer() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => clearInterval(timer) // cleanup
  }, [])

  const formattedDate = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  const formattedTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })

  return (
    <footer className="bg-white/60  sm:p-6 p-4 text-sm text-gray-600 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
      <p>© 2025 Parking Lot Admin. All rights reserved.</p>
      <p>
        Last updated: {formattedDate} {formattedTime}
      </p>
    </footer>

  )
}

export default Footer

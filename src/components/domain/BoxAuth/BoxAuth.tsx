import React from 'react'

export default function BoxAuth({children,className} : {
    children : React.ReactNode ,className?: string
}) {
  return (
    <div className={`w-full max-w-[400px] min-h-[480px] bg-white rounded-lg p-4 sm:p-5 md:p-6 shadow-md border border-gray-50 mx-4 sm:mx-6 md:mx-auto overflow-hidden ${className}`}>{children}</div>
  )
}

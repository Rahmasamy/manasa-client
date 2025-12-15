import React from 'react'

export default function BoxAuth({children,className} : {
    children : React.ReactNode ,className?: string
}) {
  return (
    <div className={`w-[400px] h-[480px] bg-white rounded-lg p-5 shadow-md border border-gray-50  ${className}`}>{children}</div>
  )
}

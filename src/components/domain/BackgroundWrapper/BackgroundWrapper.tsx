import React from "react";

export default function BackgroundWrapper({children} : {
    children : React.ReactNode 
}) {
  return (
    <div
      id="hero"
      className="min-h-screen w-full flex flex-col justify-center items-center"
      style={{
        backgroundImage: 'url("/hero.svg")',
        backgroundSize: "cover",
        backgroundPosition: "unset",
      }}
    >
      {children}
    </div>
  );
}

import Link from "next/link";
import React from "react";

function notFound() {
  return (
    <div className="flex justify-center items-center flex-1">
      <div className="flex justify-center font-semibold items-center flex-col gap-5 mt-20">
        <p>Oops! We could not find what you were looking for</p>
        <Link href={"/"}>
          <button className="px-4 py-2 bg-black text-white font-mono rounded-2xl">
            Go To Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default notFound;

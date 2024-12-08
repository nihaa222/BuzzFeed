import React from "react";

function loading() {
  return (
    <div>
      <div className="flex justify-center items-center h-screen -mt-40">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
      </div>
    </div>
  );
}

export default loading;

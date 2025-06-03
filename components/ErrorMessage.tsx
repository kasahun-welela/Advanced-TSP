import React from "react";

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="text-center py-5">
      <p className="text-red-500">{message}</p>
    </div>
  );
}

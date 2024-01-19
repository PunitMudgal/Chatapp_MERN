import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col gap-5 p-2">
      <div className="w-full flex gap-2 h-10">
        <div className="p-3 rounded-md px-4 bg-gray-800 " />
        <div className="flex-grow p-3 bg-gray-800 rounded-2xl" />
      </div>
      <LoadingContact />
    </div>
  );
}

export function LoadingContact() {
  return (
    <div className="flex flex-col gap-2">
      <div className="h-16 w-full bg-gray-800 rounded-md" />
      <div className="h-16 w-full bg-gray-800 rounded-md" />
      <div className="h-16 w-full bg-gray-800 rounded-md" />
      <div className="h-16 w-full bg-gray-800 rounded-md" />
      <div className="h-16 w-full bg-gray-800 rounded-md" />
    </div>
  );
}

export function LoadingProfile() {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="h-40 w-40 rounded-full bg-slate-800" />
      <LoadingContact />
    </div>
  );
}

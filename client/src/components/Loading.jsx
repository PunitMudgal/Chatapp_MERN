import React from "react";

export default function Loading() {
  return (
    <>
      <LoadingHeader />
      <LoadingContact />
    </>
  );
}

export function LoadingContact() {
  return (
    <div className="flex flex-col gap-2  mt-10">
      <div className="h-16 w-full bg-gray-800 rounded-md bg-opacity-65" />
      <div className="h-16 w-full bg-gray-800 rounded-md bg-opacity-65" />
      <div className="h-16 w-full bg-gray-800 rounded-md bg-opacity-65" />
      <div className="h-16 w-full bg-gray-800 rounded-md bg-opacity-65" />
      <div className="h-16 w-full bg-gray-800 rounded-md bg-opacity-65" />
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

//! not using this
export const LoadingHeader = () => {
  return (
    <div className="flex items-center gap-3 px-1 py-3 bg-gray-800 rounded-xl bg-opacity-60">
      <div className="h-8 w-8 rounded-full bg-gray-700 bg-opacity-70" />

      <div className="flex flex-col gap-1">
        <div className="h-2 w-32 rounded-sm bg-gray-700 bg-opacity-70" />
        <div className="h-3 w-32 rounded-sm bg-gray-700 bg-opacity-70" />
      </div>
      <div className="h-7 w-5 rounded-2xl bg-gray-700 ml-auto bg-opacity-70" />
    </div>
  );
};

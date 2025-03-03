"use client";

import { useGoogleAuthPage } from "./hooks";

export default function GoogleAuthPage() {
  useGoogleAuthPage();
  return (
    <div className="flex justify-center items-center">
      <span>Auth throw google performing...</span>
    </div>
  );
}

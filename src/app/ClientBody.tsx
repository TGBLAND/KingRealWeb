"use client";

import { useEffect } from "react";
import { AuthProvider } from "./lib/auth";
export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.body.className = "antialiased";
  }, []);

  return (
    <body className="antialiased" suppressHydrationWarning>
      <AuthProvider>{children}</AuthProvider>
    </body>
  );
}

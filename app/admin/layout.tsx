"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
// import { ToastProvider } from "@/components/ui/toast"
// import { Toaster } from "@/components/ui/toaster"

export default function DashboardSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <ToastProvider>
    <DashboardLayout>
      {children}
      {/* <Toaster /> {/* Renders actual toasts */}
    </DashboardLayout>
    // </ToastProvider>
  );
}

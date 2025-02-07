"use client";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mt-3 flex min-h-screen w-full flex-col items-center justify-between">
      <div className="w-full flex-1 p-4">{children}</div>
    </div>
  );
}

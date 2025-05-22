import LayoutShell from "@/components/LayoutShell/LayoutShell";

export default function MainLayout({
  children,
}: { children: React.ReactNode }) {
  return <LayoutShell>{children}</LayoutShell>;
}

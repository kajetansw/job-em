import LayoutShell from "@/components/layout-shell/LayoutShell";

export default function MainLayout({
  children,
}: { children: React.ReactNode }) {
  return <LayoutShell>{children}</LayoutShell>;
}

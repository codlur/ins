import AppLayout from "../app/layout";

export default function AdvertiseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
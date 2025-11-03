import AppLayout from "../app/layout";

export default function ListBusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
import Navbar from "@/components/Navbar"
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: 78 }}>{children}</div>
    </>
  )
}

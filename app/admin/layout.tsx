import AdminNavigation from './_ui/navigation'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AdminNavigation />
      <main className="dashboard-main">{children}</main>
    </>
  )
}

export default DashboardLayout

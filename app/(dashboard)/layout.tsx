import DashboardNavigation from './_ui/navigation'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DashboardNavigation />
      <main className="dashboard-main">{children}</main>
    </>
  )
}

export default DashboardLayout

// import components
import Sidebar from '../Sidebar/Sidebar'
import Dashboard from '../Dashboard/Dashboard'

// import css
import './DefaultLayout.scss'

export default function DefaultLayout({ children }) {
  return (
    <div>
      <div className="main-section-container">
        <Sidebar />
        <Dashboard>{children}</Dashboard>
      </div>
    </div>
  )
}

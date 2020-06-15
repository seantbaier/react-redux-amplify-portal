// import scss
import './Dashboard.scss'

export default function Dashboard({ children }) {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <img src={require('../../assets/images/datalab-logo.png')} />
      </div>
      {children}
    </div>
  )
}

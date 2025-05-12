import './App.css'
import UserContext from './context/userContext'
import AppRoutes from './routes'

function App() {

  return (
    <div>
      <UserContext>
      <AppRoutes />
      </UserContext>
    </div>
  )
}

export default App

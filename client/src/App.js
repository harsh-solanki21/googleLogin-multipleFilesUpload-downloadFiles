import { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import './App.css'
import MultiFiles from './components/MultiFiles'

function App() {
  const [user, setUser] = useState(null)

  const handleCallbackResponse = (response) => {
    const decoded = jwt_decode(response.credential)
    // console.log(decoded)
    setUser(decoded)
    document.getElementById('signInDiv').hidden = true
  }

  const handleSignOut = (e) => {
    setUser(null)
    document.getElementById('signInDiv').hidden = false
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
    })
    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      theme: 'outline',
      size: 'large',
    })
    google.accounts.id.prompt()
  }, [])

  return (
    <div className='App'>
      <div id='signInDiv'></div>
      {user ? <button onClick={(e) => handleSignOut(e)}>SignOut</button> : null}
      {user && (
        <div>
          <img src={user.picture} alt='profilePic' />
          <h3>{user.email}</h3>
          <h3>{user.name}</h3>
        </div>
      )}
      {user && <MultiFiles />}
    </div>
  )
}

export default App

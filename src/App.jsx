import { useEffect, useState } from 'react'
import './App.css'
import { getDefaultSession, handleIncomingRedirect, login } from '@inrupt/solid-client-authn-browser'

function App() {
  const [oidcIssuer, setOidcIssuer] = useState('');
  const [loginInfo, setLoginInfo] = useState({});
  
  const startLogin = async () => {
    if (!getDefaultSession().info.isLoggedIn) {
      await login({
        oidcIssuer: oidcIssuer,
        redirectUrl: window.location.href,
        clientName: "Test client"
      })
    }
  } 

  const completeLogin = async () => {
    const info = await handleIncomingRedirect();
    setLoginInfo(info);
  }
  
  useEffect(() => {
    completeLogin()
  }, []);

  return (
    <>
      <input
        type="text"
        value={oidcIssuer}
        onChange={(e) => (setOidcIssuer(e.target.value))}
      />
      <button onClick={() => startLogin()}>Login</button>

      <p>Login data: {JSON.stringify(loginInfo)}</p>
    </>
  )
}

export default App

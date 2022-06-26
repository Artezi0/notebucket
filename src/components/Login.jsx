import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FcGoogle, BsGithub } from "react-icons/all"
import { UserAuth } from "../context/AuthContext"

import '../styles/app.scss'

export default function Login() {
  const [ error, setError ] = useState('')
  const navigate = useNavigate()  
  const { googleAuth, githubAuth } = UserAuth()
  
  document.title = 'Notebucket - Log in'  
  
  async function handleGoogle() {
    try {
      await googleAuth()
      navigate("/notes")
    } catch(err) {
      setError(err.message)
    }
  }

  async function handleGithub() {
    try {
      await githubAuth()
      navigate("/notes")
    } catch(err) {
      setError(err.message)
    }
  }

  return (
    <div className="login">
      <div className="login__header">
        <h1>Log in</h1>
        <p>Don't have an account? <Link to='signup'>Sign up</Link></p>
      </div>
      <div className="login__btn">
        <button type="button" onClick={handleGoogle}><FcGoogle />Continue with Google</button>
        <button type="button" onClick={handleGithub}><BsGithub />Continue with Github</button>
      </div>
      {error && <p>{error}</p>}
    </div>
  )
}
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserAuth } from "../context/AuthContext"
import { FcGoogle, BsGithub } from "react-icons/all"
import '../../styles/app.scss'

export default function Login() {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ error, setError ] = useState('')
    const { login, googleAuth, githubAuth } = UserAuth()
    const navigate = useNavigate()

    document.title = 'Notebucket - Log in'


    async function handleEmail(e) {
        e.preventDefault()

        try {
            await login(email, password)
            navigate("/notes")
        } catch (err) {
            setError(err.message)
        }
    }

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
            navigate("/account")
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
            <form className="login__form" onSubmit={handleEmail}>
                <input type="email" placeholder="Enter your email..." onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Enter your password..." onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Continue with email</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    )
}
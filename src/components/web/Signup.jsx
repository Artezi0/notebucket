import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FcGoogle, BsGithub } from "react-icons/all"
import { UserAuth } from "../context/AuthContext"
import '../../styles/app.scss'

export default function Signup() {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ error, setError ] = useState('')
    const { createUser, googleAuth, githubAuth } = UserAuth()
    const navigate = useNavigate()

    document.title = 'Notebucket - Sign up'

    async function handleEmail(e) {
        e.preventDefault()   

        try {
            await createUser(email, password)
            navigate('/notes')
        } catch(err) {
            setError(err.message)
        }
    }

    async function handleGoogle() {
        try {
            await googleAuth()
            navigate('/notes')
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
        <div className="sign">
            <div className="sign__header">
                <h1>Sign up</h1>
                <p>Already have an account? <Link to='/'>Log in</Link></p>
            </div>
            <div className="sign__btn">
                <button type="button" onClick={handleGoogle}><FcGoogle />Continue with Google</button>
                <button type="button" onClick={handleGithub}><BsGithub />Continue with Github</button>
            </div>
            <form className="sign__form" onSubmit={handleEmail}>
                <input type="email" placeholder="Enter your email..." onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Enter your password..." onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Continue with email</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    )
}
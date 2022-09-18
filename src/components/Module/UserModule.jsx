import { useEffect, useRef } from "react"
import { useNavigate } from "react-router"
import { UserAuth } from "../../context/AuthContext"

export default function({ setUserModule }) {
  const ref = useRef(null)
  const { user, logout } = UserAuth()
  const navigate = useNavigate()
  
  async function handleLogout() {
    try {
      await logout()
      navigate('/')
    } catch(err) {
      console.error(err.message)
    }
  } 

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          setUserModule(false)
        }
      }
      document.addEventListener('mousedown', handleClick)
      return () => {
        document.removeEventListener('mousedown', handleClick)
      }
    }, [ref])
  }
  useOutsideAlerter(ref)
 
  return (
    <section className="module">
      <div className="module__container" ref={ref}>
        <div className="module__container-info">
          <img src="https://deno-avatar.deno.dev/avatar/11f2c2.svg" alt="" />
          <div>
            <p>{user.email}</p>          
            <p>{user.displayName}</p>
          </div>
        </div>
        <div className="module__container-btn">
          <button type="button" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </section>
  )
}
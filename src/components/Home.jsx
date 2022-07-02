import { Link } from 'react-router-dom'

export default function Home() {
 return (
  <section className='home'>
    <nav className='home__header'>
      <ul className='home__header-nav'>
        <Link to='login'>Login</Link>
      </ul>
    </nav>
    <main className='home__main'>
      <h1>Home section</h1>
    </main>
    <footer className='home__footer'></footer>
  </section>
 ) 
}
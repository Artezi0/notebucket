import Body from './components/Body'
import Side from './components/Side'
import Top from './components/Top'
import './styles/app.scss'

export default function App() {
  return (
    <>
      <section id='left'>
        <Side/>
      </section>
      <section id='right'>
        <Top/>
        <Body/>
      </section>
    </>
  )
}


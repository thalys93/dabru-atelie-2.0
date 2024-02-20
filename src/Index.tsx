import { Outlet } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'
import FooterBar from './components/FooterBar'

function Index() {

  return (
    <>
      <header>
        <NavigationBar />
      </header>

      <section>        
        <Outlet />    
      </section>

      <footer>
        <FooterBar />
      </footer>
    </>
  )
}

export default Index

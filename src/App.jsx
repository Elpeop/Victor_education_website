import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/navbar'
import HeroSection from './Components/HeroSection'
import FeaturedModulesSection from './Components/FeaturedModulesSection'
import CommunitySection from './Components/CommunitySection'
import InstructorCTASection from './Components/InstructorCTASection'
import Footer from './Components/Footer'
import LoginPage from './Components/LoginPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <HeroSection/>
      <FeaturedModulesSection/>
      <CommunitySection/>
      <InstructorCTASection/>
      <Footer/>
      <LoginPage/>
      {/* <h1 className='text-4xl font-bold'>Welcome to Robotics Website</h1>  
      <button>Community</button> */}
    </>
  )
}

export default App

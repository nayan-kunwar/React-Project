// We have to see that when app is loading the user is logged in or not.
//We can see this from our state
//if logged in then we show something , if not then show ohter thing.

//Jab bhi netowrk yaa db se request krte hai toh ek loading state bnanai chahiye taaki conditonal rendering kr sake, that if loading true then show loading icon and
// if loading is false then show data
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { login, logout } from './store/authSlice'
import authService from './appwrite/auth' //Those thing will be imported which had been exported 
import './App.css'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  //Use loa
  const [loading, setLoading] = useState(true); //loading is true because useEffect is doing something(making async req means loading state need to true, when useEffect done doing then we set loading false means useEffect not makeking req) on app mount
  const dispatch = useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
      .then((userData)=> {
        if(userData){ //If userData is available means there is user logged in then status must be true.
          dispatch(login({userData}));
        } else { 
          //If userData is null means there is no current user.
          dispatch(logout()); 
        }
      })
      //.catch(() => console.log("----then not excuted"))
      .finally(()=>{setLoading(false)})
  }, []);

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        TODO: <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App

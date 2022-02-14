import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AboutUs from './components/AboutUs/AboutUs';
import Authorization from './components/Authorization/Authorization';
import Calendar from './components/Calendar/Calendar';
import Footer from './components/Footer/Footer';
import Loader from './components/General/Loader/Loader';
import PopupContainer from './components/General/PopUp/popup';
import Header from './components/Header/Header';
import MyLists from './components/MyLists/MyLists';
import NavContainer from './components/NavContainer/NavContainer';
import Settings from './components/Settings/Settings';
import { firstAuthTunk, getDataWithServThunk } from './state/thunk';


function App() {
  let dispatch = useDispatch()
  let {isAuth, authId} = useSelector((state)=> state.authReducer);
  let statePopup = useSelector(state => state.popupReducer.popupList);
  console.log(isAuth)

  useEffect(()=>{
      dispatch(firstAuthTunk())
     
  }, [])

  let routes = [
    {path: '/myLists', Comonent: MyLists, props: {} },
    {path: '/calendar', Comonent: Calendar, props: {} },
    {path: '/aboutUs', Comonent: AboutUs, props: {}},
    {path: '/settings', Comonent: Settings, props: {} },
    {path: '/auth', Comonent: Authorization, props: {} },
    {path: '/', Comonent: MyLists, props: {}}
  ]

  return (
   <BrowserRouter  >
     <div className="App">
      <Header/>
      <NavContainer />
      <div className="content__container">
          <Switch>
            {routes.map(elem=>{
               return <Route path={elem.path}  render={()=><elem.Comonent {...elem.props} isAuth={isAuth} authId={authId} />}></Route>   
            })}
          </Switch>
          
        <Footer />
      </div>
      <PopupContainer state={statePopup} />
      <div class="App__loader">
        {/* <Loader loading={!isAuth} /> */}
      </div>
    </div>
   </BrowserRouter >
  );
}

export default App;

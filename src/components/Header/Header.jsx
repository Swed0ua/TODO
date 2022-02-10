import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { singOutThunk } from "../../state/thunk";
import './Header.css';

const Header = (props) => {
    let dispatch = useDispatch()
    let {isAuth, authLogin} = useSelector(state => state.authReducer);
    let AuthHTML = () => {
      if (isAuth) {
        console.log('isAuth')
        return (
          <div className="header__userButton userButton">
            <span className='userButton__userName' >{authLogin}</span>
            <button onClick={singOut}>Sing Out</button>
          </div>
        )
      } else {
        return(<div className="header__userButton userButton">
            <button><NavLink to={'/auth/singIn'}>Sing In</NavLink></button>
          </div>)
      }
    }

    const singOut = () => {
      dispatch(singOutThunk());
    }

    return (
        <header>
        <div className="header__logo logo">
          TO DO <span>react-app</span>
        </div>
        {AuthHTML()}
      </header>
    )
}

export default Header;
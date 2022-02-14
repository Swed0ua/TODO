import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { singOutThunk } from "../../state/thunk";
import Button from "../General/Button/Button";
import './Header.css';

const Header = (props) => {
    let dispatch = useDispatch()
    let {isAuth, authLogin} = useSelector(state => state.authReducer);
    let AuthHTML = () => {
      if (isAuth) {
        return (
          <div className="header__userButton userButton">
            <span className='userButton__userName' >{authLogin}</span>
            <Button onClickEvent={singOut} content="Sing Out"/>
          </div>
        )
      } else {
        return(<div className="header__userButton userButton">
            <NavLink to={'/auth/singIn'}>
              <Button content="Sing In"/>
            </NavLink>
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
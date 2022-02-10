import React from "react";
import { NavLink } from "react-router-dom";
import './NavContainer.css';

const NavContainer = (props) => {
    return (
        <nav>
        <Nav thisClass='nav__mn'> 
          <NavItem name='add task' link="#"/>
          <NavItem name='calendar' link="calendar"/>
          <NavItem name='my lists' link="myLists"/>
        </Nav>
        <Nav thisClass='nav__st'>
          <NavItem name='about us' link="aboutUs"/>
          <NavItem name='settings' link="settings"/>
        </Nav>
      </nav>
    )
}

export default NavContainer;


const Nav = (props) => {
  return (
        <ul className={props.thisClass + ' ' +'nav__items'}>
          {props.children}
        </ul>
  )
}


const NavItem = ({link = '', name}) => { 
  return <li className='nav__item' >
    <NavLink to={"/" + link}>
      {name}
    </NavLink>
  </li>
 }
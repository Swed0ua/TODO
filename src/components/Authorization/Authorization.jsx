import React, { useState } from "react";
import './authorization.css';
import {Field, reduxForm} from 'redux-form'
import { singInThunk, createAccountThunk } from "../../state/thunk";
import { useDispatch } from "react-redux";
import { maxSimbol, minSimbol, validSimpleInput } from "../../state/form_validator";
import { NavLink, Route, Routes, Switch } from "react-router-dom";
import WithAuthRedirect from "../../hoc/WithAuthRedirect";
import loaderPattern from './../../loader_pattern.gif';
import InputCst from "./../General/InputCst/InputCst.jsx";
import { addPopupActionCreator } from "../../state/popup_reducer";
let maxSimbol15 = maxSimbol(15);
let minSimbol6 = minSimbol(6)

const Authorization = (props) => {
    let dispatch = useDispatch()
    let [loading, setLoading] = useState(false)

    const changeLoading = (bool) => {
        setLoading(bool)
    }

    const formErrorEvent = () => {
        changeLoading(false)
    }

    const authAcc = (formData) => {
        changeLoading(true)
        dispatch(singInThunk(formData.login, formData.password))
    }

    const createAcc = (formData) => {
        changeLoading(true)
        if (formData.password == formData.passwordRepit){
            dispatch(createAccountThunk(formData.login, formData.password))
        }
    }

    let routes = [
        {link: '/auth/singIn', Component: SingInForm, onSubmit: authAcc, props:{loading, formErrorEvent}},
        {link: '/auth/registration', Component: RegistForm, onSubmit: createAcc, props:{loading, formErrorEvent}}
    ]
    return (
        <main className="authorization">
            <h1>Authorization</h1>
                <div className="form__wrapper">
                    <Switch>
                        {routes.map( ({link, onSubmit, Component, props}) =>  {
                            return(<Route key={link} path={link}  render={()=><Component onSubmit={onSubmit} {...props} />}>
                            </Route>)
                        })}
                        <Route exact path={'/auth'} render={()=> <div>Whot</div>}></Route>
                    </Switch>         
                </div>         
        </main>
    )
}


const SingInFormCont = (props) => {
    if(props.error){
        props.formErrorEvent()
        
    } 
    return (
        <form onSubmit={props.handleSubmit} className="form form__signIn eclipse__wrapper">
            <h1>Sign In</h1>
            <div className="authorization__area input__wrapper input__CST1">
                <label htmlFor="login">login</label>
                <Field className="authorization__input input__cst "
                validate={[validSimpleInput, minSimbol6] }
                type="text" name="login" component={InputCst} />
            </div>
            <div className="authorization__area input__wrapper input__CST1">
                <label htmlFor="password">password</label>
                <Field className="authorization__input input__cst"
                validate={[validSimpleInput, minSimbol6] }
                type='password' name="password" component={InputCst} />
            </div>
            <button className="authorization__button but_1" >login</button>
            <NavLink className={'form__link nav__item'} to='/auth/registration'>create accaunt</NavLink>
            <div className={`loader loader__pattern ${props.loading ? ' _active' : ''}`}>
                <img src={loaderPattern} alt="loader" />
            </div>
        </form>
    )
}

const RegistFormCont = (props) => {
    console.log(props)
    return (
        <form onSubmit={props.handleSubmit} className="form form__regist eclipse__wrapper">
            <h1>Registration</h1>
            <div className="authorization__area input__wrapper input__CST1">
                <label htmlFor="login">login</label>
                <Field className="authorization__input input__cst"
                validate={[validSimpleInput, minSimbol6] }
                type="text" name="login" component={ InputCst} />
            </div>
            <div className="authorization__area input__wrapper input__CST1">
                <label htmlFor="password">password</label>
                <Field className="authorization__input input__cst"
                validate={[validSimpleInput, minSimbol6] }
                type="password" name="password" component={InputCst } />
            </div>
            <div className="authorization__area input__wrapper input__CST1">
                <label htmlFor="passwordRepit">repit password</label>
                <Field className="authorization__input input__cst"
                validate={[validSimpleInput, minSimbol6] }
                type="password" name="passwordRepit" component={InputCst} />
            </div>
            <button className="authorization__button but_1" >registration</button>
            <NavLink className={'form__link nav__item'} to='/auth/singIn'>I have accoutn</NavLink>
            <div className={`loader loader__pattern ${props.loading ? ' _active' : ''}`}>
                <img src={loaderPattern} alt="loader" />
            </div>
        </form>
    )
}


const RegistForm = reduxForm({form: 'regist'})(RegistFormCont)
const SingInForm = reduxForm({form: 'login'})(SingInFormCont)


export default WithAuthRedirect(Authorization) ;
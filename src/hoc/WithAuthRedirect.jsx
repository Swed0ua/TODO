import React from "react";
import { Redirect } from "react-router-dom";


export const WithAuthRedirect = (Component) => {
    return class RedirectComponent extends React.Component {
         render(){
             if (this.props.isAuth){ 
                 console.log(this.props)
              return <Redirect to={'/'} /> }
                 return (
             <Component {...this.props} />
         )
         }
     }
 }

export default WithAuthRedirect;
import React from "react";
import {useAuth} from "./hooks/AuthHooks";
import {AuthContext} from "./Context/Context";
import {useRoutes} from "./Routes";
import 'semantic-ui-css/semantic.min.css'


function App() {

    const {token, login, logOut} = useAuth()

    function hasJWT() {
        let flag = false;

        const data = JSON.parse(localStorage.getItem('userData') || '{}')
        data.token ? flag = true : flag = false

        return flag
    }

    const routes = useRoutes(hasJWT)

    return (
        <AuthContext.Provider value={{
            token, login, logOut
        }}>
            {routes}
        </AuthContext.Provider>
    );
}

export default App;


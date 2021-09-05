import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import Card from '../components/cards/Card';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useCookies } from 'react-cookie'
import {keycloakService} from '../Url'

const Login = (props) => {
    const FormData = require('form-data');
    const[user, setUser] = useState('')
    const[password, setPassword] = useState('')
    const [cookies, setCookie, removeCookie] = useCookies(['access_token', 'refresh_token'])
    
    const handleLogin = (event) => {
        console.log(user)
        
        // setCookie('access_token', response.data.access_token, { path: '/',  expires})
        // setCookie('refresh_token', response.data.refresh_token, {path: '/', expires})
        const form = new FormData();
        form.append('password', password);
        form.append('username', user);
        form.append('client_id', 'dan-client');
        form.append('grant_type', 'password');

        
        axios.post("http://localhost:9011/usuarios/login", {username:user, password:password})
            .then(function (response) {
                //Ver que hago aca
                console.log(response);
                // showToast('Exito!','Login exitoso','success')
                setCookie('access_token', response.data.access_token, { path: '/'})
                setCookie('refresh_token', response.data.refresh_token, {path: '/'})
                props.history.push("/clientes")
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    const handleInputUser = (event) => {
       setUser(event.target.value)
    }
    const handleInputPassword = (event) => {
        setPassword(event.target.value)
    }
    
    const handleLogout = (event) => {
        console.log(user)
        
        // setCookie('access_token', response.data.access_token, { path: '/',  expires})
        // setCookie('refresh_token', response.data.refresh_token, {path: '/', expires})
        
        removeCookie('refresh_token')
    }
    return (
        <div>
            <Card title='Ingresar'>
                <span className="p-float-label">
                    <InputText id="user" onChange={(event) => handleInputUser(event)} className='w-full' inputClassName='w-full'/>
                    <label htmlFor="user">Usuario</label>
                </span>
                <br/>
                <span className="p-float-label">
                    <Password id="password"  onChange={(event) => handleInputPassword(event)} className='w-full' inputClassName='w-full' xtoggleMask />
                    <label htmlFor="password">Contraseña</label>
                </span>
            </Card>
            <Button className="btn btn-primary" onClick={(event)=>handleLogin(event)}>Ingresar</Button>
            <Button className="btn btn-primary" onClick={(event)=>handleLogout(event)}>Salir</Button>

        </div>
    )
}
export default Login
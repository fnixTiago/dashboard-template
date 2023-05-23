import { Navigate, Outlet } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import { deleteUser, getAuth } from 'firebase/auth';
import { logout } from '../../config/firebase';
import { useState } from 'react';

const PrivateLayout = () => {
    const { user, profile } = useUserContext();
    const [error, setError] = useState(null)
    // console.log("profile", profile)
    // user authentication
    const deleteUserNow = async () => {
        const auth = getAuth();
        const userLogin = auth.currentUser;
        await deleteUser(userLogin).then(() => {
            // console.log("User deleted")
            logout();
        }).catch((error) => {
            console.log("error", error)
            setError(error.message)
            // An error ocurred
            // ...
        });
    }
    // const existProfile = ()=>{
    //     let existe= false
    //     setTimeout(() => {
    //         existe = true
    //     },4000)
    // return existe? (

    // )
    // }
    return user ? (
        <>
            {
                !profile ? (<>
                    <h3>Estimado usuario, su cuenta fue eliminada</h3>
                    <p>
                        Desea volverse a registrarse?
                    </p>
                    <button
                        hidden={error}
                        onClick={() => deleteUserNow()}>Aceptar</button>
                    {
                        error ? (
                            <div>
                                <p>
                                    Es necesario iniciar sesión con el mismo usuario y contraseña.<br />
                                    {error}
                                </p>
                                <button onClick={() => logout()}>Volver a iniciar sesión</button>
                            </div>
                        ) : null

                    }
                </>) :
                    (
                        <>
                            <Sidebar />
                            <Header />
                            <main>
                                <Outlet />
                            </main>
                        </>
                    )
            }
        </>
    ) : <Navigate to="/" />;
}

export default PrivateLayout
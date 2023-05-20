import { Navigate, Outlet } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';

const PrivateLayout = () => {
    const { user } = useUserContext();
    // console.log(user)
    return user ? (
        <>
            <Sidebar />
            <Header />
            <main>
                <Outlet />

            </main>
        </>
    ) : <Navigate to="/" />;
}

export default PrivateLayout
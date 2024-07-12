import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
const Laoyout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default Laoyout

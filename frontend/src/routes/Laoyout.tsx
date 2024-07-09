import { Outlet } from 'react-router-dom'

const Laoyout = () => {
    return (
        <>
            <div>Header</div>
            <Outlet />
        </>
    )
}

export default Laoyout

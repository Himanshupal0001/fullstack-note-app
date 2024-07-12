import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { AppDispatch, RootState } from '../store';

function Header(): JSX.Element {
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()
    const { user } = useSelector((state: RootState) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/login')
    }

    return (
        <header className='header'>
            <div className='logo'>
                <Link to='/'>GoalSetter</Link>
            </div>
            <ul>
                {user ? (
                    <li>
                        <button className='btn' onClick={onLogout}>
                            🚪 Logout
                        </button>
                    </li>
                ) : (
                    <>
                        <li>
                            <Link to='/login'>
                                🏊‍♂️ Login
                            </Link>
                        </li>

                    </>
                )}
            </ul>
        </header>
    )
}

export default Header
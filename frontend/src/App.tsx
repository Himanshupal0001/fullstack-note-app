import { useEffect } from 'react'
import Laoyout from './routes/Laoyout'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from './store';
function App(): JSX.Element {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth)
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

  }, [user, navigate]);
  return <Laoyout />
}

export default App

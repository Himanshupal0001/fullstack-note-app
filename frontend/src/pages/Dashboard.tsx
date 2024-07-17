import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import GoalForm from '../components/GoalForm';
import { toast } from 'react-toastify';
import { getGoal, reset } from '../features/goal/goalSlice';
import Spinner from '../components/Spinner';
import GoalItem from '../components/GoalItem';
const Dashboard: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const { goals, isLoading, isError, message } = useSelector((state: RootState) => state.goals);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (!user) {
            navigate('/login');
            return;
        }

        dispatch(getGoal());

        return () => {
            dispatch(reset())
        }

    }, [isError, message, user, navigate, dispatch,])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div>
            <section className="heading">
                <h1>Welcome {user && user.name}</h1>
                <p>Goals Dashboard</p>
            </section>
            <GoalForm />

            <section className="content">
                {
                    goals.length > 0 ? (
                        <div className="goals">
                            {
                                goals.map((goal) => (
                                    <GoalItem key={goal._id} goal={goal} />
                                ))
                            }
                        </div>
                    )
                        :
                        (
                            <h3>You have not set any goals</h3>
                        )
                }
            </section>
        </div>
    )
}


export default Dashboard

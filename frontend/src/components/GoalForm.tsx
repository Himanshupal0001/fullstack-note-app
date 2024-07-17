import { useState } from "react"
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { createGoal } from "../features/goal/goalSlice";

const GoalForm = () => {
    const [text, setText] = useState<string>('');

    //const { isError, isLoading, message, isSuccess } = useSelector((state: RootState) => state.auth);
    const dispatch: AppDispatch = useDispatch();

    const onSubmit = (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        dispatch(createGoal({ text }));
        setText('');
    }
    // useEffect(() => {
    //     if (isError === true) {
    //         toast.error(message);
    //     }
    //     if (isSuccess) {
    //         toast.success('Goal Added')
    //     }
    // }, [isError, isSuccess, message])

    // if (isLoading === true) {
    //     return <Spinner />
    // }
    return (
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="text">Goal</label>
                    <input type="text" name="text" id="text" value={text} onChange={e => setText(e.target.value)} />
                </div>
                <div className="form-group">
                    <button className="btn btn-block" type="submit">Add Goal</button>
                </div>
            </form>
        </section>
    )
}

export default GoalForm

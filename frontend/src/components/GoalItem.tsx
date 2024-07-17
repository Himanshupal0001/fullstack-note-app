import { useDispatch } from "react-redux"
import { AppDispatch } from "../store"
import { deleteGoal } from "../features/goal/goalSlice"
import { GOAL } from "../types/types"

const GoalItem: React.FC<{ goal: GOAL, }> = ({ goal }) => {
    const dispatch: AppDispatch = useDispatch();
    return (
        <div className="goal">
            <div>
                {
                    new Date(goal?.createdAt).toLocaleString('en-US')
                }
            </div>
            <h2>{goal.text}</h2>
            <button className="close" onClick={() => dispatch(deleteGoal(goal._id))}>X</button>
        </div>
    )
}

export default GoalItem


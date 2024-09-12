import '../App.css';
import { GoPencil, GoXCircle } from "react-icons/go";

function ExerciseItem({ exercise, onDelete, onEdit }) {

    return (      
        <tr className="collection-item">
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td><a href="/" onClick={e => {e.preventDefault(), onEdit(exercise)}}><GoPencil /></a></td>
            <td><a href="/" onClick={e => {e.preventDefault(), onDelete(exercise._id)}}><GoXCircle /></a></td>
        </tr>
    );
}

export default ExerciseItem;
import '../App.css';
import ExerciseItem from './ExerciseItem';

function ExerciseCollection({ exercises, onDelete, onEdit }) {
    return (
        <div className="collection-container">
            <table>
                <thead className="collection-item">
                    <tr>
                        <th>Name</th>
                        <th>Reps</th>
                        <th>Weight</th>
                        <th>Unit</th>
                        <th>Date</th>
                    </tr>
                </thead>

                <tbody>
                    {exercises.map((exercise, i) => <ExerciseItem exercise={exercise} 
                        onDelete={onDelete} onEdit={onEdit} key={i} />)}
                </tbody>
            </table>
        </div>

    );
}

export default ExerciseCollection;
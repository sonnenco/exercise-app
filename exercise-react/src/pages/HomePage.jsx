import ExerciseCollection from '../components/ExerciseCollection';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

function HomePage({ setExerciseToEdit }) {
    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate();

    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);
    }

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        
        if (response.status === 204) {
            setExercises(exercises.filter( e => e._id !== _id));
        }

        else {
            console.error('Failed to delete exercise with id = ${_id}, status code = ${response.status}');
        }
    }

    const onEdit = async exerciseToEdit => {
        setExerciseToEdit(exerciseToEdit);
        navigate("/edit-exercise");

        if (response.status === 200) {
            alert();
        }

        else {
            alert();
        }
    }

    useEffect( () => {
        loadExercises();
    }, []);

    return (
        <>
            <Navigation />
            <ExerciseCollection exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseCollection>
        </>
    );
}

export default HomePage;
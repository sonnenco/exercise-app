import '../App.css';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

export const CreateExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    const createExercise = async () => {
        const newExercise = {name, reps, weight, unit, date};
        const response = await fetch (
            `/exercises`, {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(newExercise)
            }
        );

        if (response.status === 201) {
            alert("Successfully created the exercise.");
        }

        else {
            alert("Failed to create exercise, status code = " + response.status);
        }

        navigate("/");
    };

    return (
        <>
            <Navigation />
            <div className="createexercise-content">
                <h1>Create Exercise</h1>
                <input
                    type="text"
                    placeholder="Enter name here"
                    value={name}
                    onChange={e => setName(e.target.value)} />
                <input
                    type="text"
                    placeholder="Enter reps here (>0)"
                    value={reps}
                    onChange={e => setReps(e.target.value)} />
                <input
                    type="number"
                    placeholder="Enter weight here (>0)"
                    value={weight}
                    onChange={e => setWeight(e.target.value)} />
                <select onChange={e => setUnit(e.target.value)}>
                    <option value="lbs">lbs</option>
                    <option value="kgs">kgs</option>
                </select>
                <input
                    type="text"
                    placeholder="Enter date here (MM-DD-YY)"
                    value={date}
                    onChange={e => setDate(e.target.value)} />
                <button
                    onClick={createExercise}
                >Create</button>
            </div>
        </>
    );
}

export default CreateExercisePage;
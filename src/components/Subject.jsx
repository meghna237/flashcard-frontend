import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './styles/Subject.css'
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function Subjects() {
    const [subjects, setSubjects] = useState([]);
    const [newSubject, setNewSubject] = useState('');
    const { userID } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await axios.get(`https://flashcard-backend-gamma.vercel.app/api/subjects/${userID}`);

                if (Array.isArray(response.data)) {
                    setSubjects(response.data);
                } else {
                    setSubjects([]);
                }
            } catch (error) {
                console.error('Error fetching subjects:', error);
                alert('Failed to load subjects. Please try again later.');
                setSubjects([]);
            }
        };

        fetchSubjects();
        
    }, [userID]);

    const handleAddSubject = async () => {
        if (!newSubject) {
            alert('Please enter a subject name.');
            return;
        }

        try {
            const response = await axios.post('https://flashcard-backend-gamma.vercel.app/api/subjects', {
                name: newSubject,
                userId: userID,
            });

            if (response.data.success) {
                setSubjects([...subjects, response.data.subject]);
                setNewSubject('');
            } else {
                alert('Failed to add subject.');
            }
        } catch (error) {
            console.error('Error adding subject:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    const handleSubjectClick = (subjectId) => {
        navigate('/questions', { state: { subjectId } });
    };
      

    return (
        <div id="subject">
            <div>
                <input 
                    id="subject-input"
                    type="text" 
                    placeholder="New Subject" 
                    value={newSubject} 
                    onChange={(e) => setNewSubject(e.target.value)} 
                />
                <button class="button" onClick={handleAddSubject}>Add Subject</button>
            </div>
            <div>
                <h2>Select a Subject</h2>
                {subjects.map((subject) => (
                    <button class="button sub-button" key={subject._id} onClick={() => handleSubjectClick(subject._id)}>
                        {subject.name}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Subjects;

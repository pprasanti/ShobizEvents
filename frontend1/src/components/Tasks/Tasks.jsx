import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Tasks({ token }) {
    const [tasks, setTasks] = useState([])
    const fetchData = async (token) => {
        const response = await axios.get('http://localhost:5001/api/tasks', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setTasks(response.data.tasks)
        console.log(response.data);
    }
    useEffect(() => {
        if (token) {
            fetchData(token);
        }
    }, []);

    return (
        <di>{tasks.map((task, index) => (
            <p key={index}>{task.title}</p>
        ))}</di>
    )
}
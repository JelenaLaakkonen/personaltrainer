import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function Statistics() {

    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        getTrainings();
      });
  
      const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
          .then(response => response.json())
          .then(data => setTrainings(data))
          .catch(err => console.error(err))
      }
  
      const data = trainings.map((training) => {
        return {
          "name": training.activity,
          "duration": training.duration
        }
      })

  return (
    <div>
        <BarChart width={1230} height={650} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Duration (min)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="duration" fill="#8884d8" />
        </BarChart>
    </div>
  );
}

export default Statistics;

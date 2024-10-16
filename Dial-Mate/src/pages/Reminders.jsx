// src/pages/Reminders.jsx
import React, { useState } from 'react';

const Reminders = () => {
  const [reminders, setReminders] = useState([]);

  const addReminder = () => {
    const newReminder = {
      id: reminders.length + 1,
      text: 'Follow up on emotional insights.'
    };
    setReminders([...reminders, newReminder]);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Reminders</h1>
      <button onClick={addReminder} className="btn btn-primary mb-4">
        Add Reminder
      </button>
      <ul>
        {reminders.map((reminder) => (
          <li key={reminder.id} className="border-b py-2">{reminder.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default Reminders;

import React, { useState } from 'react';
import axios from 'axios';
import './TaskForm.css';
import { FaTrashAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TaskForm = ({ onSave, onCancel }) => {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('LOW');
    const [checklist, setChecklist] = useState([]);
    const [dueDate, setDueDate] = useState(null); // Use null to represent no date initially
    const [isTitleValid, setIsTitleValid] = useState(true);
    const [buttonText, setButtonText] = useState('Select Due Date'); // Text to display on the button

    const addChecklistItem = () => {
        setChecklist([...checklist, { text: '', checked: false }]);
    };

    const deleteChecklistItem = (index) => {
        const newChecklist = checklist.filter((_, i) => i !== index);
        setChecklist(newChecklist);
    };

    const handleSave = async () => {
        if (title.trim() === '') {
            setIsTitleValid(false);
            return;
        }

        const task = {
            title,
            priority,
            dueDate: dueDate ? dueDate.toISOString().split('T')[0] : '', // Convert date to ISO string format
            checklist
        };
        try {
            const response = await axios.post('http://localhost:5000/api/tasks', task);
            onSave(response.data);
        } catch (error) {
            console.error('Error saving task', error);
        }
    };

    const checkedCount = checklist.filter(item => item.checked).length;

    // Custom Button Component
    const CustomDateButton = React.forwardRef(({ value, onClick }, ref) => (
        <button className="due-date-button" onClick={onClick} ref={ref}>
            {value || 'Select Due Date'}
        </button>
    ));

    return (
        <div className="task-form">
            <div className="form-group">
                <label>Title*</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        if (!isTitleValid && e.target.value.trim() !== '') {
                            setIsTitleValid(true);
                        }
                    }}
                    placeholder="Enter task title"
                    className={!isTitleValid ? 'invalid' : ''}
                />
                {!isTitleValid && <div className="error-message">Title is required</div>}
            </div>
            <div className="form-group priority-options">
                <label>Select Priority* :</label>
                <button
                    className={`priority-button high ${priority === 'HIGH' ? 'active' : ''}`}
                    onClick={() => setPriority('HIGH')}
                >
                    <div className="priority-icon"></div>
                    High Priority
                </button>
                <button
                    className={`priority-button moderate ${priority === 'MODERATE' ? 'active' : ''}`}
                    onClick={() => setPriority('MODERATE')}
                >
                    <div className="priority-icon"></div>
                    Moderate Priority
                </button>
                <button
                    className={`priority-button low ${priority === 'LOW' ? 'active' : ''}`}
                    onClick={() => setPriority('LOW')}
                >
                    <div className="priority-icon"></div>
                    Low Priority
                </button>
            </div>
            
            <div className="form-group">
                <label>Checklist * ({checkedCount}/{checklist.length})</label>
                <div className="checklist-container">
                    {checklist.map((item, index) => (
                        <div key={index} className="checklist-item">
                            <input
                                type="checkbox"
                                className="checkbox"
                                checked={item.checked}
                                onChange={() => {
                                    const newChecklist = [...checklist];
                                    newChecklist[index].checked = !newChecklist[index].checked;
                                    setChecklist(newChecklist);
                                }}
                            />
                            <input
                                type="text"
                                value={item.text}
                                onChange={(e) => {
                                    const newChecklist = [...checklist];
                                    newChecklist[index].text = e.target.value;
                                    setChecklist(newChecklist);
                                }}
                                placeholder="Enter checklist item"
                                className="task-input"
                            />
                            <FaTrashAlt className="delete" onClick={() => deleteChecklistItem(index)} />
                        </div>
                    ))}
                    <div className="checklist-input">
                        <button className="add-button" onClick={addChecklistItem}>+ Add</button>
                    </div>
                </div>
            </div>
            <div className="form-group button-group">
                <DatePicker
                    selected={dueDate}
                    onChange={(date) => {
                        setDueDate(date);
                        setButtonText(date.toLocaleDateString()); // Update button text with selected date
                    }}
                    customInput={<CustomDateButton />}
                    dateFormat="yyyy-MM-dd"
                />
                <div>
                    <button className="cancel" onClick={onCancel}>Cancel</button>
                    <button className="save" onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default TaskForm;

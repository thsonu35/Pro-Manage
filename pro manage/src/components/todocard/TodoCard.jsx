import PropTypes from 'prop-types';
import './TodoCard.css';
import menuIcon from '../../../public/Group 544menu.png';
import { useState } from 'react';

const TodoCard = ({ task, onEdit, onDelete, onMove }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [collapsed, setCollapsed] = useState(true);

  const toggleChecklist = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="task-card">
      <aside className="card-content">
        <div className="priority-menu">
          <p className="priority-label">
            <span>{task.priority.toUpperCase()} PRIORITY</span>
          </p>
          <div className="menu-container">
            <button className="menu-btn" onClick={() => setShowMenu(!showMenu)}>
              <img src={menuIcon} alt="Menu" className="menu-icon" />
            </button>
            {showMenu && (
              <div className="dropdown-menu">
                <div className="dropdown-item" onClick={onEdit}>
                  Edit
                </div>
                <div className="dropdown-item">
                  Share
                </div>
                <div className="dropdown-item delete" onClick={onDelete}>
                  Delete
                </div>
              </div>
            )}
          </div>
        </div>
        <p className="title">{task.title}</p>
        <p>{task.dueDate}</p>
        <div className="checklist-toggle-container">
          <p className="checklist-head">
            <span>
              Checklist ({task.checklist.filter((item) => item.checked).length} / {task.checklist.length})
            </span>
            <button className="collapse-expand-btn" onClick={toggleChecklist}>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className={`expand-icon ${collapsed ? 'collapsed' : ''}`}
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"></path>
              </svg>
            </button>
          </p>
        </div>

        {!collapsed && (
          <div className="checklist-tasks">
            {task.checklist.map((item, index) => (
              <div key={index} className="task-item">
                <input type="checkbox" className="checkbox" checked={item.checked} readOnly />
                <p className="task-text">{item.text}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mutate-status-container">
          <div className="mutate-btns-container">
            {['TO DO', 'IN PROGRESS', 'DONE'].map((status, index) => (
              <button key={index} className="status-btn" onClick={() => onMove(status)}>
                {status}
              </button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

TodoCard.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    checklist: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        checked: PropTypes.bool.isRequired,
      })
    ).isRequired,
    dueDate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
};

export default TodoCard;

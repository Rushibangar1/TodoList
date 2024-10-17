import React from 'react';

const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{task.assignedTo}</h5>
        <p className="card-text">
          <strong>Status:</strong> {task.status}
        </p>
        <p className="card-text">
          <strong>Due Date:</strong> {task.dueDate}
        </p>
        <p className="card-text">
          <strong>Priority:</strong> {task.priority}
        </p>
        <p className="card-text">
          <strong>Comments:</strong> {task.comments || 'No comments'}
        </p>
      </div>
      <div className="card-footer d-flex justify-content-between">
        <button className="btn btn-primary" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;

import React, { useState, useEffect } from 'react';

const TaskForm = ({ taskToEdit, onSubmit, onCancel }) => {
  const [assignedTo, setAssignedTo] = useState(''); // Now a regular text input for user assignment
  const [status, setStatus] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [comments, setComments] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setAssignedTo(taskToEdit.assignedTo);
      setStatus(taskToEdit.status);
      setDueDate(taskToEdit.dueDate);
      setPriority(taskToEdit.priority);
      setComments(taskToEdit.comments);
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = {
      assignedTo,
      status,
      dueDate,
      priority,
      comments,
    };
    onSubmit(task);
    clearForm();
  };

  const clearForm = () => {
    setAssignedTo('');
    setStatus('');
    setDueDate('');
    setPriority('');
    setComments('');
  };

  return (
    <div className="slds-box slds-p-around_medium">
      <h2 className="slds-text-heading_medium">{taskToEdit ? 'Edit Task' : 'Add New Task'}</h2>
      <form onSubmit={handleSubmit} className="slds-form" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        
        {/* First row - Assigned To and Status */}
        <div className="slds-form-element">
          <label htmlFor="assignedTo" className="slds-form-element__label">Assigned To</label>
          <div className="slds-form-element__control">
            <input
              id="assignedTo"
              name="assignedTo"
              type="text"
              className="slds-input"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              placeholder="Enter the name of the person"
              required
            />
          </div>
        </div>

        <div className="slds-form-element">
          <label htmlFor="status" className="slds-form-element__label">Status</label>
          <div className="slds-form-element__control">
            <div className="slds-select_container">
              <select
                id="status"
                name="status"
                className="slds-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Second row - Due Date and Priority */}
        <div className="slds-form-element">
          <label htmlFor="dueDate" className="slds-form-element__label">Due Date</label>
          <div className="slds-form-element__control">
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              className="slds-input"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="slds-form-element">
          <label htmlFor="priority" className="slds-form-element__label">Priority</label>
          <div className="slds-form-element__control">
            <div className="slds-select_container">
              <select
                id="priority"
                name="priority"
                className="slds-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Full row - Comments */}
        <div className="slds-form-element" style={{ gridColumn: 'span 2' }}>
          <label htmlFor="comments" className="slds-form-element__label">Comments</label>
          <div className="slds-form-element__control">
            <textarea
              id="comments"
              name="comments"
              className="slds-textarea"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Enter your comments here"
            />
          </div>
        </div>

        {/* Form buttons */}
        <div className="slds-m-top_medium" style={{ gridColumn: 'span 2' }}>
          <button type="submit" className="slds-button slds-button_brand">
            {taskToEdit ? 'Update' : 'Add Task'}
          </button>
          <button 
            type="button" 
            className="slds-button slds-button_neutral slds-m-left_small" 
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
};

export default TaskForm;

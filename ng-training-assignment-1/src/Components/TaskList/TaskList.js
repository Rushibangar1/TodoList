import React, { useState } from 'react';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(null); // Track which dropdown is visible

  // Filter tasks based on the search query
  const filteredTasks = tasks.filter((task) => {
    const lowerQuery = searchQuery.toLowerCase();
    return (
      task.assignedTo.toLowerCase().includes(lowerQuery) ||
      task.status.toLowerCase().includes(lowerQuery) ||
      task.dueDate.includes(lowerQuery) ||
      task.priority.toLowerCase().includes(lowerQuery) ||
      task.comments.toLowerCase().includes(lowerQuery)
    );
  });

  // Toggle dropdown visibility for a specific task
  const toggleDropdown = (taskId) => {
    setDropdownVisible(dropdownVisible === taskId ? null : taskId);
  };

  return (
    <div className="slds-box slds-p-around_medium">
      {/* Bold and Top-Left Positioned Title */}
      <h1 style={{ fontWeight: 'bold', fontSize: '24px', textAlign: 'left', marginBottom: '20px' }}>
        To Do Application
      </h1>

      {/* Search Input */}
      <div className="slds-form-element slds-m-bottom_medium">
        <label className="slds-form-element__label" htmlFor="searchInput">Search Tasks</label>
        <div className="slds-form-element__control">
          <input
            type="text"
            id="searchInput"
            className="slds-input"
            placeholder="Search by Assigned To, Status, Due Date, Priority, or Comments"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Task Table */}
      <table className="slds-table slds-table_bordered slds-table_fixed-layout">
        <thead>
          <tr>
            <th scope="col"><div className="slds-truncate">Assigned To</div></th>
            <th scope="col"><div className="slds-truncate">Status</div></th>
            <th scope="col"><div className="slds-truncate">Due Date</div></th>
            <th scope="col"><div className="slds-truncate">Priority</div></th>
            <th scope="col"><div className="slds-truncate">Comments</div></th>
            <th scope="col"><div className="slds-truncate">Actions</div></th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <tr key={task.id}>
                <td><div className="slds-truncate">{task.assignedTo}</div></td>
                <td><div className="slds-truncate">{task.status}</div></td>
                <td><div className="slds-truncate">{task.dueDate}</div></td>
                <td><div className="slds-truncate">{task.priority}</div></td>
                <td><div className="slds-truncate">{task.comments}</div></td>
                <td>
                  {/* Arrow Button for Dropdown */}
                  <button
                    className="slds-button slds-button_icon"
                    onClick={() => toggleDropdown(task.id)}
                    aria-haspopup="true"
                    title="Show Actions"
                  >
                    <span className="slds-icon_container slds-icon-utility-down">
                      ▼ {/* This can be replaced with an actual arrow icon */}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownVisible === task.id && (
                    <div className="slds-dropdown slds-dropdown_left slds-p-around_x-small" style={{ position: 'absolute' }}>
                      <ul className="slds-dropdown__list">
                        <li>
                          <button
                            className="slds-button slds-button_neutral slds-m-bottom_x-small"
                            onClick={() => {
                              onEdit(task);
                              setDropdownVisible(null);
                            }}
                          >
                            Edit
                          </button>
                        </li>
                        <li>
                          <button
                            className="slds-button slds-button_destructive"
                            onClick={() => {
                              onDelete(task.id);
                              setDropdownVisible(null);
                            }}
                          >
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="slds-text-align_center">No tasks found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;

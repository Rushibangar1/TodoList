// src/components/TaskManager.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskManager from './TaskManager';

describe('TaskManager Component', () => {
  test('renders Add Task button', () => {
    render(<TaskManager />);
    const buttonElement = screen.getByText(/Add Task/i);
    expect(buttonElement).toBeInTheDocument();
    console.log('Add Task button rendered');
  });

  test('shows task form when Add Task button is clicked', () => {
    render(<TaskManager />);

    // Simulate clicking the 'Add Task' button
    const buttonElement = screen.getByText(/add task/i);
    fireEvent.click(buttonElement);

    // Use the correct placeholder or another selector to find the input field
    const commentsElement = screen.getByPlaceholderText('Enter your comments here');
    expect(commentsElement).toBeInTheDocument();

    console.log('Task form is visible');
});


 // Updated test to interact with the "Assigned To" select element
 test('adds a new task', () => {
    render(<TaskManager />);

    // Click the Add Task button to open the form
    fireEvent.click(screen.getByText(/Add Task/i));

    // Select the "Assigned To" dropdown
    const assignedToSelect = screen.getByLabelText(/Assigned To/i);
    fireEvent.change(assignedToSelect, { target: { value: 'User1' } });

    // Similarly, select other inputs like 'Status', 'Due Date', etc.
    const statusSelect = screen.getByLabelText(/Status/i);
    fireEvent.change(statusSelect, { target: { value: 'Pending' } });

    const prioritySelect = screen.getByLabelText(/Priority/i);
    fireEvent.change(prioritySelect, { target: { value: 'High' } });

    const commentsInput = screen.getByPlaceholderText(/Enter your comments here/i);
    fireEvent.change(commentsInput, { target: { value: 'This is a test task' } });

    // Simulate form submission
    const addTaskButton = screen.getByText(/Add Task/i);
    fireEvent.click(addTaskButton);

    // You can assert that the task was added by checking for the assigned user
    expect(screen.getByText(/User1/)).toBeInTheDocument();
});

  ;

  test('edits an existing task', () => {
    render(<TaskManager />);
    
    // Add a task first
    const buttonElement = screen.getByText(/Add Task/i);
    fireEvent.click(buttonElement);
    
    const inputElement = screen.getByPlaceholderText(/Enter your comments here/i);
    fireEvent.change(inputElement, { target: { value: 'Task to Edit' } });
    
    // Set other fields
    fireEvent.change(screen.getByLabelText(/Status/i), { target: { value: 'Pending' } });
    fireEvent.change(screen.getByLabelText(/Due Date/i), { target: { value: '2024-12-31' } });
    fireEvent.change(screen.getByLabelText(/Priority/i), { target: { value: 'High' } });
    fireEvent.change(screen.getByLabelText(/Comments/i), { target: { value: 'Initial comment.' } });

    const submitButton = screen.getByText(/Add Task/i);
    fireEvent.click(submitButton);
    console.log('Task added, now editing it');

    // Now edit the task
    const editButton = screen.getByText(/Edit/i);
    fireEvent.click(editButton);
    console.log('Edit button clicked');

    const editInputElement = screen.getByPlaceholderText(/Enter your comments here/i);
    fireEvent.change(editInputElement, { target: { value: 'Updated Task' } });
    
    const updateButtons = screen.getAllByText(/Update/i);
    fireEvent.click(updateButtons[0]);  // Click the first "Update" button
    
    console.log('Task updated');

    const updatedTaskElement = screen.getByText(/Updated Task/i);
    expect(updatedTaskElement).toBeInTheDocument();
    console.log('Updated task is now in the document');
  });

  test('deletes an existing task', () => {
    render(<TaskManager />);
    
    // Add a task first
    const buttonElement = screen.getByText(/Add Task/i);
    fireEvent.click(buttonElement);
    screen.debug();

    const inputElement = screen.getByPlaceholderText(/Enter your comments here/i);
    fireEvent.change(inputElement, { target: { value: 'Task to Delete' } });
    
    // Set other fields
    fireEvent.change(screen.getByLabelText(/Status/i), { target: { value: 'Pending' } });
    fireEvent.change(screen.getByLabelText(/Due Date/i), { target: { value: '2024-12-31' } });
    fireEvent.change(screen.getByLabelText(/Priority/i), { target: { value: 'High' } });
    fireEvent.change(screen.getByLabelText(/Comments/i), { target: { value: 'Delete this task.' } });

    const submitButton = screen.getByText(/Add Task/i);
    fireEvent.click(submitButton);
    console.log('Task to Delete added');

    // Now delete the task
    const deleteButtons = screen.getAllByText(/Delete/i);
    fireEvent.click(deleteButtons[0]); // Click the first "Delete" button
    
    console.log('Delete button clicked');

    const deletedTaskElement = screen.queryByText(/Task to Delete/i);
    expect(deletedTaskElement).not.toBeInTheDocument();
    console.log('Task to Delete has been removed from the document');
  });
});

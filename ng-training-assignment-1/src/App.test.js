import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskManager from './Components/TaskManager';


describe('TaskManager Component', () => {
  test('renders Add Task button', () => {
    render(<TaskManager />);
    const addButton = screen.getByText(/Add Task/i);
    expect(addButton).toBeInTheDocument();
  });

  test('shows TaskForm when Add Task button is clicked', () => {
    render(<TaskManager />);
    const addButton = screen.getByText(/Add Task/i);
    fireEvent.click(addButton);
    
    const taskForm = screen.getByLabelText(/Assigned To/i);
    expect(taskForm).toBeInTheDocument();
  });

  test('submits the form and adds a new task', () => {
    render(<TaskManager />);
    const addButton = screen.getByText(/Add Task/i);
    fireEvent.click(addButton);

    // Fill the form fields
    fireEvent.change(screen.getByLabelText(/Assigned To/i), { target: { value: 'User1' } });
    fireEvent.change(screen.getByLabelText(/Status/i), { target: { value: 'Pending' } });
    fireEvent.change(screen.getByLabelText(/Due Date/i), { target: { value: '2024-09-30' } });
    fireEvent.change(screen.getByLabelText(/Priority/i), { target: { value: 'High' } });
    fireEvent.change(screen.getByLabelText(/Comments/i), { target: { value: 'Test comment' } });
    
    // Submit the form
    fireEvent.click(screen.getByText(/Add Task/i));
    
    // Check if the task is added to the list
    expect(screen.getByText(/User1/i)).toBeInTheDocument();
    expect(screen.getByText(/Pending/i)).toBeInTheDocument();
    expect(screen.getByText(/2024-09-30/i)).toBeInTheDocument();
    expect(screen.getByText(/High/i)).toBeInTheDocument();
    expect(screen.getByText(/Test comment/i)).toBeInTheDocument();
  });

  test('edits an existing task', () => {
    render(<TaskManager />);
    const addButton = screen.getByText(/Add Task/i);
    fireEvent.click(addButton);

    // Fill the form fields for the first task
    fireEvent.change(screen.getByLabelText(/Assigned To/i), { target: { value: 'User1' } });
    fireEvent.change(screen.getByLabelText(/Status/i), { target: { value: 'Pending' } });
    fireEvent.change(screen.getByLabelText(/Due Date/i), { target: { value: '2024-09-30' } });
    fireEvent.change(screen.getByLabelText(/Priority/i), { target: { value: 'High' } });
    fireEvent.change(screen.getByLabelText(/Comments/i), { target: { value: 'Test comment' } });
    
    // Submit the form
    fireEvent.click(screen.getByText(/Add Task/i));

    // Now edit the task
    const editButton = screen.getByText(/Edit/i);
    fireEvent.click(editButton);
    
    // Change the comments
    fireEvent.change(screen.getByLabelText(/Comments/i), { target: { value: 'Updated comment' } });
    const updateButtons = screen.getAllByText(/Update/i);
    fireEvent.click(updateButtons[0]);  // Click the first "Update" button

    // Check if the updated comment is displayed
    expect(screen.getByText(/Updated comment/i)).toBeInTheDocument();
  });

  test('deletes a task', () => {
    render(<TaskManager />);
    const addButton = screen.getByText(/Add Task/i);
    fireEvent.click(addButton);

    // Fill the form fields for the first task
    fireEvent.change(screen.getByLabelText(/Assigned To/i), { target: { value: 'User1' } });
    fireEvent.change(screen.getByLabelText(/Status/i), { target: { value: 'Pending' } });
    fireEvent.change(screen.getByLabelText(/Due Date/i), { target: { value: '2024-09-30' } });
    fireEvent.change(screen.getByLabelText(/Priority/i), { target: { value: 'High' } });
    fireEvent.change(screen.getByLabelText(/Comments/i), { target: { value: 'Test comment' } });
    
    // Submit the form
    fireEvent.click(screen.getByText(/Add Task/i));

    // Delete the task
    const deleteButton = screen.getByText(/Delete/i);
    fireEvent.click(deleteButton);

    // Check if the task is no longer in the document
    expect(screen.queryByText(/User1/i)).not.toBeInTheDocument();
  });

  test('shows no tasks message when no tasks are available', () => {
    render(<TaskManager />);
    
    const noTasksMessage = screen.getByText(/No tasks available/i);
    expect(noTasksMessage).toBeInTheDocument();
  });
});

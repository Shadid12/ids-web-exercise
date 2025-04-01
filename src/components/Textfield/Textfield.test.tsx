import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Textfield from './Textfield'; // Make sure this matches your actual file name

describe('TextField Component', () => {
  // Helper function to render the TextField with provided props
  const renderTextField = (props = {}) => {
    return render(<Textfield {...props} />);
  };

  it('renders with default props', () => {
    renderTextField();
    
    // Check if the label is rendered with default value
    expect(screen.getByText('Label')).toBeInTheDocument();
    
    // Check if input is rendered
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(''); // Default value should be empty
  });

  it('renders with custom label', () => {
    renderTextField({ label: 'Custom Label' });
    expect(screen.getByText('Custom Label')).toBeInTheDocument();
  });

  it('displays required asterisk when required is true', () => {
    renderTextField({ required: true });
    const label = screen.getByText('Label');
    const requiredMark = screen.getByText('*');
    expect(requiredMark).toBeInTheDocument();
    expect(label.parentElement).toContainElement(requiredMark);
  });

  it('renders with custom placeholder', () => {
    renderTextField({ placeholder: 'Enter text here' });
    const input = screen.getByPlaceholderText('Enter text here');
    expect(input).toBeInTheDocument();
  });

  it('renders with custom value', () => {
    renderTextField({ value: 'Test Value' });
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('Test Value');
  });

  it('calls onChange handler when input changes', () => {
    const handleChange = vi.fn();
    renderTextField({ onChange: handleChange });
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'New Value' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('displays error message when error is provided', () => {
    const errorMessage = 'This field is required';
    renderTextField({ error: errorMessage });
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByText(errorMessage).className).toContain('error-message');
    
    // Container should have error class
    const container = screen.getByRole('textbox').closest('.text-field-container');
    expect(container).toHaveClass('error');
  });

  it('displays warning message when warning is provided', () => {
    const warningMessage = 'This field is recommended';
    renderTextField({ warning: warningMessage });
    
    expect(screen.getByText(warningMessage)).toBeInTheDocument();
    expect(screen.getByText(warningMessage).className).toContain('warning-message');
    
    // Container should have warning class
    const container = screen.getByRole('textbox').closest('.text-field-container');
    expect(container).toHaveClass('warning');
  });

  it('prioritizes error over warning when both are provided', () => {
    const errorMessage = 'This field is required';
    const warningMessage = 'This field is recommended';
    renderTextField({ error: errorMessage, warning: warningMessage });
    
    // Error message should be visible, warning should not
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.queryByText(warningMessage)).not.toBeInTheDocument();
    
    // Container should have error class, not warning
    const container = screen.getByRole('textbox').closest('.text-field-container');
    expect(container).toHaveClass('error');
    expect(container).not.toHaveClass('warning');
  });

  it('renders without any state class when no error or warning', () => {
    renderTextField();
    const container = screen.getByRole('textbox').closest('.text-field-container');
    expect(container).not.toHaveClass('error');
    expect(container).not.toHaveClass('warning');
  });
});
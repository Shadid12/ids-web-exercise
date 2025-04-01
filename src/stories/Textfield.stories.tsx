import { useState } from 'react';
import { Textfield } from '../components/Textfield';
import { TextFieldProps } from '../components/Textfield/Textfield';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Textfield> = {
  title: 'Components/Textfield',
  component: Textfield,
  parameters: {
    componentSubtitle: 'A customizable text input component with multiple states',
  },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    type: { 
      control: { type: 'select' }, 
      options: ['text', 'email', 'password', 'number', 'tel'],
    },
    required: { control: 'boolean' },
    error: { control: 'text' },
    warning: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Textfield>;

// Template for controlled stories
const ControlledTemplate = (args: TextFieldProps) => {
  const [value, setValue] = useState('');
  
  return (
    <Textfield 
      {...args} 
      value={value} 
      onChange={(e) => setValue(e.target.value)} 
    />
  );
};

// Basic TextField
export const Default: Story = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
  }
};

// Required TextField
export const Required: Story = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
    required: true,
  }
};

// Password TextField
export const Password: Story = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
  }
};

// Error State
export const WithError: Story = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
    error: '❗ Please enter a valid email address',
  }
};

// Warning State
export const WithWarning: Story = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    warning: '⚠️ Password should be at least 8 characters long',
  }
};

// other warning state
export const Warning: Story = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    label: 'Location',
    placeholder: 'Your location',
    type: 'text',
    warning: '⚠️ Please provide a valid location',
  }
};

// Different input types
export const InputTypes = () => {
  interface Values {
    text: string;
    email: string;
    number: string;
    tel: string;
  }
  
  const [values, setValues] = useState<Values>({
    text: '',
    email: '',
    number: '',
    tel: '',
  });
  
  const handleChange = (field: keyof Values, value: string): void => {
    setValues({
      ...values,
      [field]: value,
    });
  };
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Textfield 
        label="Text Input"
        placeholder="Enter text"
        type="text"
        value={values.text}
        onChange={(e) => handleChange('text', e.target.value)}
      />
      
      <Textfield 
        label="Email Input"
        placeholder="Enter email"
        type="email"
        value={values.email}
        onChange={(e) => handleChange('email', e.target.value)}
      />
      
      <Textfield 
        label="Number Input"
        placeholder="Enter number"
        type="number"
        value={values.number}
        onChange={(e) => handleChange('number', e.target.value)}
      />
    </div>
  );
};

// Layout comparison
export const LayoutComparison = () => (
  <div style={{ display: 'flex', gap: '20px' }}>
    <div>
      <h4>Normal State</h4>
      <Textfield 
        label="Username"
        placeholder="Enter username"
      />
    </div>
    
    <div>
      <h4>Error State</h4>
      <Textfield 
        label="Email"
        placeholder="Enter email"
        error="Invalid email format"
      />
    </div>
    
    <div>
      <h4>Warning State</h4>
      <Textfield 
        label="Password"
        placeholder="Enter password"
        type="password"
        warning="Use a stronger password"
      />
    </div>
  </div>
);


export const ThemeToggleDemo = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  
  // Toggle between light and dark themes
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };
  
  // Example form with multiple textfields
  return (
    <div className={isDarkTheme ? 'dark-theme' : ''} style={{
      padding: '20px',
      borderRadius: '8px',
      backgroundColor: isDarkTheme ? 'var(--tf-color-background-main-dark)' : 'var(--tf-color-background-surface-light)',
      transition: 'background-color 0.3s ease',
      maxWidth: '500px'
    }}>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ 
          color: isDarkTheme ? 'var(--tf-color-text-default-dark)' : 'var(--tf-color-text-default-light)',
          margin: 0
        }}>
          {isDarkTheme ? 'Dark Theme' : 'Light Theme'}
        </h3>
        
        <button 
          onClick={toggleTheme}
          style={{
            padding: '8px 16px',
            backgroundColor: isDarkTheme ? '#e0e0e0' : '#333',
            color: isDarkTheme ? '#121212' : 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 500
          }}
        >
          Switch to {isDarkTheme ? 'Light' : 'Dark'} Theme
        </button>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Textfield 
          label="Username"
          placeholder="Enter your username"
          required={true}
        />
        
        <Textfield 
          label="Email"
          placeholder="Enter your email"
          type="email"
        />
        
        <Textfield 
          label="Password"
          placeholder="Enter your password"
          type="password"
          warning="Password should be at least 8 characters"
        />
        
        <Textfield 
          label="Confirmation Code"
          placeholder="Enter the code"
          error="Invalid code format"
        />
      </div>
    </div>
  );
};
import React, { useState, useTransition } from 'react';

const ActionForm: React.FC = () => {
    const [name, setName] = useState('');
    const [isPending, startTransition] = useTransition();

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log('Submitted name:', name);
        
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Continue with the rest of the logic after the timeout
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={handleNameChange} />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export default ActionForm;
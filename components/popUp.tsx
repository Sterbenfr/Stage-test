import React, { useState } from 'react'
import SelectComponent from './select-component'
import SearchComponent from './searchComponent'

interface Field {
    id: string
    type: 'input' | 'checkbox' | 'number' | 'date' | 'file' | 'select' | 'enum' | 'search'
    value: string | boolean | null
    url?: string
}

interface PopUpProps {
    onClose: () => void
    fields: Field[]
    url: string
}


const PopUp: React.FC<PopUpProps> = ({ onClose, fields, url }) => {
    const [inputs, setInputs] = useState<Field[]>(fields)

    const handleInputChange = (id: string, value: string | boolean) => {
        const updatedInputs = inputs.map(input =>
            input.id === id ? { ...input, value } : input,
        )
        setInputs(updatedInputs)
    }

    const handleSubmit = async () => {
        // Define the server endpoint URL
        const endpoint = url

        const inputsData = inputs.reduce<{ [key: string]: string | boolean | null}>(
            (acc, input) => {
                acc[input.id] = input.value
                return acc
            },
            {},
        )

        // Prepare the data to be sent

        try {
            // Use fetch to make the POST request
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputsData),
            })

            // Check if the request was successful
            if (response.ok) {
                // Handle success - you can parse JSON response if needed
                const jsonResponse = await response.json()
                console.log('Submission successful', jsonResponse)
                // Close the pop-up after submission
                onClose()
            } else {
                // Handle server errors or invalid responses
                console.error('Submission failed', await response.text())
            }
        } catch (error) {
            // Handle network errors
            console.error('Network error:', error)
        }
        onClose()
    }

    return (
        <div className={'popup-container'}>
            <h2>Add New Entry</h2>
            {inputs.map(input => (
                input.type !== 'select' && input.type !== 'search' && (
                    <input
                        key={input.id}
                        type={input.type}
                        value={input.value as string}
                        onChange={e => handleInputChange(input.id, e.target.value)}
                    />
                ) || (input.type === 'select'  && (
                    SelectComponent({ url: input.url as string })
                ) || (input.type === 'search' && (
                    SearchComponent({ url: input.url as string })
                ))
            )))}
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default PopUp

/*
<PopUp
    onClose={handleClose}
    fields={[
        { id: 1, type: 'input', value: ''},
        { id: 2, type: 'checkbox', value: false },
        // Add more fields as needed
    ]}
/>*/

import React, { useState } from 'react'

interface Field {
    id: number
    type: 'input' | 'checkbox'
    value: string | boolean
    url: string
}

interface PopUpProps {
    onClose: () => void
    fields: Field[]
    className: string
}

const PopUp: React.FC<PopUpProps> = ({ onClose, fields, className }) => {
    const [inputs, setInputs] = useState<Field[]>(fields)

    const handleInputChange = (id: number, value: string | boolean) => {
        const updatedInputs = inputs.map(input =>
            input.id === id ? { ...input, value } : input,
        )
        setInputs(updatedInputs)
    }

    const handleSubmit = () => {
        // Handle form submission here
        // You can access the input values from the 'inputs' state
        // Close the pop-up after submission
        onClose()
    }

    return (
        <div className={'popup-container' + className}>
            <h2>Add New Entry</h2>
            {inputs.map(input =>
                input.type === 'input' ? (
                    <input
                        key={input.id}
                        type='text'
                        value={input.value as string}
                        onChange={e =>
                            handleInputChange(input.id, e.target.value)
                        }
                    />
                ) : (
                    <input
                        key={input.id}
                        type='checkbox'
                        checked={input.value as boolean}
                        onChange={e =>
                            handleInputChange(input.id, e.target.checked)
                        }
                    />
                ),
            )}
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

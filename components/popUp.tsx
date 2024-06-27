import React, { useEffect, useState } from 'react'
import SelectComponent from './select-component'
import SearchComponent from './searchComponent'
import style from '../styles/components.module.css'

type Field = {
    id: string
    type:
        | 'input'
        | 'checkbox'
        | 'number'
        | 'date'
        | 'file'
        | 'select'
        | 'enum'
        | 'search'
        | 'password'
    value: string | boolean | null
    placeholder?: string
    url?: string
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

interface PopUpProps {
    onClose: () => void
    fields: Field[]
    url: string
}

const PopUp: React.FC<PopUpProps> = ({ onClose, fields, url }) => {
    const [inputs, setInputs] = useState<Field[]>(fields)

    useEffect(() => {
        setInputs(fields)
    }, [fields])

    const handleInputChange = (id: string, value: string | boolean) => {
        const updatedInputs = inputs.map(input =>
            input.id === id ? { ...input, value } : input,
        )
        setInputs(updatedInputs)
    }
    console.log(inputs)
    const handleSubmit = async () => {
        // Define the server endpoint URL
        const endpoint = url

        const inputsData = inputs.reduce<{
            [key: string]: string | boolean | null
        }>((acc, input) => {
            acc[input.id] = input.value
            return acc
        }, {})

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
            <div className={style.page}>
                <h2 className={style.lg}>Add New Entry</h2>
                {inputs.map(input => {
                    switch (input.type) {
                        case 'select':
                            return (
                                <SelectComponent
                                    key={input.id}
                                    url={input.url as string}
                                    onChange={input.onChange}
                                />
                            )
                        case 'search':
                            return (
                                <SearchComponent
                                    key={input.id}
                                    url={input.url as string}
                                    onChange={e =>
                                        handleInputChange(
                                            input.id,
                                            e.target.value,
                                        )
                                    }
                                />
                            )
                        default:
                            return (
                                <input
                                    key={input.id}
                                    type={input.type}
                                    placeholder={input.type}
                                    className={style.selectF}
                                    value={
                                        input.value === null
                                            ? ''
                                            : (input.value as string)
                                    }
                                    onChange={e =>
                                        handleInputChange(
                                            input.id,
                                            e.target.value,
                                        )
                                    }
                                />
                            )
                    }
                })}
                <div className={style.BTNdiv}>
                    <div className={style.BTNdiv}>
                        <button className={style.BTNsub} onClick={onClose}>
                            Exit
                        </button>

                        <button className={style.BTNsub} onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
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

import React, { useEffect, useState } from 'react';

interface SelectComponentProps {
    url: string;
}

interface Option {
    value: string;
    label: string;
}

export default function SearchComponent({ url }: SelectComponentProps) {
    const [options, setOptions] = useState<Option[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
    const [inputValue, setInputValue] = useState(''); 

    const fetchOptions = async () => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            const formattedOptions = data.map((item: { id: string; label: string }) => ({
                value: item.id,
                label: item.label
            }));
            setOptions(formattedOptions);
        } catch (error) {
            console.error('Erreur lors de la récupération des données', error);
        }
    };

    useEffect(() => {
        fetchOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        const selectedOptions: Option[] = [];
        options.map(option => { 
            if (option.label.toLowerCase().startsWith(e.target.value.toLowerCase())) {
                selectedOptions.push(option);
            }
        });
        setSelectedOptions(selectedOptions);
        console.log(selectedOptions);
    };

    return (
        <div>
            <input
                key="search"
                type="input"
                value={inputValue}
                onChange={handleInputChange}
                list='search'
            />
            <datalist id="search">
                {selectedOptions.filter((option, index) => index < 5).map((option) => (
                    <option key={option.value} value={option.label}>
                        {option.label}
                    </option>
                ))}
            </datalist>
        </div>
    )
}


import React, { useEffect, useState } from 'react';

interface SelectComponentProps {
    url: string;
}

interface Option {
    value: string;
    label: string;
}

export default function SelectComponent({ url }: SelectComponentProps) {
    const [options, setOptions] = useState<Option[]>([]);

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

    // Renvoyer le menu déroulant avec les options
    return (
        <select>
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}
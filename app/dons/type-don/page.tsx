'use client'
import { useEffect, useState } from 'react'

interface Don {
    code_type_don: string
    libelle: string
}

export default function DonsPage() {
    const [Dons, setDons] = useState<Don[]>([])

    useEffect(() => {
        const fetchDons = async () => {
            const res = await fetch('http://localhost:3000/api/dons/type-don')

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const Dons: Don[] = await res.json()
            setDons(Dons)
        }

        fetchDons()
    }, [])

    return (
        <div>
            <h1>Types de Dons</h1>
            {Dons.map(TypesDons => (
                <div key={TypesDons.code_type_don}>
                    <p>Code Type Don: {TypesDons.code_type_don}</p>
                    <p>Libelle: {TypesDons.libelle}</p>
                </div>
            ))}
        </div>
    )
}

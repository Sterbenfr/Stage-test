'use client'
import { useEffect, useState } from 'react'

interface Prestataire {
    code_type_prestataire: string
    libelle: string
}

export default function PrestatairesPage() {
    const [Prestataires, setPrestataires] = useState<Prestataire[]>([])

    useEffect(() => {
        const fetchPrestataires = async () => {
            const res = await fetch(
                'http://localhost:3000/api/type-prestataires',
            )

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const Prestataires: Prestataire[] = await res.json()
            setPrestataires(Prestataires)
        }

        fetchPrestataires()
    }, [])

    return (
        <div>
            <h1>Type Prestataires</h1>
            {Prestataires.map(TypePrestataires => (
                <div key={TypePrestataires.code_type_prestataire}>
                    <h2>{TypePrestataires.libelle}</h2>
                    <h2>{TypePrestataires.code_type_prestataire}</h2>
                </div>
            ))}
        </div>
    )
}

'use client'
import { useEffect, useState } from 'react'

interface Entite {
    code_type_entite: string
    libelle: string
}

export default function EntitesPage() {
    const [Entites, setEntites] = useState<Entite[]>([])

    useEffect(() => {
        const fetchEntites = async () => {
            const res = await fetch(
                'http://localhost:3000/api/type-entites',
            )

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const Entites: Entite[] = await res.json()
            setEntites(Entites)
        }

        fetchEntites()
    }, [])

    return (
        <div>
            <h1>Types Entites</h1>
            {Entites.map(TypesEntites => (
                <div key={TypesEntites.code_type_entite}>
                    <h2>{TypesEntites.libelle}</h2>
                    <h2>{TypesEntites.code_type_entite}</h2>
                </div>
            ))}
        </div>
    )
}

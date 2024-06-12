'use client'
import { useEffect, useState } from 'react'

interface Competence {
    code_type_competence: string
    libelle: string
}

export default function CompetencePage() {
    const [competences, setCompetence] = useState<Competence[]>([])

    useEffect(() => {
        const fetchCompetences = async () => {
            const res = await fetch(
                'http://localhost:3000/api/type_competences',
            )

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const competences: Competence[] = await res.json()
            setCompetence(competences)
        }

        fetchCompetences()
    }, [])

    return (
        <div>
            <h1>Competences</h1>
            {competences.map(competence => (
                <div key={competence.code_type_competence}>
                    <h2>
                        {competence.code_type_competence} : {competence.libelle}
                    </h2>
                </div>
            ))}
        </div>
    )
}

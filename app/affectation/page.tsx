'use client'
import { useEffect, useState } from 'react'

interface Affectation {
    code_Utilisateur_Prospecteur: number
    code_Entite: number
    commentaires : string
    date_affectation : Date
    date_arret_affectation : Date
}

export default function AffectationsPage() {
    const [Affectation, setAffectation] = useState<Affectation[]>([])

    useEffect(() => {
        const fetchAffectation = async () => {
            const res = await fetch('http://localhost:3000/api/affectation')

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const Affectations: Affectation[] = await res.json()
            setAffectation(Affectations)
        }

        fetchAffectation()
    }, [])

    return (
        <div>
            <h1>Table des Affectations</h1>
            {Affectation.map(Affectation => (
                <div key={Affectation.code_Utilisateur_Prospecteur}>
                    <p>Code Propecteur: {Affectation.code_Utilisateur_Prospecteur}</p>
                    <p>Code Entité: {Affectation.code_Entite}</p>
                    <p>Commentaires: {Affectation.commentaires}</p>
                    <p>Date Affectation: {Affectation.date_affectation.toString()}</p>
                    <p>Date Arrêt Affectation: {Affectation.date_arret_affectation==null ? "" : Affectation.date_arret_affectation.toString()}</p>
                </div>
            ))}
        </div>
    )
}
'use client'
import { useEffect, useState } from 'react'

interface SuiviGroupes {
    code_Groupe: number
    code_type_de_Site: string
    code_site_suivi: number
    code_utilisateur_suivant: number
}

export default function UsersPage({
    params,
}: {
    params: { societeID: string }
}) {
    const [SuiviGroupe, setSuiviGroupe] = useState<SuiviGroupes[]>([])

    useEffect(() => {
        const fetchSuiviGroupe = async () => {
            const res = await fetch(`http://localhost:3000/api/societe/${params.societeID}/groupe/suivi-groupe`)

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const SuiviGroupe: SuiviGroupes[] = await res.json()
            setSuiviGroupe(SuiviGroupe)
        }

        fetchSuiviGroupe()
    }, [])

    return (
        <div>
            <h1>Type activite societe</h1>
            {SuiviGroupe.map(TypeSuiviGroupe => (
                <div key={TypeSuiviGroupe.code_Groupe}>
                    <h2>{TypeSuiviGroupe.code_Groupe}</h2>
                    <p>{TypeSuiviGroupe.code_type_de_Site}</p>
                    <p>{TypeSuiviGroupe.code_site_suivi}</p>
                    <p>{TypeSuiviGroupe.code_utilisateur_suivant}</p>
                </div>
            ))}
        </div>
    )
}

'use client'
import { useEffect, useState } from 'react'

interface Utilisateurs {
    code_utilisateur: number
    civilite: string
    nom: string
    prenom: string
    tel_perso: string
    mail_restos_du_coeur: string
    commentaires: string
}

export default function UtilisateursPage() {
    const [Utilisateurs, setUtilisateurs] = useState<Utilisateurs[]>([])

    useEffect(() => {
        const fetchUtilisateurs = async () => {
            const res = await fetch('http://localhost:3000/api/utilisateurs')

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const Utilisateurs: Utilisateurs[] = await res.json()
            setUtilisateurs(Utilisateurs)
        }

        fetchUtilisateurs()
    }, [])

    return (
        <div>
            <h1>Utilisateurs</h1>
            {Utilisateurs.map(TypeUtilisateurs => (
                <div key={TypeUtilisateurs.code_utilisateur}>
                    <h2>{TypeUtilisateurs.code_utilisateur}</h2>
                    <p>{TypeUtilisateurs.civilite}</p>
                    <p>{TypeUtilisateurs.nom}</p>
                    <p>{TypeUtilisateurs.prenom}</p>
                    <p>{TypeUtilisateurs.tel_perso}</p>
                    <p>{TypeUtilisateurs.mail_restos_du_coeur}</p>
                    <p>{TypeUtilisateurs.commentaires}</p>
                </div>
            ))}
        </div>
    )
}

'use client'
import { useEffect, useState } from 'react'

interface UtilisateurID {
    code_utilisateur: number
    civilite: string
    nom: string
    prenom: string
    tel_perso: string
    mail_restos_du_coeur: string
    commentaires: string
}

export default function UtilisateurPage({
    params,
}: {
    params: { utilisateurID: string }
}) {
    const [Utilisateur, setUtilisateur] = useState<UtilisateurID[]>([])

    useEffect(() => {
        const fetchUtilisateur = async () => {
            if (!params.utilisateurID) return

            const res = await fetch(
                `http://localhost:3000/api/sites/utilisateurs/${params.utilisateurID}`,
            )

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const Utilisateur: UtilisateurID[] = await res.json()
            setUtilisateur(Utilisateur)
        }

        fetchUtilisateur()
    }, [params.utilisateurID])
    console.log(Utilisateur)
    if (!Utilisateur || Utilisateur.length === 0) return <div>Loading...</div>

    return (
        <div>
            <h1>Utilisateurs</h1>
            <p>{Utilisateur[0].code_utilisateur}</p>
            <p>{Utilisateur[0].civilite}</p>
            <p>{Utilisateur[0].nom}</p>
            <p>{Utilisateur[0].prenom}</p>
            <p>{Utilisateur[0].tel_perso}</p>
            <p>{Utilisateur[0].mail_restos_du_coeur}</p>
            <p>{Utilisateur[0].commentaires}</p>
        </div>
    )
}

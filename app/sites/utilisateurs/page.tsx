'use client'
import { useEffect, useState } from 'react'
import List from '@/components/list'


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
    /*
    return (
        <div>
            <h1>Utilisateurs</h1>
            <List items={Utilisateurs.map(user => ({
                value1: user.code_utilisateur.toString(),
                value2: user.civilite,
                value3: user.nom,
                value4: user.prenom,
                value5: user.tel_perso,
                value6: user.mail_restos_du_coeur
            }))} />
        </div>
    )*/
    return (
        <List
            items={Utilisateurs.map(user => ({
                value1: user.code_utilisateur.toString(),
                value2: user.civilite,
                value3: user.nom,
                value4: user.prenom,
                value5: user.tel_perso,
                value6: user.mail_restos_du_coeur,
            }))}
        />
    )
}

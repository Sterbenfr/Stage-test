'use client'
import { useEffect, useState } from 'react'

interface Groupe {
    code_Groupe: number
    nom_du_Groupe: string
    Logo: Blob
    site_Web: string
    commentaires: string
    date_arret_activite_du_Groupe: Date
}

export default function GroupesPage() {
    const [groupes, setGroupes] = useState<Groupe[]>([])

    useEffect(() => {
        const fetchGroupes = async () => {
            const res = await fetch('http://localhost:3000/api/groupe')

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const groupes: Groupe[] = await res.json()
            setGroupes(groupes)
        }

        fetchGroupes()
    }, [])

    return (
        <div>
            <h1>Groupes</h1>
            {groupes.map(Groupe => (
                <div key={Groupe.code_Groupe}>
                    <h2>
                        {Groupe.code_Groupe} : {Groupe.nom_du_Groupe}
                    </h2>
                    <p>site_Web: {Groupe.site_Web}</p>
                    <p>commentaires: {Groupe.commentaires}</p>
                    <p>date_arret_activite_du_Groupe: {Groupe.date_arret_activite_du_Groupe==null ? "" : Groupe.date_arret_activite_du_Groupe.toString()}</p>
                </div>
            ))}
        </div>
    )
}

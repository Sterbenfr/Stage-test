'use client'
import { useEffect, useState } from 'react'

interface GroupeID {
    code_Groupe: number
    nom_du_Groupe: string
    Logo: Blob
    site_Web: string
    commentaires: string
    date_arret_activite_du_Groupe: Date
}

export default function GroupePage({
    params,
}: {
    params: { groupeID: string }
}) {
    const [Groupe, setGroupe] = useState<GroupeID[]>([])

    useEffect(() => {
        const fetchGroupe = async () => {
            if (!params.groupeID) return

            const res = await fetch(
                `http://localhost:3000/api/societe/groupe/${params.groupeID}`,
            )

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const Groupe: GroupeID[] = await res.json()
            setGroupe(Groupe)
        }

        fetchGroupe()
    }, [params.groupeID])
    if (!Groupe || Groupe.length === 0) return <div>Loading...</div>

    return (
        <div>
            <h1>Groupes</h1>
            <p>{Groupe[0].code_Groupe}</p>
            <p>{Groupe[0].nom_du_Groupe}</p>
            <p>{Groupe[0].site_Web}</p>
            <p>{Groupe[0].commentaires}</p>
            <p>
                {Groupe[0].date_arret_activite_du_Groupe == null
                    ? ''
                    : Groupe[0].date_arret_activite_du_Groupe
                          .toString()
                          .split('T')[0]}
            </p>
        </div>
    )
}

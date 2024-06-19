'use client'
import { useEffect, useState } from 'react'

interface SocieteID {
    code_Societe: number
    raison_sociale: string
    nom_commercial: string
    Logo: Blob
    site_Web: string
    Siren: string
    code_type_activite_Societe: string
    commentaires: string
    code_Societe_appartenance: number
    date_arret_activite_Societe: Date
}

export default function SocietePage({
    params,
}: {
    params: { societeID: string }
}) {
    const [Societe, setSociete] = useState<SocieteID[]>([])

    useEffect(() => {
        const fetchSociete = async () => {
            if (!params.societeID) return

            const res = await fetch(
                `http://localhost:3000/api/societe/${params.societeID}`,
            )

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const Societe: SocieteID[] = await res.json()
            setSociete(Societe)
        }

        fetchSociete()
    }, [params.societeID])
    if (!Societe || Societe.length === 0) return <div>Loading...</div>

    return (
        <div>
            <h1>Societes</h1>
            <p>{Societe[0].code_Societe}</p>
            <p>{Societe[0].raison_sociale}</p>
            <p>{Societe[0].nom_commercial}</p>
            <p>{Societe[0].commentaires}</p>
            <p>{Societe[0].Siren}</p>
            <p>{Societe[0].site_Web}</p>
            <p>{Societe[0].code_type_activite_Societe}</p>
            <p>{Societe[0].code_Societe_appartenance}</p>
            <p>
                {Societe[0].date_arret_activite_Societe == null
                    ? ''
                    : Societe[0].date_arret_activite_Societe
                          .toString()
                          .split('T')[0]}
            </p>
        </div>
    )
}

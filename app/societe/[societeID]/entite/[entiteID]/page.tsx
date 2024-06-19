'use client'
import { useEffect, useState } from 'react'

interface EntiteID {
    code_entite: number
    raison_sociale: string
    nom_commercial: string
    logo: Blob
    siret: string
    code_ape: string
    code_rna: string
    code_cee: string
    nom_societe: string
    adresse: string
    telephone: string
    mail: string
    site_internet: string
    commentaires: string
    TE_libelle: string
    TD_libelle: string
    TP_libelle: string
    TC_libelle: string
    commentaires_logistique: string
    presence_quai: string
    pieces_associees: Blob
    cerfa: string
    FC_libelle: string
    date_arret_activite: Date
}

export default function EntitePage({ params }: { params: { societeID : string, entiteID: string } }) {
    const [entite, setEntite] = useState<EntiteID[]>([])

    useEffect(() => {
        const fetchEntite = async () => {
            if (!params.entiteID) return

            const res = await fetch(
                `http://localhost:3000/api/societe/${params.societeID}/entite/${params.entiteID}`
            )

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const entite : EntiteID[] = await res.json()
            setEntite(entite)
        }

        fetchEntite()
    }, [params.entiteID])
    if (!entite || entite.length===0) return <div>Loading...</div>

    return (
        <div>
            <h1>entite</h1>
            <p>{entite[0].code_entite}</p>
            <p>{entite[0].raison_sociale}</p>
            <p>{entite[0].nom_commercial}</p>
            <p>{entite[0].siret}</p>
            <p>{entite[0].code_ape}</p>
            <p>{entite[0].code_rna}</p>
            <p>{entite[0].code_cee}</p>
            <p>{entite[0].nom_societe}</p>
            <p>{entite[0].adresse}</p>
            <p>{entite[0].telephone}</p>
            <p>{entite[0].mail}</p>
            <p>{entite[0].site_internet}</p>
            <p>{entite[0].commentaires}</p>
            <p>{entite[0].TE_libelle}</p>
            <p>{entite[0].TD_libelle}</p>
            <p>{entite[0].TP_libelle}</p>
            <p>{entite[0].TC_libelle}</p>
            <p>{entite[0].commentaires_logistique}</p>
            <p>{entite[0].presence_quai}</p>
            <p>{entite[0].cerfa}</p>
            <p>{entite[0].FC_libelle}</p>
            <p>{entite[0].date_arret_activite==null ? "" : entite[0].date_arret_activite.toString().split("T")[0]}</p>
        </div>
    )
}
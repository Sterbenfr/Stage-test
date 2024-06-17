'use client'
import { useEffect, useState } from 'react'

interface DonID {
    code_Don: number
    raison_sociale: string
    date_proposition_don: Date
    contact_entite_donatrice: string
    TD_libelle: string
    TC_libelle: string
    TP_libelle: string
    MCP_libelle: string
    date_debut_mise_disposition: Date
    date_fin_mise_disposition: Date
    commentaires: string
    pieces_associees: Blob
    Utilisateur_saisie_don: string
    statut_acceptation_don: string
    date_acceptation_refus_don: Date
    type_date_acceptation_refus: string
    Utilisateur_accepte_refuse_don: string
    site: string
    indicateur_remerciement: string
    date_remerciement: Date
}

export default function DonPage({ params }: { params: { donsID: string } }) {
    const [don, setDon] = useState<DonID[]>([])

    useEffect(() => {
        const fetchDon = async () => {
            if (!params.donsID) return

            const res = await fetch(
                `http://localhost:3000/api/dons/${params.donsID}`
            )

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const don : DonID[] = await res.json()
            setDon(don)
        }

        fetchDon()
    }, [params.donsID])
    if (!don || don.length===0) return <div>Loading...</div>

    return (
        <div>
            <h1>don</h1>
            <p>{don[0].code_Don}</p>
            <p>{don[0].raison_sociale}</p>
            <p>{don[0].date_proposition_don==null ? "" : don[0].date_proposition_don.toString().split("T")[0]}</p>
            <p>{don[0].contact_entite_donatrice}</p>
            <p>{don[0].TD_libelle}</p>
            <p>{don[0].TC_libelle}</p>
            <p>{don[0].TP_libelle}</p>
            <p>{don[0].MCP_libelle}</p>
            <p>{don[0].date_debut_mise_disposition==null ? "" : don[0].date_debut_mise_disposition.toString().split("T")[0]}</p>
            <p>{don[0].date_fin_mise_disposition==null ? "" : don[0].date_fin_mise_disposition.toString().split("T")[0]}</p>
            <p>{don[0].commentaires}</p>
            <p>{don[0].Utilisateur_saisie_don}</p>
            <p>{don[0].statut_acceptation_don}</p>
            <p>{don[0].date_acceptation_refus_don==null ? "" : don[0].date_acceptation_refus_don.toString().split("T")[0]}</p>
            <p>{don[0].type_date_acceptation_refus}</p>
            <p>{don[0].Utilisateur_accepte_refuse_don}</p>
            <p>{don[0].site}</p>
            <p>{don[0].indicateur_remerciement}</p>
            <p>{don[0].date_remerciement==null ? "" : don[0].date_remerciement.toString().split("T")[0]}</p>
        </div>
    )
}
'use client'
import { useEffect, useState } from 'react'

interface PrestataireID {
    code_Prestataire: number
    TP_libelle: string
    raison_sociale: string
    nom_commercial: string
    Siren: string
    Siret: string
    telephone: string
    mail: string
    adresse: string
    civilite_contact_prestataire: string
    nom_contact_prestataire: string
    prenom_contact_prestataire: string
    telephone_contact_prestataire: string
    mail_contact_prestataire: string
    commentaires: string
    date_arret_activite_du_prestataire: Date
}

export default function PrestatairePage({ params }: { params: { prestataireID: string } }) {
    const [prestataire, setPrestataire] = useState<PrestataireID[]>([])

    useEffect(() => {
        const fetchPrestataire = async () => {
            if (!params.prestataireID) return

            const res = await fetch(
                `http://localhost:3000/api/prestataire/${params.prestataireID}`
            )

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const prestataire : PrestataireID[] = await res.json()
            setPrestataire(prestataire)
        }

        fetchPrestataire()
    }, [params.prestataireID])
    if (!prestataire || prestataire.length===0) return <div>Loading...</div>

    return (
        <div>
            <h1>prestataire</h1>
            <p>{prestataire[0].code_Prestataire}</p>
            <p>{prestataire[0].TP_libelle}</p>
            <p>{prestataire[0].raison_sociale}</p>
            <p>{prestataire[0].nom_commercial}</p>
            <p>{prestataire[0].Siren}</p>
            <p>{prestataire[0].Siret}</p>
            <p>{prestataire[0].telephone}</p>
            <p>{prestataire[0].mail}</p>
            <p>{prestataire[0].adresse}</p>
            <p>{prestataire[0].civilite_contact_prestataire}</p>
            <p>{prestataire[0].nom_contact_prestataire}</p>
            <p>{prestataire[0].prenom_contact_prestataire}</p>
            <p>{prestataire[0].telephone_contact_prestataire}</p>
            <p>{prestataire[0].mail_contact_prestataire}</p>
            <p>{prestataire[0].commentaires}</p>
            <p>{prestataire[0].date_arret_activite_du_prestataire==null ? "" : prestataire[0].date_arret_activite_du_prestataire.toString().split("T")[0]}</p>
        </div>
    )
}
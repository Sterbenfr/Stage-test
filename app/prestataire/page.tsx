'use client'
import { useEffect, useState } from 'react'

interface Prestataire {
    code_Prestataire: number
    code_type_de_Prestataire: string
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

export default function PrestatairesPage() {
    const [prestataires, setPrestataires] = useState<Prestataire[]>([])

    useEffect(() => {
        const fetchPrestataires = async () => {
            const res = await fetch('http://localhost:3000/api/prestataire')

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const prestataires: Prestataire[] = await res.json()
            setPrestataires(prestataires)
        }

        fetchPrestataires()
    }, [])

    return (
        <div>
            <h1>Prestataires</h1>
            {prestataires.map(Prestataire => (
                <div key={Prestataire.code_Prestataire}>
                    <h2>
                        {Prestataire.code_Prestataire} : {Prestataire.raison_sociale}
                    </h2>
                    <p>code_type_de_Prestataire: {Prestataire.code_type_de_Prestataire}</p>
                    <p>nom_commercial: {Prestataire.nom_commercial}</p>
                    <p>Siren: {Prestataire.Siren}</p>
                    <p>Siret: {Prestataire.Siret}</p>
                    <p>telephone: {Prestataire.telephone}</p>
                    <p>mail: {Prestataire.mail}</p>
                    <p>adresse: {Prestataire.adresse}</p>
                    <p>civilite_contact_prestataire: {Prestataire.civilite_contact_prestataire}</p>
                    <p>nom_contact_prestataire: {Prestataire.nom_contact_prestataire}</p>
                    <p>prenom_contact_prestataire: {Prestataire.prenom_contact_prestataire}</p>
                    <p>telephone_contact_prestataire: {Prestataire.telephone_contact_prestataire}</p>
                    <p>mail_contact_prestataire: {Prestataire.mail_contact_prestataire}</p>
                    <p>commentaires: {Prestataire.commentaires}</p>
                    <p>date_arret_activite_du_prestataire: {Prestataire.date_arret_activite_du_prestataire==null ? "" : Prestataire.date_arret_activite_du_prestataire.toString()}</p>
                </div>
            ))}
        </div>
    )
}

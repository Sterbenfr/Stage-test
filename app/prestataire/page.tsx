'use client'
import { useEffect, useState } from 'react'
import List from '../../components/list'

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
            <h1>Préstataires</h1>
            <List
                items={prestataires.map(prestataire => ({
                    value1: prestataire.raison_sociale.toString(),
                    value2: prestataire.Siren.toString(),
                    value3: prestataire.Siret.toString(),
                    value4: prestataire.telephone.toString(),
                    value5: prestataire.mail.toString(),
                    value6: prestataire.commentaires.toString(),
                }))}
            />
        </div>
    )
}

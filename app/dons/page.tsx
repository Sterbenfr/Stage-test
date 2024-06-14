'use client'
import { useEffect, useState } from 'react'
import List from '../../components/list'

interface Don {
    code_Don: number
    code_Entite_donatrice: number
    date_proposition_don: Date
    code_contact_Entite_donatrice: number
    code_type_don: string
    code_type_competences: string
    code_type_produits: string
    code_mode_conservation_produits: string
    date_debut_mise_disposition: Date
    date_fin_mise_disposition: Date
    commentaires: string
    pieces_associees: Blob
    code_Utilisateur_saisie_don: number
    statut_acceptation_don: string
    date_acceptation_refus_don: Date
    type_date_acceptation_refus: string
    code_Utilisateur_accepte_refuse_don: number
    code_site_beneficiaire_don: number
    indicateur_remerciement: string
    date_remerciement: Date
}

export default function DonsPage() {
    const [dons, setDons] = useState<Don[]>([])

    useEffect(() => {
        const fetchDons = async () => {
            const res = await fetch('http://localhost:3000/api/dons')

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const users: Don[] = await res.json()
            setDons(users)
        }

        fetchDons()
    }, [])

    return (
        <div>
            <h1>Dons</h1>
            <List
                items={dons.map(don => ({
                    value1: don.code_Don.toString(),
                    value2: don.code_Entite_donatrice.toString(),
                    value3: don.date_proposition_don.toString().split('T')[0],
                    value4: don.commentaires,
                    value5: don.statut_acceptation_don.toString(),
                }))}
            />
        </div>
    )
}

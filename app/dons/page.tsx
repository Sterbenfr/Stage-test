'use client'
import { useEffect, useState } from 'react'

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
            {dons.map(don => (
                <div key={don.code_Don}>
                    <h2>
                        {don.code_Don} : {don.code_Entite_donatrice}
                    </h2>
                    <p>date_proposition_don: {don.date_proposition_don.toString()}</p>
                    <p>code_contact_Entite_donatrice: {don.code_contact_Entite_donatrice}</p>
                    <p>code_type_don: {don.code_type_don}</p>
                    <p>code_type_competences: {don.code_type_competences}</p>
                    <p>code_type_produits: {don.code_type_produits}</p>
                    <p>code_mode_conservation_produits: {don.code_mode_conservation_produits}</p>
                    <p>date_debut_mise_disposition: {don.date_debut_mise_disposition.toString()}</p>
                    <p>date_fin_mise_disposition: {don.date_fin_mise_disposition.toString()}</p>
                    <p>commentaires: {don.commentaires}</p>
                    <p>code_Utilisateur_saisie_don: {don.code_Utilisateur_saisie_don}</p>
                    <p>statut_acceptation_don: {don.statut_acceptation_don}</p>
                    <p>date_acceptation_refus_don: {don.date_acceptation_refus_don.toString()}</p>
                    <p>type_date_acceptation_refus: {don.type_date_acceptation_refus}</p>
                    <p>code_Utilisateur_accepte_refuse_don: {don.code_Utilisateur_accepte_refuse_don}</p>
                    <p>code_site_beneficiaire_don: {don.code_site_beneficiaire_don}</p>
                </div>
            ))}
        </div>
    )
}

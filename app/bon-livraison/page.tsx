'use client'
import { useEffect, useState } from 'react'

interface BonLivraison {
    numero_BL: number
    code_Don: number
    code_type_livraison: string
    date_prevue_livraison: Date
    adresse_enlevement: string
    civilite_contact_enlevement: string
    nom_contact_enlevement: string
    prenom_contact_enlevement: string
    telephone_contact_enlevement: string
    mail_contact_enlevement: string
    code_Prestataire_transporteur: number
    adresse_livraison: string
    civilite_contact_livraison: string
    nom_contact_livraison: string
    prenom_contact_livraison: string
    telephone_contact_livraison: string
    mail_contact_livraison: string
    nombre_palette_prevu: number
    nombre_palettes_consignees_prevu: number
    nombre_cartons_prevu: number
    poids_prevu_kg: number
    produits_sur_palettes: string
    temperature_conserv_produits: number
    commentaires: string
    pieces_associees: Blob
}

export default function BonLivraisonPage() {
    const [BonLivraison, setBonLivraison] = useState<BonLivraison[]>([])

    useEffect(() => {
        const fetchBonLivraison = async () => {
            const res = await fetch('http://localhost:3000/api/bon-livraison')

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const BonLivraison: BonLivraison[] = await res.json()
            setBonLivraison(BonLivraison)
        }

        fetchBonLivraison()
    }, [])

    return (
        <div>
            <h1>Bon Livraison</h1>
            {BonLivraison.map(TypeBonLivraion => (
                <div key={TypeBonLivraion.numero_BL}>
                    <h2>{TypeBonLivraion.code_Don}</h2>
                    <h2>{TypeBonLivraion.code_type_livraison}</h2>
                    <h2>{TypeBonLivraion.date_prevue_livraison.toString()}</h2>
                    <h2>{TypeBonLivraion.adresse_enlevement}</h2>
                    <h2>{TypeBonLivraion.civilite_contact_enlevement}</h2>
                    <h2>{TypeBonLivraion.nom_contact_enlevement}</h2>
                    <h2>{TypeBonLivraion.prenom_contact_enlevement}</h2>
                    <h2>{TypeBonLivraion.telephone_contact_enlevement}</h2>
                    <h2>{TypeBonLivraion.mail_contact_enlevement}</h2>
                    <h2>{TypeBonLivraion.code_Prestataire_transporteur}</h2>
                    <h2>{TypeBonLivraion.adresse_livraison}</h2>
                    <h2>{TypeBonLivraion.civilite_contact_livraison}</h2>
                    <h2>{TypeBonLivraion.nom_contact_livraison}</h2>
                    <h2>{TypeBonLivraion.prenom_contact_livraison}</h2>
                    <h2>{TypeBonLivraion.telephone_contact_livraison}</h2>
                    <h2>{TypeBonLivraion.mail_contact_livraison}</h2>
                    <h2>{TypeBonLivraion.nombre_palette_prevu}</h2>
                    <h2>{TypeBonLivraion.nombre_palettes_consignees_prevu}</h2>
                    <h2>{TypeBonLivraion.nombre_cartons_prevu}</h2>
                    <h2>{TypeBonLivraion.poids_prevu_kg}</h2>
                    <h2>{TypeBonLivraion.produits_sur_palettes}</h2>
                    <h2>{TypeBonLivraion.temperature_conserv_produits}</h2>
                    <h2>{TypeBonLivraion.commentaires}</h2>
                    <img src='TypeBonLivraison.pieces_associees' alt='' />
                </div>
            ))}
        </div>
    )
}

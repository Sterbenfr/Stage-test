'use client'
import { useEffect, useState } from 'react'
import List from '../../../components/list'

interface BonLivraison {
    numero_livraison: number
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
    const [BonLivraisons, setBonLivraisons] = useState<BonLivraison[]>([])

    useEffect(() => {
        const fetchBonLivraison = async () => {
            const res = await fetch(
                'http://localhost:3000/api/dons/modalites-livraison',
            )

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const Bons: BonLivraison[] = await res.json()
            setBonLivraisons(Bons)
        }

        fetchBonLivraison()
    }, [])

    return (
        <div>
            <h1>Bons de Livraisons</h1>
            <List
                items={BonLivraisons.map(BonLivraison => ({
                    value1: BonLivraison.numero_livraison.toString(),
                    value2: BonLivraison.date_prevue_livraison
                        .toString()
                        .split('T')[0],
                    value3: BonLivraison.adresse_enlevement.toString(),
                    value4: BonLivraison.nom_contact_enlevement.toString(),
                    value5: BonLivraison.telephone_contact_enlevement.toString(),
                    value6: BonLivraison.mail_contact_enlevement.toString(),
                }))}
            />
        </div>
    )
}

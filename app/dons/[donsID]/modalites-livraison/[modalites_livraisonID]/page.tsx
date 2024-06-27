'use client'
import { useEffect, useState } from 'react'

interface modalite_livraisonID {
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
export default function Modalites_livraisonPage({
    params,
}: {
    params: { donsID: string; modalites_livraisonID: string }
}) {
    const [modalite_livraison, setModalites_livraison] = useState<
        modalite_livraisonID[]
    >([])

    useEffect(() => {
        const fetchModalites_livraison = async () => {
            if (!params.modalites_livraisonID) return

            const res = await fetch(
                `http://localhost:3000/api/dons/${params.donsID}/modalites-livraison/${params.modalites_livraisonID}`,
            )

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const modalite_livraison: modalite_livraisonID[] = await res.json()
            setModalites_livraison(modalite_livraison)
        }

        fetchModalites_livraison()
    }, [params.modalites_livraisonID, params.donsID])
    if (!modalite_livraison || modalite_livraison.length === 0)
        return <div>Loading...</div>

    return (
        <div>
            <h1>modalites-livraison</h1>
            <p>{modalite_livraison[0].numero_livraison}</p>
            <p>{modalite_livraison[0].code_Don}</p>
            <p>{modalite_livraison[0].code_type_livraison}</p>
            <p>
                {
                    modalite_livraison[0].date_prevue_livraison
                        .toString()
                        .split('T')[0]
                }
            </p>
            <p>{modalite_livraison[0].prenom_contact_enlevement}</p>
            <p>{modalite_livraison[0].telephone_contact_enlevement}</p>
            <p>{modalite_livraison[0].mail_contact_enlevement}</p>
            <p>{modalite_livraison[0].adresse_enlevement}</p>
            <p>{modalite_livraison[0].adresse_livraison}</p>
            <p>{modalite_livraison[0].nombre_palette_prevu}</p>
            <p>{modalite_livraison[0].nombre_palettes_consignees_prevu}</p>
            <p>{modalite_livraison[0].nombre_cartons_prevu}</p>
        </div>
    )
}

'use client'
import { useEffect, useState } from 'react'

interface Entite {
    code_entite : number
    raison_sociale : string
    nom_commercial : string
    logo : Blob
    siret : string
    code_ape : string
    code_rna : string
    code_societe_appartenance : number
    adresse : string
    telephone : string
    mail : string
    site_internet : string
    commentaires : string
    code_type_entite : string
    code_type_don : string
    code_type_produit : string
    code_type_competence : string
    commentaires_logistique : string
    presence_quai : string
    pieces_associees : Blob
    cerfa : string
    code_frequence_cerfa : string
    date_arret_activite : string
}

export default function EntitesPage() {
    const [Entite, setEntite] = useState<Entite[]>([])

    useEffect(() => {
        const fetchEntite = async () => {
            const res = await fetch('http://localhost:3000/api/table-entite')

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const Entites: Entite[] = await res.json()
            setEntite(Entites)
        }

        fetchEntite()
    }, [])

    return (
        <div>
            <h1>Table des Entités</h1>
            {Entite.map(Entite => (
                <div key={Entite.code_entite}>
                    <p>Code Propecteur: {Entite.code_entite}</p>
                    <p>Code Entité: {Entite.raison_sociale}</p>
                    <p>Commentaires: {Entite.nom_commercial}</p>
                    <img src="{Entite.logo}" alt="logo"/>
                    <p>Date Arrêt Affectation: {Entite.code_ape}</p>
                    <p>Date Arrêt Affectation: {Entite.code_rna}</p>
                    <p>Date Arrêt Affectation: {Entite.code_societe_appartenance}</p>
                    <p>Date Arrêt Affectation: {Entite.adresse}</p>
                    <p>Date Arrêt Affectation: {Entite.telephone}</p>
                    <p>Date Arrêt Affectation: {Entite.mail}</p>
                    <p>Date Arrêt Affectation: {Entite.site_internet}</p>
                    <p>Date Arrêt Affectation: {Entite.commentaires}</p>
                    <p>Date Arrêt Affectation: {Entite.code_type_entite}</p>
                    <p>Date Arrêt Affectation: {Entite.code_type_produit}</p>
                    <p>Date Arrêt Affectation: {Entite.code_type_competence}</p>
                    <p>Date Arrêt Affectation: {Entite.commentaires_logistique}</p>
                    <p>Date Arrêt Affectation: {Entite.presence_quai}</p>
                    <img src="{Entite.pieces_associees}" alt="pieces_associees"/>
                    <p>Date Arrêt Affectation: {Entite.cerfa}</p>
                    <p>Date Arrêt Affectation: {Entite.code_frequence_cerfa}</p>
                    <p>Date Arrêt Affectation: {Entite.date_arret_activite}</p>
                </div>
            ))}
        </div>
    )
}
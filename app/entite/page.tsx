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
    code_cee: string
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
            const res = await fetch('http://localhost:3000/api/entite')

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
                    <p>Code APE: {Entite.code_ape}</p>
                    <p>Code RNA: {Entite.code_rna}</p>
                    <p>Code CEE: {Entite.code_cee}</p>
                    <p>code_societe_appartenance: {Entite.code_societe_appartenance}</p>
                    <p>adresse: {Entite.adresse}</p>
                    <p>telephone: {Entite.telephone}</p>
                    <p>mail: {Entite.mail}</p>
                    <p>site_internet: {Entite.site_internet}</p>
                    <p>commentaires: {Entite.commentaires}</p>
                    <p>code_type_entite: {Entite.code_type_entite}</p>
                    <p>code_type_produit: {Entite.code_type_produit}</p>
                    <p>code_type_competence: {Entite.code_type_competence}</p>
                    <p>commentaires_logistique: {Entite.commentaires_logistique}</p>
                    <p>presence_quai: {Entite.presence_quai}</p>
                    <img src="{Entite.pieces_associees}" alt="pieces_associees"/>
                    <p>cerfa: {Entite.cerfa}</p>
                    <p>code_frequence_cerfa: {Entite.code_frequence_cerfa}</p>
                    <p>date_arret_activite: {Entite.date_arret_activite}</p>
                </div>
            ))}
        </div>
    )
}
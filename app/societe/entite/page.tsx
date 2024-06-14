'use client'
import { useEffect, useState } from 'react'
import List from  '../../../components/list'

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
    const [Entites, setEntite] = useState<Entite[]>([])

    useEffect(() => {
        const fetchEntite = async () => {
            const res = await fetch('http://localhost:3000/api/societe/entite')

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
            <h1>Entités</h1>
            <List items={Entites.map(entite => ({
                value1: entite.code_entite.toString(),
                value2: entite.raison_sociale,
                value3: entite.telephone,
                value4: entite.mail,
                value5: entite.site_internet,
                value6: entite.date_arret_activite==null ? "" : entite.date_arret_activite.toString().split("T")[0]
            }))} />
        </div>
    )
}
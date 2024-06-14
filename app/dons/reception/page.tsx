'use client'
import { useEffect, useState } from 'react'

interface Reception {
    numero_reception : number
    code_Don : number
    numero_BL : number
    date_reception : Date
    heure_reception : string
    nombre_palettes_recues : number
    nombre_palettes_consignees_recues : number
    nombre_palettes_consignees_rendues : number
    nombre_cartons_recus : number
    poids_recu_kg : number
    produits_sur_palettes : string
    commentaires : string
    pieces_associees : Blob
}

export default function ReceptionsPage() {
    const [Reception, setReception] = useState<Reception[]>([])

    useEffect(() => {
        const fetchReception = async () => {
            const res = await fetch('http://localhost:3000/api/dons/reception')

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const Entites: Reception[] = await res.json()
            setReception(Entites)
        }

        fetchReception()
    }, [])

    return (
        <div>
            <h1>Table de Réception</h1>
            {Reception.map(Reception => (
                <div key={Reception.numero_reception}>
                    <p>Code Propecteur: {Reception.numero_reception}</p>
                    <p>Code Entité: {Reception.code_Don}</p>
                    <p>Commentaires: {Reception.numero_BL}</p>
                    <p>Date Arrêt Affectation: {Reception.date_reception.toString()}</p>
                    <p>Date Arrêt Affectation: {Reception.heure_reception}</p>
                    <p>Date Arrêt Affectation: {Reception.nombre_palettes_recues}</p>
                    <p>Date Arrêt Affectation: {Reception.nombre_palettes_consignees_recues}</p>
                    <p>Date Arrêt Affectation: {Reception.nombre_palettes_consignees_rendues}</p>
                    <p>Date Arrêt Affectation: {Reception.nombre_cartons_recus}</p>
                    <p>Date Arrêt Affectation: {Reception.poids_recu_kg}</p>
                    <p>Date Arrêt Affectation: {Reception.produits_sur_palettes}</p>
                    <p>Date Arrêt Affectation: {Reception.commentaires}</p>
                    <img src="{Reception.pieces_associees}" alt="pieces_associees"/>
                </div>
            ))}
        </div>
    )
}
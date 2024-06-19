'use client'
import { useEffect, useState } from 'react'

interface ReceptionID {
    numero_reception: number
    code_Don: number
    numero_BL: number
    date_reception: Date
    heure_reception: string
    nombre_palettes_recues: number
    nombre_palettes_consignees_recues: number
    nombre_palettes_consignees_rendues: number
    nombre_cartons_recus: number
    poids_recu_kg: number
    produits_sur_palettes: string
    commentaires: string
    pieces_associees: Blob
}

export default function ReceptionPage({
    params,
}: {
    params: { donsID: string; receptionID: string }
}) {
    const [reception, setReception] = useState<ReceptionID[]>([])

    useEffect(() => {
        const fetchReception = async () => {
            if (!params.receptionID) return

            const res = await fetch(
                `http://localhost:3000/api/dons/${params.donsID}/reception/${params.receptionID}`,
            )

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const reception: ReceptionID[] = await res.json()
            setReception(reception)
        }

        fetchReception()
    }, [params.receptionID, params.donsID])
    if (!reception || reception.length === 0) return <div>Loading...</div>

    return (
        <div>
            <h1>reception</h1>
            <p>{reception[0].numero_reception}</p>
            <p>{reception[0].code_Don}</p>
            <p>{reception[0].numero_BL}</p>
            <p>
                {reception[0].date_reception == null
                    ? ''
                    : reception[0].date_reception.toString().split('T')[0]}
            </p>
            <p>{reception[0].heure_reception}</p>
            <p>{reception[0].nombre_palettes_recues}</p>
            <p>{reception[0].nombre_palettes_consignees_recues}</p>
            <p>{reception[0].nombre_palettes_consignees_rendues}</p>
            <p>{reception[0].nombre_cartons_recus}</p>
            <p>{reception[0].poids_recu_kg}</p>
            <p>{reception[0].produits_sur_palettes}</p>
            <p>{reception[0].commentaires}</p>
        </div>
    )
}

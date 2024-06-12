'use client'
import { useEffect, useState } from 'react'

interface Mode_Conservation_Produits {
    code_type_mode_conservation_produits: string
    libelle: string
}

export default function Mode_Conservations_ProduitsPage() {
    const [Mode_Conservations_Produits, setMode_Conservations_Produits] = useState<Mode_Conservation_Produits[]>([])

    useEffect(() => {
        const fetchMode_Conservations_Produits = async () => {
            const res = await fetch(
                'http://localhost:3000/api/type-mode-conservations-produits',
            )

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const Mode_Conservations_Produits: Mode_Conservation_Produits[] = await res.json()
            setMode_Conservations_Produits(Mode_Conservations_Produits)
        }

        fetchMode_Conservations_Produits()
    }, [])

    return (
        <div>
            <h1>Mode Conservation Produits</h1>
            {Mode_Conservations_Produits.map(ModeConservationProduits => (
                <div key={ModeConservationProduits.code_type_mode_conservation_produits}>
                    <h2>{ModeConservationProduits.libelle}</h2>
                    <h2>{ModeConservationProduits.code_type_mode_conservation_produits}</h2>
                </div>
            ))}
        </div>
    )
}

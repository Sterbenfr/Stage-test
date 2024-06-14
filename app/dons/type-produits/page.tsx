'use client'
import { useEffect, useState } from 'react'

interface Produit {
    code_type_produits: string
    libelle: string
}

export default function ProduitsPage() {
    const [Produits, setProduits] = useState<Produit[]>([])

    useEffect(() => {
        const fetchProduits = async () => {
            const res = await fetch(
                'http://localhost:3000/api/type-produits',
            )

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const Produits: Produit[] = await res.json()
            setProduits(Produits)
        }

        fetchProduits()
    }, [])

    return (
        <div>
            <h1>Types Produits</h1>
            {Produits.map(TypesProduits => (
                <div key={TypesProduits.code_type_produits}>
                    <h2>{TypesProduits.libelle}</h2>
                    <h2>{TypesProduits.code_type_produits}</h2>
                </div>
            ))}
        </div>
    )
}

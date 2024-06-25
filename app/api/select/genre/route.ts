import { NextResponse } from 'next/server'

enum StatutGenre {
    Madame = 'Madame',
    Monsieur = 'Monsieur',
    Autre = 'Autre',
}

export async function GET() {
    try {
        const statuts = [
            { id: 'Madame', label: StatutGenre.Madame },
            { id: 'Monsieur', label: StatutGenre.Monsieur },
            { id: 'Autre', label: StatutGenre.Autre },
        ]

        return NextResponse.json(statuts)
    } catch (err) {
        console.log(err)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        )
    }
}

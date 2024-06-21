import { NextResponse } from 'next/server'

enum StatutAcceptationDon {
    Valide = "valide",
    Refuse = "refusé",
    Attente = "en attente",
  }

export async function GET() {
    try {
        const statuts = [
            { id: "B", label: StatutAcceptationDon.Attente },
            { id: "V", label: StatutAcceptationDon.Valide },
            { id: "R", label: StatutAcceptationDon.Refuse },
        ];

        return NextResponse.json(statuts);
    } catch (err) {
        console.log(err)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        )
    }
}
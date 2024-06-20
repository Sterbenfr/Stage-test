import { NextResponse } from 'next/server'
import pool from '../../../../../../utils/db'

export async function GET(
    request: Request,
    { params }: { params: { siteID : string, utilisateurID: string } },
) {
    const utilisateurID = params.utilisateurID
    const siteID = params.siteID
    try {
        const [rows] = await pool.query(
            'SELECT * FROM Utilisateurs WHERE code_utilisateur = ?;',
            [utilisateurID],
        )
        return NextResponse.json(rows)
    } catch (err) {
        console.log(err)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        )
    }
}

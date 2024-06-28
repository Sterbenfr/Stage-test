import { NextResponse } from 'next/server'
import pool from '../../../../../../utils/db'
import { NextApiRequest } from 'next'

export async function GET(
    request: Request,
    { params }: { params: { siteID: string; utilisateurID: string } },
) {
    const utilisateurID = params.utilisateurID
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

export async function DELETE(
    req: NextApiRequest,
    { params }: { params: { siteID: string; utilisateurID: string } },
) {
    const utilisateurID = params.utilisateurID
    if (utilisateurID === undefined) {
        return NextResponse.json({ error: 'Bad ID' }, { status: 400 })
    }

    try {
        const query = 'DELETE FROM `utilisateurs` WHERE `code_utilisateur` = ?'
        const [rows] = await pool.query(query, utilisateurID)
        return NextResponse.json(rows)
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        )
    }
}

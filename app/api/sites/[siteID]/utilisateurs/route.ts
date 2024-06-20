import { NextResponse } from 'next/server'
import pool from '../../../../../utils/db'

type CountResult = { count: number }[]

export async function GET(request: Request, params: { siteID: string }) {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || '1'
    const limit = searchParams.get('limit') || '10'
    const siteID = params.siteID;

    try {
        const pageNumber = Number(page)
        const limitNumber = Number(limit)
        const offset = (pageNumber - 1) * limitNumber

        const [rows] = await pool.query(
            'SELECT * FROM `Utilisateurs` LEFT JOIN SitesRattachement ON Utilisateurs.code_utilisateur = SitesRattachement.code_utilisateur WHERE SitesRattachement.code_site = ? LIMIT ?, ?',
            [offset, limitNumber],
        )

        const [totalResult] = await pool.query(
            'SELECT COUNT(*) as count FROM `Utilisateurs`',
        )

        const total = totalResult as CountResult

        return NextResponse.json({ data: rows, total: total[0].count })
    } catch (err) {
        console.error(err)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        )
    }
}

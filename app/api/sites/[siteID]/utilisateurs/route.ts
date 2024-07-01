import { NextResponse } from 'next/server'
import pool from '../../../../../utils/db'
import { NextApiRequest } from 'next'
import { streamToString } from '../../../../../utils/streamUtils'
import type { Utilisateurs } from '@/app/sites/[siteID]/utilisateurs/page'

type CountResult = { count: number }[]

export async function GET(
    request: Request,
    { params }: { params: { siteID: string; utilisateurID: string } },
) {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || '1'
    const limit = searchParams.get('limit') || '10'
    const siteID = params.siteID

    try {
        const pageNumber = Number(page)
        const limitNumber = Number(limit)
        const offset = (pageNumber - 1) * limitNumber

        const [rows] = await pool.query(
            'SELECT * FROM `Utilisateurs` LEFT JOIN SitesRattachement ON Utilisateurs.code_utilisateur = SitesRattachement.code_utilisateur WHERE SitesRattachement.code_site = ? LIMIT ?, ?',
            [siteID, offset, limitNumber],
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
export async function POST(req: NextApiRequest) {
    let Utilisateur: Utilisateurs
    try {
        Utilisateur = JSON.parse(await streamToString(req.body))
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    if (
        !Utilisateur.civilite ||
        !Utilisateur.nom ||
        !Utilisateur.prenom ||
        !Utilisateur.password ||
        !Utilisateur.code_type_utilisateur
    ) {
        return NextResponse.json(
            { error: 'Missing product data' },
            { status: 400 },
        )
    }
    try {
        const query = 'INSERT INTO `Utilisateurs` SET ?'
        const [rows] = await pool.query(query, Utilisateur)
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}

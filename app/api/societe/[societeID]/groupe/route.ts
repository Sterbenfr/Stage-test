import { NextResponse } from 'next/server'
import pool from '../../../../../utils/db'

type CountResult = { count: number }[]

export async function GET(request: Request,{
    params,
}: {
    params: { societeID: string }
}) {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || '1'
    const limit = searchParams.get('limit') || '10'
    const societeID = params.societeID

    try {
        const pageNumber = Number(page)
        const limitNumber = Number(limit)
        const offset = (pageNumber - 1) * limitNumber

        const [rows] = await pool.query('SELECT * FROM `groupe` LEFT JOIN ON Groupe.code_Groupe = Societe.code_Groupe_appartenance WHERE Societe.code_Societe = ? LIMIT ?, ?', [
            offset,
            limitNumber,
        ])

        const [totalResult] = await pool.query(
            'SELECT COUNT(*) as count FROM `groupe` LEFT JOIN ON Groupe.code_Groupe = Societe.code_Groupe_appartenance WHERE Societe.code_Societe = ?',
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

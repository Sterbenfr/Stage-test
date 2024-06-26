import { NextResponse } from 'next/server'
import pool from '../../../../../../../utils/db'

type CountResult = { count: number }[]

export async function GET(
    request: Request,
    {
        params,
    }: {
        params: { entiteID: string }
    },
) {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || '1'
    const limit = searchParams.get('limit') || '10'
    const entiteID = params.entiteID

    try {
        const pageNumber = Number(page)
        const limitNumber = Number(limit)
        const offset = (pageNumber - 1) * limitNumber

        const [rows] = await pool.query(
            'SELECT * FROM `contacts` WHERE code_entite = ? LIMIT ?, ?',
            [entiteID, offset, limitNumber],
        )

        const [totalResult] = await pool.query(
            'SELECT COUNT(*) as count FROM `contacts` WHERE code_entite = ?',
            [entiteID],
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

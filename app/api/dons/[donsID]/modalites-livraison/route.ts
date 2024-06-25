import { NextResponse } from 'next/server'
import pool from '../../../../../utils/db'

type CountResult = { count: number }[]

export async function GET(
    request: Request,
    { params }: { params: { donsID: string } },
) {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || '1'
    const limit = searchParams.get('limit') || '10'
    const donsID = params.donsID

    try {
        const pageNumber = Number(page)
        const limitNumber = Number(limit)
        const offset = (pageNumber - 1) * limitNumber

        const [rows] = await pool.query(
            'SELECT * FROM `ModalitesLivraison` WHERE code_Don = ? LIMIT ?, ?',
            [donsID, offset, limitNumber],
        )

        const [totalResult] = await pool.query(
            'SELECT COUNT(*) as count FROM `ModalitesLivraison` WHERE code_Don = ?',
            [donsID],
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

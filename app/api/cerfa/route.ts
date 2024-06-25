import { NextResponse } from 'next/server'
import pool from '../../../utils/db'
import { NextApiRequest } from 'next'
import { streamToString } from '../../../utils/streamUtils'
import type { Cerfa } from '@/app/cerfa/page'

type CountResult = { count: number }[]

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || '1'
    const limit = searchParams.get('limit') || '10'

    try {
        const pageNumber = Number(page)
        const limitNumber = Number(limit)
        const offset = (pageNumber - 1) * limitNumber

        const [rows] = await pool.query('SELECT * FROM `cerfa` LIMIT ?, ?', [
            offset,
            limitNumber,
        ])

        const [totalResult] = await pool.query(
            'SELECT COUNT(*) as count FROM `cerfa`',
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
    let Cerfas: Cerfa
    try {
        Cerfas = JSON.parse(await streamToString(req.body))
        console.log(Cerfas)
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    if (!Cerfas.code_Don || !Cerfas.date_realisation_Cerfa) {
        console.log('Cerfa:' + Cerfas.code_Don + Cerfas.date_realisation_Cerfa)
        return NextResponse.json(
            { error: 'Missing product data' },
            { status: 400 },
        )
    }

    try {
        const query = 'INSERT INTO `cerfa` SET ?'
        const [rows] = await pool.query(query, Cerfas)
        return NextResponse.json(rows)
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        )
    }
}

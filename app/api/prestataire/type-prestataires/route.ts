import { NextResponse } from 'next/server'
import pool from '../../../../utils/db'
import { NextApiRequest } from 'next'
import { streamToString } from '../../../../utils/streamUtils'
import type { Prestataire } from '@/app/prestataire/type-prestataires/page'

export async function GET() {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM `TypePrestataires` LIMIT 1000',
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
export async function POST(req: NextApiRequest) {
    let TypePrestataires: Prestataire
    try {
        TypePrestataires = JSON.parse(await streamToString(req.body))
        console.log(TypePrestataires)
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    if (!TypePrestataires.libelle) {
        console.log('TypePrestataires:' + TypePrestataires.libelle)
        return NextResponse.json(
            { error: 'Missing product data' },
            { status: 400 },
        )
    }

    try {
        const query = 'INSERT INTO `TypePrestataires` SET ?'
        const [rows] = await pool.query(query, TypePrestataires)
        return NextResponse.json(rows)
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        )
    }
}

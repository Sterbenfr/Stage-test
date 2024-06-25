import { NextResponse } from 'next/server'
import pool from '../../../../../../utils/db'
import { NextApiRequest } from 'next'
import { streamToString } from '../../../../../../utils/streamUtils'
import type { Type_Livraison } from '@/app/dons/[donsID]/modalites-livraison/type-livraison/page'

export async function GET() {
    try {
        const [rows] = await pool.query(
            'SELECT code_type_livraison as id, libelle as label FROM `typelivraison` LIMIT 1000',
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
    let typesLivraison: Type_Livraison
    try {
        typesLivraison = JSON.parse(await streamToString(req.body))
        console.log(typesLivraison)
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    if (
        !typesLivraison.id ||
        !typesLivraison.label
    ) {
        console.log(
            'Types Livraison:' +
            typesLivraison.id +
            typesLivraison.label,
        )
        return NextResponse.json(
            { error: 'Missing product data' },
            { status: 400 },
        )
    }

    try {
        const query = 'INSERT INTO `TypeLivraison` SET ?'
        const [rows] = await pool.query(query, typesLivraison)
        return NextResponse.json(rows)
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        )
    }
}
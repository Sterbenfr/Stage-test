import { NextResponse } from 'next/server'
import pool from '../../../../utils/db'
import { NextApiRequest } from 'next'
import { streamToString } from '../../../../utils/streamUtils'
import type { Modalite_Interactions } from '@/app/interaction/type-modalite-interactions/page'

export async function GET() {
    try {
        const [rows] = await pool.query(
            'SELECT code_modalite_interaction as id, libelle as label FROM `ModaliteInteractions` LIMIT 1000',
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
    let code_modalite_interaction: Modalite_Interactions
    try {
        code_modalite_interaction = JSON.parse(await streamToString(req.body))
        console.log(code_modalite_interaction)
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    if (!code_modalite_interaction.libelle) {
        console.log(
            'code_modalite_interaction:' + code_modalite_interaction.libelle,
        )
        return NextResponse.json(
            { error: 'Missing product data' },
            { status: 400 },
        )
    }

    try {
        const query = 'INSERT INTO `ModaliteInteractions` SET ?'
        const [rows] = await pool.query(query, code_modalite_interaction)
        return NextResponse.json(rows)
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        )
    }
}

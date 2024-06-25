import { NextResponse } from 'next/server'
import pool from '../../../../../../utils/db'
import { NextApiRequest } from 'next'
import { streamToString } from '../../../../../../utils/streamUtils'
import type { type_utilisateur } from '@/app/sites/[siteID]/utilisateurs/type-utilisateurs/page'

export async function GET() {
    try {
        const [rows] = await pool.query(
            'SELECT code_type_utilisateur as id, libelle as label FROM `typesutilisateurs` LIMIT 1000',
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
    let TypesUtilisateurs: type_utilisateur
    try {
        TypesUtilisateurs = JSON.parse(await streamToString(req.body))
        console.log(TypesUtilisateurs)
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    if (!TypesUtilisateurs.label) {
        console.log('TypesUtilisateurs:' + TypesUtilisateurs.label)
        return NextResponse.json(
            { error: 'Missing product data' },
            { status: 400 },
        )
    }

    try {
        const query = 'INSERT INTO `TypesUtilisateurs` SET ?'
        const [rows] = await pool.query(query, TypesUtilisateurs)
        return NextResponse.json(rows)
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        )
    }
}

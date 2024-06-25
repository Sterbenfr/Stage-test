import { NextResponse } from 'next/server'
import pool from '../../../../utils/db'

export async function GET() {
    try {
        const [rows] = await pool.query(
            'Select code_type_utilisateur as id, libelle as label FROM TypesUtilisateurs;',
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

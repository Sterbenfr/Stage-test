import { NextResponse } from 'next/server'
import pool from '../../../../../../../utils/db'

export async function GET(params: { entiteID: string }) {
    console.log('LA FAMILLLLLE')
    console.log(params.entiteID)
    try {
        const [rows] = await pool.query(
            `Select code_contact as id, CONCAT(nom,' ', prenom) as label from Contacts WHERE code_entite = ?;`,[params.entiteID]
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

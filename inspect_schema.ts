
import { createClient } from '@supabase/supabase-js'
// @ts-ignore
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase credentials')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function inspect() {
    console.log('Fetching one post to inspect schema...')
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .limit(1)
        .single()

    if (error) {
        console.error('Error fetching post:', error)
        // If table is empty, try to get column names via an empty select
        const { data: cols, error: colError } = await supabase
            .from('posts')
            .select('*')
            .limit(0)
        if (colError) {
            console.error('Could not even get columns:', colError)
        } else {
            console.log('Empty table, but we might see column names in a multi-select if PostgREST allows.')
        }
    } else {
        console.log('Post found! Inspection results:')
        console.log('Keys:', Object.keys(data))
        for (const key of Object.keys(data)) {
            console.log(`${key}: type=${typeof data[key]}, value=${data[key]}`)
        }
    }
}

inspect()


const fs = require('fs');
const https = require('https');

async function main() {
    const env = fs.readFileSync('.env.local', 'utf8');
    const url = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim();
    const key = env.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/)[1].trim();

    const hostname = url.replace('https://', '');
    const path = '/rest/v1/posts?limit=1';

    const options = {
        hostname: hostname,
        port: 443,
        path: path,
        method: 'GET',
        headers: {
            'apikey': key,
            'Authorization': 'Bearer ' + key
        }
    };

    const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
            console.log('STATUS:', res.statusCode);
            console.log('BODY:', data);
        });
    });

    req.on('error', (e) => {
        console.error('ERROR:', e);
    });
    req.end();
}

main();

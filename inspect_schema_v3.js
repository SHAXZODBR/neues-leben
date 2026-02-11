
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
            try {
                const json = JSON.parse(data);
                if (json.length > 0) {
                    console.log('--SCHEMA START--');
                    Object.keys(json[0]).forEach(k => console.log(k));
                    console.log('--SCHEMA END--');
                } else {
                    console.log('Table is empty.');
                }
            } catch (e) {
                console.log('ERROR:', data);
            }
        });
    });

    req.on('error', (e) => {
        console.error('HTTPS ERROR:', e);
    });
    req.end();
}

main();

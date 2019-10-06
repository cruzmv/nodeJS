'use strict';

var http = require('http');
var server = http.createServer();
server.on('request', async (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    if(req.url == '/webservice/google'){
        const data = await googleQuery();
        res.end(JSON.stringify(data));
    } else if (req.url == '/webservice/pgsql'){
        const data = await pgsql();
        res.end(JSON.stringify(data));
    } else {
        res.end(req.url);
    }
}).listen(5001);


function googleQuery() {
    return new Promise(resolve => {
        const {BigQuery} = require('@google-cloud/bigquery');    
        const options = {
            keyFilename: 'D:/git/nodejs/webservice/database-140419-be91503d4137.json',
            projectId: 'database-140419',
        };
        const bigquery = new BigQuery(options);
        async function query(){
            const query = "SELECT ID,RAZAO FROM `database-140419.onys_erp.onys_xhb` ";
          
            const options = {
                query: query,
                location: 'US',
            };        
    
            const [job] = await bigquery.createQueryJob(options);
            console.log(`Job ${job.id} started.`);
    
            const [rows] = await job.getQueryResults();
            resolve( rows );

        }
        query();

    });
}


function pgsql(){
    return new Promise(resolve => {
        const { Pool } = require('pg')
        const pool = new Pool({
            user: 'onysahos_onyss',
            host: 'onys.a2hosted.com',
            database: 'onysahos_onys',
            password: 'pgsql!142536',
            port: 5432,
        })

        pool.query('SELECT * from onis_xhb', (err, res) => {
            pool.end();
            if(err != undefined){
                resolve(err.stack);
            }else{
                resolve(res.rows);
            }
            
        });
    })
}
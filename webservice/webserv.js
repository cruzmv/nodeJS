'use strict';

var http = require('http');
var server = http.createServer();
server.on('request', async (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    if(req.url == '/webservice/pesq'){
        const data = await someAsyncFunc();
        res.end(JSON.stringify(data));
    } else {
        res.end(req.url);
    }
}).listen(5001);


function someAsyncFunc() {
    return new Promise(resolve => {
        const {BigQuery} = require('@google-cloud/bigquery');    
        const options = {
            keyFilename: './google/database-140419-be91503d4137.json',
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
            resolve( JSON.stringify(rows) );
        }
        query();
    });
}

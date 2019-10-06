//npm install @google-cloud/bigquery
// npm i node-fetch
// npm init
// npm install express --save
// npm install pg
/*
'use strict';
var express = require('express'),
app = express(),
port = process.env.PORT || 8080;
app.listen(port);
//app.get('/', function(req, res) { res.json(   {hello : 'world'}   );})
*/

//app.get('/', function(req, res) { res.json(   {host : req.host, hostName: req.hostname, ip: req.ip, url: req.url}   );})

/*
app.get('/pesq', function(req, res) {
     //res.json({hello : 'world'});

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
         //console.log(`Job ${job.id} started.`);
         const [rows] = await job.getQueryResults();
         //console.log('Rows:');
         //rows.forEach(row => console.log(row));
         var jRet ={}
         for(var i=0; i< rows.length; i++){
             jRet['index'] = i;
             jRet['id'] = rows[i].ID;
             jRet['razao'] = rows[i].RAZAO;
         }
 
         //retJson = jRet;
         //return JSON.stringify(retJson)
         res.json(jRet);
     }
     query()
     //return('Calma!');
})
*/
//console.log('Message RESTful API server started on: ' + port);

/*
var retJson = {};

var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  if(req.url == '/pesq'){
    res.write(Pesq_onys_xhb());
  } else {
    res.write(req.url);
  }
  res.end();
}).listen(5001);



function Pesq_onys_xhb(){
    
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
        //console.log(`Job ${job.id} started.`);
        const [rows] = await job.getQueryResults();
        //console.log('Rows:');
        //rows.forEach(row => console.log(row));
        var jRet ={}
        for(var i=0; i< rows.length; i++){
            jRet['index'] = i;
            jRet['id'] = rows[i].ID;
            jRet['razao'] = rows[i].RAZAO;
        }

        retJson = jRet;
        return JSON.stringify(retJson)
    }
    query()
    return('Calma!');
}
*/


'use strict';

function main(){
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

        console.log('Rows:');
        rows.forEach(row => console.log(row));
    }
    query();
}

main();



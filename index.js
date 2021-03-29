const igbot = require('./instagrambot');

(async() =>{
    await igbot.init();

    await igbot.login("<YOUR_ISTAGRAM_ID>","<YOUR_INSTAGRAM_PASSWORD>");

    for(let i = 1; i > 0; i++){
        await igbot.likeproses("cars");
    }
    

    debugger;

})();
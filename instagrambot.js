const pptr = require('puppeteer');

const instagram = {
    browser: null,
    page: null,

    init: async () => {
        instagram.browser = await pptr.launch({ headless: false });
        instagram.page = await instagram.browser.newPage();

        await instagram.page.goto("https://instagram.com/", {waitUntil: 'networkidle2'});
    },

    login: async (username,password) => {
        await instagram.page.type('input[name="username"]', username, {delay: 50});
        await instagram.page.type('input[name="password"]', password, {delay: 50});

        const loginBtn = "#loginForm > div > div:nth-child(3) > button";
        await instagram.page.click(loginBtn);
        await instagram.page.waitForNavigation();
    },

    likeproses: async( hastag ) => {
        await instagram.page.goto(`https://www.instagram.com/explore/tags/${hastag}`);
        await instagram.page.waitForTimeout(1000);

        const posts = await instagram.page.$$('article > div:nth-child(3) img[decoding="auto"]');

        for(let i = 0; i < 3; i++){
            let post = posts[i];
            await post.click(); // membuka modal

            //proses like
            let isLikeAble = null;
            try{
                await instagram.page.waitForSelector('body[style="overflow: hidden;"]');
                await instagram.page.waitForTimeout(1000);
                isLikeAble = await instagram.page.waitForSelector('svg[aria-label="Like"]', {timeout: 3000});
            }catch(err){
                isLikeAble = null;
            }

            if(isLikeAble){
                await instagram.page.waitForTimeout(1500);
                await instagram.page.click('svg[aria-label="Like"]');
            }

            //menutup modal
            await instagram.page.waitForTimeout(2000);
            await instagram.page.click('svg[aria-label="Close"]');
        }

    }
}

module.exports = instagram;
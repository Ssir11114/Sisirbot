const axios = require("axios");
let isEnabled = false; 
module.exports.config = {
   name: "nusrat",
   version: "4.3.7",
   hasPermssion: 0,
   credits: "MR.SANNY", 
   description: "Talk with simisimi",
   commandCategory: "sim",
   usages: "<ask> on/off",
   cooldowns: 2
};

module.exports.run = async function ({ api, event, args }) {
    try {
        if (args[0] === "off") {
            isEnabled = false;
            return api.sendMessage("SimSimi is now turned off.", event.threadID, event.messageID);
        } else if (args[0] === "on") {
            isEnabled = true;
            return api.sendMessage("SimSimi is now turned on.", event.threadID, event.messageID);
        } else {
            const ask = args.join(" ");
        if(!ask) return api.sendMessage(`Wrong format\nUse: ${global.config.PREFIX}sim <on/off>\nOr ${global.config.PREFIX}sim <ask>`, event.threadID, event.messageID);
            const response = await axios.get(`https://eurix-api.replit.app/sim?ask=${encodeURIComponent(ask)}&lang=tl`);
            const result = response.data.respond;
            api.sendMessage(result, event.threadID, event.messageID);
        }
    } catch(error) {
        api.sendMessage(`Error: ${error}`, event.threadID);
        console.log(error);
    }
};

module.exports.handleEvent = async function ({ api, event }) {
    try {
        if (!isEnabled) return; 

        const message = event.body.toLowerCase();
        const response = await axios.get(`https://eurix-api.replit.app/sim?ask=${encodeURIComponent(message)}&lang=tl`);
        const result = response.data.respond;
        api.sendMessage(result, event.threadID, event.messageID);
    } catch(error) {
        api.sendMessage(`Error: ${error}`, event.threadID);
        console.log(error);
    }
};

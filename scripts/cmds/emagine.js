+cmd install anigen.js const axios = require("axios");

module.exports = {
  config: {
    name: "ag",
    version: "1.0",
    author: "ArYAN",
    countDown: 5,
    category: "media",
    longDescription: {
      en: 'Genreate Images using imagine API',
    },
    guide: {
      en: '.anigen [ prompt ]  '
    }
  },
  onStart: async function ({ message, api, args, event }) {
    const text = args.join(' ');
    if (!text) {
      return message.reply("⛔|𝗜𝗻𝘃𝗮𝗹𝗶𝗱 \n━━━━━━━━━━━━\n\n➤ Please provide some prompts");
    }
    
    const baseURL = `https://aryan-apis.onrender.com/api/anigen?prompt=${text}`;

    api.setMessageReaction("⏳", event.messageID, () => {}, true);
   
    const startTime = new Date().getTime(); // Define startTime
    
    try {
      const response = await axios.get(baseURL);
      
      const endTime = new Date().getTime(); // Move endTime inside the asynchronous block
      const timeTaken = (endTime - startTime) / 1000; 
      
      message.reply("🔎 Generating your image, please wait a few moments.", async (err, info) => {
        message.reply({ 
          body: `🖼️ [ 𝗔𝗻𝗶𝗚𝗲𝗻 ]\n\n➤ Here is your generated image.\n➤ Time taken: ${timeTaken} seconds`,
          attachment: await global.utils.getStreamFromURL(baseURL)
      });
  
        let ui = info.messageID;
        message.unsend(ui);
        api.setMessageReaction("✅", event.messageID, () => {}, true);
      });
    } catch (error) {
      console.error("Error fetching image:", error);
      message.reply("⚠️ An error occurred while generating the image.");
      api.setMessageReaction("❌", event.messageID, () => {}, true);
    }
  }
};

module.exports = {
  config: {
    name: "cpu",
    version: "1.0",
    author: "Nehal", 
    role: 0,
    shortDescription: {
      en: "Displays the current CPU conditions of the bot."
    },
    longDescription: {
      en: "Displays the current CPU conditions of the bot."
    },
    category: "𝗦𝗬𝗦𝗧𝗘𝗠",
    guide: {
      en: "Use {p}cpu to check the current CPU conditions of the bot."
    }
  },
  onStart: async function ({ api, event, args }) {
    // Simulate checking CPU temperature (you should replace this with your actual CPU temperature check)
    const cpuTemperature = Math.random() * 100; // Generate a random CPU temperature between 0 and 100

    let cpuStatus = "Cool ✅";
    if (cpuTemperature > 80) { // You can adjust this threshold
      cpuStatus = "Hot.❎";
    }

    api.sendMessage(`CPU Temperature: ${cpuTemperature}°C\nCPU Status: ${cpuStatus}`, event.threadID);
  }
};

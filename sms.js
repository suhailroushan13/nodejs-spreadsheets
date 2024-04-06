import twilio from "twilio";

// Twilio credentials from your Twilio console
const accountSid = ""; // Replace with your Account SID
const authToken = ""; // Replace with your Auth Token
const fromNumber = ""; // Replace with your Twilio phone number

// Initialize Twilio client
const client = twilio(accountSid, authToken);

/**
 * Send an SMS message using Twilio.
 *
 * @param {string} toNumber The destination phone number (including country code).
 * @param {string} message The message content to send.
 */
const sendSMS = async (toNumber, message) => {
  try {
    const response = await client.messages.create({
      body: message,
      from: fromNumber,
      to: toNumber,
    });

    console.log("Message Sent Successfully:", response.sid);
    console.log("SMS sent with the changes.");
    return response;
  } catch (error) {
    console.error("Failed to send message:", error);
    throw error; // Rethrow the error to handle it in the caller function if necessary
  }
};

// /**
//  * Send a WhatsApp message using Twilio.
//  *
//  * @param {string} toNumber The destination WhatsApp number (including country code, prefixed with 'whatsapp:').
//  * @param {string} message The message content to send.
//  */

// const whatsappFromNumber = "whatsapp:+14155238886"; // Your Twilio WhatsApp number, change accordingly

// const sendWhatsApp = async (message) => {
//   try {
//     const response = await client.messages.create({
//       body: message,
//       from: whatsappFromNumber, // Ensure this is a WhatsApp-enabled number
//       to: `whatsapp:+919618211626`, // Prefix recipient number with 'whatsapp:' to indicate WhatsApp messaging
//     });

//     console.log("WhatsApp Message Sent Successfully:", response.sid);
//     return response;
//   } catch (error) {
//     console.error("Failed to send WhatsApp message:", error);
//     throw error;
//   }
// };

// sendSMS("+919618211626", "Hello");

// export { sendSMS, sendWhatsApp };

export default sendSMS;

// emailService.js
// This service handles email functionality using EmailJS
// You'll need to sign up at https://www.emailjs.com/

/**
 * Initialize EmailJS with your public key
 * Call this in your main app entry file (e.g., index.js or App.js)
 * @param {string} publicKey - Your EmailJS public key
 */
export const initEmailService = (publicKey) => {
  if (window.emailjs) {
    window.emailjs.init(publicKey);
  } else {
    console.error('EmailJS not loaded. Make sure to include the EmailJS script in your HTML.');
  }
};

/**
 * Send an email using EmailJS
 * @param {Object} emailData - The email data
 * @param {string} serviceID - Your EmailJS service ID
 * @param {string} templateID - Your EmailJS template ID
 * @returns {Promise} - A promise that resolves when the email is sent
 */
export const sendEmail = async (emailData, serviceID, templateID) => {
  if (!window.emailjs) {
    throw new Error('EmailJS not loaded. Make sure to include the EmailJS script in your HTML.');
  }
  
  try {
    const response = await window.emailjs.send(serviceID, templateID, emailData);
    return response;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// Example setup instructions:
/*
1. Sign up for EmailJS at https://www.emailjs.com/
2. Create a service (e.g., Gmail, Outlook, etc.)
3. Create an email template with variables matching the keys in emailData
4. Get your user ID, service ID, and template ID
5. Add EmailJS script to public/index.html:
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
6. Initialize in your main component:
   import { initEmailService } from './emailService';
   initEmailService('YOUR_USER_ID');
7. Use in your component:
   import { sendEmail } from './emailService';
   sendEmail(emailData, 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID');
*/
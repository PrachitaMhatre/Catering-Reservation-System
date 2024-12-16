const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");

admin.initializeApp();
sgMail.setApiKey("YOUR_SENDGRID_API_KEY"); // Replace with your SendGrid API Key

exports.sendOrderConfirmation = functions.firestore
  .document("users/{userId}")
  .onUpdate(async (change, context) => {
    const beforeOrders = change.before.data().orders || [];
    const afterOrders = change.after.data().orders || [];

    if (afterOrders.length > beforeOrders.length) {
      const newOrder = afterOrders[afterOrders.length - 1];

      const email = change.after.data().email;
      const message = {
        to: email,
        from: "youremail@example.com",
        subject: "Order Confirmation",
        text: `Thank you for your order! Payment ID: ${newOrder.paymentId}`,
        html: `<strong>Order Total: ₹${newOrder.totalAmount}</strong>`,
      };

      try {
        await sgMail.send(message);
        console.log("Order confirmation email sent successfully.");
      } catch (error) {
        console.error("Error sending email: ", error);
      }
    }
  });

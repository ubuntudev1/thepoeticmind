const axios = require("axios");

exports.getDonatePage = (req, res) => {
  res.render("donate", { title: "Donate" });
};

exports.initiateDonation = async (req, res) => {
  const { amount, email, currency } = req.body;

  // Convert amount to kobo (Naira) or cents (USD)
  const amountInSubunit = amount * 100;

  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amountInSubunit,
        currency, // 'NGN' or 'USD'
        callback_url: "http://localhost:3008/thankyou"
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    // Redirect to Paystack payment page
    res.redirect(response.data.data.authorization_url);

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send("Payment initialization failed");
  }
};

exports.verifyDonation = async (req, res) => {
  const { reference } = req.query;

  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        }
      }
    );

    const paymentData = response.data.data;

    if (paymentData.status === "success") {
      // Save donation to DB if needed
      // DonationModel.create({ email: paymentData.customer.email, amount: paymentData.amount, currency: paymentData.currency });

      res.render("success", { payment: paymentData });
    } else {
      res.render("failed", { payment: paymentData });
    }

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send("Payment verification failed");
  }
};

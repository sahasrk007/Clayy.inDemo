const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 1001;

app.use(bodyParser.json());

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/send-email', async (req, res) => {
  const { contact, name, message } = req.body;

  if (!contact || !name || !message) {
    return res.status(400).json({ message: 'All fields are required.',success:false });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'sahasloop@gmail.com', 
        pass: 'gwlr tigv whnz ffct',
      },
    });
    var messageHTML = "<b>Hi I'am "+name+",<br>Contact Info : "+contact+"<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p>"+message+"."

    const mailOptions = {
      from: 'Clayy.IN', 
      to: 'sahasloop@gmail.com',
      subject: 'Clayy.In:'+name,
      html: messageHTML,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Email sent successfully!',success:true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email.',success:false });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

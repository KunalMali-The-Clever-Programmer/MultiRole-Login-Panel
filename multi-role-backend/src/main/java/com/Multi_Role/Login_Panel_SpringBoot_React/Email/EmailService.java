package com.Multi_Role.Login_Panel_SpringBoot_React.Email;

import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

@Service
public class EmailService {

    // Sender email and App Password (keep private!)
    private final String FROM_EMAIL = "isronasa179@gmail.com";
    private final String APP_PASSWORD = "jktn nmbn pwrq lvxi"; // Use 16-char Gmail App Password

    public void sendEmail(String to, String subject, String messageBody) {

        // Mail server properties for Gmail TLS
        Properties props = new Properties();
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587"); // TLS port
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true"); // Enable STARTTLS
        props.put("mail.smtp.ssl.trust", "smtp.gmail.com");
        props.put("mail.smtp.ssl.protocols", "TLSv1.2");

        // Create session with authentication
        Session session = Session.getInstance(props, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(FROM_EMAIL, APP_PASSWORD);
            }
        });

        session.setDebug(true); // Optional: Enable debug logs

        try {
            // Compose the message
            MimeMessage mimeMessage = new MimeMessage(session);
            mimeMessage.setFrom(new InternetAddress(FROM_EMAIL));
            mimeMessage.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
            mimeMessage.setSubject(subject);
            mimeMessage.setText(messageBody);

            // Send the message
            Transport.send(mimeMessage);
            System.out.println("✅ Email sent successfully to: " + to);

        } catch (MessagingException e) {
            e.printStackTrace();
            throw new RuntimeException("❌ Email sending failed: " + e.getMessage());
        }
    }
}

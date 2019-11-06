package pl.igorkol.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/email")
public class EmailController {

    private JavaMailSender mailSender;

    @Autowired
    public EmailController(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @GetMapping("/test")
    public ResponseEntity<Void> sendTestEmail(){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("igorkol@o2.pl");
        message.setSubject("Test");
        message.setText("Test message");
        mailSender.send(message);
        return null;
    }

}

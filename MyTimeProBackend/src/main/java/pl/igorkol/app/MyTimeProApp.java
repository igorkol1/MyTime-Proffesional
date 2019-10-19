package pl.igorkol.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import javax.persistence.Entity;

@SpringBootApplication
@EntityScan("pl.igorkol.entities")
public class MyTimeProApp {

    public static void main(String[] args) {
        SpringApplication.run(MyTimeProApp.class, args);
    }

}

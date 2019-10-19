package pl.igorkol.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;

import javax.persistence.Entity;

@SpringBootApplication
@EntityScan("pl.igorkol.entities")
@ComponentScan(basePackages = "pl.igorkol")
public class MyTimeProApp {

    public static void main(String[] args) {
        SpringApplication.run(MyTimeProApp.class, args);
    }

}

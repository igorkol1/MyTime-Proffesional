package pl.igorkol.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("pl.igorkol.entities")
@ComponentScan(basePackages = "pl.igorkol")
@EnableJpaRepositories("pl.igorkol.repositories")
public class MyTimeProApp {

    public static void main(String[] args) {
        SpringApplication.run(MyTimeProApp.class, args);
    }

}

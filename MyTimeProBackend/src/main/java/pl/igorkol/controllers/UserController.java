package pl.igorkol.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pl.igorkol.dtos.UserDto;
import pl.igorkol.dtos.responses.LoginResponse;
import pl.igorkol.entities.User;
import pl.igorkol.services.UserService;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/user")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    public List<UserDto> getAll() {
        return userService.getAllUsers();
    }

    @GetMapping("/{userEmail}")
    public ResponseEntity<UserDto> getUser(@PathVariable String userEmail) {
        UserDto userDto = userService.getUserDto(userEmail);
        if (userDto != null) {
            return new ResponseEntity<UserDto>(userDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<UserDto>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/save")
    public ResponseEntity<Void> createUser(@RequestBody User user) {
        userService.saveUser(user);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(user.getId())
                .toUri();
        return ResponseEntity.created(uri).build();
    }

    @PostMapping("/deactivate/{userEmail}")
    public ResponseEntity<Void> deactivateUser(@PathVariable String userEmail) {
        boolean status = userService.deactivateUser(userEmail);
        return status ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody User user) {
        return userService.authorizeUser(user);
    }

}

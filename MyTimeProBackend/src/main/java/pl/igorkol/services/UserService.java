package pl.igorkol.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.igorkol.dtos.UserDto;
import pl.igorkol.entities.User;
import pl.igorkol.repositories.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(UserService::mapToUserDto)
                .collect(Collectors.toList());
    }

    public UserDto getUser(String userEmail) {
        User user = userRepository.findByEmail(userEmail).orElse(null);
        if (user != null) {
            return mapToUserDto(user);
        } else {
            return null;
        }
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public static UserDto mapToUserDto(User user) {
        return new UserDto(user.getEmail(), user.getManager(), user.getActive());
    }

    public boolean deactivateUser(String userEmail) {
        Optional<User> userOptional = userRepository.findByEmail(userEmail);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setActive(false);
            saveUser(user);
            return true;
        }
        return false;
    }

}

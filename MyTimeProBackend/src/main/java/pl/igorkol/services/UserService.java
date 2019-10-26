package pl.igorkol.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import pl.igorkol.dtos.UserDto;
import pl.igorkol.dtos.responses.LoginResponse;
import pl.igorkol.entities.User;
import pl.igorkol.repositories.UserRepository;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {

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

    public Optional<User> getUser(String userEmail) {
        return userRepository.findByEmail(userEmail);
    }

    public UserDto getUserDto(String userEmail) {
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

    public LoginResponse authorizeUser(User unauthorizedUser){
        LoginResponse loginResponse = new LoginResponse(unauthorizedUser.getEmail());
        Optional<User> userOptional = userRepository.findByEmail(unauthorizedUser.getEmail());
        if(userOptional.isPresent()){
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            User user = userOptional.get();
            if(encoder.matches(unauthorizedUser.getPassword(), user.getPassword())){
                loginResponse.setAuthorize(true);
                loginResponse.setManager(user.getManager());
            }
        }
        return loginResponse;
    }

    @Override
    public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
        Optional<User> userOptional = userRepository.findByEmail(userEmail);
        if (!userOptional.isPresent()) {
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        User user = userOptional.get();
        return new org.springframework.security.core.userdetails.User(user.getEmail(),
                user.getPassword(), getAuthorities(user));
    }

    private Collection<? extends GrantedAuthority> getAuthorities(User user) {
        List<SimpleGrantedAuthority> temp = new ArrayList<>();
        temp.add(new SimpleGrantedAuthority("USER"));
        if (user.getManager()) {
            temp.add(new SimpleGrantedAuthority("MANAGER"));
        }
        return temp;
    }
}

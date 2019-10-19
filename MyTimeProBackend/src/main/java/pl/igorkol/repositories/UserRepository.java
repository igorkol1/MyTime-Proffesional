package pl.igorkol.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.igorkol.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
}

package pl.igorkol.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.igorkol.entities.Activity;

@Repository
public interface ActivityRepository extends JpaRepository<Activity,Long> {
}

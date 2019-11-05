package pl.igorkol.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.igorkol.entities.Activity;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ActivityRepository extends JpaRepository<Activity,Long> {

    public List<Activity> findAllByUserIdAndAndStart(long userId, LocalDate date);

    public List<Activity> findAllByProjectIdAndAndStart(long projectId, LocalDate date);

    public List<Activity> findAllByUserIdAndStartBetween(long userId,LocalDate startDate,LocalDate endDate);

    public List<Activity> findAllByProjectIdAndStartBetween(long projectId,LocalDate startDate,LocalDate endDate);

}

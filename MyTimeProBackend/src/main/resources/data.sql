insert into users(email, is_active, is_manager, password) values ('test1@test.pl',true,false,'password');
insert into users(email, is_active, is_manager, password) values ('test2@test.pl',true,false,'password');
insert into users(email, is_active, is_manager, password) values ('test3@test.pl',false,false,'password');
insert into users(email, is_active, is_manager, password) values ('test4@test.pl',true,true,'password');
insert into users(email, is_active, is_manager, password) values ('test5@test.pl',true,true,'password');

insert into projects(is_active, name) values (true,'Test Project 1');
insert into projects(is_active, name) values (true,'Test Project 2');
insert into projects(is_active, name) values (true,'Test Project 3');
insert into projects(is_active, name) values (false,'Test Project 4');
insert into projects(is_active, name) values (false,'Test Project 5');

insert into activities(description, duration, start, project_id, worker_id) values ('Test Activity 1',1,NOW(),1,1);
insert into activities(description, duration, start, project_id, worker_id) values ('Test Activity 2',1,NOW(),1,1);
insert into activities(description, duration, start, project_id, worker_id) values ('Test Activity 3',2,NOW(),2,2);
insert into activities(description, duration, start, project_id, worker_id) values ('Test Activity 4',3,NOW(),3,3);
insert into activities(description, duration, start, project_id, worker_id) values ('Test Activity 5',4,NOW(),4,4);

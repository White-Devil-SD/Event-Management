create table eventing
(
	event_id int(10),
    event_name varchar(40),
    event_manager varchar(40),
    event_type varchar(40),
    event_amount int(255),
    PRIMARY KEY(event_id)
);

CREATE TABLE college
(
	college_id varchar(10),
    college_name varchar(200),
    PRIMARY KEY(college_id)
);

CREATE TABLE users
(
	usr_id varchar(10),
    primary key(usr_id),
    usr_name varchar(40),
    usr_gender char(1),
    college_id varchar(10),
    FOREIGN key(college_id)REFERENCES college(college_id),
    usr_phone int(10),
    event_id int(3),
    FOREIGN KEY(event_id)REFERENCES eventing(event_id)
);

create TABLE competation
(
	competation_date date,
    competation_timing time
);

CREATE TABLE winners
(
	winners_id int(10),
    PRIMARY KEY(winners_id),
    event_id int(10),
    FOREIGN KEY(event_id)REFERENCES eventing(event_id),
    usr_id varchar(20),
    FOREIGN KEY(usr_id)REFERENCES users(usr_id),
    winners_position int(200)
);
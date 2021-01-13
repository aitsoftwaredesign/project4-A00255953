drop database if exists baservicedb;
create database if not exists baservicedb;
use baservicedb;

select "CREATING DATABASE TABLES" as "INFO";

drop table if exists customer;
create table customer(
	partner_id integer auto_increment not null primary key,
	partner_name varchar(25) not null);

insert into customer values (null, 'Murray Hotels');

drop table if exists venue;
create table venue(
	venue_id integer auto_increment not null primary key,
	partner_id integer not null,
	venue_name varchar(25) not null,
	venue_description varchar(100) not null,
	venue_type VARCHAR(10) not null,
	address1 VARCHAR(50) not null,
	address2 VARCHAR(50),
	town VARCHAR(20) not null,
    foreign key(partner_id) references customer(partner_id));

insert into venue values (null, 1, 'Lakeside Hotel', 'A lovely hotel by a lake', 'HOTEL', 'Lake road', null, 'Athlone');
insert into venue values (null, 1, 'Town Centre Hotel', 'A lovely hotel in the town', 'HOTEL', 'Main Street', null, 'Athlone');

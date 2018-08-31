CREATE TABLE costs_temp AS SELECT amount, type, date, description, userStatus, moodLevel, weather, location FROM costs;

DROP TABLE IF EXISTS `costs`;

ALTER TABLE costs_temp RENAME TO costs;
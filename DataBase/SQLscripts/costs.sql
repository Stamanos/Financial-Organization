BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS `costs` (
	`amount`	INT,
	`type`	TEXT,
	`date`	DATETIME,
	`description`	TEXT,
	`userStatus`	TEXT,
	`moodLevel`	INT,
	`weather`	TEXT,
	`location`	TEXT,
	`typeOfChart`	CHAR ( 25 )
);
COMMIT;

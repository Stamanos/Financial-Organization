ALTER TABLE costs ADD typeOfChart CHAR(25);
INSERT INTO costs(typeOfChart) VALUES ('bar'), ('column'), ('stepLine'),
 ('splineArea'), ('spline'), ('scatter'), ('pyramid'), ('pie'), 
 ('line'), ('doughnut'), ('area');
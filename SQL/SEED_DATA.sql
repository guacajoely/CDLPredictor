USE [CDLPredictorDB];
GO

set identity_insert [Users] on
insert into [Users] (Id, Username, [Password], Email, FaveTeam, ImageURL) 
values (1, 'JimboJankinz', 'password', 'test@email.com', 2, 'https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg');
set identity_insert [Users] off

set identity_insert [Teams] on
insert into [Teams] (Id, TeamName, FullTeamName, Seed, HP, SND, CON) 

values (1, 'breach', 'Boston Breach', 7, 49, 51, 58),
(2, 'faze', 'Atlanta Faze', 1, 44, 74, 49),
(3, 'guerrillas', 'Los Angeles Guerrillas', 11, 37, 44, 39),
(4, 'legion', 'Las Vegas Legion', 9, 42, 68, 23),
(5, 'mutineers', 'Florida Mutineers', 10, 26, 49, 38),
(6, 'optic', 'Optic Texas', 2, 66, 55, 45),
(7, 'rokkr', 'Minnesota Rokkr', 8, 41, 38, 61),
(8, 'ravens', 'London Royal Ravens', 12, 43, 36, 25),
(9, 'subliners', 'New York Subliners', 5, 59, 48, 64),
(10, 'surge', 'Seattle Surge', 6, 60, 35, 62),
(11, 'thieves', 'Los Angeles Thieves', 3, 63, 52, 65),
(12, 'ultra', 'Toronto Ultra', 4, 61, 49, 69)

;
set identity_insert [Teams] off

set identity_insert [Predictions] on
insert into [Predictions] (Id, UserId, Team1, Team2, Team1Score, Team2Score) 
values (1, 1, 3, 2, 0, 3)
set identity_insert [Predictions] off

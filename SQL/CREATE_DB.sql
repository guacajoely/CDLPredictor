USE [master]

IF db_id('CDLPredictorDB') IS NULL
  CREATE DATABASE [CDLPredictorDB]
GO

USE [CDLPredictorDB]
GO

DROP TABLE IF EXISTS [Users];
DROP TABLE IF EXISTS [Teams];
DROP TABLE IF EXISTS [Predictions];
GO

CREATE TABLE [Users] (
  [Id] int PRIMARY KEY IDENTITY,
  [Username] nvarchar(255),
  [Password] nvarchar(255),
  [Email] nvarchar(255),
  [FaveTeam] int,
  [ImageURL] nvarchar(255)
)
GO

CREATE TABLE [Teams] (
  [Id] int PRIMARY KEY IDENTITY,
  [TeamName] nvarchar(255),
  [FullTeamName] nvarchar(255),
  [Seed] int,
  [HP] int,
  [SND] int,
  [CON] int
)
GO

CREATE TABLE [Predictions] (
  [Id] int PRIMARY KEY IDENTITY,
  [UserId] int,
  [Team1] int,
  [Team2] int,
  [Team1Score] int,
  [Team2Score] int 
)
GO

ALTER TABLE [Predictions] ADD FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id])
GO

ALTER TABLE [Predictions] ADD FOREIGN KEY ([Team1]) REFERENCES [Teams] ([Id])
GO

ALTER TABLE [Predictions] ADD FOREIGN KEY ([Team2]) REFERENCES [Teams] ([Id])
GO
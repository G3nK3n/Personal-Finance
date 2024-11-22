USE [Finance_App_Database]
GO

/****** Object:  Table [dbo].[Countries]    Script Date: 11/5/2024 1:05:11 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Users] (
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] VARCHAR(100),
	[username] VARCHAR(50),
	[password] VARCHAR(100),
)

GO
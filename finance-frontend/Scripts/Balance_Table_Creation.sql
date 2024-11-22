USE [Finance_App_Database]
GO

/****** Object:  Table [dbo].[Countries]    Script Date: 11/5/2024 1:05:11 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Balance] (
	[id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] INT,
	[balance] FLOAT(10),
	[income] FLOAT(10),
	[expense] FLOAT(10)
)

GO
USE [Finance_App_Database]
GO

/****** Object:  Table [dbo].[Countries]    Script Date: 11/5/2024 1:05:11 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Transaction] (
	[transaction_id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] INT,
	[category_id] INT,
	[avatar_path] VARCHAR(100),
	[transaction_date] DATE,
	[transaction_amount] FLOAT(10)
)

GO
USE [Finance_App_Database]
GO

/****** Object:  Table [dbo].[Countries]    Script Date: 11/5/2024 1:05:11 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

DROP TABLE [dbo].Budget

CREATE TABLE [dbo].[Budget] (
	[budget_id] [int] IDENTITY(1,1) NOT NULL,
	[category_id] INT,
	[max_amount] FLOAT(10),
	[spent] FLOAT(10),
	[remaining] FLOAT(10),
	[color] VARCHAR(10)
)

GO
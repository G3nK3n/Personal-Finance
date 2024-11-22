USE [Finance_App_Database]
GO

/****** Object:  Table [dbo].[Countries]    Script Date: 11/5/2024 1:05:11 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Pots] (
	[pots_id] [int] IDENTITY(1,1) NOT NULL,
	[category_id] INT,
	[target] FLOAT(10),
	[total_amount] FLOAT(15),
	[color] VARCHAR(10)
)

GO
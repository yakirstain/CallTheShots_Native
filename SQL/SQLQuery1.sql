USE [site07]
GO
/****** Object:  StoredProcedure [dbo].[P_Insert_Image]    Script Date: 11/07/2018 00:37:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER proc [dbo].[P_Insert_Image]
@Image_Uri nvarchar(1000)
as
begin
	insert [site07].[Images] ([Image]) values (@Image_Uri)
END

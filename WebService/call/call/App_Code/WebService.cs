using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for WebService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class WebService : System.Web.Services.WebService
{
    static string ConnectionStr = ConfigurationManager.ConnectionStrings["LIVEDNS"].ConnectionString;
    DataSet ds = new DataSet();
    SqlDataAdapter adtr = null;
    SqlConnection con = new SqlConnection(ConnectionStr);
    SqlCommand cmd;

    public WebService()
    {
        
    }

    [WebMethod]
    public int insertNewImage(string imageUri)
    {
        cmd = new SqlCommand("P_Insert_Image", con);
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("Image_Uri", imageUri);
        con.Open();
        int k = cmd.ExecuteNonQuery();
        con.Close();
        return k;
    }
    [WebMethod]
    public string getPhotoUri()
    {
        cmd = new SqlCommand("select * from Images for json auto", con);
        con.Open();
        string str = cmd.ExecuteScalar().ToString();
        con.Close();
        return str;
    }
    [WebMethod]
    public int deleteImages()
    {
        cmd = new SqlCommand("delete from Images", con);
        con.Open();
        int k = cmd.ExecuteNonQuery();
        con.Close();
        return k;
    }
    [WebMethod]
    public int getPlayers()
    {
		int counter=0;
		 cmd = new SqlCommand("select COUNT(*) from Images",con);
		 con.Open();
		 counter = (int)cmd.ExecuteScalar();
		 con.Close();
		 return counter;
	}
}

using Liststored.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Web.Http.Cors;

namespace Liststored.Controllers
{
    [Route("api/")]
    [ApiController]
    //[EnableCors("corspolicy")]
    public class LoginController : ControllerBase
    {
        private static string status = null;
        private readonly IConfiguration _configuration;
        public LoginController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Route("Login")]
        public IActionResult Login(string UserName, string Password)
        {
            LoginResponse response = new LoginResponse();
            status = "0";
            SqlConnection connection = new SqlConnection(this._configuration.GetConnectionString("DefaultConnection"));
            connection.Open();
            SqlCommand sqlCommand = new SqlCommand("proc_VerifyLogin", connection);
            sqlCommand.CommandType = CommandType.StoredProcedure;
            try
            {
                sqlCommand.Parameters.AddWithValue("@UserName", (object)UserName);
                sqlCommand.Parameters.AddWithValue("@UserPwd", (object)Password);

                DataTable dt = new DataTable();
                SqlDataReader sdr = sqlCommand.ExecuteReader();
                if (sdr.HasRows)
                {
                    dt.Load(sdr);
                    if (dt.Rows[0]["UserId"].ToString() != null || dt.Rows[0]["UserId"].ToString() != "0")
                    {
                        response.userId = Convert.ToInt32(dt.Rows[0]["UserId"]);
                        response.userName = dt.Rows[0]["UserName"].ToString();
                        response.firstName = dt.Rows[0]["UserFirstName"].ToString();
                        response.lastName = dt.Rows[0]["UserLastName"].ToString();

                        var issuer = _configuration["Jwt:Issuer"];
                        var audience = _configuration["Jwt:Audience"];
                        var keyString = _configuration["Jwt:Key"];
                        if (string.IsNullOrEmpty(keyString))
                        {
                            throw new InvalidOperationException("JWT Key is missing in configuration.");
                        }
                        var key = Encoding.UTF8.GetBytes(keyString);

                        var signingCredentials = new SigningCredentials(
                                                new SymmetricSecurityKey(key),
                                                SecurityAlgorithms.HmacSha512Signature
                                            );


                        var subject = new ClaimsIdentity(new[]{
                                    new Claim(JwtRegisteredClaimNames.Sub, response.userName),
                                    new Claim(JwtRegisteredClaimNames.Email, response.userName)});

                        var expires = DateTime.UtcNow.AddMinutes(10);
                        var tokenDescriptor = new SecurityTokenDescriptor
                        {
                            Subject = subject,
                            Expires = DateTime.UtcNow.AddMinutes(10),
                            Issuer = issuer,
                            Audience = audience,
                            SigningCredentials = signingCredentials
                        };
                        var tokenHandler = new JwtSecurityTokenHandler();
                        var token = tokenHandler.CreateToken(tokenDescriptor);
                        var jwtToken = tokenHandler.WriteToken(token);
                        var data = new ResponseModel
                        {
                            status = 1,
                            responsemsg = "Success",
                            userid = response.userId,
                            name = string.Concat(response.firstName, " ", response.lastName),
                            token = jwtToken,
                        };
                        var Jsondata = JsonConvert.SerializeObject(data);

                        //SqlCommand cmd2 = new SqlCommand("insert into lastlogin_info(UserID,LastLoginOn,AppName,Token) " +
                        //    "values(@userid,getdate(),'B1',@Token)");
                        //cmd2.CommandType = CommandType.Text;
                        //cmd2.Connection = connection;
                        //cmd2.Parameters.AddWithValue("@userid", Convert.ToInt32(dt.Rows[0]["ID"]));
                        //cmd2.Parameters.AddWithValue("@Token", jwtToken);

                        //cmd2.ExecuteNonQuery();
                        //cmd2.Dispose();

                        return Ok(Jsondata);
                    }
                }
                var data2 = new ResponseModel { status = 0, responsemsg = "Authentication Failed" };
                var Jsondata2 = JsonConvert.SerializeObject(data2);
                return Ok(Jsondata2);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            finally
            {
                sqlCommand.Dispose();
                connection.Close();
                connection.Dispose();
            }
        }
    }

}

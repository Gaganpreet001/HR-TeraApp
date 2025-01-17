namespace Liststored.Models
{
    //// To send as data to API
    //public class User
    //{
    //    public string Username { get; set; }
    //    public string Password { get; set; }
    //}

    public class ResponseModel
    {
        public int? userid { get; set; }
        public int? status { get; set; }
        public string? name { get; set; }
        public string? responsemsg { get; set; }
        public string? token { get; set; }
    }

    // New Values to be added
    public class UserMaster
    {
        public int? Id { get; set; }
        public string? FullName { get; set; } 
        public string? LastName { get; set; }
        public string? FirstName { get; set; }
        public string? UserName { get; set; } 
        public string? Password { get; set; } 
        public int? RoleId { get; set; }
        public string? Email { get; set; }
        public string? EmailPassword { get; set; } 
        public string? MobileNo { get; set; }  
        public string? Photo { get; set; }
        public string? EnteredBy { get; set; } 
        public DateTime? EnteredOn { get; set; }
        public string? UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public List<SelectedCompany>? SelectedCompanies { get; set; } // Saved in db seperately

    }

public class LoginResponse
    {
        public int userId { get; set; }
        public string userName { get; set; }
        public string? firstName { get; set; }
        public string? lastName { get; set; }
        public string? mobileNo { get; set; }
    }
}

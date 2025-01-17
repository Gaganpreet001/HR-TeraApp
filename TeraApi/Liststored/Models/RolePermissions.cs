namespace Liststored.Models
{
    public class RolePermissions
    {
        public int? Id { get; set; }
        public int? MenuId { get; set; }
        public string? ParentName { get; set; } // Not saved in db just for display
        public string? ActionName { get; set; }
        public bool? IsAdd { get; set; }
        public bool? IsEdit { get; set; }
        public bool? IsDelete { get; set; }
        public bool? IsDisplay { get; set; }
        public int? RoleId { get; set; }
        public string? EnteredBy { get; set; }
        public DateTime? EnteredOn { get; set; } 
        public string? UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
    }

}

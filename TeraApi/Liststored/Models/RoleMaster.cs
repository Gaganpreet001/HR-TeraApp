namespace Liststored.Models
{
    public class RoleMaster
    {
        public int? Id { get; set; }
        public string? RoleName { get; set; }
        public string? Description { get; set; }
        public string? EnteredBy { get; set; }
        public DateTime? EnteredOn { get; set; }
        public string? UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public int? TotalRows { get; set; }
    }

}

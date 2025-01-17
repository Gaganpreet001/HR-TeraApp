namespace Liststored.Models
{
    public class MenuMaster
    {
        public int? Id { get; set; } 
        public string? Parent { get; set; }
        public int? ParentId { get; set; }
        public string? MenuTitle { get; set; } 
        public string? Link { get; set; } 
        public string? Icon { get; set; } 
        public bool IsOpen { get; set; } 
        public string? ControllerName { get; set; } 
        public string? ActionName { get; set; }
        public string? EnteredBy { get; set; } 
        public DateTime? EnteredOn { get; set; } 
        public string? UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public int? TotalRows { get; set; }

    }
}

namespace Liststored.Models
{
    public class CompanyMaster
    {
        public int? Id { get; set; }
        public string? CompanyName { get; set; }
        public string? LegalName { get; set; }
        public string? ShortName { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? Phone { get; set; }
        public string? EmailId { get; set; }
        public string? GSTIN { get; set; }
        public string? PAN { get; set; }
        public string? EnteredBy { get; set; }
        public DateTime? EnteredOn { get; set; }
        public string? UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public int? TotalRows { get; set; }
    }

}

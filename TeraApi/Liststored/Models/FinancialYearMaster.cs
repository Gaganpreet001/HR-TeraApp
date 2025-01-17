namespace Liststored.Models
{
    public class FinancialYearMaster
    {
        public int? Id { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string? EnteredBy { get; set; }
        public DateTime? EnteredOn { get; set; }
        public string? UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public int? TotalRows { get; set; }
    }

}

namespace Liststored.Models
{
    public class LogisticsPanel
    {
        public string? ORDER_NO { get; set; }
        public string? PA_NO { get; set; }
        public int? TotalOrderQty { get; set; }
        public string? PINO { get; set; }
        public DateTime? PIDate { get; set; }
        public string? Customer { get; set; }
        public string? Agent { get; set; }
        public decimal? Price { get; set; }
        public decimal? FobValue { get; set; }
        public DateTime? PADate { get; set; }
        // Null Values
        public string? LCNo { get; set; }
        public decimal? AdvanceValue { get; set; }
        public decimal? LDS { get; set; }
        public int? LogisticRowId { get; set; }
        public string? InvoiceNo { get; set; }
        public DateTime? InvoiceDate { get; set; }
        public int? InvoiceQnty { get; set; }
        public decimal? InvoiceValue { get; set; }
        public decimal? NegotiationValue { get; set; }
        public string? ShippingBillNo { get; set; }
        public DateTime? ShippingBillDate { get; set; }
        public string? CustomSealNo { get; set; }
        public string? LineSealNo { get; set; }
        public string? CHA { get; set; }
        public string? Forwarder { get; set; }
        public string? ShippingLine { get; set; }
        public decimal? Freight { get; set; }
        public string? LoadingPort { get; set; }
        public string? DestinationPort { get; set; }
        public string? COC { get; set; }
        public DateTime? RailOut { get; set; }
        public DateTime? TargetSOB { get; set; }
        public DateTime? ActualSOB { get; set; }
        public string? ActualVesselDetails { get; set; }
        public DateTime? TargetETA { get; set; }
        public DateTime? ActualETA { get; set; }
        public DateTime? CargoUnloadingDate { get; set; }
        public string? Remarks { get; set; }
    }
}

namespace Liststored.Models
{
    public class LogisticsInfo
    {
        public int? ID { get; set; }
        public double? ORDER_NO { get; set; }
        public double? INVOICE_NO { get; set; }
        public string? COC { get; set; }
        public string? ACTUAL_VESSEL_DETAILS { get; set; }
        public DateTime? ACTUAL_SOB { get; set; }   // Nullable if the SQL column is nullable
        public DateTime? TARGET_SOB { get; set; }    // Nullable if the SQL column is nullable
        public DateTime? RAIL_OUT { get; set; }      // Nullable if the SQL column is nullable
        public DateTime? TARGET_ETA { get; set; }    // Nullable if the SQL column is nullable
        public DateTime? ACTUAL_ETA { get; set; }    // Nullable if the SQL column is nullable
        public DateTime? CARGO_UNLOADING_DATE { get; set; } // Nullable if the SQL column is nullable
        public string? REMARKS { get; set; }
    }

}

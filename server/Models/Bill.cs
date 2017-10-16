using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace server.DbModels
{
    public class Bill
    {
        [Key]
        public long Id { get; set; }

        public string Name { get; set; }

        public long Amount { get; set; }

        public DateTime StartingDueDate { get; set; }

        // Cash / Debit Card
        public string PaidForm { get; set; }

        // Seguros / Gastos publicos / Combustibles
        public string Category { get; set; }

        public bool Recurrence { get; set; }
    }
}

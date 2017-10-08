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

        public DateTime Expiration { get; set; }
    }
}

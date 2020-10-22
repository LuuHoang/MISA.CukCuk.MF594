using System;
using System.Collections.Generic;

namespace MISA.Common.Models
{
    public partial class Customer
    {
        public int CustomerId { get; set; }
        public string Code { get; set; }
        public string FullName { get; set; }
        public DateTime? DateObirth { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public double? Debit { get; set; }
        public bool? Is5FoodMember { get; set; }
        public string Address { get; set; }
    }
}

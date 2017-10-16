using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using server.DbModels;
using System.Linq;
using System;

namespace server
{
    [Route("api/[controller]")]
    public class BillsController : Controller
    {
        private readonly DomainModelPostgreSqlContext _context;
        
        public BillsController(DomainModelPostgreSqlContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Bill> GetAll()
        {
            try
            {
                return _context.Bills.ToList();
            }
            catch (Exception ex)
            {
                var result = new List<Bill>();
                result.Add(new Bill()
                {
                    Name = ex.Message
                });
                return result;
            }
        }

        [HttpGet("{id}", Name = "GetTodo")]
        public IActionResult GetById(long id)
        {
            var item = _context.Bills.FirstOrDefault(t => t.Id == id);
            if (item == null)
            {
                return NotFound();
            }
            return new ObjectResult(item);
        }
    }
}

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
        private readonly ApiContext _context;

        public BillsController(ApiContext context)
        {
            _context = context;

            if (_context.Bills.Count() == 0)
            {
                _context.Bills.Add(new Bill
                {
                    Id = 1,
                    Amount = 2500,
                    Expiration = DateTime.Now,
                    Name = "Oca Card"
                });

                _context.Bills.Add(new Bill
                {
                    Id = 2,
                    Amount = 2300,
                    Expiration = DateTime.Now,
                    Name = "ANTEL"
                });


                _context.SaveChanges();
            }
        }

        [HttpGet]
        public IEnumerable<Bill> GetAll()
        {
            return _context.Bills.ToList();
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

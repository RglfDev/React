using apiProducts.Context;
using apiProducts.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.Swagger.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace apiProducts.Controllers
{
   
    [EnableCors("MyPolicy")]

    [Route("[controller]")]
    [ApiController]
    public class Products_DBController : ControllerBase
    {
        private readonly AppDbContext _context;
        public Products_DBController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/<Products_DBController>
        
        [HttpGet]
        //[Route("/")]
        public ActionResult Get()
        {
            try
            {
                return Ok(_context.Products.ToList());
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        // GET api/<Products_DBController>/5
        [HttpGet("{id}", Name = "GetProduct")]
        public ActionResult Get(int id)
        {
            try
            {
                var product = _context.Products.FirstOrDefault(p => p.Id == id);
                return Ok(product);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }


        // POST api/<Products_DBController>
        [HttpPost]
        public ActionResult Post([FromBody] Products_DB product)
        {
            try
            {
                _context.Products.Add(product);
                _context.SaveChanges();
                return CreatedAtRoute("GetProduct", new { id = product.Id }, product);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        // PUT api/<Products_DBController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Products_DB product)
        {
            try
            {
                if (product.Id == id)
                {
                    _context.Entry(product).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    _context.SaveChanges();
                    return CreatedAtRoute("GetProduct", new { id = product.Id }, product);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<Products_DBController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                var product = _context.Products.FirstOrDefault(p => p.Id == id);
                if (product != null)
                {
                    _context.Products.Remove(product);
                    _context.SaveChanges();
                    return Ok(id);
                }
                else
                {
                    return BadRequest();
                }

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}

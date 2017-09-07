using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace _31_1.Models
{
  public class Group
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public ICollection<User> Members { get; set; }
    public ICollection<Message> Messages { get; set; }
  }
}
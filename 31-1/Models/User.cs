using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace _31_1.Models
{
  public class User
  {
    public int Id { get; set; }
    public string NickName { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Password { get; set; }

    public ICollection<Group> Groups { get; set; }
  }
}
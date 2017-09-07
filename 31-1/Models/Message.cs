using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace _31_1.Models
{
  public class Message
  {
    public int Id { get; set; }
    public string TimeStapm { get; set; }
    public string Text { get; set; }
    public int OwnerId { get; set; }
    public string DiscussionName { get; set; }
  }
}
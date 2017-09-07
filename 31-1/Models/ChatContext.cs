using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace _31_1.Models
{
  public class ChatContext: DbContext
  {
    public DbSet<User> Users { get; set; }
    public DbSet<Group> Groups { get; set; }
    public DbSet<Message> Messages { get; set; }

    protected override void OnModelCreating(DbModelBuilder modelBuilder)
    {
      modelBuilder.Entity<Group>().HasKey(g => g.Name);
      modelBuilder.Entity<Message>().HasKey(m => m.Id);
      //base.OnModelCreating(modelBuilder);
    }

    public ChatContext()
    {
      this.Configuration.LazyLoadingEnabled = false;
      this.Configuration.ProxyCreationEnabled = false;
    }
  }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using _31_1.Models;

namespace _31_1.Controllers
{
  public class UserController : ApiController
  {
    // GET: api/User
    public IEnumerable<User> Get()
    {
      using(var context = new ChatContext())
      {
        IQueryable<User> us = context.Users.Select(u => new User() {NickName = u.NickName, LastName = u.LastName, FirstName = u.FirstName, Password = u.Password, Id = u.Id });
        return us;
      }
    }

    // GET: api/User/5
    public IHttpActionResult Get(int id)
    {
      using (var context = new ChatContext())
      {
        User requestedUser = context.Users.FirstOrDefault(user => user.Id == id);
        if (requestedUser == null) return NotFound();
        else return Ok(requestedUser);
      }
    }

    // POST: api/User
    public IHttpActionResult Post([FromBody]UserWrapper userWrap)
    {
      User user = userWrap.User;
      switch (userWrap.Purpose)
      {
        case "login":
          if (CheckCredentials(user))
            return Ok(GetUser(user.NickName));
          else return Unauthorized();
        case "signin":
          user = SaveUser(user);
          if (user != null)
            return Ok(user);
          else return BadRequest();
        case "check":
          if (CheckNickPresence(user.NickName)) return Ok(user.NickName);
          else return NotFound();
      }
      return BadRequest("Incorrect purpose phrase"); 
    }

    // PUT: api/User/5
    [HttpPut]
    public IHttpActionResult Put(int id, [FromBody]User user)
    {
      if (CheckNickPresence(user.NickName))
      { if (UpdateUser(user))
        {
          return Ok(user);
        }
        else return BadRequest();
      }
      else return NotFound();
    }

    // DELETE: api/User/5
    public void Delete(int id)
    {
    }

    private User SaveUser(User receivedUser)
    {
      using (var context = new ChatContext())
      {
        try { 
        context.Users.Add(receivedUser);
        context.SaveChanges();
        return receivedUser;
        }
        catch (Exception)
        {
          return null;
        }
      }
    }

    private bool CheckCredentials(User login)
    {
      using (var context = new ChatContext())
      {
        User requestedUser = context.Users.FirstOrDefault(user => user.NickName == login.NickName && user.Password == login.Password);
        if (requestedUser == null) return false;
        else return true;
      }
    }

    private bool CheckNickPresence(string nick)
    {
      using(var context = new ChatContext())
      {
        User checkingUser = context.Users.FirstOrDefault(user => user.NickName == nick);
        if (checkingUser == null) return false;
        else return true;
      }
    }

    private User GetUser(string nick)
    {
      using(var context = new ChatContext())
      {
        User user = context.Users.FirstOrDefault(u => u.NickName == nick);
        return user;
      }
    }

    private bool UpdateUser(User user)
    {
      using(var context = new ChatContext())
      {
        try
        {
          User databaseUser = context.Users.First(u => u.NickName == user.NickName);
          databaseUser.Password = user.Password;
          databaseUser.FirstName = user.FirstName;
          databaseUser.LastName = user.LastName;
          databaseUser.Groups = user.Groups;
          context.Entry(databaseUser).State = System.Data.Entity.EntityState.Modified;
          context.SaveChanges();
          return true;
        }
        catch(Exception e) { return false; }
      }
    }
  }
}

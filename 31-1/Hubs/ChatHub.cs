using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using _31_1.Models;

namespace _31_1.Hubs
{
  public class ChatHub : Hub
  {
    public void SayHello()
    {
      Clients.All.hello();
    }

    public void Send(Message message)
    {
      Clients.All.broadcastMessage(message);
    }

    //public void SendMessage(string name, string message)
    //{
    //  Clients.All.shareMessage(name, message);
    //}
  }
}
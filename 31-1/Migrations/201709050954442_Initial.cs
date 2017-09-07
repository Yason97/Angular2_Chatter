namespace _31_1.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Groups",
                c => new
                    {
                        Name = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => t.Name);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        NickName = c.String(),
                        FirstName = c.String(),
                        LastName = c.String(),
                        Password = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Messages",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TimeStapm = c.DateTime(nullable: false),
                        Text = c.String(),
                        Discussion_Name = c.String(maxLength: 128),
                        Owner_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Groups", t => t.Discussion_Name)
                .ForeignKey("dbo.Users", t => t.Owner_Id)
                .Index(t => t.Discussion_Name)
                .Index(t => t.Owner_Id);
            
            CreateTable(
                "dbo.UserGroups",
                c => new
                    {
                        User_Id = c.Int(nullable: false),
                        Group_Name = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.User_Id, t.Group_Name })
                .ForeignKey("dbo.Users", t => t.User_Id, cascadeDelete: true)
                .ForeignKey("dbo.Groups", t => t.Group_Name, cascadeDelete: true)
                .Index(t => t.User_Id)
                .Index(t => t.Group_Name);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Messages", "Owner_Id", "dbo.Users");
            DropForeignKey("dbo.Messages", "Discussion_Name", "dbo.Groups");
            DropForeignKey("dbo.UserGroups", "Group_Name", "dbo.Groups");
            DropForeignKey("dbo.UserGroups", "User_Id", "dbo.Users");
            DropIndex("dbo.UserGroups", new[] { "Group_Name" });
            DropIndex("dbo.UserGroups", new[] { "User_Id" });
            DropIndex("dbo.Messages", new[] { "Owner_Id" });
            DropIndex("dbo.Messages", new[] { "Discussion_Name" });
            DropTable("dbo.UserGroups");
            DropTable("dbo.Messages");
            DropTable("dbo.Users");
            DropTable("dbo.Groups");
        }
    }
}

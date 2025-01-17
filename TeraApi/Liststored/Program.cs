using Liststored.Data;
using Microsoft.AspNetCore.Cors;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Liststored.Service.LogisticService;
using Liststored.Service.LogisticsInfoService;
using Liststored.Service.ProformaService;
using Liststored.Service.CompanyService;
using Liststored.Service.FinancialYearService;
using Liststored.Service.RoleService;
using Liststored.Service.MenuService;
using Liststored.Service.RolePermissionsService;
using Liststored.Service.SelectedCompanyService;
using Liststored.Service.UserService;
using System.Text;
using Liststored.Models;

//using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

//// 1. Configure CORS
//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowOrigins",
//        builder =>
//        {
//            builder.WithOrigins("http://localhost:4200", "http://localhost:8083", "*")
//                  .AllowAnyMethod()
//                  .AllowAnyHeader();
//        });
//});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle 

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// JWT Configuration
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

// Services
builder.Services.AddScoped<ILogisticsService, LogisticsService>();
builder.Services.AddScoped<ILogisticsInfoService,LogisticsInfoService>();
builder.Services.AddScoped<IProformaService, ProformaService>();
builder.Services.AddScoped<ICompanyService, CompanyService>();
builder.Services.AddScoped<IFinancialYearService, FinancialYearService>();
builder.Services.AddScoped<IRoleService, RoleService>();
builder.Services.AddScoped<IMenuService, MenuService>();
builder.Services.AddScoped<IRolePermissionsService, RolePermissionsService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ISelectedCompanyService,SelectedCompanyService>();

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// 2. CORS middleware 
//app.UseCors("AllowOrigins");
app.UseCors(builder => builder
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader());

app.UseHttpsRedirection();

// For JWT Authentication
app.UseAuthentication(); // UseAuthentication should come before UseAuthorization
app.UseAuthorization();

app.MapControllers();

app.Run();

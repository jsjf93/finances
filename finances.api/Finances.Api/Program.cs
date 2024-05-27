using Finances.Api.Domain;
using Finances.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.MapType<DateOnly>(
        () =>
            new OpenApiSchema
            {
                Type = "string",
                Format = "date",
                Example = new OpenApiString(DateTime.UtcNow.ToString("yyyy-MM-dd"))
            }
    );
});

builder.Services.AddProblemDetails();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Database"))
);

var origin = builder.Configuration["CORS:Origin"];
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: "CorsPolicy",
        policy =>
        {
            policy.WithOrigins(origin).AllowAnyHeader().AllowAnyMethod().AllowCredentials();
        }
    );
});

// builder.Services.AddAuthentication();
builder.Services.AddAuthorization();

builder.Services.AddIdentityApiEndpoints<User>().AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.Cookie.SameSite = SameSiteMode.None;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    // options.Events.OnRedirectToLogin = context =>
    // {
    //     context.Response.StatusCode = 401;
    //     return Task.CompletedTask;
    // };
});

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Program).Assembly));

builder.Services.AddHttpContextAccessor();

var app = builder.Build();

app.MapIdentityApi<User>();

app.UseCors("CorsPolicy");

// app.UseProblemDetails();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

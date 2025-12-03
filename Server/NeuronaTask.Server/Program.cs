using FluentValidation;

using Microsoft.EntityFrameworkCore;

using NeuronaTask.Server.Data;
using NeuronaTask.Server.GraphQL;
using NeuronaTask.Server.GraphQL.Filters;
using NeuronaTask.Server.GraphQL.Validators;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(o => o.UseNpgsql(connectionString));

builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    .AddProjections()
    .AddFiltering()
    .AddSorting()
    .AddErrorFilter<ValidationFilter>();

builder.Services.AddCors(o => o.AddPolicy("AllowAll", b => b.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));

builder.Services.AddValidatorsFromAssemblyContaining<PatientCreateValidator>();

var app = builder.Build();

app.UseCors("AllowAll");

app.MapGraphQL();

// Migrate database on startup
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await db.Database.MigrateAsync();
}

app.RunWithGraphQLCommands(args);
using Microsoft.EntityFrameworkCore;
using MeuProjetoApi.Data;

// --- INÍCIO CONFIGURAÇÃO DO APP ---
var builder = WebApplication.CreateBuilder(args);

// Configurar CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// ---------> INCLUA ESSA LINHA AQUI <---------
builder.Services.AddControllers()
    .AddNewtonsoftJson(); // <-- Suporte ao Newtonsoft.Json!

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configurar a conexão com PostgreSQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configurar o pipeline de requisições HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Ativar CORS
app.UseCors();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
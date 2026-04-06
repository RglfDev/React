using apiProducts.Context;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace apiProducts
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(name: "MyPolicy",
                    builder =>
                    {
                        builder.WithOrigins("*").AllowAnyHeader().AllowAnyMethod();
                        //builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
                    });
            });

            services.AddControllers();
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("Conexion")));
            services.AddSwaggerGen(
                c =>
                {
                    //VERSION 2 Y VERSION 1
                    c.SwaggerDoc(
                        name: "v1", new OpenApiInfo
                        {
                            Title = "Api Productos"
                        ,
                            Version = "v1",
                            Description = "Ejemplo de productos Store"
                        });
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                
            }
            app.UseSwagger();
            app.UseSwaggerUI(
                c =>
                {
                    //DEBEMOS CONFIGURAR LA URL DEL SERVIDOR
                    //PARA LA DOCUMENTACION
                    c.SwaggerEndpoint(
                        url: "/swagger/v1/swagger.json"
                        , name: "Api v1");
                    c.RoutePrefix = "";
                });
            //app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "apiProducts v1"));
            app.UseHttpsRedirection();

            app.UseRouting();




            app.UseCors("MyPolicy");
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}

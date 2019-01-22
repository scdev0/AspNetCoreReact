using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using APIAuth0;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;

namespace AspNetCoreTodo.IntegrationTests
{
    public class TestFixture : IDisposable
    {
        private readonly TestServer _server;

        public HttpClient Client { get; }
        public IConfiguration Configuration { get; }

        public TestFixture()
        {
            Configuration = GetConfiguration();

            var builder = new WebHostBuilder()
                .UseStartup<Startup>()
                .UseConfiguration(Configuration);

            _server = new TestServer(builder);
            Client = _server.CreateClient();
        }

        public void Dispose()
        {
            Client.Dispose();
            _server.Dispose();
        }

        private IConfiguration GetConfiguration()
        {
            return new ConfigurationBuilder()
            .SetBasePath(Path.Combine(
                        Directory.GetCurrentDirectory(),
                        @"..\..\.."))
            .AddJsonFile("appsettings.json", optional: false)
            .Build();
        }
    }
}
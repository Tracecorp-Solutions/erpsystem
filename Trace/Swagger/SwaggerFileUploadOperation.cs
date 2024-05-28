using Core.DTOs;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Collections.Generic;
using System.Linq;


namespace Trace.Swagger
{
    public class SwaggerFileUploadOperation : IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            var fileParams = context.MethodInfo.GetParameters().Where(p => p.ParameterType == typeof(IFormFile)).ToList();

            if (!fileParams.Any())
                return;

            operation.Parameters.Clear();

            foreach (var param in fileParams)
            {
                operation.RequestBody = new OpenApiRequestBody
                {
                    Content = new Dictionary<string, OpenApiMediaType>
                    {
                        ["multipart/form-data"] = new OpenApiMediaType
                        {
                            Schema = new OpenApiSchema
                            {
                                Type = "object",
                                Properties = new Dictionary<string, OpenApiSchema>
                                {
                                    [param.Name] = new OpenApiSchema
                                    {
                                        Type = "string",
                                        Format = "binary"
                                    }
                                },
                                Required = new HashSet<string> { param.Name }
                            }
                        }
                    }
                };
            }

            var userDetailsParam = context.MethodInfo.GetParameters().FirstOrDefault(p => p.ParameterType == typeof(UserDTO));
            if (userDetailsParam != null)
            {
                operation.RequestBody.Content["multipart/form-data"].Schema.Properties.Add("userDTO", new OpenApiSchema
                {
                    Type = "object",
                    Properties = new Dictionary<string, OpenApiSchema>
                    {
                        ["name"] = new OpenApiSchema { Type = "string" },
                        ["email"] = new OpenApiSchema { Type = "string" },
                        ["age"] = new OpenApiSchema { Type = "integer", Format = "int32" }
                    }
                });
            }
        }
    }
}

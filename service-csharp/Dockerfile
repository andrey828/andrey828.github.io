FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app
COPY . .
RUN dotnet new console -n PolyglotCSharp -o . --force
COPY Program.cs ./Program.cs
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/runtime:8.0
WORKDIR /app
COPY --from=build /app/out .
ENTRYPOINT ["dotnet", "PolyglotCSharp.dll"]

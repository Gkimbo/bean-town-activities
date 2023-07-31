const getDatabaseUrl = (nodeEnv) => {
  return (
    {
      development: "postgres://postgres:postgres@localhost:5432/bean-town-activities_development",
      test: "postgres://postgres:postgres@localhost:5432/bean-town-activities_test",
      e2e: "postgres://postgres:postgres@localhost:5432/bean-town-activities_e2e",
    }[nodeEnv] || process.env.DATABASE_URL
  );
};

module.exports = getDatabaseUrl;

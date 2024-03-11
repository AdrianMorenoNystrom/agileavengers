import app from "./app.mjs";

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

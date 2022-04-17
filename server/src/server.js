import app from './app';

const PORT = process.env.PORT || 3080;

app.listen(PORT, () => {
  console.log(`${process.env.NODE_ENV} server is listening on port ${PORT}`);
});

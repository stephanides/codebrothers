import { App } from './App';

const port = 3000;
const app = new App().app;

app.listen(port, (err) => {
  if (err) {
    return console.log(err)
  } else {
  	return console.log(`server is listening on ${port}`);
  }
});
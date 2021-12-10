const Koa = require('koa');
const cors = require('koa2-cors');
const koaBody = require('koa-body');
const Router = require('koa-router');
const { v4: uuidv4 } = require('uuid');
const { streamEvents } = require('http-event-stream');
const router = new Router();
const app = new Koa();
const Match = require('./match');
const match = new Match();

app.use(koaBody({
    urlencoded: true,
    multipart: true,
    json:true,
}));

app.use(
  cors({
    origin: '*',
    credentials: true,
    'Access-Control-Allow-Origin': true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
)

match.game();

router.get('/sse', async (ctx) => {
    streamEvents(ctx.req, ctx.res, {
      async fetch() {
        return [];
      },
      stream(sse) {
        sse.sendEvent({
          id: uuidv4(),
          data: JSON.stringify({
            fullMatch: match.events,
            count: match.events.length
          }),
          event: 'comment'
        });
        const interval = setInterval(() => {
          sse.sendEvent({
            id: uuidv4(),
            data: JSON.stringify({
              events: match.events[match.events.length - 1],
              count: match.events.length
            }),
            event: 'comment'
          });
        }, 10000);
        return () => clearInterval(interval);
      }
    });
  ctx.respond = false;
});


app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 3333;

app.listen(port, () => console.log('Server started'));

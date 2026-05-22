import { Elysia } from "elysia";
import "./src/member/repository/init";

const port: number = 3000;
const app: Elysia = new Elysia().listen(port);

const hostname: string | undefined = app.server?.hostname;
const serverPort: number | undefined = app.server?.port;

console.log(`Server running at ${hostname}:${serverPort}`);
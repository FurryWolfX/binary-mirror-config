import fs from "fs";
import request from "postman-request";

request.get(
  "https://raw.githubusercontent.com/cnpm/binary-mirror-config/master/package.json",
  {
    proxy: "http://127.0.0.1:7890",
  },
  (err, res, body) => {
    body = JSON.parse(body);
    const envs = body.mirrors.china.ENVS;
    const contents = [];
    Object.keys(envs).forEach((key) => {
      contents.push(`${key}=${envs[key]}`);
    });
    fs.writeFileSync(".npmrc", contents.join("\n"));
  }
);

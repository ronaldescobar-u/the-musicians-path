import path from 'path';
import { DockerComposeEnvironment, Wait } from 'testcontainers';

export default async () => {
  const composeFilePath = path.resolve(__dirname, "../../");
  const composeFile = "docker-compose.yml";

  // const envi = await new DockerComposeEnvironment(
  //   composeFilePath,
  //   composeFile
  // )
  //   .up();

  // const container = envi.getContainer('flyway-1');
  // (await container.logs())
  //   .on("data", line => console.log(line))
  //   .on("err", line => console.error(line))
  //   .on("end", () => console.log("Stream closed"));

  //   global.__ENVIRONMENT__ = envi;
  global.__ENVIRONMENT__ = await new DockerComposeEnvironment(
    composeFilePath,
    composeFile
  )
    .withWaitStrategy("flyway-1", Wait.forLogMessage(/^Successfully applied/))
    .up();

  await new Promise((x) => setTimeout(x, 500));
}

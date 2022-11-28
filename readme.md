# Rest API Demo with Typescript, Express and using a Xata Data-base.

This demo utilizes TypeScript and it's amazing features with a <a href="https://xata.io/" target="_blanc"><img src="./readme/xata-logo.png" height="25px"></a> database.

after creating an account with `xata` you can create a simple database `jobs` and create the following columns:

- company `:string`
- title `:string`
- jobLink `:string`
- location `:string`

**In case you are building this from scratch:**

you can click on the button: <img src="./readme/btn.jpg" height="22px"> to get the codes to install the xata cli and initialize the project locally in your project:

```shell
npm install @xata.io/cli -g

xata init --db https://alpha-mo-s-test-workspace-pg3t79.eu-west-1.xata.sh/db/alpha-jobs-demo-board
```

or simply clone this repository and run `npm i`

| Dependency  | description                                                                        |
| :---------- | :--------------------------------------------------------------------------------- |
| TypeScript  | no surprise here!                                                                  |
| @types/node | Ambient types are types that get added to the global execution scope.              |
| ts-node     | for running TypeScript code directly without having to wait for it be compiled     |
| nodemon     | to watch for changes to our code and automatically restart when a file is changed. |
| rimraf      | to clean and compile the project for production.                                   |
| express     | no surprise here it is an API after all!                                           |

Configurations for `nodemon.json`

```json
{
  "watch": ["src"],
  "ext": ".ts,.js",
  "ignore": [],
  "exec": "npx ts-node ./src/index.ts"
}
```

<br>

`typescript MyResponse<T>` will give the ability of defining the response of type data or of type error:

```typescript
type MyResponse<T> =
  | {
      error: string
    }
  | {
      data: T
    }
```

<br>

**endpoints:**
Nothing fancy here simple CRUD operations as a simple example.

### Scripts:

Check the `package.json` for development and production run scripts.

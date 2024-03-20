import * as path from "path";
import * as handlebars from "handlebars";
import * as inquirer from "inquirer";
import {
  cwd,
  chalk,
  execa,
  fs,
  startSpinner,
  succeedSpiner,
  failSpinner,
  warn,
  info,
  error,
} from "../lib";
const download = require("download-git-repo");

// 检查是否已经存在相同名字工程
export const checkProjectExist = async (targetDir) => {
  if (fs.existsSync(targetDir)) {
    const answer = await inquirer.prompt({
      type: "list",
      name: "checkExist",
      message: `\n仓库路径${targetDir}已存在，请选择`,
      choices: ["覆盖", "取消"],
    });
    if (answer.checkExist === "覆盖") {
      warn(`删除${targetDir}...`);
      fs.removeSync(targetDir);
    } else {
      return true;
    }
  }
  return false;
};

//src是需要copy函数中src目录的遍历结果，包括子文件路径和子目录路径
// const filterObj = {
//   filter:  (src, dest) =>{
//         let reg = new RegExp('node_modules')
//         if (reg.test(src)) {
//           return false; //通过过滤条件，该目录不允许复制到dest目录
//         } else {
//           return true; //复制到dest目录
//         }
//     }
// }

export const getQuestions = async (projectName) => {
  return await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: `package name: (${projectName})`,
      default: projectName,
    },
    {
      type: "input",
      name: "description",
      message: "description",
    },
    {
      type: "list",
      name: "type",
      message: "项目类型",
      default: "vue3+vite+pc",
      choices: [
        { name: "vue3+vite+pc", value: "vue3-vite-pc" },
        { name: "vue3+vite+h5", value: "vue3-vite-h5" },
      ],
    },
  ]);
};

const templates = {
  "vue3-vite-pc": {
    downloadUrl: "direct:http://10.80.4.16/epc-fe/raffles-cli.git#vue3-vite-pc",
    description: "vue3-vite-pc模板",
  },
  "vue3-vite-h5": {
    downloadUrl: "direct:http://10.80.4.16/epc-fe/raffles-cli.git#vue3-vite-h5",
    description: "vue3-vite-h5模板",
  },
};

export const cloneProject = async (targetDir, projectName, projectInfo) => {
  startSpinner(`开始创建私服仓库 ${chalk.cyan(targetDir)}`);

  // 复制'project-template'到目标路径下创建工程
  // await fs.copy(
  //   path.join(__dirname, '..', '..', 'project-template', projectInfo.type),
  //   targetDir,
  //   filterObj
  // )
  const { downloadUrl } = templates[projectInfo.type];
  download(downloadUrl, projectName, { clone: true }, (err) => {
    if (err) {
      error(err);
      return;
    }
    // handlebars模版引擎解析用户输入的信息存在package.json
    const jsonPath = `${targetDir}/package.json`;
    const jsonContent = fs.readFileSync(jsonPath, "utf-8");
    const jsonResult = handlebars.compile(jsonContent)(projectInfo);
    fs.writeFileSync(jsonPath, jsonResult);

    // 新建工程装包
    // execa.commandSync('npm install', {
    //   stdio: 'inherit',
    //   cwd: targetDir,
    // })

    succeedSpiner(
      `仓库创建完成 ${chalk.yellow(projectName)}\n👉 输入以下命令开启:`,
    );

    info(`$ cd ${projectName}\n$ npm run dev\n`);
  });
};

const action = async (projectName: string, cmdArgs?: any) => {
  try {
    const targetDir = path.join(
      (cmdArgs && cmdArgs.context) || cwd,
      projectName,
    );
    if (!(await checkProjectExist(targetDir))) {
      const projectInfo = await getQuestions(projectName);
      await cloneProject(targetDir, projectName, projectInfo);
    }
  } catch (err) {
    failSpinner(err);
    return;
  }
};

export default {
  command: "create <registry-name>",
  description: "创建一个npm私服仓库",
  optionList: [["--context <context>", "上下文路径"]],
  action,
};

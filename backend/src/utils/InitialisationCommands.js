const initialCommands = {
  default: ["/bin/bash"],
  angular: (projectName) => [
    "/bin/bash",
    "-c",
    `cd */ && npm install -g @angular/cli && ng new ${projectName}`,
  ],
};

const generateInitCommands = (template, projectName) => {
  const cmd = initialCommands[template];
  return typeof cmd === "function" ? cmd(projectName) : cmd;
};

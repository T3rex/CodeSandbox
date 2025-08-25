const initialCommands = {
  default: ["/bin/bash", "-c", "cd */ && npm install && npm run dev & bash"],
  angular: ["/bin/bash", "-c", "cd */ && npm start & bash"],
};

const generateInitCommands = (template) => {
  return initialCommands[template] || initialCommands.default;
};

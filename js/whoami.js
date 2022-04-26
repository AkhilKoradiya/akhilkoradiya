const BLACKLISTED_KEY_CODES = [38];
const SECRET_COMMANDS = ["echo","whoami"];
const COMMANDS = {
  help:
    '<div class="terminal-line command"> Supported commands: <span class="code">education</span>, <span class="code">skills</span>, <span class="code">contact</span>, <span class="code">docs</span>, <span class="code">projects</span>,<span class="code">tools</span></div> ',
  // skills, Education, docs ,contact, projects ,tools
  projects:
    '<div class="terminal-line command"> My Projects : <br> <a href="https://github.com/akhilkoradiya?tab=repositories" class="success link">Github</a> </div>',
  skills:
    '<div class="terminal-line command"> H@cking : Kali Linux ,Ethical Hacking ,Cyber Security ,Social Engineering </br>Web H@cking : Web Information Gathering ,Web Penetration ,Deep/Dark Web Surfing </br>Languages : Python, React Native, Node JS </br>App: Android Studio ,Ardino ,expo ,Photoshop </div>',
  education:
    '<div class="terminal-line command"> University : Atmiya University ,Rajkot <br> - Computer Engineer Bachelor Degree </div>',
  docs:
  '<div class="terminal-line command"> My Documentation : <br> <a href="https://akhil-koradiya-21.gitbook.io" class="success link">Hacking Notes</a> </div>',
  tools:
  '<div class="terminal-line command"> My tools : <br> <a href="" class="success link">Coming soon...</a> </div>',
  contact:
    '<div class="terminal-line command"> You can contact me on any of following links: <br> <a href="https://github.com/akhilkoradiya" class="success link">Github</a> ,<a href="https://twitter.com/akhilkoradiya21" class="success link">Twitter</a>, <a href="mailto:akhilkoradiya@gmail.com" class="success link">Email</a> </div>'
};
let userInput, terminalOutput;

const app = () => {
  userInput = document.getElementById("userInput");
  terminalOutput = document.getElementById("terminalOutput");
  document.getElementById("dummyKeyboard").focus();
  console.log("Application loaded");
};

const execute = function executeCommand(input) {
  let output;
  input = input.toLowerCase();
  if (input.length === 0) {
    return;
  }
  output = `<div class="terminal-line"><span class="id">root</span>@<span class="pc-name">akhil</span> <span class="directory">~</span> ${input} </div>`;

  switch(input){
    case ('whoami'):
      output += `<div class="terminal-line command"> <a>Akhil Koradiya</a></div>`;
      break;
    case ('echo' + input.replace('echo','')):
      output += `<div class="terminal-line command"> ${input.replace('echo','')}</div>`;
  }

  if(COMMANDS.hasOwnProperty(input)){
    output += COMMANDS[input];
  }
  else if (!SECRET_COMMANDS.includes(input.split(" ")[0])){
    output += `<div class="terminal-line command">no such command: ${input}</div>`;
    console.log("Oops! no such command");
  }

  terminalOutput.innerHTML = `${terminalOutput.innerHTML}<div class="terminal-line">${output}</div>`;
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
};

const key = function keyEvent(e) {
  const input = userInput.innerHTML;

  if (BLACKLISTED_KEY_CODES.includes(e.keyCode)) {
    return;
  }

  if (e.key === "Enter") {
    execute(input);
    userInput.innerHTML = "";
    return;
  }

  userInput.innerHTML = input + e.key;
};

const backspace = function backSpaceKeyEvent(e) {
  if (e.keyCode !== 8 && e.keyCode !== 46) {
    return;
  }
  userInput.innerHTML = userInput.innerHTML.slice(
    0,
    userInput.innerHTML.length - 1
  );
};

document.addEventListener("keydown", backspace);
document.addEventListener("keypress", key);
document.addEventListener("DOMContentLoaded", app);

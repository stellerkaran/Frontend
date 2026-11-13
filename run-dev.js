const { spawn } = require('child_process');

// We filter out any arguments that look like "--host" because they cause next dev to crash
const args = process.argv.slice(2);
const filteredArgs = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--host') {
    // If there is an argument after --host and it is a value (like 0.0.0.0), skip it as well
    if (i + 1 < args.length && !args[i+1].startsWith('-')) {
      i++;
    }
    continue;
  }
  filteredArgs.push(args[i]);
}

// Prepare next dev arguments
const finalArgs = ['dev'];

// Ensure standard port and host are specified if not already provided
if (!filteredArgs.includes('-p') && !filteredArgs.includes('--port')) {
  finalArgs.push('-p', '3000');
}
if (!filteredArgs.includes('-H') && !filteredArgs.includes('--hostname')) {
  finalArgs.push('-H', '0.0.0.0');
}

// Append any other safe extra options passed in
finalArgs.push(...filteredArgs);

console.log('Running:', 'npx next', finalArgs.join(' '));

const nextProc = spawn('npx', ['next', ...finalArgs], { stdio: 'inherit', shell: true });

nextProc.on('exit', (code) => {
  process.exit(code || 0);
});

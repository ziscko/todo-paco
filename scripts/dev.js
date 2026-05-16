const { spawn, execSync } = require("child_process");
const path = require("path");

// Compile Electron main process
console.log("⚡ Compiling Electron main...");
execSync("npx tsc -p tsconfig.electron.json", { stdio: "inherit" });

// Start Vite dev server
console.log("⚡ Starting Vite dev server...");
const vite = spawn("npx", ["vite", "--port", "5173"], {
  stdio: "pipe",
  shell: true,
});

vite.stdout.on("data", (data) => {
  const output = data.toString();
  process.stdout.write(output);

  // When Vite is ready, launch Electron
  if (output.includes("Local:")) {
    console.log("\n⚡ Launching Electron...");
    const electron = spawn("npx", ["electron", "./dist-electron/main.js"], {
      stdio: "inherit",
      shell: true,
      env: {
        ...process.env,
        VITE_DEV_SERVER_URL: "http://localhost:5173",
      },
    });

    electron.on("close", () => {
      vite.kill();
      process.exit();
    });
  }
});

vite.stderr.on("data", (data) => {
  process.stderr.write(data);
});

#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const chokidar = require('chokidar');
const readline = require('readline');

const CONFIG_FILE = '.Auto_github_commit';

async function run() {
    console.log("🔍 Checking for configuration...");

    if (!fs.existsSync(CONFIG_FILE)) {
        console.log("🛠️ Setup required.");
        
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const ask = (query) => new Promise((resolve) => rl.question(query, resolve));

        try {
            // 1. Ask questions FIRST
            const repoUrl = await ask("🔗 Paste the GitHub Repo URL: ");
            const branch = await ask("🌿 Branch name (default: develop): ");
            const finalBranch = branch.trim() || 'develop';

            // 2. Create the config object
            const config = {
                repoUrl: repoUrl.trim(),
                targetBranch: finalBranch
            };

            // 3. Save the file
            fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
            console.log("✅ Config saved to .Auto_github_commit");

            // 4. NOW set up Git using the new config
            if (!fs.existsSync('.git')) {
                console.log("🗂️ Initializing new Git repository...");
                execSync('git init');
            }

            try {
                execSync(`git remote add origin ${config.repoUrl}`, { stdio: 'ignore' });
            } catch (e) {
                execSync(`git remote set-url origin ${config.repoUrl}`);
            }
            
            console.log("🚀 Git remote configured successfully!");
            rl.close();
        } catch (err) {
            console.error("❌ Setup failed:", err.message);
            rl.close();
            process.exit(1);
        }
    }

    // Load the config (either newly created or existing) and start
    const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
    startWatcher(config);
}

function startWatcher(config) {
    console.log(`\n🚀 MONITORING STARTED`);
    console.log(`🌿 Branch: ${config.targetBranch}`);
    console.log(`📡 Remote: ${config.repoUrl}`);
    console.log(`------------------------------------------`);

    const watcher = chokidar.watch('.', {
        ignored: [/node_modules/, /\.git/, new RegExp(CONFIG_FILE)],
        ignoreInitial: true,
        persistent: true
    });

    let debounceTimer;

    watcher.on('all', (event, path) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            try {
                console.log(`📦 [${new Date().toLocaleTimeString()}] Change in ${path}. Syncing...`);
                execSync(`git add .`);
                execSync(`git commit -m "Auto-sync: ${new Date().toLocaleTimeString()}" --quiet`);
                
                // Ensure we are pushing to the specific branch requested
                execSync(`git push origin ${config.targetBranch} --quiet`);
                console.log(`✅ Push successful!`);
            } catch (error) {
                console.log("⚠️ Git error (Check internet or if branch exists on GitHub)");
            }
        }, 3000);
    });
}

run();
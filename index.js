#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const chokidar = require('chokidar');
const readline = require('readline');

const CONFIG_FILE = '.Auto_github_commit';

async function run() {
    console.clear();
    console.log("🔍 Checking for configuration...");

    if (!fs.existsSync(CONFIG_FILE)) {
        console.log("🛠️ --- First-time Setup ---");
        
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const ask = (query) => new Promise((resolve) => rl.question(query, resolve));

        try {
            const repoUrl = await ask("🔗 Paste the GitHub Repo URL: ");
            const branch = await ask("🌿 Branch name (default: develop): ");
            const finalBranch = branch.trim() || 'develop';

            const config = {
                repoUrl: repoUrl.trim(),
                targetBranch: finalBranch
            };

            fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
            console.log("✅ Config saved to .Auto_github_commit");

            // --- FOOL-PROOF GIT SETUP ---
            // 1. Ensure Git is initialized
            if (!fs.existsSync('.git')) {
                console.log("🗂️ Initializing new Git repository...");
                execSync('git init', { stdio: 'ignore' });
            }

            // 2. Force create and switch to branch
            try {
                execSync(`git checkout -b ${config.targetBranch}`, { stdio: 'ignore' });
            } catch (e) {
                execSync(`git checkout ${config.targetBranch}`, { stdio: 'ignore' });
            }

            // 3. Set the remote URL
            try {
                execSync(`git remote add origin ${config.repoUrl}`, { stdio: 'ignore' });
            } catch (e) {
                execSync(`git remote set-url origin ${config.repoUrl}`, { stdio: 'ignore' });
            }

            // 4. Force an initial sync to prevent "Unrelated Histories" error
            console.log("🔄 Syncing with remote repository...");
            try {
                execSync(`git pull origin ${config.targetBranch} --allow-unrelated-histories --no-edit`, { stdio: 'ignore' });
            } catch (e) {
                // Fails silently if the GitHub repo is completely empty, which is fine!
            }
            
            console.log("🚀 Setup Complete!");
            rl.close();
        } catch (err) {
            console.error("❌ Setup failed:", err.message);
            rl.close();
            process.exit(1);
        }
    }

    // Load config and start watcher
    const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
    startWatcher(config);
}

function startWatcher(config) {
    console.log(`\n🚀 ELFRED'S AUTO-SYNC IS LIVE`);
    console.log(`🌿 Branch: ${config.targetBranch}`);
    console.log(`📡 Remote: ${config.repoUrl}`);
    console.log(`------------------------------------------`);

    const watcher = chokidar.watch('.', {
        // Ignore files that shouldn't trigger a push
        ignored: [/node_modules/, /\.git/, new RegExp(CONFIG_FILE), /dist/, /build/],
        ignoreInitial: true,
        persistent: true
    });

    let debounceTimer;

    watcher.on('all', (event, path) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            try {
                console.log(`📦 [${new Date().toLocaleTimeString()}] Change detected in ${
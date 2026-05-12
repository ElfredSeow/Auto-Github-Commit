# 🚀 Auto-GitHub-Commit

**A "Fool-Proof" Git automation tool that watches your files and instantly syncs your edits to GitHub.** Tired of typing `git add .`, `git commit -m "update"`, and `git push` every time you make a minor change? **Auto-GitHub-Commit** runs silently in the background, automatically pulling remote changes, committing your local saves, and pushing them to a target branch of your choice.

Perfect for hackathons, maintaining a high-frequency contribution graph, or just staying in your coding flow state.

---

## ✨ Key Features

* **Zero-Config Start:** Uses an interactive CLI to set up your Git repository and remote URL automatically.
* **Fool-Proof Git Handling:** Automatically handles branch creation, initial syncs, and bypassing "unrelated histories" errors.
* **Smart Syncing (Debounce):** Waits 3 seconds after you stop saving before committing, so you don't spam GitHub with half-finished thoughts.
* **Multi-Device Ready:** Automatically runs `git pull` before every push to ensure you never get locked out by merge conflicts if you switch computers.
* **Clutter-Free:** Ignores `/node_modules`, `/build`, and `/dist` folders to keep your repository clean.

---

## 🛠️ Prerequisites

Before using this tool, make sure you have the following installed:
* [Node.js](https://nodejs.org/) (v14 or higher)
* [Git](https://git-scm.com/) installed and configured with your GitHub credentials (SSH or HTTPS).

---

## 💻 Quick Start

You don't even need to install this globally. You can run it instantly using `npx` inside any of your project folders.

### Step 1: Open your project folder
Open your terminal and navigate to the root folder of the project you want to work on.
```bash
cd path/to/your/project
```

### Step 2: Run the Plugin
Execute the tool via `npx`:
```bash
npx repo-autosync
```
*(Note: If you published under a different unique package name, replace `repo-autosync` with your actual package name).*

### Step 3: Answer the Setup Prompts (First Time Only)
If this is your first time running the tool in this folder, it will guide you through a quick setup:
1. Paste your **GitHub Repository URL** (e.g., `https://github.com/Username/Repo.git`).
2. Type the **Branch Name** you want to sync to (defaults to `develop`).

### Step 4: Code!
Leave the terminal open in the background. Every time you hit `Ctrl + S` (Save), the tool will automatically sync your changes to GitHub.

---

## ⚙️ How it Works Under the Hood

When you run the tool for the first time, it generates a small hidden file called `.Auto_github_commit` in your project root. This acts as the tool's memory.

If your folder doesn't have a `.git` repository initialized, the tool will automatically:
1. Run `git init`.
2. Create and switch to your target branch.
3. Link your remote GitHub URL.
4. Pull any existing files from GitHub to prevent sync errors.

**⚠️ Pro-Tip:** We recommend adding `.Auto_github_commit` to your `.gitignore` file if you don't want your personal sync settings pushed to the public repository.

---

## 🛑 Stopping the Tool
To stop the auto-syncing, simply go to the terminal running the process and press `Ctrl + C`.

---

## 🐛 Troubleshooting

| Issue | Solution |
| :--- | :--- |
| **Tool crashes on startup** | Ensure you are running the command in a regular terminal (Command Prompt, PowerShell, Git Bash) and not a locked "Debug Console" in your IDE. |
| **"Sync paused" warning** | This usually means your computer lost internet connection, or there is a massive merge conflict that requires manual human intervention. |
| **Commits are too frequent** | The tool waits 3 seconds after a file changes. If you use "Auto-Save" in VS Code, we recommend turning it off or increasing the delay while using this tool. |

---

## 👨‍💻 Author
Built by [Manfred Siew (ElfredSeow)](https://github.com/ElfredSeow)  
*Aspiring Software Engineer passionate about building impactful projects and developer tools.*

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
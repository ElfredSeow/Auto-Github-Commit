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
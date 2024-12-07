import os
import shutil
import subprocess

def get_git_status():
    """
    Get the git status to check for uncommitted changes and list files.
    """
    status = subprocess.check_output(['git', 'status', '--porcelain'], text=True)
    return status

def get_git_commits():
    """
    Get the list of recent commits to evaluate changes.
    """
    commits = subprocess.check_output(['git', 'log', '--oneline'], text=True)
    return commits

def classify_files(files):
    """
    Classify files into different categories based on their type or purpose.
    """
    file_categories = {
        'backend': [],
        'frontend': [],
        'config': [],
        'docs': [],
        'misc': []
    }
    
    for file in files:
        if file.endswith('.py'):
            if 'backend' in file:
                file_categories['backend'].append(file)
            else:
                file_categories['misc'].append(file)
        elif file.endswith('.html') or file.endswith('.js') or file.endswith('.css'):
            file_categories['frontend'].append(file)
        elif file.endswith('.json') or file.endswith('.yaml') or file.endswith('.toml'):
            file_categories['config'].append(file)
        elif file.endswith('.md'):
            file_categories['docs'].append(file)
        else:
            file_categories['misc'].append(file)

    return file_categories

def move_files(file_categories):
    """
    Move files into their respective directories based on classification.
    """
    for category, files in file_categories.items():
        # Create directories if they don't exist
        if not os.path.exists(category):
            os.makedirs(category)
        
        for file in files:
            # Move each file to its category directory
            try:
                if os.path.exists(file):
                    shutil.move(file, os.path.join(category, file))
            except Exception as e:
                print(f"Error moving file {file}: {e}")

def generate_commit_summary(commits):
    """
    Generate a summary of commits, analyzing the evolution of the repository.
    """
    commit_summary = "Commit History Summary:\n"
    for commit in commits.splitlines():
        commit_summary += f"- {commit}\n"
    return commit_summary

def evaluate_and_reorganize():
    """
    Main function that evaluates the repository, classifies and moves files,
    and provides a commit history summary.
    """
    # Get the list of files and commits in the repo
    files = [f for f in os.listdir() if os.path.isfile(f)]
    status = get_git_status()
    commits = get_git_commits()

    # Classify files into categories
    file_categories = classify_files(files)
    
    # Move files into their respective directories
    move_files(file_categories)

    # Generate commit history summary
    commit_summary = generate_commit_summary(commits)

    print("Repository reorganized successfully.")
    print("Commit History Summary:")
    print(commit_summary)

    # Return file classification for reference
    return file_categories

if __name__ == "__main__":
    evaluate_and_reorganize()
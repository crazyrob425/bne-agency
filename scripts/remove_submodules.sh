#!/usr/bin/env bash
set -euo pipefail

# remove_submodules.sh
# Scans the index for gitlinks (submodules), removes them from the index,
# deletes their .git/modules entry, and replaces the path with a placeholder
# directory containing .gitkeep so CI/builds that can't fetch submodules still
# get a valid directory.
#
# Usage:
#   git fetch --all && git checkout -b fix/remove-submodules
#   ./scripts/remove_submodules.sh
#
# After running the script, review the changes, then push & open a PR:
#   git push origin HEAD
#
# WARNING: This permanently removes the submodule link from the branch you run
# it on. If you want to preserve submodule history, run this on a feature branch.

# Make sure we're in a git repository
if [ "$(git rev-parse --is-inside-work-tree 2>/dev/null || true)" != "true" ]; then
  echo "Error: not inside a git repository." >&2
  exit 1
fi

# Find gitlinks in the index: mode 160000
mapfile -t paths < <(git ls-files --stage | awk '$1 == "160000" { print $4 }')

if [ ${#paths[@]} -eq 0 ]; then
  echo "No submodules (gitlinks) detected in this repository. Nothing to do."
  exit 0
fi

echo "Detected submodule paths:" >&2
for p in "${paths[@]}"; do echo "  - $p"; done

read -p "Proceed to remove these submodules from the index and add placeholders? (y/N) " yn
yn=${yn:-N}
if [[ "$yn" != "y" && "$yn" != "Y" ]]; then
  echo "Aborting." >&2
  exit 1
fi

# Create a temporary branch if user isn't on one
current_branch=$(git rev-parse --abbrev-ref HEAD)
if [ "$current_branch" = "HEAD" ]; then
  echo "You are in detached HEAD. Create a branch first (git checkout -b fix/remove-submodules) and re-run this script." >&2
  exit 1
fi

for path in "${paths[@]}"; do
  echo "Processing submodule: $path" >&2

  # Try to deinit first (safe even if missing)
  git submodule deinit -f -- "$path" 2>/dev/null || true

  # Remove the gitlink from the index and working tree
  git rm -f -- "$path" || true

  # Remove any loose module metadata
  if [ -d ".git/modules/$path" ]; then
    echo "Removing .git/modules/$path" >&2
    rm -rf ".git/modules/$path"
  fi

  # Replace with placeholder dir so builds expecting a path won't fail
  mkdir -p "$path"
  touch "$path/.gitkeep"
  git add "$path/.gitkeep"

done

# Commit the removal and placeholders
git commit -m "chore: remove submodules and add placeholders to allow CI builds to run without submodule access"

echo "Submodules removed from index and placeholders added. Review git status and push the branch when ready:"

echo "  git status --porcelain"
echo "  git show --name-only --pretty="" HEAD"
echo "When ready: git push origin HEAD"

echo "If you intended to keep the submodule content instead of placeholders, now copy the real content into the path(s) before running 'git add' and committing."

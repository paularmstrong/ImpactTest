#!/bin/sh

echo "Updating Commit Hooks..."
cp .githooks/* .git/hooks/
chmod -R +x .git/hooks/

echo "Updating Local Git Config..."
git config --local color.diff auto
git config --local color.status auto
git config --local color.branch auto
git config --local color.interactive auto
git config --local core.whitespace "trailing-space,space-before-tab"
git config --local apply.whitespace "fix"

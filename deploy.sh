#!/bin/bash
# Stop on initial errors
set -e

echo "🔒 Verifying GitHub Authentication..."
if ! gh auth status &>/dev/null; then
    echo "❌ You are not logged into GitHub CLI."
    echo "▶️ Please run: gh auth login"
    echo "Then re-run this script: ./deploy.sh"
    exit 1
fi

echo "🚀 Creating public GitHub Repository 'ai-website-project'..."
gh repo create ai-website-project --public --source=. --remote=origin --push || true

echo "⚙️ Enabling GitHub Pages from the main branch..."
OWNER=$(gh api user -q .login)

if [ -n "$OWNER" ]; then
  # Give GitHub a second to initialize the repo before pinging the Pages API
  sleep 3
  gh api --silent -X POST /repos/$OWNER/ai-website-project/pages -f "source[branch]=main" -f "source[path]=/" || echo "Pages may already be enabled or an error occurred."
  
  echo "------------------------------------------------"
  echo "✅ Deployment Process Completed Successfully!"
  echo "🌐 Your Live URL will be ready in a few minutes at:"
  echo "👉 https://$OWNER.github.io/ai-website-project/"
  echo "------------------------------------------------"
else
  echo "❌ Error: Could not retrieve GitHub username."
fi

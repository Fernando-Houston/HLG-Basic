#!/bin/bash

# T2 Branding Update Script
# Updates all blue-green gradients to green theme

echo "Starting branding updates..."

# Function to update file with sed
update_file() {
    local file=$1
    echo "Updating $file"
    
    # Replace blue-green gradients with green
    sed -i '' 's/from-blue-600 to-green-600/bg-green-600/g' "$file"
    sed -i '' 's/hover:from-blue-700 hover:to-green-700/hover:bg-green-700/g' "$file"
    sed -i '' 's/bg-gradient-to-r from-blue-600 to-green-600/bg-green-600/g' "$file"
    sed -i '' 's/bg-gradient-to-br from-blue-600 to-green-600/bg-green-600/g' "$file"
    sed -i '' 's/bg-gradient-to-br from-blue-500 to-green-500/bg-green-600/g' "$file"
    sed -i '' 's/bg-gradient-to-r from-blue-500 to-green-500/bg-green-500/g' "$file"
    
    # Replace blue colors with green
    sed -i '' 's/bg-blue-100/bg-green-100/g' "$file"
    sed -i '' 's/text-blue-700/text-green-700/g' "$file"
    sed -i '' 's/text-blue-600/text-green-600/g' "$file"
    sed -i '' 's/hover:text-blue-600/hover:text-green-600/g' "$file"
    sed -i '' 's/hover:bg-blue-50/hover:bg-green-50/g' "$file"
    sed -i '' 's/border-blue-500/border-green-600/g' "$file"
    sed -i '' 's/border-blue-600/border-green-600/g' "$file"
    sed -i '' 's/text-blue-500/text-green-500/g' "$file"
    sed -i '' 's/bg-blue-500/bg-green-500/g' "$file"
    sed -i '' 's/bg-blue-600/bg-green-600/g' "$file"
    sed -i '' 's/bg-blue-700/bg-green-700/g' "$file"
    sed -i '' 's/hover:bg-blue-700/hover:bg-green-700/g' "$file"
    sed -i '' 's/hover:bg-blue-800/hover:bg-green-800/g' "$file"
    sed -i '' 's/text-blue-200/text-green-200/g' "$file"
    sed -i '' 's/focus:ring-blue-500/focus:ring-green-500/g' "$file"
    sed -i '' 's/focus:border-blue-500/focus:border-green-500/g' "$file"
}

# Update all TypeScript/React files
find src -name "*.tsx" -type f | while read -r file; do
    update_file "$file"
done

# Update CSS files
update_file "src/index.css"

echo "Branding updates completed!"
echo "Remember to:"
echo "1. Update Header.tsx and Footer.tsx with the new logo"
echo "2. Test the build with 'npm run build'"
echo "3. Check visual consistency across all pages"
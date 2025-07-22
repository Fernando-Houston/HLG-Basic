#!/bin/bash

# Fix gradient syntax issues - replace "bg-gradient-to-r bg-green-600" with "from-green-600"
echo "Fixing gradient syntax issues..."

# Fix FindDevelopmentSitesPage.tsx
sed -i '' 's/bg-gradient-to-br bg-green-600/bg-gradient-to-br from-green-600 to-green-700/g' src/pages/FindDevelopmentSitesPage.tsx
sed -i '' 's/bg-gradient-to-r bg-green-600/bg-gradient-to-r from-green-600 to-green-700/g' src/pages/FindDevelopmentSitesPage.tsx

# Fix NotFoundPage.tsx
sed -i '' 's/bg-gradient-to-r bg-green-600/bg-gradient-to-r from-green-600 to-green-700/g' src/pages/NotFoundPage.tsx

# Fix ContactPage.tsx
sed -i '' 's/bg-gradient-to-br bg-green-600/bg-gradient-to-br from-green-600 to-green-700/g' src/pages/ContactPage.tsx
sed -i '' 's/bg-gradient-to-r bg-green-600/bg-gradient-to-r from-green-600 to-green-700/g' src/pages/ContactPage.tsx

# Fix TermsOfServicePage.tsx
sed -i '' 's/bg-gradient-to-r bg-green-600/bg-gradient-to-r from-green-600 to-green-700/g' src/pages/TermsOfServicePage.tsx

# Fix AboutPage.tsx
sed -i '' 's/bg-gradient-to-br bg-green-600/bg-gradient-to-br from-green-600 to-green-700/g' src/pages/AboutPage.tsx
sed -i '' 's/bg-gradient-to-r bg-green-600/bg-gradient-to-r from-green-600 to-green-700/g' src/pages/AboutPage.tsx

# Fix PrivacyPolicyPage.tsx
sed -i '' 's/bg-gradient-to-r bg-green-600/bg-gradient-to-r from-green-600 to-green-700/g' src/pages/PrivacyPolicyPage.tsx

# Fix Chapter42ToolPage.tsx
sed -i '' 's/bg-gradient-to-r bg-green-600/bg-gradient-to-r from-green-600 to-green-700/g' src/pages/tools/Chapter42ToolPage.tsx

# Fix TimelineToolPage.tsx
sed -i '' 's/bg-gradient-to-r bg-green-600/bg-gradient-to-r from-green-600 to-green-700/g' src/pages/tools/TimelineToolPage.tsx

# Fix LocationPage.tsx
sed -i '' 's/bg-gradient-to-br bg-green-600/bg-gradient-to-br from-green-600 to-green-700/g' src/pages/LocationPage.tsx
sed -i '' 's/bg-gradient-to-r bg-green-600/bg-gradient-to-r from-green-600 to-green-700/g' src/pages/LocationPage.tsx

# Fix ProcessSection.tsx
sed -i '' 's/bg-gradient-to-r bg-green-600/bg-gradient-to-r from-green-600 to-green-700/g' src/components/ProcessSection.tsx

echo "Gradient syntax fixes complete!"
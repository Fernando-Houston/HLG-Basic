#!/bin/bash

# Improve visual hierarchy with better green shades
echo "Improving visual hierarchy with green shades..."

# Update primary buttons to use darker green for better contrast
sed -i '' 's/bg-green-600 text-white/bg-green-700 text-white/g' src/components/Header.tsx
sed -i '' 's/hover:bg-green-700/hover:bg-green-800/g' src/components/Header.tsx

# Update secondary buttons to lighter green
sed -i '' 's/hover:bg-green-50 hover:text-green-600/hover:bg-green-50 hover:text-green-700/g' src/components/Header.tsx

# Update section backgrounds for better hierarchy
# Hero sections should be darker
sed -i '' 's/from-green-700 via-green-600 to-green-700/from-green-800 via-green-700 to-green-600/g' src/pages/HomePage.tsx
sed -i '' 's/from-green-700 via-green-600 to-green-700/from-green-800 via-green-700 to-green-600/g' src/pages/ToolsPage.tsx

# Update link hover states for better contrast
sed -i '' 's/hover:text-green-600/hover:text-green-700/g' src/components/Footer.tsx
sed -i '' 's/text-green-600/text-green-700/g' src/components/TestimonialsSection.tsx

# Update ProcessSection for better visual hierarchy
sed -i '' 's/bg-green-600/bg-green-700/g' src/components/ProcessSection.tsx
sed -i '' 's/border-green-600/border-green-700/g' src/components/ProcessSection.tsx
sed -i '' 's/text-green-600/text-green-700/g' src/components/ProcessSection.tsx

# Update StatsSection icon backgrounds for alternating effect
# (Already done with gradient backgrounds)

echo "Visual hierarchy improvements complete!"
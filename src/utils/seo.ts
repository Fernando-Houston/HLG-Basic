import { useEffect } from 'react';

interface SEOData {
  title: string;
  description: string;
  path?: string;
}

export const usePageSEO = ({ title, description, path = '' }: SEOData) => {
  useEffect(() => {
    // Update title
    document.title = title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    }
    
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', `https://houstonlandguy.com${path}`);
    }
    
    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', title);
    }
    
    const twitterDescription = document.querySelector('meta[property="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', description);
    }
    
    const twitterUrl = document.querySelector('meta[property="twitter:url"]');
    if (twitterUrl) {
      twitterUrl.setAttribute('content', `https://houstonlandguy.com${path}`);
    }
    
    // Update canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', `https://houstonlandguy.com${path}`);
    }
    
    // Return cleanup function to reset to homepage meta when component unmounts
    return () => {
      document.title = 'Houston Land Guy - Premier Land Development Experts | Cash Offers';
    };
  }, [title, description, path]);
};

// Page-specific SEO data
export const pageSEO = {
  home: {
    title: "Houston Land Guy - Premier Land Development Experts | Cash Offers",
    description: "Houston's trusted land development experts. Get 48-hour cash offers for your land. We buy residential, commercial & investment properties. Call (832) 555-0100.",
    path: "/"
  },
  sellYourLand: {
    title: "Sell Your Land Fast - 48 Hour Cash Offers | Houston Land Guy",
    description: "Get a fair cash offer for your Houston area land in 48 hours. No fees, no commissions. We buy vacant lots, acreage, and development sites. Quick closings.",
    path: "/sell-your-land"
  },
  findDevelopmentSites: {
    title: "Find Development Sites - Off-Market Land Deals | Houston Land Guy",
    description: "Access exclusive off-market development sites in Houston. Find prime locations for residential, commercial, and mixed-use projects. Expert land sourcing.",
    path: "/find-development-sites"
  },
  investInLand: {
    title: "Land Investment Opportunities - 18%+ ROI | Houston Land Guy",
    description: "Invest in Houston's growing land market. Passive income opportunities with 18%+ annual returns. Expert guidance for land investment strategies.",
    path: "/invest-in-land"
  },
  tools: {
    title: "Free Land Development Tools - ROI Calculator | Houston Land Guy",
    description: "Free tools for land developers: ROI calculator, timeline planner, Chapter 42 analyzer, and AI-powered land finder. Make informed development decisions.",
    path: "/tools"
  },
  roiCalculator: {
    title: "Land Development ROI Calculator - Free Tool | Houston Land Guy",
    description: "Calculate potential returns on Houston land development projects. Free ROI calculator with industry-specific assumptions and detailed analysis.",
    path: "/tools/roi-calculator"
  },
  smartLandFinder: {
    title: "AI Land Finder - Smart Property Search | Houston Land Guy",
    description: "Find perfect development sites with our AI-powered land finder. Get personalized recommendations based on your project requirements and budget.",
    path: "/tools/smart-finder"
  },
  timelineTool: {
    title: "Development Timeline Planner - Free Tool | Houston Land Guy",
    description: "Plan your Houston land development project timeline. Free tool covering all phases from acquisition to completion with permit requirements.",
    path: "/tools/timeline"
  },
  chapter42Tool: {
    title: "Houston Chapter 42 Land Planning Tool | AI-Powered Site Planning",
    description: "Professional Houston Chapter 42 compliant land development planning. Generate site plans, check density requirements, ensure regulatory compliance. Free expert tool for Harris County developments.",
    path: "/tools/chapter-42"
  },
  about: {
    title: "About Houston Land Guy - Your Land Development Partner",
    description: "Learn about Houston Land Guy's mission to simplify land transactions. Expert team, proven track record, and commitment to fair deals since 2020.",
    path: "/about"
  },
  contact: {
    title: "Contact Houston Land Guy - Free Land Consultation",
    description: "Get in touch with Houston Land Guy for a free consultation. Call (832) 555-0100 or fill out our form. Quick responses, expert advice.",
    path: "/contact"
  },
  location: {
    title: "Service Areas - Houston & Surrounding Counties | Houston Land Guy",
    description: "We serve all of Greater Houston including Harris, Fort Bend, Montgomery, Brazoria, and Galveston counties. Local expertise in every market.",
    path: "/locations"
  },
  privacyPolicy: {
    title: "Privacy Policy | Houston Land Guy",
    description: "Houston Land Guy privacy policy. Learn how we protect your information and maintain confidentiality in all land transactions.",
    path: "/privacy-policy"
  },
  termsOfService: {
    title: "Terms of Service | Houston Land Guy",
    description: "Terms of service for Houston Land Guy. Understand our commitment to fair, transparent land transactions and professional service standards.",
    path: "/terms-of-service"
  },
  notFound: {
    title: "Page Not Found - 404 | Houston Land Guy",
    description: "The page you're looking for doesn't exist. Return to Houston Land Guy homepage or contact us for assistance.",
    path: ""
  }
};
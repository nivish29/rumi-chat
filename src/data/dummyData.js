export const dummyData = {
"sales_trend": {
  "type": "line-chart",
  "data": [
    { "month": "July", "sales": 7200, "growth": -4.0, "insights": "Post-summer adjustments" },
    { "month": "August", "sales": 5800, "growth": -5.6, "insights": "Back-to-school trends" },
    { "month": "September", "sales": 7900, "growth": 16.2, "insights": "Pre-holiday boost" },
    { "month": "October", "sales": 8200, "growth": 3.8, "insights": "Steady growth" },
    { "month": "November", "sales": 8200, "growth": 12.2, "insights": "Holiday shopping begins" },
    { "month": "December", "sales": 11500, "growth": 25.0, "insights": "Year-end holiday peak" }
  ],
  "xKey": "month",
  "yKey": "sales",
  "title": "Sales Trends",
  "link": "/detailed-sales-report",
  "fullResponse": `## [Navigating Sales Dynamics: A Comprehensive Journey](https://example.com/sales-insights)
- **Annual Overview**:
  * Total sales: $81,600
  * Strongest month: December with $11,500
  * Weakest month: February with $3,800
- **Quarterly Breakdown**:
  * Q1: $13,100 (Recovery from seasonal dip)
  * Q2: $18,500 (Momentum from marketing efforts)
  * Q3: $21,900 (Gradual adjustments post-summer)
  * Q4: $28,100 (Strong holiday impact)
- **Strategic Insights**:
  * Aggressive marketing in May and November drives notable peaks
  * Tailored campaigns for winter and back-to-school periods can mitigate dips
  * Continued focus on holiday sales to maximize December opportunities`

}
,

  "revenue_distribution": {
    type: 'pie-chart',
    data: [
      { category: 'Product A', value: 30, trend: '↑ Growing', margin: 42 },
      { category: 'Product B', value: 25, trend: '→ Stable', margin: 38 },
      { category: 'Product C', value: 10, trend: '↓ Declining', margin: 33 },
      { category: 'Product D', value: 15, trend: '↑ Emerging', margin: 36 },
      { category: 'Product E', value: 12, trend: '↑ Stable', margin: 25 },
      { category: 'Others', value: 8, trend: '→ Consistent', margin: 30 }
    ],
    dataKey: 'value',
    nameKey: 'category',
    title: 'Revenue Distribution',
    link: '/product-portfolio-analysis',
    fullResponse: `## [Decoding Revenue Streams: Strategic Product Insights](https://example.com/revenue-breakdown)
- **Portfolio Composition**:
  * Flagship Product A dominates with 35% share
  * Diversified revenue streams
- **Profitability Insights**:
  * Product A: Highest margin at 42%
  * Product D: Promising emerging segment
- **Strategic Recommendations**:
  * Invest in Product A and Product D
  * Re-evaluate Product C's market positioning`
  },

  "customer_demographics": {
    type: 'table',
    data: [
      { 
        age_group: '18-24', 
        count: 1200, 
        percentage: '15%', 
        avg_spend: 150, 
        growth_potential: 'High',
        engagement_channels: ['Social Media', 'Mobile Apps']
      },
      { 
        age_group: '25-34', 
        count: 2500, 
        percentage: '31%', 
        avg_spend: 350, 
        growth_potential: 'Very High',
        engagement_channels: ['Email', 'Web Platform']
      },
      { 
        age_group: '35-44', 
        count: 2100, 
        percentage: '26%', 
        avg_spend: 500, 
        growth_potential: 'Moderate',
        engagement_channels: ['Direct Sales', 'Webinars']
      },
      { 
        age_group: '45-54', 
        count: 1500, 
        percentage: '19%', 
        avg_spend: 400, 
        growth_potential: 'Low',
        engagement_channels: ['Phone Support', 'Print']
      },
      { 
        age_group: '55+', 
        count: 700, 
        percentage: '9%', 
        avg_spend: 250, 
        growth_potential: 'Low',
        engagement_channels: ['Traditional Media', 'Phone']
      }
    ],
    columns: [
      { id: 'age_group', label: 'Age Group' },
      { id: 'count', label: 'Customer Count', numeric: true },
      { id: 'percentage', label: 'Percentage' },
      { id: 'avg_spend', label: 'Avg Spend ($)', numeric: true },
      { id: 'growth_potential', label: 'Growth Potential' }
    ],
    title: 'Customer Demographics Breakdown',
    link: '/customer-segments-deep-dive',
    fullResponse: `## [Customer Landscape: Mapping Market Potential](https://example.com/demographic-analysis)
- **Primary Segment**: 25-34 age group (31% of customer base)
- **Spending Power**:
  * Highest average spend: 35-44 age group ($500)
  * Emerging high-value segment: 25-34 years
- **Engagement Strategy**:
  * Personalized digital channels for younger segments
  * Tailored traditional communication for older groups`
  },

  "performance_comparison": {
    type: 'bar-chart',
    data: [
      { 
        category: 'Q1', 
        actual: 8500, 
        target: 8000, 
        performance: 106.25, 
        key_driver: 'Cost Optimization' 
      },
      { 
        category: 'Q2', 
        actual: 9200, 
        target: 8500, 
        performance: 108.24, 
        key_driver: 'New Product Launch' 
      },
      { 
        category: 'Q3', 
        actual: 8800, 
        target: 9000, 
        performance: 97.78, 
        key_driver: 'Market Challenges' 
      },
      { 
        category: 'Q4', 
        actual: 10500, 
        target: 9500, 
        performance: 110.53, 
        key_driver: 'Holiday Season' 
      }
    ],
    xKey: 'category',
    yKey: 'actual',
    title: 'Quarterly Performance vs Target',
    link: '/quarterly-performance-report',
    fullResponse: `## [Performance Pulse: Quarterly Momentum Analysis](https://example.com/quarterly-performance)
- **Overall Performance**: Exceeded annual target
- **Quarterly Highlights**:
  * Q4: Best performance (110.53% of target)
  * Q2: Strong growth with 108.24% achievement
- **Strategic Observations**:
  * Resilient performance despite Q3 challenges
  * Consistent ability to adapt and overcome`
  },



  "media_gallery": {
    type: 'images',
    data: [
      { 
        url: 'https://cdn.prod.website-files.com/64ad227a3e66387fc5d89320/661f6111486dd7b78954b200_product-launch-events-management-service.png', 
        alt: 'Innovative Product Launch',
        caption: 'Showcasing groundbreaking innovations at an event'
      },
      { 
        url: 'https://images.ctfassets.net/pdf29us7flmy/n1RP4mDEMQtu8t7lSXwAW/538169d16c7a47f6520e381c2ba63d98/shutterstock_401240461_optimized.jpg', 
        alt: 'Global Strategy Discussion',
        caption: 'Collaborating on key strategies with our international teams'
      },
      { 
        url: 'https://www.workshopmate.com.au/media/3542/customer-retention-wsm.jpeg?width=798&height=532', 
        alt: 'Interactive Customer Seminar',
        caption: 'Engaging with clients to enhance customer experience.'
      },
      { 
        url: 'https://cere-india.org/wp-content/uploads/2016/08/workshop_1w-800x445.jpg', 
        alt: 'Sustainability Workshop',
        caption: 'Promoting sustainable practices in a workshop'
      }
    ],
    
    title: 'Recent Company Events',
    link: '/gallery',
    fullResponse: `## [Capturing Moments: Our Global Journey](https://example.com/company-events)
- **Product Launch Event**: New product unveiling in New York
- **Global Strategy Meeting**: Quarterly planning with global teams
- **Customer Workshop**: Engaging customers in London
- **Market Expansion**: Exploring new opportunities in India`
  },
    "default": {
    type: 'default',
    data: [
      
    ],
    title: '',
    link: '',
    fullResponse: ``

  },
  "code_sample": {
    type: 'code',
    title: 'JavaScript Code Example',
    fullResponse: `
## JavaScript Code Highlighting Demo


Here's an example of a complex array processing function:

\`\`\`javascript
function processUserData(users) {
  return users
    .filter(user => user.age >= 18)
    .map(user => ({
      fullName: \`\${user.firstName} \${user.lastName}\`,
      email: user.email.toLowerCase(),
      status: user.isActive ? 'Active' : 'Inactive'
    }))
    .sort((a, b) => a.fullName.localeCompare(b.fullName));
}

// Example usage
const userData = [
  { 
    firstName: 'John', 
    lastName: 'Doe', 
    age: 25, 
    email: 'john.doe@example.com',
    isActive: true 
  },
  // More user objects...
];

const processedUsers = processUserData(userData);
console.log(processedUsers);
\`\`\`

This function demonstrates:
- Filtering users by age
- Transforming user data
- Sorting results alphabetically
`
  }

};

export const getVisualizationResponse = (query) => {
  query = query.toLowerCase();
  
  const responses = {
    sales_trend: {
      message: "Uncover the rhythm of our sales evolution, where every data point tells a strategic story!",
      data: dummyData.sales_trend
    },
    revenue_distribution: {
      message: "Embark on a financial cartography of our product ecosystem, mapping value and potential!",
      data: dummyData.revenue_distribution
    },
    customer_demographics: {
      message: "Transform raw numbers into a human narrative of market engagement and growth potential!",
      data: dummyData.customer_demographics
    },
    performance_comparison: {
      message: "Witness our organizational resilience through a prism of quarterly achievements and strategic pivots!",
      data: dummyData.performance_comparison
    },
    media: {
      message: "Visual chronicles of our organizational journey, capturing moments of innovation and collaboration!",
      data: dummyData.media_gallery
    },
    code: {
      message: "Here's a code snippet to help you get started with JavaScript development!",
      data: dummyData.code_sample
    },
    default: {
      message: "We've scanned our insights library, but your query remains an unexplored horizon. Sorry!!",
      data: dummyData.default
    }
  };
  
  if (query.includes('sales') && (query.includes('trend') || query.includes('over time'))) {
    return responses.sales_trend;
  }
  
  if (query.includes('revenue') && query.includes('distribution')) {
    return responses.revenue_distribution;
  }
  
  if (query.includes('customer') && (query.includes('demographic') || query.includes('age'))) {
    return responses.customer_demographics;
  }
  
  if (query.includes('performance') || query.includes('target')) {
    return responses.performance_comparison;
  }
  if (query.includes('gallery') || query.includes('images') || query.includes('company event') || query.includes('recent event') || query.includes('show me recent company event')) {
    return responses.media;
  }
  if (query.includes('code') || query.includes('code sample') || query.includes('javascript')) {
    return responses.code;
  }
  return responses.default;
};

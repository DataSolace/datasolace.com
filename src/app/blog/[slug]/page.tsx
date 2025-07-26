import Link from 'next/link';
import Image from 'next/image';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { notFound } from 'next/navigation';

// Blog post data - using content from old site export
const blogPosts = [
  {
    id: 1,
    title: "Documenting Business Processes The Fast Way, Without Microsoft SharePoint",
    description: "Every small business has been there. Your star employee hands in their notice. Suddenly, you realise they're the only one who knows how to run that critical monthly report, manage that key client relationship, or troubleshoot when your ordering system goes haywire...",
    category: "Customer Experience, Documentation",
    date: "12/03/2025",
    image: "/blog/wiki.js-home_page.png",
    slug: "documenting-business-processes-fast-way",
    content: `
      <p>Every small business has been there. Your star employee hands in their notice. Suddenly, you realise they're the only one who knows how to run that critical monthly report, manage that key client relationship, or troubleshoot when your ordering system goes haywire. What should be a smooth transition turns into weeks of stress, mistakes, and lost productivity.</p>
      
      <p>This scenario plays out in small businesses across the UK every day, costing thousands in lost revenue and countless hours of frustration. The problem isn't bad employees or poor management, it's inadequate process documentation.</p>
      
      <h2>Why Process Documentation Matters for a Growing Business</h2>
      <p>For small business directors wearing multiple hats (operations, finance, HR, and more), documentation might seem like a luxury you don't have time for. However, it's precisely these businesses that stand to gain the most.</p>
      
      <p>Process documentation isn't about creating bureaucracy—it's about capturing your company's most valuable asset: knowledge. When properly implemented, it delivers tangible benefits:</p>
      
      <p><strong>Reduced operational waste:</strong> When employees know exactly what to do and how to do it, mistakes decrease and efficiency increases. A manufacturing client of mine reduced material waste by 23% after documenting their production processes properly.</p>
      
      <p><strong>Business continuity:</strong> When knowledge exists beyond individual team members, your business becomes more resilient to staff changes, illness, or holidays.</p>
      
      <p><strong>Faster onboarding:</strong> New team members can become productive in days rather than weeks when they have clear documentation to follow. A marketing agency in Leeds cut their onboarding time from three weeks to just five days after implementing proper process documentation.</p>
      
      <p><strong>Consistent quality:</strong> Customers receive the same high-quality experience regardless of which team member serves them.</p>
      
      <p><strong>Scalability:</strong> As your business grows, documented processes allow you to replicate success across new locations, products, or service lines.</p>
      
      <h2>The SharePoint Challenge for Small Businesses</h2>
      <p>Microsoft SharePoint has long been the default choice for document management and process documentation in larger organizations. However, for small businesses, it often creates more problems than it solves.</p>
      
      <h3>Licensing Complexity and Cost</h3>
      <p>SharePoint typically requires <a href="https://www.microsoft.com/en-gb/microsoft-365/business/microsoft-365-business-premium" target="_blank" rel="noopener">Microsoft 365 Business Premium</a> licenses (£16.90 per user per month, paid annually) or dedicated SharePoint plans. For a team of just 10 people, that's nearly <strong>£2,000</strong> annually just for the platform—before you've even started implementing it. To be clear, this license does include other business tools such as Exchange, Intune and the popular Office applications.</p>
      
      <p>These costs may seem manageable for large enterprises but represent a significant investment and operational expense for small businesses with tight margins and competing priorities. This cost scales in tandem with the growth of your staffing level, irrespective of the amount of new information that is stored on the platform.</p>
      
      <h3>Technical Complexity</h3>
      <p>SharePoint is powerful, but widely recognised for its complexity. Small business owners frequently report that SharePoint implementations require significantly more technical expertise than initially anticipated. For organisations without dedicated IT staff, this presents a substantial barrier and often leads to a neglected collection of documentation.</p>
      
      <p>Setting up SharePoint requires understanding of site collections, document libraries, permission management, and content types—knowledge that isn't typically part of a small business owner's skill set.</p>
      
      <p>Setting up SharePoint requires understanding of:</p>
      <ul>
        <li>Site collections and site hierarchies</li>
        <li>Document libraries and list configuration</li>
        <li>Permission management across complex structures</li>
        <li>Content types and metadata schemas</li>
      </ul>
      
      <p>Many small business owners find themselves paying expensive consultants just to get a basic system working, only to struggle with maintaining it themselves afterward.</p>
      
      <h3>Implementation Timeline</h3>
      <p>Creating a useful SharePoint environment isn't a weekend project. Typical implementations take months of planning, configuration, and testing. For small business directors already stretched thin, this timeline is often impractical.</p>
      
      <h3>User Adoption Challenges</h3>
      <p>Even when implemented correctly, SharePoint's interface can be unintuitive for everyday users and search functionality is notoriously inadequate. Without substantial training, employees often revert to old habits—storing documents locally or in email, defeating the purpose of a centralised knowledgebase.</p>
      
      <h2>Introducing wiki.js: An Open-source SharePoint Competitor</h2>
      <p>This is where wiki.js enters as a compelling alternative. As an open-source, extensible wiki system designed with simplicity at its core, it addresses many of the pain points small businesses experience with SharePoint.</p>
      
      <p>wiki.js is an open-source wiki platform that allows businesses to create, organize, and share knowledge efficiently. Unlike SharePoint, which attempts to be everything to everyone, wiki.js focuses on doing one thing exceptionally well… documentation.</p>
      
      <h3>Cost-Effective Implementation</h3>
      <p>As an open-source solution, js.wiki eliminates licensing costs. You can self-host it on affordable infrastructure or use managed hosting options for a fraction of SharePoint's ongoing costs.</p>
      
      <p>For many small businesses, this means saving thousands of pounds annually while achieving the same core documentation capabilities they actually need.</p>
      
      <h3>Simplified Technical Requirements</h3>
      <p>js.wiki was designed with simplicity in mind. Its straightforward architecture means:</p>
      <ul>
        <li>Less technical expertise required for setup</li>
        <li>Minimal ongoing maintenance</li>
        <li>Intuitive administration without specialized training</li>
      </ul>
      
      <p>A creative agency in Manchester implemented js.wiki in just two weekends, with their office manager handling the entire setup despite having no technical background.</p>
      
      <h3>Faster Implementation Timeline</h3>
      <p>Unlike SharePoint's months-long implementation cycle, js.wiki can be up and running in days. This means small businesses can start capturing critical processes immediately, seeing benefits within the first week rather than waiting for a lengthy project to complete.</p>
      
      <h3>User-Friendly Experience</h3>
      <p>js.wiki's clean, modern interface lowers the barrier to entry for all employees. Documents are easy to find, create, and edit—encouraging actual use rather than abandonment.</p>
      
      <p>The platform can use Markdown for content creation, a simple formatting approach that non-technical users can learn in minutes, not hours. Page templating can be used to ensure consistent styling throughout your documentation and the rich-text editor makes updates and changes a fast and simple procedure. A simple editor experience ensures that minimal time is lost to the upkeep of documentation, which in turn, improves its rate of adoption among team members.</p>
      
      <h3>Extensibility When You Need It</h3>
      <p>Consider bookmarking the DataSolace blog or subscribing to our newsletter as planned future posts will include the use of AI models and n8n (a Zapier alternative) to build out an automated documentation producer.</p>
      
      <h3>Self-Hosting Considerations</h3>
      <p>Whilst self-hosting of services such as wiki.js can ease the <em>opex</em> burden on your business, there are still a number of considerations that must be given towards reliable availability and recoverability of your data in the event of unexpected disruptions. There are often overlooked contingencies which must be put in place when looking to host your own services, not limited to, but including:</p>
      
      <p>💾 Backup and Disaster recovery planning in the event of a hardware loss or failure.</p>
      
      <p>🔒 Security of assets, both physically and digitally, protecting business data from surreptitious behaviour.</p>
      
      <p>If your current IT strategy doesn't account for these risk factors, then the eventual costs could far outweigh those of cloud-based licensing, through revenue loss.</p>
      
      <h2>Common Struggles and How Documentation Solves Them</h2>
      <p>As a business director handling operations responsibilities, you likely face several common challenges that proper documentation directly addresses:</p>
      
      <h3>The "Bus Factor" Problem</h3>
      <p><strong>The struggle:</strong> Your business is vulnerable if key knowledge is concentrated in one or two people.</p>
      <p><strong>The solution:</strong> js.wiki creates a centralized knowledge repository that preserves institutional knowledge regardless of staff changes.</p>
      
      <h3>Inconsistent Quality</h3>
      <p><strong>The struggle:</strong> Service or product quality varies depending on who's handling the work.</p>
      <p><strong>The solution:</strong> Documented standard procedures ensure consistent delivery regardless of which team member is involved.</p>
      
      <h3>Inefficient Onboarding</h3>
      <p><strong>The struggle:</strong> Getting new team members up to speed takes weeks or months of hands-on training.</p>
      <p><strong>The solution:</strong> Comprehensive documentation allows new hires to self-serve much of their training, becoming productive faster while requiring less time from senior staff.</p>
      
      <h3>Growth Limitations</h3>
      <p><strong>The struggle:</strong> Scaling your business requires you to clone yourself and your knowledge.</p>
      <p><strong>The solution:</strong> Documented processes can be replicated across new locations or team members, removing you as the bottleneck to growth.</p>
      
      <h2>Conclusion: Documentation as a Competitive Advantage</h2>
      <p>For small UK businesses, proper process documentation isn't just about organization—it's a competitive advantage. While your competitors struggle with knowledge silos, inconsistent delivery, and operational waste, documented businesses can:</p>
      <ul>
        <li>Deliver consistent quality regardless of who's on shift</li>
        <li>Recover quickly from staff changes or absences</li>
        <li>Onboard new team members efficiently</li>
        <li>Identify and eliminate operational inefficiencies</li>
        <li>Scale more easily when growth opportunities arise</li>
      </ul>
      
      <p>js.wiki provides an accessible path to this advantage without the cost, complexity, and frustration often associated with enterprise solutions like SharePoint.</p>
      
      <p>By starting small, focusing on critical processes, and building documentation into your culture, you can transform your operations within weeks rather than months or years.</p>
      
      <p>Your business already has valuable knowledge—the question is whether that knowledge is locked in your team's heads or captured in a system that works for you. Making the shift from tribal knowledge to documented processes might be the most important operational step you take this year.</p>
      
      <p><em>One of the biggest misconceptions about process documentation is that it's complicated and time-consuming. With tools like js.wiki, that's simply not true. This and many other platforms are open-source making it possible to host your own installation, putting you in control of your knowledge assets without the enterprise-level complexity and costs.</em></p>
      
      <blockquote>
        <p><em>If you're liking what you're reading but feel like your business needs help, we'd love to!</em></p>
        <p><a href="mailto:enquiries@datasolace.com?subject=I'd%20Like%20An%20NVR!">Drop us an email</a> or <a href="/appointments">book a call</a> and we can discuss how we can bring your ideas to life!</p>
      </blockquote>
    `
  },
  {
    id: 2,
    title: "Streamlining Customer Feedback for UK Businesses with Formbricks",
    description: "In our previous post, we explored how small UK businesses can leverage Metabase to transform customer data into actionable insights. Today, we're tackling another critical piece of the data puzzle: how to effectively collect that customer feedback in the first place.",
    category: "Customer Experience",
    date: "07/03/2025",
    image: "/blog/formbricks-featured.png",
    slug: "streamlining-customer-feedback-formbricks",
    content: `
      <p>In our <a href="/blog/metabase-small-business-analytics">previous post</a>, we explored how small UK businesses can leverage Metabase to transform customer data into actionable insights. Today, we're tackling another critical piece of the data puzzle: how to effectively collect that customer feedback in the first place.</p>
      
      <h2>The Feedback Collection Challenge</h2>
      <p>As a small business director handling operational responsibilities, you likely recognize these common feedback collection hurdles:</p>
      <ul>
        <li>Generic feedback forms that don't adapt to different customer experiences</li>
        <li>Complicated survey tools that require technical expertise to set up</li>
        <li>Low completion rates because surveys feel too lengthy or irrelevant</li>
        <li>Difficulty integrating feedback systems with your existing website design</li>
        <li>Challenges connecting feedback data to your analytics platform</li>
      </ul>
      
      <p>These obstacles often lead to incomplete data or, worse, completely abandoned feedback initiatives. But what if there was a more elegant solution that could grow with your business?</p>
      
      <h2>Introducing Formbricks: Feedback Collection Reimagined</h2>
      <p>Formbricks has the capability to transform how small UK businesses gather customer insights. This versatile open-source platform enables you to collect and analyse feedback from customers, users, and employees through targeted, intelligent surveys.</p>
      
      <p>Here's a sample form built in Formbricks, feel free to give it a test:</p>
      
      <div style="position: relative; width: 100%; height: 600px; margin: 2rem 0; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb;">
        <iframe
          src="https://formbricks.datasolace.com/s/cm7ryuz8z0002ob014c2f7e0i"
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
          title="Formbricks Sample Survey"
          loading="lazy"
        ></iframe>
      </div>
      
      <h3>What Makes Formbricks Different?</h3>
      <p>Unlike traditional survey tools that offer a one-size-fits-all approach, Formbricks provides:</p>
      <ul>
        <li><strong>Adaptive Question Logic</strong> that changes based on previous responses, creating personalized survey experiences</li>
        <li><strong>Time-to-Complete Estimates</strong> that set clear expectations for respondents, increasing completion rates</li>
        <li><strong>Seamless Website Integration</strong> that maintains your brand experience</li>
        <li><strong>Flexible Deployment Options</strong> as a self-hosted solution or cloud service</li>
        <li><strong>Open-Source Foundation</strong> giving you complete control without vendor lock-in</li>
      </ul>
      
      <h2>Real-World Application: Enhancing Our Coffee Shop Example</h2>
      <p>To demonstrate Formbricks' capabilities, we revisited the coffee shop from our Metabase example and upgraded their feedback collection process.</p>
      
      <h3>The Previous Approach:</h3>
      <p>In our earlier implementation, we created a custom NextJS form that integrated with the coffee shop's existing site style. While effective, this required:</p>
      <ul>
        <li>Custom development work for the form interface</li>
        <li>Manual integration with the database</li>
        <li>Limited ability to modify questions without developer assistance</li>
        <li>No adaptive questioning based on customer responses</li>
      </ul>
      
      <h3>The Formbricks Enhancement:</h3>
      <p>Using Formbricks, we replicated the same coffee shop feedback form but with significant improvements:</p>
      <ol>
        <li><strong>Intelligent Question Sequencing:</strong> When a customer mentions they didn't try the food, the survey automatically skips food-related questions, focusing instead on their beverage experience.</li>
        <li><strong>Transparency for Respondents:</strong> The time-to-complete function shows customers exactly how long the survey will take (typically under 2 minutes), dramatically improving completion rates.</li>
        <li><strong>Contextual Follow-ups:</strong> If a customer rates something below a certain threshold, the survey automatically asks targeted follow-up questions to understand specific improvement areas.</li>
        <li><strong>Mood-Based Pathways:</strong> Different question paths appear based on whether the overall experience was positive or negative, capturing more relevant details in each scenario.</li>
      </ol>
      
      <h3>The Results:</h3>
      <p>After implementing the Formbricks solution enables:</p>
      <p>📊 Completion rate analytics<br>
      💬 More detailed qualitative feedback on specific aspects of the experience<br>
      ✏️ Ability to quickly modify survey questions<br>
      ✅ Clearer segmentation of feedback and completion rate overview</p>
      
      <p>Formbricks also gives you insight on where participants might be walking away from your surveys, allowing you to apply incremental changes to boost engagement and enhance the quality and relevance of feedback. This truly is a <em>data driven approach</em> to customer feedback.</p>
      
      <h2>Getting Started with Formbricks: A Practical Guide for Small Business Directors</h2>
      <p>If you're ready to enhance your feedback collection process, here's how to get started with Formbricks:</p>
      
      <h3>Step 1: Choose Your Deployment Approach</h3>
      <p>Formbricks offers flexibility in how you deploy:</p>
      <ul>
        <li><strong>Cloud Option:</strong> Quick to set up with minimal technical requirements</li>
        <li><strong>Self-Hosted:</strong> Complete control and data ownership if privacy is paramount</li>
      </ul>
      
      <h3>Step 2: Design Your Customer Journey</h3>
      <p>Before building your first form, map out the customer journey you want to understand:</p>
      <ul>
        <li>What are the key touchpoints in your customer experience?</li>
        <li>Which specific aspects of your product or service need feedback?</li>
        <li>How might different customer types have different experiences?</li>
      </ul>
      
      <h3>Step 3: Build Smart, Adaptive Surveys</h3>
      <p>Leverage Formbricks' question logic to create surveys that:</p>
      <ul>
        <li>Adapt based on previous answers</li>
        <li>Respect respondents' time by only asking relevant questions</li>
        <li>Capture detailed feedback for areas that need improvement</li>
        <li>Provide different paths based on customer sentiment</li>
      </ul>
      
      <h3>Step 4: Integrate with Your Digital Presence</h3>
      <p>Formbricks can be embedded into:</p>
      <ul>
        <li>Your company website</li>
        <li>Post-purchase email sequences</li>
        <li>In-store QR codes</li>
        <li>Receipt links or SMS messages</li>
      </ul>
      
      <h3>Step 5: Prepare for Analytics Connection</h3>
      <p>Even before setting up the complete pipeline to Metabase, organize your form structure with analytics in mind:</p>
      <ul>
        <li>Use consistent question formats where possible</li>
        <li>Include categorization fields that will be useful for data segmentation</li>
        <li>Consider what comparisons and trends will be most valuable to track</li>
      </ul>
      
      <h2>Key Benefits for Small UK Businesses</h2>
      <p>Implementing Formbricks as part of your feedback ecosystem provides several immediate advantages:</p>
      
      <h3>For Business Directors:</h3>
      <ul>
        <li>Clearer understanding of customer sentiment without technical complexity</li>
        <li>Ability to quickly modify feedback focus areas as business priorities shift</li>
        <li>Higher quality data leading to more confident decision-making</li>
      </ul>
      
      <h3>For Operations:</h3>
      <ul>
        <li>Targeted feedback on specific operational aspects</li>
        <li>Early warning system for service issues</li>
        <li>Evidence-based approach to staff training and resource allocation</li>
      </ul>
      
      <h3>For Marketing:</h3>
      <ul>
        <li>Deeper insights into customer preferences and priorities</li>
        <li>Direct quotes and testimonials from satisfied customers</li>
        <li>Better understanding of your competitive advantages</li>
      </ul>
      
      <h2>Beyond Basic Feedback: Building a Continuous Improvement Culture</h2>
      <p>The real power of enhanced feedback collection isn't just in the data itself—it's in fostering a culture where customer perspectives continuously inform business improvements.</p>
      
      <p>When your team knows that customer feedback is being systematically collected, analyzed, and acted upon:</p>
      <ul>
        <li>Staff become more customer-centric in their thinking</li>
        <li>Improvement initiatives gain momentum from clear evidence</li>
        <li>Resources are allocated more effectively to address actual customer needs</li>
        <li>Product and service innovations are grounded in real market demands</li>
      </ul>
      
      <h2>Learn More About Building Your Feedback Ecosystem</h2>
      <p>Interested in implementing a complete feedback solution for your small business? DataSolace specialize in helping UK business directors create connected systems that turn customer insights into competitive advantages.</p>
      
      <p><a href="/appointments"><strong>Contact us</strong></a> for a practical discussion about your feedback and workflow challenges, and let us show you how tools like Formbricks and Metabase can address them.</p>
    `
  },
  {
    id: 3,
    title: "How UK Small Businesses Can Turn Customer Feedback into Growth with Metabase",
    description: "As a small business owner in the UK, you're likely wearing many hats – from sales and marketing to operations and finance. With so much on your plate, finding time to understand what's happening in your business can feel impossible. Yet the most successful small businesses are those that make data-informed decisions.",
    category: "Customer Experience",
    date: "28/02/2025",
    image: "/blog/coffee-shop-metabase-feedback.png",
    slug: "customer-feedback-growth-metabase",
    content: `
      <p>As a small business owner in the UK, you're likely wearing many hats – from sales and marketing to operations and finance. With so much on your plate, finding time to understand what's happening in your business can feel impossible. Yet the most successful small businesses are those that make data-informed decisions.</p>
      
      <h2>The Small Business Data Challenge</h2>
      <p>If this sounds familiar, you're not alone:</p>
      <ul>
        <li>You collect customer feedback, but it sits unused in spreadsheets or forms</li>
        <li>You know tracking metrics is important, but setting up analytics feels overwhelming</li>
        <li>You've tried dashboards before, but they were either too complex or too basic</li>
        <li>You want insights from your data without needing to hire a dedicated analyst</li>
      </ul>
      
      <p>What if your team could easily access and understand data without technical expertise? What if you could spot trends, identify opportunities, and make better decisions without spending hours crunching numbers?</p>
      
      <h2>Introducing Metabase: Analytics That Work for Small Businesses</h2>
      <p>Metabase is changing how small UK businesses approach data analysis. It's not just another complicated analytics platform – it's a tool designed specifically to make data accessible to everyone in your organisation.</p>
      
      <h3>What Makes Metabase Different?</h3>
      <p><strong>Friendly user interface</strong> that doesn't require SQL knowledge</p>
      <ul>
        <li><strong>Visual query builder</strong> allowing anyone to explore data</li>
        <li><strong>Shareable dashboards</strong> perfect for team meetings</li>
        <li><strong>Automated reports</strong> delivered straight to your inbox</li>
        <li><strong>Flexibility</strong> to grow with your business needs</li>
      </ul>
      
      <h2>Metabase at work: How a Small Coffee Shop Transformed Their Business</h2>
      <p>Let me share a practical example I recently implemented for an independent coffee shop owner who was struggling to understand changing customer preferences.</p>
      
      <h3>The Challenge:</h3>
      <p>The owner knew customer tastes were evolving, but couldn't pinpoint exactly what menu items were becoming more popular or which aspects of the customer experience needed improvement. A lot of these taste changes were governed by the season and wider market trends which were often established by large chain competitors. The owner wanted to retain their differentiating style but needed to understand what they could change or improve to please their customers and attract new business.</p>
      
      <p>They didn't have a repeatable way to request and review customer feedback on their menu and the wider experience in the coffee shop. They didn't want to negatively impact the customer interaction with a high friction data collection process such as an app.</p>
      
      <h3>The Solution:</h3>
      <p>We created a simple feedback form that customers could complete after their visit. The data automatically populated a database, which Metabase then visualised in easy-to-understand charts and graphs. The data collection process was simple and entirely optional with the use of QR code stickers on tables and takeaway cups.</p>
      
      <h3>The Results:</h3>
      <ol>
        <li><strong>Menu Optimisation:</strong> The dashboard clearly showed which coffee varieties and food items were trending upward, allowing the shop to adjust their inventory and focus on high-margin favourites.</li>
        <li><strong>Staffing Improvements:</strong> By tracking satisfaction with service speed throughout the day, the owner identified peak periods where additional staff was needed.</li>
        <li><strong>Customer Experience Enhancements:</strong> Feedback regarding ambiance and seating comfort led to minor adjustments that significantly improved overall satisfaction scores.</li>
        <li><strong>Marketing Focus:</strong> Understanding exactly why regular customers kept coming back gave the shop clear messaging for their social media and local advertising.</li>
      </ol>
      
      <p>Additional customer insights were gathered by using unique QR codes for sit-in and take-out customers by prepopulating the order type field. Clear representation of these customer trends enables data driven decision making.</p>
      
      <h2>How Metabase Fits Into Your Business Operations</h2>
      <p>Getting started with Metabase doesn't require a data science degree. Here's how it works:</p>
      <ol>
        <li><strong>Collect data</strong> through forms, your point-of-sale system, or existing spreadsheets</li>
        <li><strong>Connect Metabase</strong> to your data sources - in our example, an existing database</li>
        <li><strong>Create visualisations</strong> using the simple drag-and-drop interface to manipulate your database tables</li>
        <li><strong>Share insights</strong> with your team through dashboards or automated reports</li>
        <li><strong>Make decisions</strong> based on clear, actionable information</li>
      </ol>
      
      <h2>Beyond the Dashboard: Creating a Data-Informed Culture</h2>
      <p>The most powerful benefit isn't just having pretty charts – it's fostering a culture where decisions are based on evidence rather than gut feeling. When your entire team has access to relevant data:</p>
      <ul>
        <li>Staff become more engaged when they can see how their work impacts key metrics</li>
        <li>Team meetings become more productive with shared understanding of performance</li>
        <li>Resources get allocated to initiatives with proven impact</li>
        <li>Customer needs drive product and service development</li>
      </ul>
      
      <h2>Is Metabase Right for Your Business?</h2>
      <p>Metabase is particularly well-suited for UK small businesses that:</p>
      <ul>
        <li>Have 1-50 employees</li>
        <li>Collect customer feedback or operational data</li>
        <li>Want to move beyond basic spreadsheet analysis</li>
        <li>Need accessible insights without technical complexity</li>
        <li>Focus on growth and continuous improvement</li>
      </ul>
      
      <h2>Next Steps: Turning Your Data into a Competitive Advantage</h2>
      <p>The businesses that thrive in today's competitive landscape are those that can quickly adapt to changing customer needs and market conditions. Having the right tools to understand your data isn't just nice to have – it's essential for sustainable growth.</p>
      
      <p>If you're ready to transform how your business uses data:</p>
      <ol>
        <li>Think about what questions you most need answers to in your business</li>
        <li>Consider what data you're already collecting that could help answer those questions</li>
        <li>Explore how a platform like Metabase could help you visualise and act on those insights</li>
      </ol>
      
      <h2>Learn More About Data-Driven Growth for Your Business</h2>
      <p>Interested in seeing how business data and automation systems like Metabase could work specifically for your business? At DataSolace, we specialise in helping small UK businesses implement practical data solutions that drive growth without unnecessary complexity.</p>
      
      <p><a href="/appointments">Contact us</a> for a no-obligation conversation about your business challenges and how the right data approach might help you overcome them.</p>
    `
  },
  {
    id: 4,
    title: "Introducing the Smart Home Index: The Ultimate Tool for Finding the Perfect IoT Devices",
    description: "In today's rapidly evolving world of smart home technology, choosing the right devices for your home can feel overwhelming. With so many options available, how do you know which smart home gadgets are best suited for your needs?",
    category: "IoT Devices",
    date: "20/10/2024",
    image: "/blog/smarthomeindex-1.png",
    slug: "smart-home-index-ultimate-tool",
    content: `
      <h2>Why the Smart Home Index?</h2>
      <p>The smart home industry is booming, with thousands of devices on the market. From voice assistants to smart lights, thermostats, security cameras, and beyond, the choices are endless. But with more choices come more challenges. How do you know which device integrates well with your current setup? What products are compatible with your smart home ecosystem?</p>
      
      <p>The Smart Home Index solves these problems by providing:</p>
      <ul>
        <li><strong>A comprehensive, organised database</strong> of hundreds of smart home devices</li>
        <li><strong>Filters</strong> that let you search based on specific features such as voice control, energy efficiency, and more</li>
        <li><strong>Comparison tools</strong> to help you evaluate multiple devices side by side</li>
      </ul>
      
      <p>With these features, you can confidently choose products that fit your lifestyle and budget, without spending hours sifting through reviews or product descriptions.</p>
      
      <p>If you have ever used <a href="https://pcpartpicker.com/" target="_blank" rel="noopener">PC Part Picker</a>, then you can consider the Smart Home Index a similar resource that you can use to build out the perfect smart home.</p>
      
      <h2>Key Features of the Smart Home Index</h2>
      
      <h3>Feature-Based Filtering</h3>
      <p>The heart of the Smart Home Index is its intuitive filtering system. With just a few clicks, you can narrow down your search by selecting the features that matter most to you. Want a smart lightbulb that works with Google Assistant? Or a security camera with night vision and a physical privacy shutter? The Smart Home Index makes it easy.</p>
      
      <h3>Comparison Tools</h3>
      <p>Our built-in comparison feature allows you to view detailed side-by-side information about multiple devices. You can instantly compare specifications such as connectivity, power requirements, and ecosystem compatibility. This feature ensures that you make informed choices, tailored to your specific needs.</p>
      
      <h3>Completely Free to Use</h3>
      <p>Best of all, the Smart Home Index is completely free. Our mission is to provide a valuable, easy-to-use tool for smart home enthusiasts without any hidden fees or subscriptions.</p>
      
      <h2>How the Smart Home Index Helps You</h2>
      <p>Smart homes are about making life easier—and so is the Smart Home Index. Here are just a few ways you can benefit from using it:</p>
      
      <ul>
        <li><strong>Save Time:</strong> No more endless searching and reading reviews. With our filter system, you can instantly narrow down your options.</li>
        <li><strong>Save Money:</strong> By comparing devices, you can choose products that offer the best value and feature set for your budget.</li>
        <li><strong>Future-Proof Your Smart Home:</strong> With the rapid advancement of smart home technology, it's crucial to invest in devices that will work seamlessly with others, now and in the future. The Smart Home Index helps you identify compatible products, ensuring your smart home setup grows with you.</li>
      </ul>
      
      <h2>Getting Started with the Smart Home Index</h2>
      <p>Ready to take the guesswork out of building your smart home? Getting started is simple:</p>
      <ol>
        <li>Head to <a href="https://smarthomeindex.com" target="_blank" rel="noopener">https://smarthomeindex.com</a></li>
        <li>Select the category of device you're looking for (e.g., security cameras, smart lights, thermostats)</li>
        <li>Use the filters to narrow down your search based on features, compatibility, and price</li>
        <li>Compare devices to find the best option for you</li>
      </ol>
      
      <h2>So What's Next?</h2>
      <p>We are committed to growing the resource by improving the quality of our data and adding new devices as they launch. You can submit new device suggestions, or report an issue with an existing device.</p>
      
      <p>With the launch of the Smart Home Index, we're excited to provide a tool that takes the hassle out of building your smart home. Whether you're looking to enhance your home's security, energy efficiency, or convenience, our platform is here to guide you every step of the way. Start exploring today and unlock the potential of smart home technology!</p>
    `
  },
  {
    id: 5,
    title: "Frigate NVR Setup: AI-Powered Home Security Made Simple",
    description: "Frigate bills itself as 'a complete and local NVR designed for Home Assistant with AI object detection.' A Network Video Recorder, or NVR, is something you might not be familiar with if you're currently using something like a Ring doorbell.",
    category: "Security",
    date: "25/09/2024",
    image: "/blog/HackerWoman.png",
    slug: "frigate-nvr-setup-ai-security",
    content: `
      <h2>What is Frigate?</h2>
      <p>Frigate bills itself as "a complete and local NVR designed for Home Assistant with AI object detection." A Network Video Recorder, or NVR, is something you might not be familiar with if you're currently using something like a Ring doorbell. The NVR is the bit in the 'cloud' that stores your video. It allows you to perform functions such as searching, downloading, and getting notifications. The only thing is: it's on Amazon's network, not yours.</p>
      
      <p>There are many reasons why this is not great:</p>
      
      <h3>Privacy concerns</h3>
      <p>Your sensitive data - videos of your kids, that "accountant" who stays a bit too long sometimes - it's all external... When the company gets hacked, hires a sketchy employee, or turns that footage over to the police without a warrant, you have <em>no choice.</em></p>
      
      <h3>Latency issues</h3>
      <p>Ring is notorious for this. If your upload speeds aren't fantastic, the app's response times are terrible. The experience feels either very laggy, or the video quality you have access to is terrible.</p>
      
      <h3>Internet dependency</h3>
      <p>If you're away from home and want to see the DPD lady drop off your package, granted you'll always need some sort of internet connection. But what about when you're away from home and someone wants to steal your car? If they're committed enough, they'll break in to shut off your internet. Then they'll steal the camera. Maybe it got a few frames uploaded before the internet went down. Maybe not. What if you could guarantee that, until disconnection, the video was being streamed elsewhere in the house? Unless you have some very clever thieves, which is rather rare, your video is safe.</p>
      
      <p>There are plenty of other drawbacks, but hopefully that's enough to get you thinking. If you want this set up for you without having to do anything else, <a href="/appointments">give us a call</a>.</p>
      
      <h2>Prerequisites</h2>
      <p>We'll be going through the Docker version of Frigate in this post. Because of that, you'll need a few things:</p>
      <ul>
        <li>a PC (preferably a home server of some sort) that supports Docker</li>
        <li>knowledge of Docker, Docker Compose, and a <a href="https://docs.docker.com/engine/install/" target="_blank" rel="noopener">working setup</a></li>
        <li>access to the PC's command line (local, SSH, it's all good)</li>
        <li>(optional) a <a href="https://coral.ai/products/accelerator/" target="_blank" rel="noopener">Google Coral</a> device (these are lifesavers for the object detection)</li>
      </ul>
      
      <h2>The Setup Process</h2>
      <p>Frigate is a complex project that attempts to serve many different masters. This is great for flexibility. But it does mean that the project is quite far-reaching with lots of configuration. <a href="https://docs.frigate.video/" target="_blank" rel="noopener">Its documentation</a> is excellent, but it's <em>a lot.</em> Because of that, we'll try to condense it down into some key points to get you up and running as simply as possible.</p>
      
      <ol>
        <li>Basic setup via Docker Compose</li>
        <li>The config file and adding a camera</li>
        <li>Configuring your camera for object detection</li>
        <li>Next steps, advanced integrations, etc</li>
      </ol>
      
      <p>As many configuration files as we can give to you will be at the bottom of this post. Everything besides the camera IP address and authentication can be copied and pasted.</p>
      
      <h2>Docker Compose Setup</h2>
      <p>General best practice with Docker Compose is to keep your projects in separate folders. So, make a new one!</p>
      
      <p><em>Hint: we usually use <code>/opt/dockers</code> for ours so that it's consistent and doesn't collide with any system files.</em></p>
      
      <p>Within this, you're going to want a <code>config</code> and a <code>storage</code> folder. You may already have a NAS that you built after reading our Unraid or TrueNAS posts. We'll cover that in the mappings part shortly.</p>
      
      <p>In this root directory, create a <code>docker-compose.yml</code> file. The basic structure is below.</p>
      
      <pre><code>services:
  frigate:
    container_name: frigate
    restart: unless-stopped
    image: ghcr.io/blakeblackshear/frigate:stable
    shm_size: "128mb" # allows more memory for cameras
    volumes:
      - ./config:/config
      - ./storage:/media/frigate # This is where you can change the left-hand side to be your NAS if you have one
      - type: tmpfs # Optional: 1GB of memory, reduces SSD/SD Card wear, remove if on a low memory system
        target: /tmp/cache
        tmpfs:
          size: 1000000000
    devices:
      - /dev/bus/usb:/dev/bus/usb # if you picked up a USB Google Coral
      - /dev/dri/renderD128 # for intel hwaccel, needs to be updated for your hardware
    ports:
      - "8971:8971" # Browser access
      - "8554:8554" # RTSP feeds
      - "1935:1935" # RTMP feeds</code></pre>
      
      <p>You can pretty much copy and paste this config and have it working. If you haven't changed the default <code>storage</code> mapping, then you'll start to fill up the local disk.</p>
      
      <p>This also assumes you're using an Intel machine. If not, check out the <a href="https://docs.frigate.video/configuration/hardware_acceleration" target="_blank" rel="noopener">hardware acceleration guide</a> to adapt to your setup.</p>
      
      <h2>The Config File</h2>
      <p>Now this is where the more complex setup happens. Frigate has a great walkthrough on <a href="https://docs.frigate.video/frigate/camera_setup/" target="_blank" rel="noopener">Camera Setup</a>. There's also plenty of recommendations for <a href="https://docs.frigate.video/frigate/hardware#cameras" target="_blank" rel="noopener">specific brands or models</a>. In the interest of time, we're not going to cover the camera setup bit here. Feel free to reach out to us if you are having trouble with your camera or would like some tailored advice.</p>
      
      <pre><code>mqtt:
  enabled: False

detectors: # <---- if you picked up a Google Coral
  coral:
    type: edgetpu
    device: usb

cameras:
  name_of_your_camera: # <------ Name the camera
    enabled: True
    ffmpeg:
      inputs:
        - path: rtsp://10.0.10.10:554/rtsp # <----- The stream you want to use for detection
          roles:
            - detect
    hwaccel_args: preset-vaapi # assumes Intel hwaccel
    detect:
      enabled: False # <---- disable detection until you have a working camera feed</code></pre>
      
      <p>For now we'll leave MQTT disabled. There will be a future post on this as it ties into the Home Assistant integration.</p>
      
      <p>Make sure you change the name of the camera and the stream path as indicated by the arrows above.</p>
      
      <p>Now you can run <code>docker compose up</code> to get the party started. Frigate auto generates you a password on first run. If you execute <code>docker compose logs | grep Password</code> you'll be able to find it. Wait about 30 seconds. Now browse to https://your.pcs.ip.address:8971. Use the username <code>admin</code> and the password from your docker logs command output. This should get you in and looking at a camera (hopefully the one you added to the config!).</p>
      
      <h2>Configuring Detection</h2>
      <p>This is a really easy step; think of it like a reward for getting through the rest of the config. Remember that <code>config.yml</code> file from before? Open it up and edit the bottom line to say <code>enabled: True</code> and that's it! Walk in front of your camera a few times and you should start to see events popping up above the camera.</p>
      
      <p>There is a way to get more specific and set up certain areas for the camera to detect motion. The <a href="https://docs.frigate.video/configuration/masks" target="_blank" rel="noopener">documentation</a> has a good walkthrough of this, if necessary.</p>
      
      <h2>Bonus: Configure Recording</h2>
      <p>As we mentioned before in the whole 'people stealing your car' scenario, we need recordings! With Frigate, that's two lines of config. It's a per camera setting, so you need to nest the YAML well. See the full config at the bottom of the post to confirm.</p>
      
      <pre><code>record:
  enabled: True
  retain:
    days: 3</code></pre>
      
      <p>You'll notice I also included the 'retain' option there. I use this to avoid filling the disk with useless blank video. Frigate will automatically clean up recordings older than this. Feel free to experiment with this number to see how much space it uses. And, as mentioned, this is per camera. So if you have multiple cameras, each one can have a different retention period.</p>
      
      <h2>The Files!</h2>
      <p>As promised, both files in full are below. Enjoy!</p>
      
      <h3>docker-compose.yml</h3>
      <pre><code>services:
  frigate:
    container_name: frigate
    restart: unless-stopped
    image: ghcr.io/blakeblackshear/frigate:stable
    shm_size: "128mb" # allows more memory for cameras
    volumes:
      - ./config:/config
      - ./storage:/media/frigate # This is where you can change the left-hand side to be your NAS if you have one
      - type: tmpfs # Optional: 1GB of memory, reduces SSD/SD Card wear, remove if on a low memory system
        target: /tmp/cache
        tmpfs:
          size: 1000000000
    devices:
      - /dev/bus/usb:/dev/bus/usb # if you picked up a USB Google Coral
      - /dev/dri/renderD128 # for intel hwaccel, needs to be updated for your hardware
    ports:
      - "8971:8971" # Browser access
      - "8554:8554" # RTSP feeds
      - "1935:1935" # RTMP feeds</code></pre>
      
      <h3>config.yml</h3>
      <pre><code>mqtt:
  enabled: False

detectors: # <---- if you picked up a Google Coral
  coral:
    type: edgetpu
    device: usb

cameras:
  name_of_your_camera: # <------ Name the camera
    enabled: True
    ffmpeg:
      inputs:
        - path: rtsp://10.0.10.10:554/rtsp # <----- The stream you want to use for detection
          roles:
            - detect
            - record
    hwaccel_args: preset-vaapi # assumes Intel hwaccel
    detect:
      enabled: True
    record:
      enabled: True
      retain:
        days: 3</code></pre>
    `
  },
  {
    id: 6,
    title: "TrueNAS For Content Creators?",
    description: "As part of our drive to give the right solution to our customers, Tom wrote a post on the use of UNRAID for Content Creators. Unraid isn't the only solution though. We run TrueNAS internally for many reasons, and a tonne of those apply to Content Creators too!",
    category: "Network Storage",
    date: "12/09/2024",
    image: "/blog/truenas-untitled.png",
    slug: "truenas-content-creators",
    content: `
      <p>As part of our drive to give the right solution to our customers, Tom wrote a post on the use of <a href="https://datasolace.com/blog/unraid-the-ultimate-nas-build-for-content-creators" target="_blank" rel="noopener">UNRAID for Content Creators</a>. <a href="https://unraid.net/" target="_blank" rel="noopener">Unraid</a> isn't the only solution though. We run <a href="https://www.truenas.com/" target="_blank" rel="noopener">TrueNAS</a> internally for many reasons, and a tonne of those apply to Content Creators too!</p>
      
      <p>If you have:</p>
      <ul>
        <li>a larger team or media production house</li>
        <li>a massive amount of data that needs to be on-site (think hundreds of terabytes and above)</li>
        <li>a neurotic need to never lose data, <em>ever</em></li>
      </ul>
      
      <p>then read on for more!</p>
      
      <h2>Wait… But What's a NAS?</h2>
      <p>Let's back up a step. A Network Attached Storage system, or NAS, is a set of hard drives. They live on a device that is not your computer. If you've never used one before, some high level benefits:</p>
      <ul>
        <li>Many people can use it in the same house/company/etc at the same time</li>
        <li>Allows easy remote access if you're working remotely
          <ul>
            <li>Think "the cloud," except your data isn't training Elon's new AI bestie</li>
          </ul>
        </li>
        <li>Operating System Agnostic
          <ul>
            <li>That one guy in the office who <em>needs</em> to use a Mac for... Photoshop(?) now doesn't hand back a USB that your laptop can't even read</li>
          </ul>
        </li>
      </ul>
      
      <h2>TrueNAS uses ZFS for advanced data protection</h2>
      <p>ZFS is truly amazing. You don't have to take my word for it; check out <a href="https://youtu.be/nlBXXdz0JKA?si=MyPVkO8obgWlwCQu" target="_blank" rel="noopener">this video</a> from Tom Lawrence where he goes over ZFS in depth. Or if you've watched the first 15 seconds of that and are thinking "No! I didn't need another bachelor's degree," <a href="https://www.youtube.com/watch?v=0d4_nvdZdOc&pp=ygUVbGF3cmVuY2UgemZzIGJlZ2lubmVy" target="_blank" rel="noopener">this one</a> is a lot less verbose.</p>
      
      <p>Or if you hate watching videos (you're reading a blog post after all), here's the high level benefits:</p>
      <ul>
        <li><strong>Scrubbing</strong>
          <ul>
            <li>Allows for periodic integrity checking of all data</li>
            <li>Identifies and corrects issues before they become critical</li>
          </ul>
        </li>
        <li><strong>Checksums</strong>
          <ul>
            <li>ZFS uses checksums for all data and metadata</li>
            <li>Detects and corrects silent data corruption without user intervention</li>
          </ul>
        </li>
        <li><strong>Snapshots</strong>
          <ul>
            <li>Allows point-in-time copies of the file system</li>
            <li>Enables easy recovery from accidental deletions or modifications</li>
          </ul>
        </li>
        <li><strong>Copy-on-Write</strong>
          <ul>
            <li>Ensures that data is never overwritten in place</li>
            <li>Prevents partial writes and maintains data consistency</li>
          </ul>
        </li>
      </ul>
      
      <p>If you're already thinking <em>"ugh, please just take care of it for me,"</em> <a href="/appointments">reach out</a> and we can take care of the whole process for you!</p>
      
      <h2>Core vs Scale</h2>
      <p>"But wait, I've done some Googling™️ and I've found that there are 2 versions! What gives?!"</p>
      
      <p>Congratulations, Padawan, life is hard. Now, besides angry and outdated Reddit posts, let me give you a quick rundown of the differences:</p>
      
      <h3>Core</h3>
      <ul>
        <li>Based on FreeBSD</li>
        <li>More mature and stable</li>
        <li>Better suited for traditional NAS use cases</li>
      </ul>
      
      <h3>Scale</h3>
      <ul>
        <li>Based on Debian Linux</li>
        <li>Newer, with a focus on scalability and containerisation</li>
        <li>Better for hyperconverged infrastructure and running VMs/containers</li>
      </ul>
      
      <p>Both use ZFS. Both have a well-tested update history. But the potential of containerising is huge for some audiences.</p>
      
      <p>Especially for users who aren't full-on "Big Corporations," TrueNAS can also be an app server for you. Some simple ideas:</p>
      <ul>
        <li>Document solutions like <a href="https://nextcloud.com/" target="_blank" rel="noopener">Nextcloud</a></li>
        <li>Photo viewers like <a href="https://immich.app/" target="_blank" rel="noopener">Immich</a> or <a href="https://www.photoprism.app/" target="_blank" rel="noopener">PhotoPrism</a></li>
        <li>VPN apps like <a href="https://tailscale.com/" target="_blank" rel="noopener">Tailscale</a></li>
      </ul>
      
      <p>They run directly on the device that has your storage mounted. So if your network isn't AAA grade, this will likely speed things up.</p>
      
      <p><em>Psst! If you want us to fix that whole slow networking thing for you, <a href="/appointments">let's have a chat</a>!</em></p>
      
      <h2>So What Are The Key Differences?</h2>
      <p>As you've likely gathered, if you've read our Unraid post, there's quite the number of differences between TrueNAS and Unraid. They might both be NAS platforms but they have some key pros and cons when compared to each other.</p>
      
      <h3>Benefits</h3>
      
      <h4>Scalability</h4>
      <p>A key feature of TrueNAS Scale is cluster expansion. This sets it apart from many NAS solutions, including TrueNAS Core and Unraid. Here's a more detailed look:</p>
      
      <p>Users can start with a single node and then grow to a multi-node setup as their needs change. This flexibility enables incremental growth without the need for a complete system overhaul. As you add nodes, the system uses distributed storage. It spreads data across available nodes to boost performance and redundancy. This approach uses all nodes' combined storage. It boosts data access and fault tolerance.</p>
      
      <p>Furthermore, the cluster configuration provides high availability through failover capabilities between nodes. If a node fails, the system ensures access to data by redirecting operations to working nodes.</p>
      
      <p>This cluster expansion feature is especially useful for businesses with rapid data growth. It helps future-proof their storage infrastructure. It allows for massive scaling without requiring major system overhauls.</p>
      
      <h4>Data Integrity</h4>
      <p>TrueNAS offers superior data integrity benefits due to its use of the ZFS file system. ZFS uses end-to-end checksums for all data and metadata. It constantly verifies the accuracy of the stored information. This proactive approach lets the system find and fix silent data corruption. This is a common issue in large storage systems that other file systems often miss.</p>
      
      <p>ZFS's copy-on-write feature boosts data integrity. It never overwrites data in place. Instead, it writes changes to a new location before switching the metadata pointers. This method prevents partial writes. It keeps data consistent, even if there is a sudden power loss or system failure.</p>
      
      <p>Also, ZFS has a self-healing feature. It can repair corrupted data "on the fly," using redundant copies. This all happens without user intervention. TrueNAS's combined capabilities make it very resistant to data loss and corruption. It gives users peace of mind when storing critical, irreplaceable data.</p>
      
      <h4>Free and Open Source</h4>
      <p>TrueNAS Scale is free to use. It is a great option for users wanting enterprise-grade storage at a low cost. This lets users spend their budgets on hardware, not on pricey software licenses.</p>
      
      <p>Anyone can look at the code that makes TrueNAS work. This means many people can check it for problems. It's harder for bad actors to hide secret ways to get into your data. You can trust that TrueNAS isn't doing anything nefarious with your information.</p>
      
      <p>Because TrueNAS is open-source, it doesn't depend on one company. Even if the main people who make it stop, others can keep it going. This means the storage system you set up now will continue to work for a long time.</p>
      
      <h3>Drawbacks</h3>
      <p>Whilst TrueNAS is great, we realise that it's not for everybody.</p>
      
      <h4>Extra Complexity</h4>
      <p>TrueNAS is a powerful storage system, but it can be tough to learn at first. It has lots of advanced features that can be confusing for new users. This means it might take more time to get comfortable using it. Also, with so many settings to manage, it's easier to make mistakes. They could slow your system or, in rare cases, corrupt your data.</p>
      
      <p>Getting TrueNAS up and running, and keeping it working well, takes time and effort. You'll probably need to read a lot of instructions and spend time fixing issues to make sure everything works right. TrueNAS also often needs better, more expensive computer parts to work its best. This means you might have to spend more money at the start than you would for a simpler system.</p>
      
      <p>If you need basic file storage, TrueNAS might be more than you need. It has many features that you might not use, which can make simple tasks more complicated than they need to be. For some users, these extra features might get in the way of simply storing and sharing files.</p>
      
      <h4>Additional Planning</h4>
      <p>TrueNAS requires more planning before you start setting it up. You must carefully plan your storage and features. This means figuring out how many drives you'll need. You'll also need to set up your storage pools and choose your data protection level. It's not something you can just plug in and start using right away.</p>
      
      <p>This extra planning can be a bit of a hassle, especially if you're used to simpler storage systems. You might spend hours researching RAID levels. You might also debate the best network setup. Or, you might try to understand complex features like snapshots and replication. This planning can improve the system in the long run. But, you can't jump in and start using TrueNAS.</p>
      
      <p>For some users, this need for careful planning might feel like overkill. If you just want to store and share some files on your network, you might find all this setup frustrating. It's like needing to plan out a whole garden when all you want to do is plant a few flowers. This extra work can be a real downside for those who prefer a ready-to-use solution.</p>
    `
  }
];

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  
  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--brand-blue)]">
      <Header currentPage="blog" />

      {/* Blog Post Content */}
      <section className="py-20 px-6 pt-32">
        <div className="max-w-4xl mx-auto">
          {/* Back to Blog */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="text-white hover:text-[var(--brand-teal)] transition-colors inline-flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </div>

          {/* Article */}
          <article className="bg-white rounded-2xl p-8 md:p-12">
            {/* Header */}
            <header className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-[var(--brand-teal)] bg-[var(--brand-teal)]/10 px-3 py-1 rounded">
                  {post.category}
                </span>
                <span className="text-sm text-gray-500">
                  {post.date}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-[var(--brand-blue)] mb-6">
                {post.title}
              </h1>
              
              <p className="text-gray-600 text-lg leading-relaxed">
                {post.description}
              </p>
            </header>

            {/* Featured Image */}
            {post.image && (
              <div className="mb-8">
                {post.image.startsWith('/api/placeholder') ? (
                  <div className="w-full h-64 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg flex items-center justify-center">
                    <span className="text-gray-600 text-lg font-medium px-6 py-3 bg-white/80 rounded">
                      {post.id === 3 ? "📈 Data Analytics" :
                       post.id === 4 ? "🏠 Smart Home Index" :
                       post.id === 5 ? "🔒 Security Camera" : "💾 Network Storage"}
                    </span>
                  </div>
                ) : (
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={800}
                    height={400}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                )}
              </div>
            )}

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Share and Navigation */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex space-x-4">
                  <span className="text-gray-600">Share:</span>
                  <a href="#" className="text-[var(--brand-teal)] hover:text-[var(--brand-green)] transition-colors">
                    Twitter
                  </a>
                  <a href="#" className="text-[var(--brand-teal)] hover:text-[var(--brand-green)] transition-colors">
                    LinkedIn
                  </a>
                </div>
                
                <Link
                  href="/blog"
                  className="text-[var(--brand-teal)] hover:text-[var(--brand-green)] transition-colors font-medium"
                >
                  ← Back to Blog
                </Link>
              </div>
            </div>
          </article>

          {/* Related Posts */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-8">Related Posts</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {blogPosts
                .filter(p => p.id !== post.id)
                .slice(0, 2)
                .map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <h3 className="text-lg font-bold text-[var(--brand-blue)] mb-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {relatedPost.description.substring(0, 120)}...
                    </p>
                    <span className="text-[var(--brand-teal)] text-sm font-medium">
                      Read More →
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 
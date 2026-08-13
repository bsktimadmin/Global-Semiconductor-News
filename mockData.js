// Global Semiconductor, IT, Economic News Mock Data (English Edition)

const marketIndices = [
  { symbol: "SOX", name: "Philadelphia Semiconductor Index", price: "5,124.50", change: "+1.85%", isPositive: true },
  { symbol: "NASDAQ", name: "NASDAQ Composite", price: "17,612.80", change: "+1.24%", isPositive: true },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: "128.45", change: "+3.42%", isPositive: true },
  { symbol: "TSMC", name: "TSMC ADR", price: "172.90", change: "-0.45%", isPositive: false },
  { symbol: "005930.KS", name: "Samsung Electronics", price: "74,200", change: "+1.09%", isPositive: true },
  { symbol: "000660.KS", name: "SK Hynix", price: "186,500", change: "+2.30%", isPositive: true },
  { symbol: "ASML", name: "ASML Holding", price: "912.40", change: "+0.85%", isPositive: true },
  { symbol: "AMD", name: "AMD Inc.", price: "164.20", change: "+1.95%", isPositive: true },
  { symbol: "INTC", name: "Intel Corp.", price: "30.15", change: "-2.10%", isPositive: false },
  { symbol: "USD/KRW", name: "US Dollar / Korean Won", price: "1,354.20", change: "-0.35%", isPositive: false }
];

const supplierRankings = [
  { rank: 1, name: "TSMC", category: "Foundry", revenue2025: "78.4", marketShare: "61.2%", growth: "+14.2%" },
  { rank: 2, name: "NVIDIA", category: "Fabless", revenue2025: "60.9", marketShare: "12.5%", growth: "+112.5%" },
  { rank: 3, name: "Samsung Electronics", category: "IDM (Memory)", revenue2025: "58.2", marketShare: "11.9%", growth: "+8.4%" },
  { rank: 4, name: "Intel", category: "IDM", revenue2025: "54.1", marketShare: "11.1%", growth: "-2.3%" },
  { rank: 5, name: "Broadcom", category: "Fabless", revenue2025: "35.8", marketShare: "7.3%", growth: "+9.1%" },
  { rank: 6, name: "SK Hynix", category: "IDM (Memory)", revenue2025: "32.4", marketShare: "6.6%", growth: "+28.7%" },
  { rank: 7, name: "Qualcomm", category: "Fabless", revenue2025: "30.2", marketShare: "6.2%", growth: "+4.5%" }
];

const salesTrends = {
  years: ["2021", "2022", "2023", "2024", "2025", "2026(F)"],
  sales: [555.9, 573.5, 526.8, 611.2, 687.4, 755.8] // In Billion USD
};

const marketShareData = {
  categories: ["Logic & Processor", "Memory (DRAM/NAND)", "Analog ICs", "Microprocessors", "Opto/Sensors/Discrete"],
  percentages: [42.1, 26.8, 14.5, 9.2, 7.4]
};

const newsData = [
  {
    id: "news-1",
    category: "global-semiconductor-sales",
    title: "WSTS Upgrades 2026 Global Semiconductor Market Forecast to Record $755.8 Billion",
    summary: "The World Semiconductor Trade Statistics (WSTS) has revised its 2026 forecast upward, predicting a 9.9% year-on-year growth driven by insatiable demand for AI chips and next-gen memory architectures.",
    image: "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?w=600&auto=format&fit=crop&q=60",
    date: "2026-08-06",
    source: "World Semiconductor Trade Statistics",
    views: "1245",
    content: `
      <p>The World Semiconductor Trade Statistics (WSTS) released its updated global semiconductor sales forecast today, indicating that the industry’s recovery momentum will carry well into 2026. The surge is primarily attributed to unprecedented capital expenditure from hyperscalers upgrading datacenters with AI accelerators and high-bandwidth memory (HBM3e/HBM4).</p>
      
      <h3>Key Market Segments Forecast</h3>
      <ul>
        <li><strong>Memory Products:</strong> Expected to lead the expansion with a 20.4% YoY surge, buoyed by tight supply dynamics and higher average selling prices (ASPs) for DRAM.</li>
        <li><strong>Logic ICs:</strong> Anticipated to grow by 10.2%, fueled by specialized Neural Processing Units (NPUs) and custom silicon configurations.</li>
        <li><strong>Analog & Power Semiconductors:</strong> Steady growth is expected as automotive electrification and high-voltage industrial systems continue to deploy SiC and GaN components.</li>
      </ul>

      <blockquote class="accent-quote">
        "Generative AI infrastructure investments are no longer cyclical experiments; they represent a fundamental shift in enterprise computing architectures, directly benefiting the hardware supply chain."
      </blockquote>

      <p>Regionally, the Americas market is expected to witness the strongest acceleration at 14.5%, while the Asia-Pacific region (including China) remains the largest single consumer market with an estimated 8.2% expansion. The secondary wave of growth is anticipated as on-device AI integration scales up in consumer laptops and premium mobile chipsets.</p>
    `
  },
  {
    id: "news-2",
    category: "outlook-forecast",
    title: "Gartner Report: AI Accelerator Market Projected to Grow 25% Annually Through 2029",
    summary: "Despite occasional macroeconomic headwinds and questions surrounding software monetization, global hardware infrastructure investment remains robust, showing no signs of slowing down.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=60",
    date: "2026-08-05",
    source: "Gartner Executive Advisory",
    views: "982",
    content: `
      <p>A new analysis by Gartner highlights that the adoption rate of artificial intelligence accelerators—such as GPUs, TPUs, and specialized ASICs—in enterprise computing shows a consistent upward trajectory. The demand is expanding beyond initial training clusters into mass-scale inference nodes.</p>
      
      <p>Gartner's VP of Emerging Technologies noted, "The architectural pivot toward accelerated computing is a multi-decade transition. Companies that delay infrastructure investments risk being excluded from the next generation of software workflows."</p>
      
      <h3>Strategic Market Highlights</h3>
      <ul>
        <li><strong>Custom ASIC Penetration:</strong> Proprietary silicon developed by hyperscalers (such as Google’s TPU and Meta’s MTIA) is expected to capture over 25% of the accelerator market by the end of 2026, challenging traditional GPU hegemony.</li>
        <li><strong>Thermal Management Concerns:</strong> Rising power density in datacenters is driving exponential growth in liquid cooling solutions and high-efficiency Power Management ICs (PMICs).</li>
      </ul>
      <p>The report concludes that corporate capital expenditures (Capex) allocated to semiconductor acquisition will remain elevated throughout the late 2020s, establishing a new baseline for global foundry demand.</p>
    `
  },
  {
    id: "news-3",
    category: "supplier-ranking",
    title: "TSMC Captures 61.2% of Global Foundry Market, Driven by Surging 3nm AI Chip Orders",
    summary: "Despite competitive efforts from Samsung and Intel Foundry, TSMC's virtual monopoly on leading-edge sub-5nm nodes continues to consolidate its industry dominance.",
    image: "https://images.unsplash.com/photo-1601524909162-be87252be298?w=600&auto=format&fit=crop&q=60",
    date: "2026-08-04",
    source: "TrendForce Intelligence",
    views: "1830",
    content: `
      <p>The global foundry market grew by 8.5% quarter-on-quarter in Q4 2025, according to the latest research from TrendForce. Taiwan Semiconductor Manufacturing Company (TSMC) single-handedly captured 61.2% of the market share, cementing its undisputed first-place ranking.</p>

      <h3>Global Foundry Market Share (2025 Year-End)</h3>
      <ol>
        <li><strong>TSMC (Taiwan):</strong> 61.2% (Dominating leading-edge 3nm and 5nm allocations)</li>
        <li><strong>Samsung Foundry (South Korea):</strong> 11.5% (Focusing on Gate-All-Around [GAA] yields for 3nm/2nm)</li>
        <li><strong>Intel Foundry (United States):</strong> 8.9% (Transitioning 18A process to active high-volume manufacturing)</li>
        <li><strong>UMC (Taiwan) & GlobalFoundries (US):</strong> Hovering around 5% each, leading mature and specialized nodes</li>
      </ol>

      <p>TSMC’s dominance is anchored by major contracts from Apple, NVIDIA, AMD, Qualcomm, and MediaTek. These tech giants have fully pre-booked TSMC's 3nm capacity through next year, and initial capacity negotiations for the upcoming 2nm node (N2) suggest similar supply constraints.</p>
    `
  },
  {
    id: "news-4",
    category: "global-product-markets",
    title: "CXL 3.0 Commercial Rollout Set to Resolve Datacenter Memory Wall Bottlenecks",
    summary: "The next-generation Compute Express Link protocol enters high-volume server deployments, promising to bypass traditional memory capacity limitations for CPU/GPU clusters.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=60",
    date: "2026-08-03",
    source: "IT Infrastructure Core",
    views: "812",
    content: `
      <p>Compute Express Link (CXL) has officially graduated from standardization committees to practical enterprise deployment. The introduction of CXL 3.0 controllers in server architectures is enabling a paradigm shift in how datacenters allocate dynamic memory resources.</p>
      
      <p>By establishing a low-latency, cache-coherent interconnect between processors, accelerators, and memory pools, CXL allows servers to share memory modules dynamically. This removes the strict physical constraints of dedicated DIMM slots on individual motherboards.</p>
      
      <h3>Key Industry Adaptations</h3>
      <ul>
        <li><strong>Samsung Electronics:</strong> Having stabilized production of CXL 2.0 modules, Samsung is now showcasing CXL Memory Modules (CMM) optimized for high-capacity memory pooling.</li>
        <li><strong>SK Hynix:</strong> Integrating CXL technology directly alongside its advanced LPDDR5X and high-speed DDR5 portfolios to capture enterprise AI server share.</li>
      </ul>
    `
  },
  {
    id: "news-5",
    category: "global-economy",
    title: "US Fed Cuts Interest Rate by 25bps, Easing Capital Expenditure Burden for Megafabs",
    summary: "As inflation metrics stabilize, the Federal Reserve continues its gradual monetary easing, lowering borrowing costs for highly capital-intensive semiconductor fab projects.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop&q=60",
    date: "2026-08-05",
    source: "Wall Street Journal Brief",
    views: "1520",
    content: `
      <p>The US Federal Reserve announced a 25-basis-point reduction in its benchmark interest rate, bringing the target range down to 4.25%–4.50%. This continuous rate adjustment signals a pivot toward supporting economic expansion while inflation recedes.</p>
      
      <p>Semiconductor fabrication plants are among the most capital-intensive projects in modern industry, with a single cutting-edge fab costing between $15 billion and $20 billion. Consequently, a drop in interest rates directly reduces interest payments on corporate debt, boosting margins for fab operators investing in EUV lithography systems.</p>

      <blockquote class="accent-quote">
        "Lower financing costs will allow fabless start-ups to secure funding and foundry operators to resume deferred fabrication expansions without severe dilution."
      </blockquote>
      
      <p>The rate cut is also expected to stimulate global demand for consumer electronics, vehicles, and network gear, creating a positive feedback loop for chip sales across the entire semiconductor supply chain.</p>
    `
  },
  {
    id: "news-6",
    category: "it-tech-news",
    title: "Apple Unveils Next-Gen Silicon with Advanced On-Device NPU for Localized LLM Execution",
    summary: "The custom Apple silicon is designed on TSMC's N3P node, offering localized AI computing without relying on cloud-based processing networks.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=60",
    date: "2026-08-06",
    source: "Silicon Valley Tech Daily",
    views: "2045",
    content: `
      <p>Apple has officially introduced its newest processor family featuring the "Apple Neural Core v2". This hardware enhancement enables localized, high-speed execution of Large Language Models (LLMs) and advanced image processing directly on the device, ensuring user data privacy.</p>
      
      <p>Built using TSMC's refined N3P 3nm node, the chipset packs more transistors into the same footprint, reducing thermal output and power consumption by 40% compared to previous designs during continuous neural engine operations.</p>
      
      <h3>Hardware & Ecosystem Impacts</h3>
      <ul>
        <li><strong>Higher Memory Base:</strong> To accommodate local model weights, base memory configurations for premium laptops are climbing from 8GB to a minimum of 12GB or 16GB of unified LPDDR5X memory.</li>
        <li><strong>Privacy-Centric AI Applications:</strong> Zero-latency, offline text summarization and semantic indexing open new opportunities for enterprise applications in healthcare and financial security where data cannot leave the device.</li>
      </ul>
    `
  },
  {
    id: "news-7",
    category: "geopolitics-supply-chain",
    title: "US House Proposes Expansion of Semiconductor Equipment Export Rules to Cover OSAT Ecosystem",
    summary: "A new draft bill targets packaging and testing stages (OSAT) in third-party countries to prevent evasion of existing advanced processor export limits.",
    image: "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?w=600&auto=format&fit=crop&q=60",
    date: "2026-08-05",
    source: "Washington Policy Review",
    views: "1110",
    content: `
      <p>Geopolitical export regulations are expanding from raw silicon fab equipment into the crucial back-end packaging sector. A draft bill presented in the US House of Representatives proposes strict auditing of Outsourced Semiconductor Assembly and Test (OSAT) facilities in Southeast Asia that utilize US-designed tooling and patents.</p>
      
      <p>Industry analysts warn that Southeast Asian nations like Malaysia, Vietnam, and Thailand are key centers for final packaging. Restricting access to advanced packaging tools could delay product shipping and increase global supply chain operational costs.</p>
      
      <p>In response, multinational chipmakers are accelerating efforts to diversify their back-end strategies, investing in packaging capacity in North America and Western Europe to secure geopolitical resilience.</p>
    `
  },
  {
    id: "news-8",
    category: "insights-deep-dives",
    title: "Beyond Silicon: The Commercialization and Geopolitics of SiC and GaN Wide Bandgap Semiconductors",
    summary: "As traditional silicon approaches its physical limits under extreme voltages, Silicon Carbide (SiC) and Gallium Nitride (GaN) are capturing high-power markets.",
    image: "https://images.unsplash.com/photo-1601524909162-be87252be298?w=600&auto=format&fit=crop&q=60",
    date: "2026-08-02",
    source: "Antigravity Research Labs",
    views: "2330",
    content: `
      <p>For more than half a century, silicon (Si) has been the foundation of the electronics industry. However, under high voltages, high frequencies, and extreme temperatures, silicon components reach physical limitations. Silicon Carbide (SiC) and Gallium Nitride (GaN), known as Wide Bandgap (WBG) semiconductors, are stepping in to redefine power density.</p>
      
      <h3>Why Wide Bandgap Materials?</h3>
      <p>SiC operates under breakdown electric fields 10 times higher than silicon and transfers heat three times more efficiently. In electric vehicles, this translates to smaller, lighter battery inverters that reduce power losses by up to 70%, extending driving range by 5% to 10% on a single charge.</p>
      
      <table>
        <thead>
          <tr>
            <th>Property</th>
            <th>Silicon (Si)</th>
            <th>Silicon Carbide (SiC)</th>
            <th>Gallium Nitride (GaN)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Bandgap Energy (eV)</td>
            <td>1.1</td>
            <td>3.2 (3x)</td>
            <td>3.4 (3.1x)</td>
          </tr>
          <tr>
            <td>Electric Field Limit (MV/cm)</td>
            <td>0.3</td>
            <td>3.0 (10x)</td>
            <td>3.3 (11x)</td>
          </tr>
          <tr>
            <td>Thermal Conductivity (W/mK)</td>
            <td>1.5</td>
            <td>4.9 (3.3x)</td>
            <td>1.3 (Comparable)</td>
          </tr>
        </tbody>
      </table>

      <h3>Market Players and Constraints</h3>
      <p>Key WBG market leaders include STMicroelectronics, Infineon Technologies, and Wolfspeed. However, crystal growth for SiC ingots is slower and more energy-intensive than silicon, which limits yields. While manufacturing cost barriers remain, WBG materials are projected to become the standard choice for power infrastructure by the end of the decade.</p>
    `
  }
];

const dictionaryData = [
  {
    term: "HBM (High Bandwidth Memory)",
    definition: "A high-performance memory interface utilizing stacked DRAM dies interconnected via Through-Silicon Vias (TSVs) to achieve extremely wide memory buses. It is primarily paired with high-performance GPUs and AI accelerators to overcome memory bandwidth limits."
  },
  {
    term: "Foundry",
    definition: "A dedicated semiconductor fabrication facility that manufactures integrated circuits on silicon wafers on behalf of fabless companies. Key industry leaders include TSMC and Samsung Foundry."
  },
  {
    term: "Fabless",
    definition: "A business model where a semiconductor company designs and sells hardware and chips but outsources the physical manufacturing (fabrication) to a third-party foundry. Examples include NVIDIA, AMD, and Qualcomm."
  },
  {
    term: "OSAT (Outsourced Semiconductor Assembly and Test)",
    definition: "Third-party vendors providing packaging, assembly, and testing services. OSATs receive raw fabricated wafers from foundries, slice them into individual dies, package them to prevent environmental damage, and conduct final quality assurance tests."
  },
  {
    term: "GAA (Gate-All-Around)",
    definition: "A transistor architecture designed to succeed FinFET at sub-3nm nodes. In a GAA transistor, the gate contacts all four sides of the horizontal channel nanowires or nanosheets, enabling finer control over the channel current and reducing electrical leakage."
  },
  {
    term: "CXL (Compute Express Link)",
    definition: "An open industry standard interconnect protocol built on top of PCIe physical layer. It establishes high-bandwidth, low-latency, and cache-coherent pathways between CPUs, accelerators, and memory devices, allowing memory pooling across nodes."
  }
];

if (typeof window !== 'undefined') {
  window.marketIndices = marketIndices;
  window.supplierRankings = supplierRankings;
  window.salesTrends = salesTrends;
  window.marketShareData = marketShareData;
  window.newsData = newsData;
  window.dictionaryData = dictionaryData;
}


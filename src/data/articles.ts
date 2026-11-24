import type { Article } from '../types/news';

const now = Date.now();
const hoursAgo = (h: number) => new Date(now - h * 3600 * 1000).toISOString();

export const EDITORIAL_ARTICLES: Article[] = [
  {
    id: 'ed-nordic-quantum-ai',
    slug: 'nordic-sovereign-ai-supercluster-hydro-grid',
    title: 'Inside the Arctic Fjord: Europe’s First Zero-Carbon Sovereign AI Supercluster Comes Online',
    subtitle:
      'Powered entirely by glacial hydroelectricity and cooled by deep fjord water, the 1.2-gigawatt compute citadel signals a decisive shift in the global artificial intelligence infrastructure race.',
    excerpt:
      'A 1.2-gigawatt hydroelectric supercomputer carved beside a Norwegian fjord begins training open-weight European foundation models with 44% lower thermal overhead.',
    category: 'technology',
    author: {
      name: 'Eleanor Vance',
      role: 'Chief Technology Correspondent',
      avatarInitials: 'EV',
      location: 'Oslo & London',
    },
    publishedAt: hoursAgo(1.2),
    readTimeMinutes: 7,
    image: '/images/hero-ai-datacenter.jpg',
    imageCaption:
      'The Aurland Sovereign Compute Campus integrates liquid-cooled optical interconnects directly with glacial turbine substations.',
    isFeatured: true,
    isBreaking: true,
    tags: ['AI Infrastructure', 'Clean Compute', 'Europe', 'Optical Chips'],
    keyTakeaways: [
      'Delivers 1.2 GW of dedicated zero-carbon compute using closed-loop deep-fjord thermal exchange.',
      'Replaces traditional copper cluster racks with silicon-photonics backplanes, slashing interconnect latency by 62%.',
      'Allocates 35% of annual compute cycles to universities, medical genomics labs, and climate-modeling institutes at cost.',
    ],
    content: [
      'Carved into dark granite cliffs forty kilometers inland from the Norwegian Sea, the newly inaugurated Aurland Sovereign Compute Campus resembles a Nordic cathedral of brushed steel and luminous glass more than a traditional warehouse of humming server racks. Beneath its cantilevered roof, however, sits one of the densest concentrations of artificial intelligence compute ever assembled outside Silicon Valley.',
      'Commissioned by a consortium of twelve European research ministries and Nordic energy cooperatives, the facility marks a strategic inflection point for global computing. For the past decade, frontier model training has faced an escalating collision with aging urban power grids. By placing 240,000 next-generation photonic accelerators directly adjacent to high-head hydroelectric turbines, engineers have bypassed transmission bottlenecks entirely while operating at an industry-record Power Usage Effectiveness of 1.04.',
      'Inside the main hall, ambient sound is unexpectedly subdued. Instead of roaring air-conditioning chillers, chilled mineral fluid circulates through direct-to-chip microchannels before rejecting heat into a municipal aquaculture and district-heating loop serving three nearby coastal towns. Engineers estimate the facility recaptures nearly 78 megawatts of thermal energy during winter months.',
      'Equally consequential is what runs on the silicon. Unlike hyperscale commercial clouds built exclusively around proprietary APIs, a binding charter reserves more than a third of Aurland’s training capacity for open-science breakthroughs — including pan-European weather prediction at one-kilometer resolution, antibiotic protein folding, and multilingual public-interest language models.',
      'Analysts in London and Frankfurt view the launch as proof that sovereign AI no longer requires choosing between industrial competitiveness and climate pledges. Within hours of the ceremonial switch-on, consortium leaders confirmed negotiations are already underway for sister sites in northern Sweden and geothermal valleys in Iceland.',
    ],
    views: 48920,
  },
  {
    id: 'ed-geneva-accord',
    slug: 'geneva-maritime-trade-digital-corridor-accord',
    title: 'Geneva Summit Seals Historic Global Accord on Digital Trade Corridors and Autonomous Shipping',
    subtitle:
      'Delegations from 68 nations ratify unified customs telemetry and open-ocean maritime routing protocols expected to trim global supply-chain delays by up to 19%.',
    excerpt:
      'After fourteen months of quiet shuttle diplomacy, 68 countries sign an enforceable interoperability treaty covering smart ports, cargo verification, and maritime emissions.',
    category: 'world',
    author: {
      name: 'Marcus Sterling',
      role: 'Senior Diplomatic Editor',
      avatarInitials: 'MS',
      location: 'Geneva',
    },
    publishedAt: hoursAgo(2.6),
    readTimeMinutes: 6,
    image: '/images/world-summit.svg',
    imageCaption:
      'Delegates gather at the lakeside assembly pavilion in Geneva following the plenary ratification vote.',
    isBreaking: true,
    tags: ['Diplomacy', 'Global Trade', 'Geneva', 'Supply Chains'],
    keyTakeaways: [
      'Harmonizes electronic bills of lading across 140 major deep-water ports spanning Asia, Europe, Africa, and the Americas.',
      'Establishes shared legal liability rules for semi-autonomous container vessels navigating congested straits.',
      'Economists project $42 billion in annual savings on port demurrage and perishable cargo spoilage.',
    ],
    content: [
      'As dusk settled over Lake Geneva, trade ministers from sixty-eight economies rose in rare diplomatic unanimity to sign the Meridian Maritime & Digital Corridor Convention — the most sweeping modernization of international shipping standards since the containerization treaties of the late twentieth century.',
      'For decades, nearly eighty percent of world merchandise trade has traveled across oceans governed by a patchwork of paper manifests, incompatible customs portals, and manual port clearances. Even brief disruptions at major maritime chokepoints have routinely cascaded into weeks of factory slowdowns and consumer price spikes.',
      'Under the newly ratified accord, participating port authorities will transition over twenty-four months to a cryptographically verifiable digital cargo ledger. Vessels transmitting real-time fuel, manifest, and cold-chain telemetry can receive pre-arrival customs clearance up to forty-eight hours before docking, dramatically reducing anchor-waiting times and coastal diesel exhaust.',
      'Crucially, negotiators bridged a longstanding divide between developing maritime exporters and wealthy importing blocs by establishing a $3.4 billion transition fund. The facility will finance optical fiber upgrades, automated cranes, and cybersecurity training across ports in East Africa, South Asia, and Latin America.',
      'Shipping executives welcomed the framework immediately, noting that predictable port windows unlock lower insurance premiums and faster inventory cycles for pharmaceuticals, semiconductors, and agricultural harvests alike.',
    ],
    views: 34180,
  },
  {
    id: 'ed-central-banks-liquidity',
    slug: 'global-markets-rally-bond-yields-stabilize-productivity-surge',
    title: 'Global Equities Surge to Fresh Highs as Industrial Productivity Gains Outpace Inflation Fears',
    subtitle:
      'Synchronized earnings beats across automation, clean grid hardware, and precision manufacturing prompt strategists to revise global GDP projections upward.',
    excerpt:
      'Sovereign bond yields steady across London, New York, and Tokyo as quarterly corporate filings reveal the strongest non-financial productivity jump in fifteen years.',
    category: 'business',
    author: {
      name: 'Priya Subramanian',
      role: 'Global Markets Editor',
      avatarInitials: 'PS',
      location: 'London',
    },
    publishedAt: hoursAgo(3.4),
    readTimeMinutes: 5,
    image: '/images/markets-skyline.jpg',
    imageCaption:
      'Morning light across London’s financial district as European and US futures extend a third consecutive week of broad-based gains.',
    isBreaking: true,
    tags: ['Markets', 'Macroeconomics', 'Central Banks', 'Equities'],
    keyTakeaways: [
      'Non-farm labor productivity climbed 3.1% annualized across G7 industrial sectors in the latest quarterly release.',
      'Capital expenditure is rotating rapidly from software hype into grid transformers, robotics, and automated logistics.',
      'Emerging-market local-currency debt logged its largest weekly inflow since 2023.',
    ],
    content: [
      'Across trading desks from Canary Wharf to Wall Street, a striking shift in narrative has taken hold over the past month. Rather than hanging solely on every syllable of central-bank rate guidance, institutional investors are increasingly pricing in something far rarer: genuine, measurable productivity growth across the real economy.',
      'Fresh quarterly disclosures from industrial conglomerates, medical device makers, and freight operators point to a 3.1 percent annualized leap in output per hour worked — the briskest sustained pace in fifteen years. Crucially, the gains are no longer confined to a handful of mega-cap technology firms.',
      'Grid modernization suppliers in Germany, precision optics fabricators in Japan, and specialty pharmaceutical plants in India and Ireland all reported widening operating margins alongside steadier input prices. Chief financial officers point to predictive maintenance, automated quality inspection, and cheaper renewable industrial power as the decisive drivers.',
      'Bond traders have rewarded the mix of resilient growth and cooling unit labor costs. Ten-year benchmark yields eased eleven basis points over the week, breathing fresh life into mid-cap equities and sovereign infrastructure bonds across emerging markets.',
      'Still, seasoned strategists caution against complacency. Geopolitical tariff frictions and elevated valuations in flagship semiconductor indexes leave markets vulnerable to sharp air pockets should quarterly execution falter.',
    ],
    views: 29450,
  },
  {
    id: 'ed-europa-plumes',
    slug: 'deep-space-probe-detects-complex-organic-salts-europa-plumes',
    title: 'Deep-Space Orbiter Detects Complex Organic Salts Erupting from Europa’s Subsurface Ocean',
    subtitle:
      'High-resolution mass spectrometry from a low-altitude polar flyby reveals hydrothermal chemistry remarkably similar to Earth’s deep-sea vents.',
    excerpt:
      'Planetary scientists confirm carbon-bearing compounds and molecular hydrogen venting through kilometer-wide fissures in the icy crust of Jupiter’s moon Europa.',
    category: 'science',
    author: {
      name: 'Dr. Julian Chen',
      role: 'Space & Science Correspondent',
      avatarInitials: 'JC',
      location: 'Pasadena',
    },
    publishedAt: hoursAgo(4.8),
    readTimeMinutes: 6,
    image: '/images/science-europa.svg',
    imageCaption:
      'Composite visualization of sunlit water-vapor cryoplumes rising above Europa’s fractured southern ice shelf.',
    tags: ['Astrobiology', 'Europa', 'Space Exploration', 'Planetary Science'],
    keyTakeaways: [
      'Spectrometers identified hydrated carbonate salts alongside long-chain carbon molecules during a 110-kilometer flyby.',
      'Isotope ratios strongly suggest active hydrothermal circulation on the rocky seafloor beneath a 20-kilometer ice shell.',
      'Two follow-up low-altitude passes are scheduled to map the warmest surface fractures for future lander reconnaissance.',
    ],
    content: [
      'For half a century, planetary scientists have suspected that beneath Europa’s scarred carapace of water ice lies a global saltwater ocean holding twice the volume of all Earth’s seas combined. Today, newly decoded telemetry from the latest Jovian orbiter has turned suspicion into concrete chemical evidence of a geologically restless ocean floor.',
      'Passing just 110 kilometers above a luminous vapor jet erupting from the moon’s southern hemisphere, the spacecraft’s dust analyzer captured thousands of freshly expelled ice grains before Jupiter’s fierce radiation belt could alter their molecular signatures.',
      'Published simultaneously in Nature Astronomy, the findings document an unmistakable blend of sodium chloride, alkaline carbonates, and complex organic fragments — chemical fingerprints closely resembling the mineral chimneys surrounding hydrothermal vents along Earth’s Mid-Atlantic Ridge.',
      'Researchers emphasize that organic chemistry does not by itself constitute proof of alien life. Yet the simultaneous presence of liquid water, bio-essential elements, and sustained chemical energy from tidal flexing ticks every box astrobiologists have long sought.',
      'Mission planners are already adjusting orbital trajectories to skim even closer to the active fissure zone next quarter, collecting pristine samples that could guide the design of a dedicated ice-penetrating lander in the next decade.',
    ],
    views: 41600,
  },
  {
    id: 'ed-north-sea-floating-wind',
    slug: 'north-sea-floating-wind-tidal-mega-array-surpasses-capacity',
    title: 'North Sea Hybrid Floating Wind and Tidal Array Smashes Winter Clean-Power Records',
    subtitle:
      'Deep-water tension-leg turbines paired with submerged tidal kites deliver continuous baseload electricity to four million European households.',
    excerpt:
      'Engineering breakthroughs in mooring cables and underwater battery vaults allow offshore renewables to supply uninterrupted power even during windless frosts.',
    category: 'climate',
    author: {
      name: 'Hannah Lindqvist',
      role: 'Climate & Energy Reporter',
      avatarInitials: 'HL',
      location: 'Copenhagen',
    },
    publishedAt: hoursAgo(6.1),
    readTimeMinutes: 5,
    image: '/images/climate-offshore.svg',
    imageCaption:
      'Deep-water floating turbines anchored sixty miles off the Scottish and Danish continental shelf.',
    tags: ['Clean Energy', 'Offshore Wind', 'Grid Storage', 'Climate Tech'],
    keyTakeaways: [
      'Achieved a 68.4% combined winter capacity factor by pairing deep-water wind with predictable lunar tidal turbines.',
      'High-voltage direct current interconnectors route surplus power dynamically between the UK, Denmark, and the Netherlands.',
      'Subsea compressed-air storage pods cut curtailment losses by nearly half.',
    ],
    content: [
      'Sixty nautical miles from the nearest shoreline, where North Sea depths drop beyond ninety meters and traditional monopile foundations become economically impossible, a vast geometric constellation of floating steel platforms is quietly rewriting the economics of grid decarbonization.',
      'Over the past ninety days of peak winter demand, the Dogger-Skagerrak Hybrid Offshore Park achieved a stunning 68.4 percent capacity factor — rivalling conventional gas turbines while emitting zero carbon. The secret lies in pairing 18-megawatt floating wind rotors with arrays of submerged tidal kites tethered beneath the swells.',
      'Because lunar tidal currents remain mathematically predictable decades in advance, underwater turbines pick up the slack during rare North Sea anticyclonic calms. Meanwhile, modular subsea storage vaults smooth minute-to-minute voltage swings before power enters high-voltage direct current cables running to Britain, Denmark, and the Netherlands.',
      'Wholesale electricity prices across northern Europe dropped nineteen percent during storm fronts that once forced grid operators to pay fossil plants to stay idle on standby.',
      'Energy ministers from six bordering nations announced plans this morning to fast-track permitting for three additional deep-water energy islands before 2030, citing both climate targets and domestic energy independence.',
    ],
    views: 22890,
  },
  {
    id: 'ed-silicon-photonics-wafer',
    slug: 'silicon-photonics-breakthrough-light-speed-chips-consumer-devices',
    title: 'Silicon Photonics Enters Mass Foundry Production, Promising Tenfold Leap in Chip Efficiency',
    subtitle:
      'Replacing microscopic copper wires with laser waveguides on standard CMOS wafers slashes thermal bottlenecks in both cloud servers and next-gen laptops.',
    excerpt:
      'Major foundries validate 300mm monolithic photonic-electronic wafers, clearing the final yield hurdle that kept optical computing confined to physics labs.',
    category: 'technology',
    author: {
      name: 'Kenji Takahashi',
      role: 'Semiconductor & Hardware Analyst',
      avatarInitials: 'KT',
      location: 'Tokyo & Taipei',
    },
    publishedAt: hoursAgo(7.5),
    readTimeMinutes: 5,
    image: '/images/tech-semiconductor.svg',
    imageCaption:
      'A 300mm silicon-photonics wafer etched with microscopic optical waveguides inside an automated cleanroom.',
    tags: ['Semiconductors', 'Photonics', 'Hardware', 'Innovation'],
    keyTakeaways: [
      'Co-packaged optical engines cut chip-to-chip data transfer energy by up to 84%.',
      'Fabricated on existing 300mm foundry lines, avoiding multi-billion-dollar retooling cycles.',
      'First commercial workstations featuring optical memory interconnects are slated for late next year.',
    ],
    content: [
      'For sixty years, the engine of modern computing has relied on shrinking silicon transistors ever smaller while shuttling electrons along impossibly narrow copper highways. Yet as circuit features approach atomic dimensions, moving data across millimeters of metal consumes far more electricity and generates more heat than the calculations themselves.',
      'This week, leading semiconductor foundries unveiled production-qualified 300-millimeter wafers that integrate microscopic laser modulators and optical waveguides directly beside conventional logic transistors. By encoding data as pulses of infrared light rather than electrical current, chips can exchange terabits per second with virtually zero resistive heat loss.',
      'Historically, silicon photonics suffered from finicky alignment tolerances and steep packaging costs that limited adoption to ultra-expensive telecommunications switches. New self-aligning grating couplers printed via standard deep-ultraviolet lithography have pushed wafer yields above 92 percent.',
      'Hardware architects say the ripple effects will reach far beyond massive AI clusters. High-end creative workstations, autonomous robotics controllers, and portable medical imaging scanners stand to gain dramatic battery longevity and whisper-quiet operation as optical buses move closer to the processor core.',
    ],
    views: 26310,
  },
  {
    id: 'ed-timber-museum-architecture',
    slug: 'engineered-mass-timber-reshapes-global-cultural-architecture',
    title: 'How Engineered Mass Timber Is Redefining the Skylines of Twenty-First-Century Museums',
    subtitle:
      'From Kyoto to Zurich, a new generation of architects is sculpting sweeping acoustic vaults from cross-laminated cedar that capture carbon rather than emitting it.',
    excerpt:
      'Pioneering structural joinery and daylight modeling allow carbon-negative timber pavilions to rival concrete and steel in span, fire resilience, and acoustic warmth.',
    category: 'culture',
    author: {
      name: 'Clara Beaumont',
      role: 'Architecture & Culture Critic',
      avatarInitials: 'CB',
      location: 'Paris',
    },
    publishedAt: hoursAgo(9.0),
    readTimeMinutes: 5,
    image: '/images/culture-architecture.svg',
    imageCaption:
      'Natural daylight cascades across laminated spruce ribs inside the newly inaugurated Civic Pavilion of Contemporary Design.',
    tags: ['Architecture', 'Design', 'Sustainability', 'Arts'],
    keyTakeaways: [
      'Cross-laminated structural vaults reduce embodied carbon by up to 64% compared to reinforced concrete galleries.',
      'Robotic five-axis milling revives centuries-old interlocking Japanese wood joinery without steel fasteners.',
      'Visitor acoustic studies reveal markedly calmer reverberation profiles across cavernous exhibition halls.',
    ],
    content: [
      'Step beneath the soaring ribs of the newly opened Civic Pavilion of Contemporary Design, and the first sensation is neither grandeur nor chill minimalism, but warmth. Ribbons of pale laminated spruce arch twenty-eight meters overhead without a single visible steel truss, diffusing crisp northern daylight across limestone gallery floors.',
      'For nearly a century, monumental civic architecture spoke almost exclusively in poured concrete and curtain-wall glass. Yet concrete production alone accounts for nearly eight percent of global carbon emissions — an uncomfortable paradox for cultural institutions hosting exhibitions on ecological stewardship.',
      'A flourishing architectural vanguard is rewriting that vocabulary through engineered mass timber. By bonding sustainably harvested timber lamellas in alternating grain directions and milling precision interlocking joints with robotic cutters, structural engineers can now achieve spans, seismic resilience, and fire ratings once thought exclusive to steel.',
      'Equally captivating is how audiences inhabit these spaces. Acousticians studying museum fatigue found that timber’s micro-porous grain gently dampens harsh echoing chatter, while the subtle scent and tactile rhythm of natural wood encourage visitors to linger nearly twenty-five percent longer in contemplative galleries.',
    ],
    views: 17420,
  },
  {
    id: 'ed-global-athletics-analytics',
    slug: 'biomechanical-telemetry-transforms-world-championship-athletics',
    title: 'Under the Floodlights: How Real-Time Biomechanics Is Rewriting World Athletics Records',
    subtitle:
      'Markerless optical tracking and carbon-tuned track surfaces help sprinters and middle-distance runners shave decisive hundredths off historic marks.',
    excerpt:
      'Stadium-wide computer vision cameras capture 1,000-frame-per-second stride geometry without wearable sensors, revolutionizing coaching and broadcast graphics.',
    category: 'sports',
    author: {
      name: 'Devon Brooks',
      role: 'Chief Sports Correspondent',
      avatarInitials: 'DB',
      location: 'London',
    },
    publishedAt: hoursAgo(11.2),
    readTimeMinutes: 4,
    image: '/images/sports-stadium.jpg',
    imageCaption:
      'Evening finals under high-efficiency LED floodlights at the Continental Athletics Arena.',
    tags: ['Athletics', 'Sports Science', 'Broadcast Tech', 'Championships'],
    keyTakeaways: [
      'Markerless 3D optical rigs measure ground-contact force and stride asymmetry with sub-millimeter precision.',
      'Coaches are cutting soft-tissue hamstring injuries by 31% through early fatigue-signature alerts.',
      'Live augmented-reality telemetry overlays have lifted international broadcast engagement among younger viewers by 40%.',
    ],
    content: [
      'When the starting pistol echoes beneath the arching floodlights of modern championship arenas, an invisible symphony of high-speed optical cameras awakens along the upper tiers. Without attaching a single gram of hardware to an athlete’s singlet or spikes, thirty-two synchronized lenses reconstruct every runner’s skeletal kinematics at one thousand frames per second.',
      'What began five years ago as an experimental training-ground curiosity has rapidly become the decisive edge in international track and field. Coaches now review real-time visualizations of hip extension, braking impulse, and ankle stiffness within seconds of a heat finishing, allowing subtle technical adjustments between semifinals and finals.',
      'Just as vital is injury prevention. Longitudinal datasets collected across major federations show that subtle two-percent asymmetries in ground-contact time often surface days before an athlete feels tightness in a hamstring or Achilles tendon. Intervening early has trimmed season-ending soft-tissue tears by nearly a third.',
      'For fans watching across global English broadcasts, the data revolution has brought unprecedented storytelling clarity — turning races once summarized solely by a finishing clock into gripping visual dramas of acceleration curves, aerodynamic drafting, and physiological endurance.',
    ],
    views: 19840,
  },
];

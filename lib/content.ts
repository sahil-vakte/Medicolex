/** Page content for Medicolex. Edit text here; pages update automatically. */

export type Service = {
  slug: string;
  name: string;
  short: string;
  intro: string;
  whenToUse: string[];
  includes: string[];
  claimTypes: string[];
  metaTitle: string;
  metaDescription: string;
};

export const services: Service[] = [
  {
    slug: "shoulder-elbow-medico-legal-reports",
    name: "Shoulder & Elbow Medico-Legal Reports",
    short: "Consultant-authored condition and prognosis reports for upper-limb injuries.",
    intro:
      "Shoulder and elbow injuries are often where a claim's value turns: a rotator cuff tear rather than a strain, an acceleration period rather than a permanent change, a real risk of future surgery. Our consultant-authored reports examine the mechanism of injury, the medical records and the clinical findings, and set out a clear, reasoned opinion on diagnosis, causation and prognosis. Every report is addressed to the court and complies with CPR Part 35 and Practice Direction 35.",
    whenToUse: [
      "Fractures, dislocations or structural injuries of the shoulder or elbow",
      "Symptoms continuing beyond the expected recovery period",
      "Disputes over whether an injury is new or an acceleration of degeneration",
      "Claims involving surgery, or a possible need for future surgery",
      "Employer liability, public liability, sports and road traffic claims",
    ],
    includes: [
      "In-person examination at our Leicester, Derby or Rugby clinic",
      "Review of GP, hospital and imaging records",
      "Diagnosis, causation and attribution",
      "Prognosis, future treatment and likely costs",
      "Effect on work, domestic tasks and leisure",
      "Statement of compliance and statement of truth",
    ],
    claimTypes: ["Road traffic", "Employer liability", "Public liability", "Sports injury", "Clinical negligence"],
    metaTitle: "Shoulder & Elbow Medico-Legal Reports | Consultant Expert Witness",
    metaDescription:
      "Consultant shoulder and elbow medico-legal reports for solicitors. CPR Part 35-compliant, with in-person examinations in Leicester, Derby and Rugby.",
  },
  {
    slug: "personal-injury-reports",
    name: "Personal Injury Reports",
    short: "Upper-limb reports for road traffic, workplace, public place and sports claims.",
    intro:
      "We report on shoulder and elbow injuries arising from road traffic collisions, accidents at work, slips and trips in public places and sport. Reports are suitable for fast track, intermediate track and multi-track claims, including follow-up reports where symptoms continue or treatment changes the picture.",
    whenToUse: [
      "Road traffic claims where the injury goes beyond soft-tissue whiplash",
      "Falls at work, lifting injuries and repetitive work claims",
      "Slips and trips in shops, streets and public buildings",
      "Sports and leisure injuries",
      "Intermediate track claims needing a report of 20 pages or fewer",
    ],
    includes: [
      "Condition and prognosis report",
      "Intermediate track format on request",
      "Follow-up and addendum reports",
      "Answers to written questions under CPR 35.6",
    ],
    claimTypes: ["Road traffic", "Employer liability", "Public liability", "Sports injury"],
    metaTitle: "Personal Injury Medical Reports | Shoulder & Elbow Expert",
    metaDescription:
      "Personal injury medico-legal reports for shoulder and elbow injuries from road, workplace, public place and sports accidents. Leicester, Derby and Rugby clinics.",
  },
  {
    slug: "clinical-negligence-reports",
    name: "Clinical Negligence Reports",
    short: "Breach of duty, causation, and condition and prognosis opinions in upper-limb cases.",
    intro:
      "Upper-limb clinical negligence cases need a sub-specialist who understands what reasonable shoulder and elbow care looks like. We provide screening opinions, breach of duty and causation reports, and condition and prognosis reports, for claimants, defendants and as single joint expert.",
    whenToUse: [
      "Missed or delayed diagnosis of fractures or dislocations",
      "Complications of shoulder or elbow surgery",
      "Inadequate post-operative care or follow-up",
      "Questions on the likely outcome with appropriate treatment",
    ],
    includes: [
      "Initial screening opinion",
      "Breach of duty and causation report",
      "Condition and prognosis report",
      "Experts' discussions and joint statements",
    ],
    claimTypes: ["Clinical negligence"],
    metaTitle: "Shoulder & Elbow Clinical Negligence Expert Reports",
    metaDescription:
      "Independent shoulder and elbow expert reports in clinical negligence: breach of duty, causation, condition and prognosis. CPR Part 35-compliant.",
  },
  {
    slug: "records-review",
    name: "Records-Only Reviews",
    short: "Paper-based opinions where an examination is not needed or not possible.",
    intro:
      "Some questions can be answered from the records alone: causation disputes, defence reviews, or cases where the claimant cannot attend. We review GP, hospital and imaging records and give a reasoned opinion, stating clearly where an examination would change it.",
    whenToUse: [
      "Causation questions that turn on the records",
      "Defence reviews of a claimant's expert evidence",
      "Claimants who are unable to attend an examination",
      "Early merits screening before a full report",
    ],
    includes: ["Chronology of relevant entries", "Reasoned opinion with stated limitations", "Recommendation on whether examination is needed"],
    claimTypes: ["Personal injury", "Clinical negligence", "Defence"],
    metaTitle: "Records-Only Medico-Legal Reviews | Shoulder & Elbow",
    metaDescription:
      "Records-only shoulder and elbow medico-legal opinions for causation disputes, defence reviews and screening. CPR Part 35-compliant.",
  },
  {
    slug: "supplementary-reports",
    name: "Addenda, Part 35 Questions & Court",
    short: "Follow-up reports, written answers, joint statements and court attendance.",
    intro:
      "Expert evidence rarely ends with the first report. We provide addendum reports after re-examination or new records, answers to written questions under CPR 35.6, experts' discussions and joint statements, and attendance at court when required.",
    whenToUse: [
      "New records or imaging after the first report",
      "Re-examination after treatment or surgery",
      "Written questions from either party",
      "Experts' discussions ordered by the court",
      "Trial or hearing attendance",
    ],
    includes: [
      "Addendum and follow-up reports",
      "CPR 35.6 replies",
      "Joint statements, signed within the timescales in Practice Direction 35",
      "Court and conference attendance",
    ],
    claimTypes: ["All claim types"],
    metaTitle: "Addendum Reports, Part 35 Questions & Joint Statements",
    metaDescription:
      "Addendum reports, CPR 35.6 answers, experts' joint statements and court attendance from a shoulder and elbow medico-legal expert.",
  },
];

export type Condition = {
  slug: string;
  name: string;
  group: "Shoulder" | "Elbow";
  summary: string;
  whatItIs: string;
  assessment: string[];
  causation: string[];
  prognosis: string[];
  claimTypes: string[];
};

export const conditions: Condition[] = [
  {
    slug: "rotator-cuff-tear",
    name: "Rotator cuff tears",
    group: "Shoulder",
    summary: "Partial and full-thickness tears of the shoulder's rotator cuff tendons.",
    whatItIs:
      "The rotator cuff is a group of four tendons that stabilise and move the shoulder. Tears can follow a fall, a sudden pull or a heavy lift, but tendon changes also become more common with age, which makes causation a frequent issue.",
    assessment: ["Mechanism of injury and timing of symptoms", "Strength and range of movement testing", "Review of ultrasound or MRI findings", "Pre-accident GP entries about the shoulder"],
    causation: ["Acute traumatic tear versus pre-existing degeneration", "Whether the accident accelerated symptoms, and for how long", "Consistency between imaging and the reported mechanism"],
    prognosis: ["Response to physiotherapy or injection", "Need for, and likely outcome of, surgical repair", "Risk of re-tear and long-term weakness"],
    claimTypes: ["Employer liability", "Public liability", "Road traffic"],
  },
  {
    slug: "shoulder-dislocation-instability",
    name: "Shoulder dislocation and instability",
    group: "Shoulder",
    summary: "Traumatic dislocation, labral tears (Bankart, SLAP) and recurrent instability.",
    whatItIs:
      "A dislocation forces the ball of the shoulder out of its socket and can damage the labrum, the rim of cartilage that keeps the joint stable. Some people go on to have repeated episodes of instability.",
    assessment: ["Number and circumstances of dislocations", "Apprehension and stability tests", "Imaging of the labrum and bone", "Occupational and sporting demands"],
    causation: ["First-time traumatic dislocation versus pre-existing laxity", "Contribution of later incidents to recurrence"],
    prognosis: ["Likelihood of recurrence by age and activity", "Outcome of stabilisation surgery", "Long-term risk of arthritis"],
    claimTypes: ["Road traffic", "Sports injury", "Public liability"],
  },
  {
    slug: "frozen-shoulder",
    name: "Frozen shoulder after trauma",
    group: "Shoulder",
    summary: "Adhesive capsulitis developing after an injury or surgery.",
    whatItIs:
      "Frozen shoulder causes painful stiffness as the joint capsule thickens. It can develop after an injury, but it also arises without an obvious cause, particularly in people with diabetes, so attribution needs careful reasoning.",
    assessment: ["Pattern and timing of stiffness after the incident", "Passive and active range of movement", "Medical history and risk factors"],
    causation: ["Whether the incident caused or triggered the condition", "Role of underlying risk factors"],
    prognosis: ["Expected course over months to years", "Effect of injections, hydrodilatation or surgery", "Residual stiffness"],
    claimTypes: ["Road traffic", "Employer liability", "Public liability"],
  },
  {
    slug: "shoulder-fractures",
    name: "Clavicle, humerus and scapula fractures",
    group: "Shoulder",
    summary: "Fractures of the collarbone, upper arm and shoulder blade, including malunion and non-union.",
    whatItIs:
      "Shoulder-girdle fractures commonly follow falls, cycling accidents and road traffic collisions. Most heal, but some leave deformity, stiffness or weakness, and a minority fail to unite.",
    assessment: ["Fracture pattern on X-ray or CT", "Treatment received, operative or not", "Healing, alignment and function"],
    causation: ["Usually clear-cut; focus is on outcome and any treatment issues"],
    prognosis: ["Residual pain, stiffness and weakness", "Risk of post-traumatic arthritis", "Need for removal of metalwork or further surgery"],
    claimTypes: ["Road traffic", "Public liability", "Employer liability"],
  },
  {
    slug: "ac-joint-injury",
    name: "AC joint injuries",
    group: "Shoulder",
    summary: "Acromioclavicular joint sprains and separations from falls onto the shoulder.",
    whatItIs:
      "The AC joint sits at the top of the shoulder where the collarbone meets the shoulder blade. Falls directly onto the shoulder can sprain or separate it, sometimes leaving a visible step.",
    assessment: ["Grade of injury and deformity", "Tenderness, cross-body pain and strength", "Imaging"],
    causation: ["Distinguishing acute injury from pre-existing AC joint arthritis"],
    prognosis: ["Persistent pain with overhead or heavy work", "Outcome of surgical reconstruction where needed"],
    claimTypes: ["Sports injury", "Public liability", "Road traffic"],
  },
  {
    slug: "shoulder-soft-tissue-injury",
    name: "Shoulder soft-tissue injuries",
    group: "Shoulder",
    summary: "Strains, sprains and subacromial pain beyond the whiplash tariff period.",
    whatItIs:
      "Many shoulder injuries are soft-tissue strains that settle with time. A consultant opinion is useful when symptoms persist, when there is a question of underlying structural damage, or when the claim falls outside the whiplash rules.",
    assessment: ["Course of symptoms since the incident", "Clinical tests for impingement and tendon involvement", "Need for further investigation"],
    causation: ["Injury versus pre-existing shoulder symptoms", "Acceleration of degenerative symptoms and its likely period"],
    prognosis: ["Expected recovery period", "Treatment recommendations and costs"],
    claimTypes: ["Employer liability", "Public liability", "Road traffic"],
  },
  {
    slug: "tennis-golfers-elbow",
    name: "Tennis and golfer's elbow",
    group: "Elbow",
    summary: "Lateral and medial epicondylitis, including work-related claims.",
    whatItIs:
      "Tennis elbow and golfer's elbow cause pain where the forearm tendons attach to the elbow. They are common in the general population, so work-related claims turn on the nature, force and repetition of the tasks involved.",
    assessment: ["Detailed occupational history", "Provocation tests and grip strength", "Treatment history"],
    causation: ["Whether work tasks caused or materially contributed", "Constitutional and non-work factors"],
    prognosis: ["Natural history and recurrence", "Fitness for the claimant's usual work"],
    claimTypes: ["Employer liability", "Industrial disease"],
  },
  {
    slug: "elbow-fractures-dislocation",
    name: "Elbow fractures and dislocation",
    group: "Elbow",
    summary: "Radial head, olecranon and distal humerus fractures, and elbow dislocation.",
    whatItIs:
      "Elbow fractures and dislocations often follow a fall onto an outstretched arm. Stiffness is the most common long-term problem, and some injuries lead to arthritis.",
    assessment: ["Fracture pattern and treatment", "Range of movement and stability", "Nerve function"],
    causation: ["Usually clear-cut; focus is on outcome and treatment"],
    prognosis: ["Permanent loss of movement", "Risk of post-traumatic arthritis", "Future surgery"],
    claimTypes: ["Public liability", "Road traffic", "Employer liability"],
  },
  {
    slug: "distal-biceps-rupture",
    name: "Distal biceps rupture",
    group: "Elbow",
    summary: "Rupture of the biceps tendon at the elbow, usually during a heavy lift.",
    whatItIs:
      "The biceps tendon can rupture at the elbow when the arm is forced straight against resistance. Early surgical repair usually gives the best strength, so delay can be an issue.",
    assessment: ["Mechanism and timing", "Strength of elbow bending and forearm rotation", "Imaging and surgical records"],
    causation: ["Work activity at the time of injury", "Effect of any delay in diagnosis"],
    prognosis: ["Strength and endurance after repair or non-operative care", "Return to heavy work"],
    claimTypes: ["Employer liability", "Clinical negligence"],
  },
  {
    slug: "ulnar-nerve-cubital-tunnel",
    name: "Ulnar nerve symptoms after elbow injury",
    group: "Elbow",
    summary: "Cubital tunnel symptoms following elbow trauma or surgery.",
    whatItIs:
      "The ulnar nerve runs behind the elbow and can be irritated after fractures, swelling or surgery, causing tingling and weakness in the ring and little fingers.",
    assessment: ["Sensory and motor examination", "Nerve conduction studies where available", "Surgical records"],
    causation: ["Relationship to the injury or its treatment", "Pre-existing nerve symptoms"],
    prognosis: ["Likelihood of recovery", "Outcome of decompression or transposition surgery"],
    claimTypes: ["Road traffic", "Employer liability", "Clinical negligence"],
  },
];

export type Location = {
  slug: string;
  town: string;
  county: string;
  intro: string;
  catchment: string[];
  travel: string[];
  courts: string[];
  venue: { name: string; address: string; postcode: string; parking: string; access: string; mapUrl: string | null } | null;
};

export const locations: Location[] = [
  {
    slug: "leicester",
    town: "Leicester",
    county: "Leicestershire",
    intro:
      "Our Leicester clinic serves claimants across Leicester and Leicestershire, with easy access from the M1 and M69. It is also our administrative base.",
    catchment: ["Leicester", "Oadby", "Wigston", "Loughborough", "Hinckley", "Market Harborough", "Melton Mowbray", "Coalville"],
    travel: ["By car: M1 junction 21 and the M69", "By train: Leicester station, on the Midland Main Line"],
    courts: ["Leicester County Court"],
    venue: null,
  },
  {
    slug: "derby",
    town: "Derby",
    county: "Derbyshire",
    intro:
      "Our Derby clinic serves claimants across Derby, south Derbyshire, east Staffordshire and west Nottinghamshire.",
    catchment: ["Derby", "Burton upon Trent", "Ilkeston", "Belper", "Ashbourne", "Long Eaton", "Swadlincote"],
    travel: ["By car: A38, A52 and M1 junction 25", "By train: Derby station, on the Midland Main Line"],
    courts: ["Derby Combined Court Centre"],
    venue: null,
  },
  {
    slug: "rugby",
    town: "Rugby",
    county: "Warwickshire",
    intro:
      "Our Rugby clinic serves claimants across Warwickshire, Coventry and west Northamptonshire, close to the M1, M6 and M45.",
    catchment: ["Rugby", "Coventry", "Nuneaton", "Lutterworth", "Daventry", "Leamington Spa", "Northampton (west)"],
    travel: ["By car: M6 junction 1, M1 junction 18 and the M45", "By train: Rugby station, on the West Coast Main Line"],
    courts: ["Coventry Combined Court Centre", "Nuneaton County Court", "Warwick Combined Court"],
    venue: null,
  },
];

export const specialtiesComingSoon = [
  { name: "Hand & Wrist Surgery", line: "Fractures, tendon and nerve injuries, hand-arm vibration." },
  { name: "Orthopaedics & Spine", line: "Neck, back and lower-limb injuries, and acceleration of degeneration." },
  { name: "Psychiatry & Psychology", line: "PTSD, anxiety, depression and travel anxiety after accidents." },
  { name: "Pain Medicine", line: "Chronic pain and complex regional pain syndrome." },
  { name: "Physiotherapy & Rehabilitation", line: "Rehabilitation needs and treatment costs." },
  { name: "Care & Occupational Therapy", line: "Past and future care, aids, equipment and adaptations." },
  { name: "Plastic Surgery", line: "Scarring and soft-tissue reconstruction." },
  { name: "GP & Emergency Medicine", line: "Lower-value injuries, records reviews and A&E care." },
];

export const processSteps = [
  { title: "Send your instruction", body: "Instruct online or by email with the letter of instruction, signed consent and any records you hold." },
  { title: "We book and prepare", body: "We confirm terms, run a conflict check, book your client at the nearest clinic and collect the records." },
  { title: "Examination and report", body: "Your client is seen in person. The consultant reviews the records and writes a CPR Part 35-compliant report." },
  { title: "Ongoing support", body: "Addenda, written questions, joint statements and court attendance, with one named contact throughout." },
];

export const reportContents = [
  "Instructions, documents reviewed and the expert's qualifications",
  "Account of the accident and mechanism of injury",
  "Relevant history, including pre-existing problems from the records",
  "Current symptoms and effect on work, home life, sport and sleep",
  "Clinical examination findings",
  "Review of imaging and any further investigation needed",
  "Diagnosis, causation and attribution, including any acceleration period",
  "Prognosis, risk of future arthritis or surgery, and treatment recommendations",
  "Capacity for work, care and assistance needs, and the range of opinion",
  "Summary of conclusions, statement of compliance and statement of truth",
];

export const homeFaqs = [
  {
    q: "Do you accept instructions from defendants and as single joint expert?",
    a: "Yes. We accept instructions from claimant and defendant solicitors, insurers and jointly from both parties. The expert's duty is always to the court.",
  },
  {
    q: "Which areas do you cover?",
    a: "Claimants are examined at our clinics in Leicester, Derby and Rugby. Instructions are accepted from solicitors anywhere in England and Wales.",
  },
  {
    q: "Can you review records without examining the claimant?",
    a: "Yes, for suitable cases such as causation questions or defence reviews. The report states clearly where an examination might change the opinion.",
  },
  {
    q: "Can you write reports for the intermediate track?",
    a: "Yes. We can produce reports within the 20-page limit that applies to expert reports on the intermediate track unless the court orders otherwise.",
  },
  {
    q: "Do you provide MedCo whiplash reports?",
    a: "Initial fixed-cost soft-tissue reports in road traffic claims must come from a MedCo-accredited expert selected through the MedCo portal. We provide consultant reports for shoulder and elbow injuries that need specialist opinion, including further reports and claims outside the whiplash rules.",
  },
  {
    q: "How do you keep medical records secure?",
    a: "Records are received through secure upload or encrypted email, held on UK-based systems with restricted access, and securely deleted when the case concludes.",
  },
];

export type Article = { slug: string; title: string; summary: string; date: string; body: { h?: string; p: string }[] };

export const articles: Article[] = [
  {
    slug: "how-to-instruct-a-shoulder-and-elbow-expert",
    title: "How to instruct a shoulder and elbow expert: a solicitor's checklist",
    summary: "What to send, what to ask and how to avoid delays when instructing an upper-limb medico-legal expert.",
    date: "2026-11-25",
    body: [
      { p: "A good instruction saves weeks. Most delays in medico-legal reporting come from missing records, unclear questions or a claimant who cannot easily reach the clinic. This checklist covers the essentials for shoulder and elbow cases." },
      { h: "1. Send a clear letter of instruction", p: "Set out the claim type, the track, the date and circumstances of the incident, the injuries alleged and the specific questions you need answered. If the case is on the intermediate track, say so, so the report can be kept within the 20-page limit." },
      { h: "2. Include signed consent", p: "The expert needs the claimant's signed consent to access their medical records and to disclose the report to the instructing party." },
      { h: "3. Provide full GP records", p: "In shoulder and elbow cases, causation often turns on what the GP records show before the incident: earlier shoulder pain, injections or physiotherapy. Full records, not a summary, make for a robust report." },
      { h: "4. Add hospital records and imaging", p: "Emergency department notes, fracture clinic letters, operation notes and imaging reports are central to upper-limb opinions. Where scans exist, send the reports and, if available, the images themselves." },
      { h: "5. Ask focused questions", p: "Useful questions include: what is the diagnosis; was it caused by the incident; is there an acceleration of a pre-existing condition and for how long; what is the prognosis; is surgery likely; and what is the effect on work." },
      { h: "6. Check travel and access needs", p: "Tell us about mobility, interpreter or chaperone needs at the outset, and the claimant's nearest town, so we can book the most convenient clinic." },
    ],
  },
  {
    slug: "rotator-cuff-tears-acute-or-degenerative",
    title: "Rotator cuff tears after an accident: acute injury or degeneration?",
    summary: "Why causation is so often disputed in rotator cuff claims, and what an expert looks at to decide.",
    date: "2026-11-25",
    body: [
      { p: "Rotator cuff tears are among the most commonly disputed shoulder injuries in personal injury claims. Tendon changes become more frequent with age, so finding a tear on a scan does not by itself show that an accident caused it." },
      { h: "What the expert weighs", p: "An expert considers the mechanism of injury, whether symptoms started immediately afterwards, what the pre-accident records show, the clinical findings and the appearance of the tear on imaging. No single factor decides the question; the opinion comes from how they fit together." },
      { h: "Acceleration", p: "Where a tear was probably present before the accident but painless, the expert may conclude that the accident brought forward symptoms that would have arisen anyway, and estimate for how long. This acceleration period has a direct effect on the value of the claim." },
      { h: "What helps", p: "Full GP records, early hospital or GP notes describing the injury, and imaging taken close to the incident all help the expert give a clear and well-reasoned opinion." },
    ],
  },
  {
    slug: "expert-evidence-intermediate-track",
    title: "Expert evidence on the intermediate track: writing within 20 pages",
    summary: "What the intermediate track means for medical expert reports and how we keep them concise without losing substance.",
    date: "2026-11-25",
    body: [
      { p: "Since 1 October 2023, many claims valued between £25,000 and £100,000 are allocated to the intermediate track, with fixed recoverable costs. Expert reports on this track are limited to 20 pages unless the court orders otherwise." },
      { h: "What changes for the report", p: "The substance of the opinion does not change: diagnosis, causation and prognosis are still needed, with reasons. What changes is the presentation. Records summaries are shortened to relevant entries, and repetition is removed." },
      { h: "How we approach it", p: "When an instruction tells us the claim is on the intermediate track, we use a concise report structure designed to stay within the limit while meeting every requirement of Practice Direction 35." },
    ],
  },
];

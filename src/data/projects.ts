import type { Project } from "@/types/project";

/* ============================================================================
   PROJECT CATALOG

   This is the only file you need to edit to change project content. No
   component reads project text from anywhere else.

   ---------------------------------------------------------------------------
   HOW TO EDIT A PROJECT
   Find it by `slug` below and change the fields. Everything except `slug`,
   `name`, `shortDescription`, `role`, `categories`, `technologies`, and
   `featured` is optional — delete a field and its section disappears from the
   case study rather than rendering empty.

   HOW TO MARK A PROJECT AS FEATURED
   Set `featured: true`. That controls ONE thing: whether it shows in the
   homepage featured section. Every project always appears in the /projects
   catalog, so `featured: false` does not hide anything or imply it matters less.
   Two or three featured projects reads best; more and the homepage gets long.

   HOW TO CHANGE CATALOG ORDER
   Reorder the entries in the `projects` array. The catalog and the featured
   section both render in array order. Currently reverse-chronological, with the
   two projects whose dates are unconfirmed at the end.

   HOW TO ADD CASE-STUDY CONTENT LATER
   Add any of these optional fields to a project, in the order they appear on
   the page: overview, problem, solution, solutionImage, ownershipNote,
   contributions, implementation, outputs, metrics, results, challenges.
   See `src/types/project.ts` for the exact shape of each, and `token-tots`
   below for a fully populated example.

   HOW TO ADD SCREENSHOTS
   Put files in `public/projects/<slug>/`, then reference them as
   `{ src: "/projects/<slug>/name.png", alt: "..." }`. Thumbnails are 1200×750,
   hero images 2000×1000. Leave `thumbnail` unset and the card falls back to a
   generated placeholder panel, so a missing file never breaks the layout.

   HOW TO ADD A NEW PROJECT
   Copy any entry, change the `slug` (it becomes the URL), and add it to the
   array. The catalog page, filters, sitemap, and /projects/<slug> route all
   pick it up automatically.

   ---------------------------------------------------------------------------
   NOTE ON PLACEHOLDERS
   Unknown values are left out rather than filled with "TBD", so nothing
   provisional is ever shown to a visitor. Each gap is marked with a
   `TODO(content)` comment right where it belongs. Search this file for
   "TODO(content)" to see everything still outstanding.
============================================================================ */

export const projects: Project[] = [
  /* ==========================================================================
     1. TOKEN TOTS — UW Informatics capstone
  ========================================================================== */
  {
    slug: "token-tots",
    name: "Token Tots",
    shortDescription:
      "An AI healthcare assistant that turns prescription information into medication schedules and personalized weekly meal plans.",
    role: "Technical Product Manager and AI Engineer",
    duration: "January 2026 – June 2026",
    // TODO(content): confirm the team size (the capstone team included a meal-plan
    // developer plus research, design, and frontend teammates).
    categories: ["Applied AI", "Backend", "Full Stack"],
    technologies: [
      "Python",
      "Claude API",
      "Supabase",
      "Puppeteer",
      "HTML-to-PDF",
      "API integration",
    ],
    featured: true,

    liveUrl: "https://info491-landingpage-tokentots-clientside.onrender.com/",
    // TODO(content): add `githubUrl` once the repository is public.
    // TODO(content): add `demoUrl` for the demo video.
    // TODO(content): add `presentationUrl` — the old site linked a capstone deck
    // ("compressed_tokentots_slides.pdf") that was never committed to the repo.
    // TODO(content): add `reportUrl` — likewise for "Final Product Documentation".

    overview: [
      "Token Tots is an AI healthcare assistant built for the University of Washington Informatics capstone. It meets students inside a familiar iMessage-style conversation instead of asking them to learn another healthcare portal, and turns messy prescription notes into guidance they can actually follow.",
      "The intended users are university students who have just left a doctor's visit holding instructions they only half understood. They need to know when to take a medication, whether to take it with food, and what to eat around it — not a patient portal login.",
      "The project mattered because the gap it addresses is an adherence problem, not an information problem. The instructions already exist; they are just delivered in a format nobody follows.",
    ],

    problem: [
      "Prescription instructions arrive as unstructured text, photographs, or PDFs, and mix dosage, frequency, timing, and food restrictions into prose. Turning that into a reliable schedule is work the patient is expected to do unaided.",
      "Generic reminder apps only solve the clock half of the problem. They will tell a student it is 8pm, but not that the medication needs food, or that today's dinner was skipped and the reminder should shift.",
      "As a capstone we were also constrained on time and had no budget for a native app or a clinical data integration, which ruled out anything requiring app-store distribution or protected health record access.",
    ],

    solution: [
      "A student sends a prescription as text, a photo, or a PDF. An LLM extraction step pulls out medication name, dosage, frequency, and timing, along with any food-related instructions, into structured records in Supabase.",
      "A short conversation then captures the student's actual routine — wake time, bedtime, and meal times — so reminders land against real life rather than fixed clock times. Reminders carry the medication context with them: quantity, whether food is needed, and relevant restrictions.",
      "A separate flow generates a seven-day meal plan that respects those restrictions along with the student's goals and preferences, and exports it with a grocery list as a formatted PDF.",
    ],

    ownershipSummary:
      "Team capstone — I owned the medication reminder workflow; a teammate led meal planning.",
    ownershipNote:
      "My primary technical ownership was the medication reminder workflow, end to end: prescription parsing through to the scheduled, context-carrying reminders a user receives. A teammate led the meal-plan feature. I contributed to the system architecture that connects the two and to the product integration between them, but the meal-plan generation logic was not my work.",

    contributions: [
      {
        title: "Technical contributions",
        items: [
          "Built the medication reminder workflow end to end, from parsed prescription data through to user-facing schedules anchored to each user's wake time, bedtime, and meal times.",
          "Collaborated on the extraction step that pulls medication name, dosage, frequency, and timing out of unstructured prescription text, photos, and PDFs.",
          "Designed the reminder content so each alert carries its medication context — quantity, food timing, and usage notes — rather than functioning as a bare clock notification.",
          "Implemented reminder management so users can review, edit, deactivate, and reactivate their schedules conversationally instead of through a settings screen.",
          "Integrated Supabase storage for user routines, uploaded documents, message history, and active reminder records.",
        ],
      },
      {
        title: "Product and planning contributions",
        items: [
          "Recommended and helped implement an HTML-to-PDF architecture for the meal-plan export, which improved output quality and generation performance over the prior approach.",
          "Managed technical milestones across the team and kept implementation work aligned to the user needs coming out of research.",
          "Coordinated with the research, design, and frontend teammates to reconcile product scope with what was technically achievable in a capstone timeline.",
        ],
      },
      {
        title: "Research and testing contributions",
        items: [
          "Ran usability testing on the reminder flow and translated the findings into product changes.",
          "Acted on one finding in particular by adding food warnings and usage notes to reminder content, after testing showed users did not retain those details from the original prescription.",
        ],
      },
    ],

    implementation: [
      {
        heading: "Structured extraction from unstructured input",
        body: [
          "Prescriptions arrive in whatever form the student has — a photo of a label, a PDF from a portal, or text they typed themselves. Rather than branch the pipeline by input type, all three normalize to text first and then pass through a single extraction step that returns a fixed schema: medication, dosage, frequency, timing, and food instructions.",
          "Constraining the model to a fixed output shape mattered more than extraction cleverness. A reminder scheduler cannot act on prose, and a field that is sometimes missing and sometimes phrased differently turns every downstream consumer into a parser.",
        ],
      },
      {
        heading: "Scheduling against a real routine",
        body: [
          "Reminder times are derived from the user's stated wake time, bedtime, and meal times rather than from fixed hours. A 'twice daily with food' instruction resolves differently for a student who eats at 9am and 7pm than for one who skips breakfast, and the schedule needs to reflect that.",
          "Storing the routine separately from the medication records means a change in routine reschedules every affected reminder without re-parsing any prescriptions.",
        ],
      },
      {
        heading: "HTML-to-PDF for the meal-plan export",
        body: [
          "Meal plans were originally going to be delivered as long messages, which is unreadable for seven days of meals plus a grocery list. I proposed rendering the plan as HTML and converting it with Puppeteer instead.",
          "The tradeoff is a headless browser in the pipeline, which is heavier than a templating library. It bought precise control over layout and a document users could keep, which a text message cannot provide.",
        ],
      },
    ],

    metrics: [
      { value: "7-day", label: "Meal plan generated", detail: "Per plan request" },
      { value: "28", label: "Meal and snack entries", detail: "Across a full plan" },
      {
        value: "3",
        label: "Prescription input formats",
        detail: "Text, photo, and PDF",
      },
    ],

    challenges: [
      {
        challenge:
          "Reminders that fired at the right time were still being ignored, because users could not remember whether a given medication needed food.",
        decision:
          "Attach the medication's food warnings and usage notes to the reminder itself rather than storing them where users would have to go look.",
        reasoning:
          "Usability testing showed the failure was recall, not timing. Any design that required a second step to retrieve the context would inherit the same problem.",
        outcome:
          "Reminders became self-contained instructions. It also reframed how I thought about the feature — the reminder is the delivery mechanism for the instruction, not just an alarm.",
      },
      {
        challenge:
          "Delivering a seven-day meal plan and grocery list through a messaging interface produced output nobody would read.",
        decision:
          "Render the plan as HTML and convert it to a PDF with Puppeteer, then deliver the document.",
        reasoning:
          "The constraint was the medium, not the content. A message thread cannot express a week-long table, and building a custom PDF layout by hand would have cost more than the capstone timeline allowed.",
        outcome:
          "Output quality and generation performance both improved, and users ended up with a document they could keep rather than a message they would scroll past.",
      },
    ],
  },

  /* ==========================================================================
     2. COMMUNITY NOTES AND GROK RESEARCH
  ========================================================================== */
  {
    slug: "community-notes-research",
    name: "Community Notes and Grok Research",
    shortDescription:
      "A large-scale analysis of Community Notes, human ratings, and AI-generated annotations.",
    role: "Researcher and Data Engineer",
    // TODO(content): confirm the date range. The previous site listed
    // "Sep 2025 – Present"; carried over here pending confirmation.
    duration: "September 2025 – Present",
    // TODO(content): confirm team size and add collaborators or advisor if relevant.
    categories: ["Research", "Applied AI", "Data Visualization", "Data Engineering"],
    technologies: [
      "Python",
      "K-means clustering",
      "LLM annotation",
      "Grok API",
      "Plotly",
      "Data processing",
    ],
    featured: true,

    // TODO(content): add `githubUrl`, `reportUrl` (paper), and `presentationUrl`
    // once those exist and are shareable.

    overview: [
      "X's Community Notes program lets contributors annotate posts and rate one another's annotations. The result is a large public record of what people considered helpful and why — and, more recently, of how AI-generated annotations compare.",
      "This research examines that record at scale: what structure exists in the rating behavior, whether it can be described in interpretable terms, and where human judgment and AI-generated annotation agree or diverge.",
      "The audience is researchers studying social media moderation and platform design, where the question of whether AI annotation can substitute for human review is currently unsettled.",
    ],

    problem: [
      "The dataset is large enough that manual review is not an option, but the interesting signal is qualitative — why a note was rated the way it was, not just how often.",
      "Latent factor representations of rating behavior are compact but not self-explaining. A three-dimensional embedding separates notes cleanly without saying what the separation means.",
      "Any labeling approach applied at this scale has to be checked. An LLM will produce a confident label for every note whether or not the label is meaningful.",
    ],

    solution: [
      "The pipeline cleans and joins the note and rating tables, then fits K-means clusters in a three-factor latent space, iterating on cluster count to balance interpretability against overfitting.",
      "Clusters and factors are then annotated with LLM assistance using controlled positive and negative examples, with repeated runs to measure whether labels stayed stable across attempts.",
      "Results are explored through interactive three-dimensional Plotly visualizations, which make the cluster and topic structure inspectable rather than something to take on faith from a metric.",
    ],

    contributions: [
      {
        title: "Technical contributions",
        items: [
          "Built the processing pipeline over more than 50,000 Community Notes and more than 4 million ratings, cleaning and joining the tables to compare latent factor and intercept behavior.",
          "Implemented K-means clustering in a three-factor space, running iterative experiments on cluster count to find the point where clusters stayed interpretable without overfitting.",
          "Integrated the Grok API into the research workflow for AI-generated annotation.",
          "Built interactive three-dimensional Plotly visualizations to compare human ratings against AI-generated annotations.",
        ],
      },
      {
        title: "Research contributions",
        items: [
          "Analyzed 4,715 note-version pairs to study how notes changed across revisions and how ratings responded.",
          "Developed a taxonomy for categorizing human feedback, giving the qualitative rating data a structure that could be applied consistently at scale.",
          "Validated LLM-assigned labels through manual review, reaching 73% clear matches and 87% partial matches across a sampled set of notes.",
          "Evaluated confidence-threshold sensitivity to find the tradeoff between how many notes could be labeled and how much the labels could be trusted.",
        ],
      },
    ],

    implementation: [
      {
        heading: "Making latent factors interpretable",
        body: [
          "A three-factor representation of rating behavior separates notes well but says nothing about what the axes mean. Clustering in that space and then labeling the clusters converts a numeric embedding into categories a human can reason about.",
          "Cluster count was the main tuning decision. Too few and distinct behaviors collapse into one bucket; too many and clusters stop generalizing. Iterating on that number with interpretability as the criterion, rather than a purely numeric score, is what made the output usable as research.",
        ],
      },
      {
        heading: "Treating LLM labels as measurements, not answers",
        body: [
          "LLM annotation was run with controlled positive and negative examples and repeated across multiple runs, so that label stability could be observed rather than assumed. A label that changes between identical runs is not a finding.",
          "Labels were then checked by hand against a sample, which is where the 73% clear and 87% partial match figures come from. Publishing the agreement rate matters more than the labels themselves — it tells a reader how much weight the automated labeling can carry.",
        ],
      },
    ],

    metrics: [
      { value: "50K+", label: "Community Notes processed" },
      { value: "4M+", label: "Ratings analyzed" },
      { value: "4,715", label: "Note-version pairs" },
      { value: "87%", label: "Partial label match", detail: "73% clear match" },
    ],

    challenges: [
      {
        challenge:
          "LLM-assigned cluster labels sounded plausible, which made them easy to over-trust and hard to falsify.",
        decision:
          "Run the annotation repeatedly with controlled examples, then hand-check a sample and report the agreement rate alongside the labels.",
        reasoning:
          "Plausibility is not accuracy. Without a stability check and a manual baseline there is no way to distinguish a real pattern from fluent output.",
        outcome:
          "Produced a defensible 73% clear and 87% partial match figure, and made the labeling's limits explicit instead of implicit.",
      },
    ],
  },

  /* ==========================================================================
     3. STUDY BUDDY
  ========================================================================== */
  {
    slug: "study-buddy",
    name: "Study Buddy",
    shortDescription:
      "A UW-only study-partner platform with verified login, profiles, an invitation workflow, and real-time chat.",
    role: "Project Lead and Full-Stack Developer",
    duration: "October 2025 – December 2025",
    teamSize: "4 people",
    categories: ["Full Stack", "Backend"],
    technologies: ["Node.js", "Express", "WebSockets", "REST APIs", "JavaScript"],
    featured: false,

    liveUrl: "https://final-project-qiaoyc2-1.onrender.com/login.html",
    // TODO(content): add `githubUrl` if the repository is public.

    overview: [
      "Study Buddy matches University of Washington students with study partners. Access is restricted to verified UW accounts, so the people you match with are actually classmates.",
      "I led a four-person team and owned the system design as well as a share of the implementation.",
    ],

    ownershipSummary:
      "Four-person team — I led it and built the invitation workflow; chat was built jointly.",
    ownershipNote:
      "I led the project and built the homepage, the invitation workflow, and the session middleware. The real-time chat was built jointly with a teammate rather than by me alone.",

    contributions: [
      {
        title: "Technical contributions",
        items: [
          "Produced the system architecture, database schema, and endpoint documentation the team built against.",
          "Built the homepage and the invitation workflow that turns a profile match into a connection.",
          "Implemented session middleware to resolve the current user's identity across requests.",
          "Co-built real-time chat over WebSockets with database-backed message history for matched users.",
        ],
      },
      {
        title: "Product and planning contributions",
        items: [
          "Led a four-person team, dividing work along the interfaces defined in the architecture so members could build in parallel.",
        ],
      },
    ],

    // TODO(content): add screenshots to public/projects/study-buddy/ — the login
    // screen, a profile, and the chat view would carry this case study well.
  },

  /* ==========================================================================
     4. MOBYGAMES DATA PIPELINE  (previously listed as "GameLensDB")
  ========================================================================== */
  {
    slug: "mobygames-data-pipeline",
    name: "MobyGames Data Pipeline",
    shortDescription:
      "A web-scraping and ingestion pipeline that converts game information into structured records for analysis.",
    role: "Data Engineer",
    duration: "May 2025 – June 2025",
    categories: ["Data Engineering", "Backend"],
    technologies: ["Python", "Selenium", "BeautifulSoup", "JSON", "MongoDB"],
    featured: false,

    // TODO(content): add `githubUrl` if the repository is public.

    overview: [
      "Video game metadata is spread across pages built for people to read, not for programs to consume. This pipeline scrapes MobyGames and turns those pages into structured records that support querying genre, platform, publisher, and scoring trends.",
      "Previously listed on my site as GameLensDB.",
    ],

    problem: [
      "The source data is HTML rendered for human readers, with attributes that appear inconsistently and are formatted differently from page to page.",
      "Analysis needs the opposite: a predictable schema where an attribute is either present in a known shape or absent.",
    ],

    solution: [
      "Selenium drives page navigation where content requires it, BeautifulSoup extracts fields from the resulting markup, and each game is written out as JSON before being loaded into MongoDB.",
      "Attributes are normalized on the way in, so downstream aggregation pipelines can filter on them without special-casing each record.",
    ],

    contributions: [
      {
        title: "Technical contributions",
        items: [
          "Built the scraper with Selenium and BeautifulSoup, exporting JSON and loading more than 1,100 titles into MongoDB.",
          "Standardized eight key attributes across the collection, which is what made the records filterable rather than just stored.",
          "Designed aggregation pipelines surfacing genre and platform trends, developer and publisher activity, and the relationship between review score and business model.",
        ],
      },
    ],

    metrics: [
      { value: "1,100+", label: "Game records scraped" },
      { value: "8", label: "Attributes standardized", detail: "Across all documents" },
    ],
  },

  /* ==========================================================================
     5. AZURE DATA WAREHOUSE AND ETL PIPELINE  (Climate TRACE emissions data)
  ========================================================================== */
  {
    slug: "azure-data-warehouse",
    name: "Azure Data Warehouse and ETL Pipeline",
    shortDescription:
      "A star-schema data warehouse and ETL workflow combining country-level emissions datasets into an analytics-ready system.",
    role: "Data Engineer",
    duration: "April 2025 – May 2025",
    categories: ["Data Engineering", "Backend"],
    technologies: ["Python", "SQL", "ETL", "Dimensional modeling", "Azure SQL Database"],
    featured: false,

    // TODO(content): add `githubUrl` and `reportUrl` if either exists.

    overview: [
      "Climate TRACE publishes greenhouse gas emissions data as a per-country collection of CSV files. Useful individually; awkward for any question that spans countries or sectors.",
      "This project consolidates those files into a star-schema warehouse on Azure SQL Database, so cross-country and cross-sector analysis becomes a query rather than a data-wrangling exercise.",
    ],

    problem: [
      "Fifty-four separate country files means fifty-four separate loads, each with its own encoding of the same concepts, and country identifiers that do not line up with region groupings out of the box.",
      "Analytical queries over that shape are slow and repetitive, which discourages exactly the exploratory work the data is worth collecting for.",
    ],

    solution: [
      "A dimensional model separates emissions facts from the country, sector, and time dimensions, which is what makes aggregation across any combination of them cheap.",
      "An ETL pipeline ingests and cleans the country files, maps ISO codes to regions, and bulk-loads the result into Azure SQL Database.",
    ],

    contributions: [
      {
        title: "Technical contributions",
        items: [
          "Designed the star-schema dimensional model and deployed it to Azure SQL Database for OLAP-style analysis.",
          "Built the ETL pipeline that ingests and cleans 54 country-level CSV files covering roughly 70,000 emissions site records, mapping ISO codes to regions and automating the bulk load.",
          "Authored the analytical SQL layer using window functions, CUBE, and top-k sector queries.",
          "Produced dashboards and figures identifying persistent top emitters, framed for policy-oriented readers.",
        ],
      },
    ],

    metrics: [
      { value: "54", label: "Country datasets combined" },
      { value: "70K+", label: "Emissions site records" },
    ],
  },

  /* ==========================================================================
     6. WEATHER VISUALIZATION DASHBOARD
  ========================================================================== */
  {
    slug: "weather-dashboard",
    name: "Weather Visualization Dashboard",
    shortDescription:
      "An interactive D3.js dashboard comparing daily and monthly temperature trends between global cities.",
    role: "Data Analyst",
    duration: "February 2025 – March 2025",
    categories: ["Data Visualization"],
    technologies: ["D3.js", "JavaScript", "HTML", "CSS", "Data cleaning"],
    featured: false,

    // TODO(content): add `liveUrl` if this is hosted anywhere, and `githubUrl`
    // if the repository is public.

    overview: [
      "A dashboard for comparing temperature trends between global cities across 2014 and 2015, at either daily or monthly granularity.",
      "Built with D3.js directly rather than a charting library, which meant handling scales, axes, and transitions explicitly.",
    ],

    contributions: [
      {
        title: "Technical contributions",
        items: [
          "Built the interactive charts in D3.js, letting users compare daily or monthly average temperatures across cities.",
          "Added dropdown controls and responsive chart sizing for dynamic filtering.",
          "Cleaned and transformed the raw historical weather data from Weather Underground into the shape the charts consume.",
        ],
      },
    ],

    // TODO(content): add a screenshot to public/projects/weather-dashboard/ —
    // a visualization project reads poorly without one.
  },

  /* ==========================================================================
     7. CLIMATE REDDIT COMMENT RELATEDNESS
  ========================================================================== */
  {
    slug: "climate-reddit-relatedness",
    name: "Climate Reddit Comment Relatedness",
    shortDescription:
      "A binary text classifier evaluating how closely comments relate to their post titles in the Climate subreddit.",
    role: "LLM Prompting Engineer",
    duration: "November 2024 – December 2024",
    categories: ["Applied AI", "Research"],
    technologies: [
      "Python",
      "BERT embeddings",
      "Logistic regression",
      "LLM prompting",
      "Web scraping",
    ],
    featured: false,

    // TODO(content): add `githubUrl` and `reportUrl` if either exists.

    overview: [
      "In a large subreddit, comment threads drift. This project measures how far, by classifying whether a given comment is actually related to the post title it sits under.",
      "Three approaches were compared on the same task: logistic regression over BERT embeddings, and GPT-3.5 prompted zero-shot and few-shot.",
    ],

    contributions: [
      {
        title: "Technical contributions",
        items: [
          "Crawled the Climate subreddit and structured roughly 600 posts with their comments into a labeled training set.",
          "Implemented the binary relatedness classifier using logistic regression over BERT embeddings.",
          "Ran zero-shot and few-shot prompting against GPT-3.5 for the same task, so the prompted approach could be compared against the trained baseline directly.",
        ],
      },
    ],

    metrics: [{ value: "~600", label: "Reddit posts collected" }],
  },

  /* ==========================================================================
     8. RECIPE FINDER
  ========================================================================== */
  {
    slug: "recipe-finder",
    name: "Recipe Finder",
    shortDescription:
      "A recipe discovery platform using BM25 ranking and query suggestion over crawled recipe data.",
    role: "Search and Recommendation System Designer",
    duration: "November 2024 – December 2024",
    categories: ["Applied AI", "Research"],
    technologies: [
      "Python",
      "PyTerrier",
      "BM25",
      "Information retrieval",
      "Web crawling",
    ],
    featured: false,

    // TODO(content): the previous site linked a report PDF
    // ("receipt_finder.pdf") that was never committed. Add it as `reportUrl`
    // once located.

    overview: [
      "A search system for recipes built on crawled web data, using classical information retrieval rather than a vector database.",
      "The retrieval side uses BM25 through PyTerrier; a query mapping layer suggests related searches to help users refine what they were actually looking for.",
    ],

    contributions: [
      {
        title: "Technical contributions",
        items: [
          "Designed the retrieval platform over recipe data crawled from the web.",
          "Integrated PyTerrier and BM25 ranking for the core search.",
          "Built a mapping function that suggests related queries, so a vague initial search can be narrowed without starting over.",
        ],
      },
    ],
  },

  /* ==========================================================================
     9. PLATE PAL
  ========================================================================== */
  {
    slug: "plate-pal",
    name: "Plate Pal",
    shortDescription:
      "A responsive meal-planning app that recommends meals from calorie goals, dietary preferences, allergies, and available ingredients.",
    role: "Front-End Lead",
    duration: "June 2024 – August 2024",
    categories: ["Full Stack"],
    technologies: ["React", "JavaScript", "Firebase", "HTML", "CSS"],
    featured: false,

    // TODO(content): add `liveUrl` and `githubUrl` if either exists.

    overview: [
      "Plate Pal generates meal recommendations from a user's calorie targets, dietary preferences, allergies, and whatever ingredients they already have.",
      "I led the front end, which covered the component architecture and the full set of user-facing screens.",
    ],

    contributions: [
      {
        title: "Technical contributions",
        items: [
          "Built the reusable React component library and the app's routing.",
          "Created the profile, history, favorites, and recipe-detail screens.",
          "Wired the front end to Firebase Realtime Database for persistence.",
          "Implemented personalized nutrition preferences and meal-frequency settings.",
        ],
      },
    ],
  },

  /* ==========================================================================
     10. WEBSHARER
     TODO(content): no date range on record — add `duration` when you have it.
  ========================================================================== */
  {
    slug: "websharer",
    name: "Websharer",
    shortDescription:
      "A deployed link-sharing app with Open Graph preview generation, REST APIs, and content sanitization.",
    role: "Backend Developer",
    categories: ["Backend", "Full Stack"],
    technologies: ["Node.js", "Express", "MongoDB", "Mongoose", "REST APIs", "Render"],
    featured: false,

    // TODO(content): add `liveUrl` (the Render deployment) and `githubUrl`.

    overview: [
      "Websharer lets users post links that render with a preview rather than as bare URLs. The backend fetches each link's Open Graph metadata and stores the result alongside the post.",
      "Deployed on Render with MongoDB for storage.",
    ],

    problem: [
      "Generating a preview means fetching and parsing a page the user chose, which is untrusted input arriving from an untrusted host. Rendering that content back to other users is the obvious way such a feature becomes an injection vector.",
    ],

    contributions: [
      {
        title: "Technical contributions",
        items: [
          "Built the URL-preview endpoint that fetches and parses Open Graph metadata from submitted links.",
          "Built the post creation and retrieval APIs on Express with Mongoose over MongoDB.",
          "Added sanitization of fetched metadata to prevent unsafe embedded content from reaching other users.",
          "Deployed and configured the service on Render.",
        ],
      },
    ],
  },

  /* ==========================================================================
     11. DISCORD MUSIC BOT
     TODO(content): no date range on record — add `duration` when you have it.
  ========================================================================== */
  {
    slug: "discord-music-bot",
    name: "Discord Music Bot",
    shortDescription:
      "A Discord bot that searches music through an external API, manages voice playback, and handles slash commands.",
    role: "Backend Developer",
    categories: ["Backend"],
    technologies: [
      "Node.js",
      "JavaScript",
      "Discord API",
      "REST APIs",
      "FFmpeg",
      "Render",
    ],
    featured: false,

    // TODO(content): add `githubUrl` if the repository is public.

    overview: [
      "A Discord bot that takes a slash command, searches a NetEase Cloud Music API for the track, and streams it into the voice channel the requester is in.",
      "Most of the work is in the audio path: fetching a stream, processing it with FFmpeg, and keeping playback stable across a voice connection.",
    ],

    contributions: [
      {
        title: "Technical contributions",
        items: [
          "Built the bot on Node.js and discord.js with slash-command interactions.",
          "Integrated a NetEase Cloud Music API for track search and stream resolution.",
          "Handled audio processing through FFmpeg and managed Discord voice-channel playback.",
          "Deployed the supporting services on Render.",
        ],
      },
    ],
  },
];

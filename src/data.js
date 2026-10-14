// AgriEmpower starter curriculum. Educational content is illustrative and
// requires review by Rwanda-based agronomists, nutritionists and translators.
export const lessons = [
  {
    id: 'soil', category: 'farming', icon: 'sprout', minutes: 7, color: 'sage',
    title: { en: 'Start with healthy soil', rw: 'Tangirira ku butaka bwiza' },
    summary: { en: 'Learn simple ways to protect soil and support stronger crops.', rw: 'Menya uburyo bworoshye bwo kurinda ubutaka no gufasha ibihingwa gukura.' },
    outcome: { en: 'Make a small soil-care plan for your next planting.', rw: 'Tegura uburyo bwo kwita ku butaka mbere yo gutera.' },
    steps: [
      { title: { en: 'Look closely at your soil', rw: 'Itegereze ubutaka bwawe' }, body: { en: 'Notice how soil feels, drains after rain, and supports plant roots. Observe which places dry quickly or stay waterlogged.', rw: 'Reba uko ubutaka bumeze, uko amazi acengera n\'uko imizi y\'ibihingwa ikura. Menya aho ubutaka bwuma vuba cyangwa amazi agahagarara.' } },
      { title: { en: 'Cover bare ground', rw: 'Rinda ubutaka butambaye' }, body: { en: 'Where appropriate, cover soil with clean crop residues or other suitable mulch. A protective layer can help retain moisture and reduce erosion.', rw: 'Aho bishoboka, pfuka ubutaka ukoresheje ibisigazwa by\'ibihingwa bisukuye. Ibi bifasha kubika amazi no kugabanya isuri.' } },
      { title: { en: 'Return organic matter', rw: 'Ongeramo ifumbire y\'imborera' }, body: { en: 'Use well-prepared compost when available and seek local advice about quantities and suitability for your crop. Avoid uncomposted waste near food crops.', rw: 'Koresha ifumbire y\'imborera iboze neza kandi ugishe inama umujyanama w\'ubuhinzi ku rugero rukwiye.' } }
    ],
    quiz: { q: { en: 'What can help protect soil from erosion?', rw: 'Ni iki cyafasha kurinda ubutaka isuri?' }, choices: [{ en: 'Leaving the soil bare', rw: 'Gusiga ubutaka butambaye' }, { en: 'Keeping suitable soil cover', rw: 'Gupfuka ubutaka uko bikwiye' }, { en: 'Removing all plant residues', rw: 'Gukuraho ibisigazwa byose' }], answer: 1 }
  },
  {
    id: 'water', category: 'farming', icon: 'droplets', minutes: 6, color: 'blue',
    title: { en: 'Use water wisely', rw: 'Koresha amazi neza' },
    summary: { en: 'Keep roots hydrated while reducing wasted water.', rw: 'Fasha imizi kubona amazi kandi wirinde kuyapfusha ubusa.' },
    outcome: { en: 'Identify a water-saving habit to try this week.', rw: 'Hitamo uburyo bwo kuzigama amazi uzakoresha muri iki cyumweru.' },
    steps: [
      { title: { en: 'Check before watering', rw: 'Banza ugenzure mbere yo kuvomera' }, body: { en: 'Feel the soil just below the surface before watering. Different crops and soils need different amounts of moisture.', rw: 'Banza ukore ku butaka munsi y\'ubuso mbere yo kuvomera. Ibihingwa n\'ubutaka bitandukanye bikenera amazi atandukanye.' } },
      { title: { en: 'Water near the roots', rw: 'Vomerera hafi y\'imizi' }, body: { en: 'Direct water toward the root area instead of spraying widely. Avoid leaving standing water around plants.', rw: 'Shyira amazi hafi y\'imizi aho kuyanyanyagiza hose. Irinde amazi ahagarara hafi y\'ibihingwa.' } },
      { title: { en: 'Protect moisture', rw: 'Rinda ubuhehere' }, body: { en: 'Mulch and healthy soil structure can reduce evaporation. Follow guidance from local extension agents for season-appropriate irrigation.', rw: 'Gupfuka ubutaka no kububungabunga bishobora kugabanya amazi ahinduka umwuka. Kurikiza inama z\'abajyanama b\'ubuhinzi.' } }
    ],
    quiz: { q: { en: 'Where should you aim water for most garden plants?', rw: 'Ni he byiza kuvomerera ku bihingwa byo mu busitani?' }, choices: [{ en: 'Around the roots', rw: 'Hafi y\'imizi' }, { en: 'Far from the plants', rw: 'Kure y\'ibihingwa' }, { en: 'On the path', rw: 'Mu nzira' }], answer: 0 }
  },
  {
    id: 'seeds', category: 'farming', icon: 'leaf', minutes: 5, color: 'gold',
    title: { en: 'Plan before planting', rw: 'Tegura mbere yo gutera' },
    summary: { en: 'Think about seeds, crop rotation, timing and local conditions.', rw: 'Tekereza ku mbuto, guhinduranya ibihingwa n\'ibihe byo gutera.' },
    outcome: { en: 'Write down one crop and a planting decision.', rw: 'Andika igihingwa kimwe n\'icyemezo cyo kugiteza.' },
    steps: [
      { title: { en: 'Choose crops for your area', rw: 'Hitamo ibihingwa bibereye aho utuye' }, body: { en: 'Ask a local extension worker which varieties are suitable for your altitude, rainfall, growing season and soil.', rw: 'Baza umujyanama w\'ubuhinzi amoko y\'ibihingwa abereye ikirere, imvura n\'ubutaka by\'aho utuye.' } },
      { title: { en: 'Keep simple records', rw: 'Bika inyandiko zoroshye' }, body: { en: 'Write down planting dates, seed sources, and what grew well. This helps you make better decisions next season.', rw: 'Andika amatariki yo gutera, aho wakuye imbuto n\'ibyageze neza. Bizagufasha ubutaha.' } },
      { title: { en: 'Consider crop rotation', rw: 'Tekereza ku guhinduranya ibihingwa' }, body: { en: 'Planting a different crop family in the same plot across seasons can help manage some soil and pest pressures. Check local guidance for your crops.', rw: 'Guhinduranya amoko y\'ibihingwa mu murima bishobora kugabanya bimwe mu bibazo by\'ubutaka n\'udukoko.' } }
    ],
    quiz: { q: { en: 'What is useful to write down after planting?', rw: 'Ni iki cyiza kwandika nyuma yo gutera?' }, choices: [{ en: 'Nothing at all', rw: 'Nta na kimwe' }, { en: 'Only the weather', rw: 'Ikirere gusa' }, { en: 'The crop and planting date', rw: 'Igihingwa n\'itariki yo gutera' }], answer: 2 }
  },
  {
    id: 'garden', category: 'nutrition', icon: 'flower-2', minutes: 8, color: 'pink',
    title: { en: 'Grow a kitchen garden', rw: 'Hinga akarima k\'imboga' },
    summary: { en: 'Start small with vegetables your household can use.', rw: 'Tangirira ku mboga umuryango wawe ushobora kurya.' },
    outcome: { en: 'Choose a small garden location and two crops.', rw: 'Hitamo aho uzahinga n\'ibihingwa bibiri.' },
    steps: [
      { title: { en: 'Choose a suitable space', rw: 'Hitamo ahantu hakwiye' }, body: { en: 'Look for a place with appropriate sunlight, safe water access and soil that drains. Containers can work where ground space is limited.', rw: 'Shaka ahantu hari urumuri rw\'izuba, amazi meza n\'ubutaka bwiza. Ushobora no gukoresha ibikoresho byo guteramo.' } },
      { title: { en: 'Grow familiar nutritious foods', rw: 'Hinga ibiribwa bifite intungamubiri' }, body: { en: 'Depending on local growing conditions, consider leafy greens, beans, or orange-fleshed sweet potato alongside other foods your household eats.', rw: 'Ukurikije aho utuye, tekereza ku mboga rwatsi, ibishyimbo cyangwa ibijumba bifite ibara rya oranje.' } },
      { title: { en: 'Harvest, use, and replant', rw: 'Sarura, ukoreshe, wongere utere' }, body: { en: 'Plan how produce will be prepared safely and used in varied meals. Save suitable planting dates for the next round.', rw: 'Tegura uko uzakoresha umusaruro mu mafunguro atandukanye kandi wandike amatariki yo kongera gutera.' } }
    ],
    quiz: { q: { en: 'What is a good way to begin a kitchen garden?', rw: 'Ni ubuhe buryo bwiza bwo gutangira akarima k\'imboga?' }, choices: [{ en: 'Begin with a manageable space', rw: 'Tangirira ahantu hato ushobora kwitaho' }, { en: 'Plant without checking the soil', rw: 'Tera utagenzuye ubutaka' }, { en: 'Grow only one food forever', rw: 'Hinga igihingwa kimwe gusa' }], answer: 0 }
  },
  {
    id: 'meals', category: 'nutrition', icon: 'heart', minutes: 6, color: 'peach',
    title: { en: 'Build a colorful meal', rw: 'Tegura ifunguro ritandukanye' },
    summary: { en: 'Explore food variety using affordable, locally available ingredients.', rw: 'Menya uko wahuriza hamwe ibiribwa bitandukanye biboneka hafi yawe.' },
    outcome: { en: 'Think of one food group to add to a family meal.', rw: 'Tekereza ku bwoko bw\'ibiribwa wakongera mu ifunguro.' },
    steps: [
      { title: { en: 'Mix food groups', rw: 'Vanga amoko y\'ibiribwa' }, body: { en: 'When possible, combine staple foods with vegetables or fruit and protein-rich foods such as beans, eggs, dairy, fish or other available options.', rw: 'Aho bishoboka, huza ibiribwa by\'ibanze n\'imboga cyangwa imbuto ndetse n\'ibiribwa byubaka umubiri nk\'ibishyimbo cyangwa amagi.' } },
      { title: { en: 'Use seasonal foods', rw: 'Koresha ibiribwa by\'igihe' }, body: { en: 'Seasonal produce may be easier to find and can add variety. Plan meals around what your household can reliably obtain.', rw: 'Ibiribwa byera mu gihe runaka bishobora kuboneka byoroshye. Tegura ifunguro ukurikije ibiboneka iwanyu.' } },
      { title: { en: 'Ask about age-specific needs', rw: 'Baza ku mirire ikwiye imyaka' }, body: { en: 'Young children and pregnant or breastfeeding women may need additional nutrition support. For individual advice, consult a qualified health worker.', rw: 'Abana bato n\'abagore batwite cyangwa bonsa bashobora gukenera ubufasha bwihariye. Baza umukozi w\'ubuzima.' } }
    ],
    quiz: { q: { en: 'Which meal offers more food variety?', rw: 'Ni irihe funguro ririmo amoko menshi y\'ibiribwa?' }, choices: [{ en: 'Only one staple food', rw: 'Ikiribwa kimwe cy\'ibanze gusa' }, { en: 'Staple, vegetables and beans', rw: 'Ikiribwa cy\'ibanze, imboga n\'ibishyimbo' }, { en: 'Only a sugary drink', rw: 'Ikinyobwa kirimo isukari gusa' }], answer: 1 }
  },
  {
    id: 'safety', category: 'nutrition', icon: 'shield-check', minutes: 5, color: 'blue',
    title: { en: 'Keep food and water safe', rw: 'Rinda ibiribwa n\'amazi' },
    summary: { en: 'Small food hygiene habits can help protect household health.', rw: 'Isuku y\'ibiribwa n\'amazi ifasha kurinda ubuzima bw\'umuryango.' },
    outcome: { en: 'Choose one safe-food habit to practice today.', rw: 'Hitamo igikorwa kimwe cy\'isuku wakora uyu munsi.' },
    steps: [
      { title: { en: 'Wash hands at key times', rw: 'Karaba intoki mu bihe by\'ingenzi' }, body: { en: 'Wash hands with soap and safe water before preparing food or feeding children, and after using the toilet.', rw: 'Karaba intoki n\'isabune n\'amazi meza mbere yo gutegura amafunguro cyangwa kugaburira abana, na nyuma yo kuva mu bwiherero.' } },
      { title: { en: 'Keep utensils clean', rw: 'Sukura ibikoresho' }, body: { en: 'Use clean utensils and preparation surfaces. Separate raw foods from ready-to-eat foods to limit contamination.', rw: 'Koresha ibikoresho n\'aho gutegurira amafunguro bisukuye. Tandukanya ibiribwa bibisi n\'ibyateguwe.' } },
      { title: { en: 'Store food carefully', rw: 'Bika ibiribwa neza' }, body: { en: 'Protect stored food from moisture, pests and dirt. Follow local public-health advice for safe water treatment and food storage.', rw: 'Rinda ibiribwa bibitswe ubuhehere, udukoko n\'umwanda. Kurikiza inama z\'ubuzima rusange.' } }
    ],
    quiz: { q: { en: 'When should hands be washed with soap?', rw: 'Ni ryari ugomba gukaraba intoki n\'isabune?' }, choices: [{ en: 'Before preparing food', rw: 'Mbere yo gutegura amafunguro' }, { en: 'Only once a week', rw: 'Rimwe mu cyumweru gusa' }, { en: 'Never', rw: 'Nta na rimwe' }], answer: 0 }
  },
  {
    id: 'feeding', category: 'nutrition', icon: 'baby', minutes: 8, color: 'pink',
    title: { en: 'Feeding young children', rw: 'Kugaburira abana bato' },
    summary: { en: 'Understand the basics of age-appropriate, varied and safe foods.', rw: 'Menya ibiribwa bitandukanye, bifite isuku kandi bikwiriye imyaka y\'abana.' },
    outcome: { en: 'Know where to seek trusted child-feeding guidance.', rw: 'Menya aho wabaza inama zizewe ku mirire y\'abana.' },
    steps: [
      { title: { en: 'The first six months', rw: 'Amezi atandatu ya mbere' }, body: { en: 'WHO recommends exclusive breastfeeding for the first six months, when possible, with support from a qualified health worker if difficulties arise.', rw: 'OMS isaba ko mu mezi atandatu ya mbere umwana yonswa gusa, aho bishoboka. Baza umukozi w\'ubuzima niba hari ingorane.' } },
      { title: { en: 'Food alongside breastfeeding', rw: 'Ibiribwa byunganira amashereka' }, body: { en: 'At about six months, children need safe, nutritious complementary foods as well as continued breastfeeding. Texture and meal frequency change with age.', rw: 'Guhera hafi ku mezi atandatu, abana bakenera ibiribwa bifite intungamubiri kandi bitekanye byunganira amashereka. Uko ibiribwa bitegurwa bihinduka uko bakura.' } },
      { title: { en: 'Get tailored guidance', rw: 'Shaka inama zikwiriye umwana' }, body: { en: 'A local health professional can advise on feeding, growth monitoring, illness and nutrition concerns. This lesson is not a substitute for medical care.', rw: 'Umukozi w\'ubuzima ashobora gutanga inama ku mirire, imikurire n\'ibibazo by\'umwana. Iri somo ntirisimbura ubuvuzi.' } }
    ],
    quiz: { q: { en: 'Where should you seek advice about a child\'s feeding or growth concern?', rw: 'Ni he wabaza inama ku mirire cyangwa imikurire y\'umwana?' }, choices: [{ en: 'A qualified health worker', rw: 'Umukozi w\'ubuzima ubifitiye ubumenyi' }, { en: 'An unverified rumor', rw: 'Igihuha kitizewe' }, { en: 'No one', rw: 'Nta muntu' }], answer: 0 }
  },
  {
    id: 'harvest', category: 'farming', icon: 'wheat', minutes: 6, color: 'gold',
    title: { en: 'Protect your harvest', rw: 'Rinda umusaruro wawe' },
    summary: { en: 'Reduce preventable losses during harvest, drying and storage.', rw: 'Gabanya igihombo giterwa no gusarura, kumisha no kubika nabi.' },
    outcome: { en: 'Make a storage checklist for one crop.', rw: 'Kora urutonde rwo kubika neza igihingwa kimwe.' },
    steps: [
      { title: { en: 'Harvest at the right time', rw: 'Sarura ku gihe gikwiye' }, body: { en: 'Harvest timing depends on the crop and its intended use. Seek crop-specific advice and avoid rough handling.', rw: 'Igihe cyo gusarura giterwa n\'igihingwa n\'uko kizakoreshwa. Baza inama kandi wirinde kwangiza umusaruro.' } },
      { title: { en: 'Dry and sort when appropriate', rw: 'Misha kandi urobanure uko bikwiye' }, body: { en: 'For crops that require drying, follow appropriate local guidelines. Remove visibly damaged or contaminated produce.', rw: 'Ku bihingwa bisaba kumishwa, kurikiza inama ziboneye. Kuramo umusaruro wangiritse cyangwa wanduye.' } },
      { title: { en: 'Store cleanly and check often', rw: 'Bika ahantu hasukuye, ugenzure kenshi' }, body: { en: 'Keep suitable stores dry, clean and protected from pests. Check regularly for signs of spoilage. Never eat visibly moldy food.', rw: 'Bika ahantu humutse, hasukuye kandi hatagera udukoko. Genzura kenshi ko nta byangiritse. Ntukarye ibiribwa bifite uruhumbu.' } }
    ],
    quiz: { q: { en: 'Which storage habit is safest?', rw: 'Ni ubuhe buryo bwiza bwo kubika?' }, choices: [{ en: 'Ignore signs of spoilage', rw: 'Kwirengagiza ibyangiritse' }, { en: 'Store food with pests', rw: 'Kubika ibiribwa birimo udukoko' }, { en: 'Keep stores clean and check regularly', rw: 'Isuku no kugenzura kenshi' }], answer: 2 }
  }
];

export const resources = [
  { id: 'soil-guide', type: 'guide', category: 'farming', icon: 'book-open', color: 'sage', title: { en: 'Soil care field checklist', rw: 'Urutonde rwo kwita ku butaka' }, description: { en: 'Five things to check before planting.', rw: 'Ibintu bitanu ugomba kugenzura mbere yo gutera.' }, items: { en: ['Observe drainage after rain.', 'Check for erosion or exposed roots.', 'Look for crop residues or suitable mulch.', 'Ask about well-prepared compost.', 'Record the crop and planting date.'], rw: ['Reba uko amazi acengera nyuma y\'imvura.', 'Genzura isuri n\'imizi yagaragaye.', 'Reba ibisigazwa by\'ibihingwa byo gupfuka ubutaka.', 'Baza ku ifumbire y\'imborera iboze neza.', 'Andika igihingwa n\'itariki yo gutera.'] } },
  { id: 'garden-guide', type: 'guide', category: 'nutrition', icon: 'flower-2', color: 'pink', title: { en: 'Small kitchen garden guide', rw: 'Imfashanyigisho y\'akarima k\'imboga' }, description: { en: 'A beginner-friendly plan for a home food garden.', rw: 'Gahunda yoroshye y\'akarima k\'ibiribwa.' }, items: { en: ['Choose a manageable, sunny space.', 'Check safe water and drainage.', 'Ask which vegetable seeds suit your area.', 'Plant a mix of available nutritious foods.', 'Plan harvesting and safe preparation.'], rw: ['Hitamo ahantu hato hari izuba.', 'Genzura amazi meza n\'uko acengera.', 'Baza imbuto z\'imboga zibereye aho utuye.', 'Hinga ibiribwa bitandukanye bifite intungamubiri.', 'Tegura gusarura no gutegura ibiribwa neza.'] } },
  { id: 'safe-food-guide', type: 'guide', category: 'nutrition', icon: 'shield-check', color: 'blue', title: { en: 'Safe food, strong families', rw: 'Ibiribwa bisukuye, imiryango myiza' }, description: { en: 'A practical household hygiene reminder.', rw: 'Inyibutsa y\'isuku yo mu rugo.' }, items: { en: ['Wash hands with soap and safe water.', 'Clean surfaces and cooking utensils.', 'Separate raw and ready-to-eat foods.', 'Keep food protected from dirt and pests.', 'Ask a health worker about safe water.'], rw: ['Karaba intoki n\'isabune n\'amazi meza.', 'Sukura aho utekera n\'ibikoresho.', 'Tandukanya ibiribwa bibisi n\'ibyateguwe.', 'Rinda ibiribwa umwanda n\'udukoko.', 'Baza umukozi w\'ubuzima iby\'amazi meza.'] } },
  { id: 'crop-log', type: 'template', category: 'farming', icon: 'file-down', color: 'gold', title: { en: 'Planting & harvest log', rw: 'Inyandiko zo gutera no gusarura' }, description: { en: 'Download a simple CSV record-keeping sheet.', rw: 'Kuramo urupapuro rw\'inyandiko rwa CSV.' }, fileName: 'planting-harvest-log.csv', csv: 'Date,Crop,Plot,Activity,Quantity,Unit,Notes\n' },
  { id: 'budget', type: 'template', category: 'farming', icon: 'calculator', color: 'sage', title: { en: 'Farm budget template', rw: 'Urupapuro rw\'ingengo y\'imari y\'umurima' }, description: { en: 'Keep track of expenses and sales in a CSV sheet.', rw: 'Andika amafaranga yakoreshejwe n\'ayinjijwe.' }, fileName: 'farm-budget.csv', csv: 'Date,Item,Type (Cost or Income),Amount (RWF),Notes\n' },
  { id: 'planting-plan', type: 'template', category: 'farming', icon: 'calendar-days', color: 'sage', title: { en: 'Seasonal planting plan', rw: 'Gahunda yo gutera mu bihe by\'ihinga' }, description: { en: 'Plan planting and harvest dates using local seasonal advice.', rw: 'Tegura amatariki yo gutera no gusarura ukurikije inama z\'aho utuye.' }, fileName: 'seasonal-planting-plan.csv', csv: 'Season,Plot,Crop,Variety,Planned planting date,Planned harvest date,Local advisor notes\n' },
  { id: 'meal-plan', type: 'template', category: 'nutrition', icon: 'calendar-days', color: 'peach', title: { en: 'Weekly family meal planner', rw: 'Gahunda y\'amafunguro y\'icyumweru' }, description: { en: 'Plan varied meals based on available foods.', rw: 'Tegura amafunguro atandukanye mu byo ufite.' }, fileName: 'weekly-meal-planner.csv', csv: 'Day,Breakfast,Lunch,Dinner,Food groups to add,Notes\nMonday,,,,,\nTuesday,,,,,\nWednesday,,,,,\nThursday,,,,,\nFriday,,,,,\nSaturday,,,,,\nSunday,,,,,\n' },
  { id: 'fao-rwanda', type: 'external', category: 'nutrition', icon: 'external-link', color: 'pink', title: { en: 'Food plants for healthy diets in Rwanda', rw: 'Ibihingwa by\'ibiribwa bigirira akamaro u Rwanda' }, description: { en: 'Explore local food plant resources shared through FAO.', rw: 'Soma ibijyanye n\'ibihingwa by\'ibiribwa kuri FAO.' }, publisher: 'FAO', url: 'https://www.fao.org/family-farming/detail/en/c/1604576/' },
  { id: 'fao-health', type: 'external', category: 'nutrition', icon: 'external-link', color: 'blue', title: { en: 'Healthy eating and home gardening', rw: 'Imirire myiza n\'utulima tw\'imboga' }, description: { en: 'Official FAO education resources and Africa home-garden materials.', rw: 'Amakuru ya FAO ku mirire myiza n\'ubusitani bwo muri Afurika.' }, publisher: 'FAO', url: 'https://www.fao.org/nutrition/education/healthy-eating-resources' },
  { id: 'who-feeding', type: 'external', category: 'nutrition', icon: 'external-link', color: 'peach', title: { en: 'WHO child feeding guidance', rw: 'Inama za OMS ku mirire y\'abana' }, description: { en: 'Evidence-based guidance on feeding young children.', rw: 'Inama zishingiye ku bumenyi ku kugaburira abana bato.' }, publisher: 'WHO', url: 'https://www.who.int/health-topics/complementary-feeding' },
  { id: 'fao-field-videos', type: 'video', category: 'farming', icon: 'volume-2', color: 'sage', title: { en: 'Farmer Field School videos', rw: 'Amavidewo y\'amashuri y\'abahinzi' }, description: { en: 'FAO learning videos, including a farmer field school story from Rwanda.', rw: 'Amavidewo yo kwiga ya FAO, harimo n\'inkuru y\'u Rwanda.' }, publisher: 'FAO', url: 'https://www.fao.org/farmer-field-schools/resources/videos/en' },
  { id: 'fao-crop-videos', type: 'video', category: 'farming', icon: 'volume-2', color: 'gold', title: { en: 'Crop production videos', rw: 'Amavidewo ku buhinzi bw\'ibihingwa' }, description: { en: 'A curated FAO video library on sustainable plant production.', rw: 'Amavidewo ya FAO yerekeye ubuhinzi burambye.' }, publisher: 'FAO', url: 'https://www.fao.org/plant-production-protection/resources/multimedia/1/en' },
  { id: 'rab', type: 'external', category: 'farming', icon: 'external-link', color: 'sage', title: { en: 'Rwanda Agriculture Board', rw: 'Ikigo cy\'Igihugu gishinzwe Ubuhinzi' }, description: { en: 'Explore information and agricultural extension services from RAB.', rw: 'Soma amakuru na serivisi z\'ubuhinzi zitangwa na RAB.' }, publisher: 'RAB', url: 'https://www.rab.gov.rw/' }
];

export const discussionPrompts = [
  { id: 'starter1', category: 'farming', icon: 'sprout', title: { en: 'What helps your garden during dry weeks?', rw: 'Ni iki gifasha akarima kawe mu bihe by\'izuba?' }, hint: { en: 'Share a small practical habit that has worked for you.', rw: 'Sangiza abandi uburyo bworoshye bwagufashije.' } },
  { id: 'starter2', category: 'nutrition', icon: 'heart', title: { en: 'Which vegetables does your family enjoy?', rw: 'Ni izihe mboga umuryango wawe ukunda?' }, hint: { en: 'Exchange meal ideas using locally available produce.', rw: 'Sangiza abandi ibitekerezo by\'amafunguro biboneka iwanyu.' } },
  { id: 'starter3', category: 'farming', icon: 'wheat', title: { en: 'How do you record your harvest?', rw: 'Wandika ute umusaruro wawe?' }, hint: { en: 'Talk about notebooks, dates, and measuring your crops.', rw: 'Muganire ku nyandiko, amatariki n\'ibipimo by\'umusaruro.' } }
];

export const specialties = [
  { id: 'crops', icon: 'sprout', color: 'sage', title: { en: 'Crops & soil', rw: 'Ibihingwa n\'ubutaka' }, desc: { en: 'Seeds, pests, water and sustainable practices.', rw: 'Imbuto, udukoko, amazi n\'ubuhinzi burambye.' } },
  { id: 'nutrition', icon: 'heart', color: 'pink', title: { en: 'Nutrition & home gardens', rw: 'Imirire n\'uturima tw\'imboga' }, desc: { en: 'Food diversity, gardens and household food safety.', rw: 'Ibiribwa bitandukanye, uturima n\'isuku.' } },
  { id: 'business', icon: 'chart-no-axes-combined', color: 'gold', title: { en: 'Markets & planning', rw: 'Amasoko n\'igenamigambi' }, desc: { en: 'Farm records, harvest planning and budgets.', rw: 'Inyandiko, igenamigambi n\'ingengo y\'imari.' } }
];

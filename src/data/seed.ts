import type { DB, Faq, Review, Service, Settings, Tip } from './types'

/* ───────────────────────── Services ───────────────────────── */

export const services: Service[] = [
  {
    id: 'svc-varicose',
    slug: 'varicose-veins',
    icon: 'varicose',
    order: 1,
    featured: true,
    active: true,
    title: { en: 'Varicose veins', ar: 'دوالي الساقين' },
    short: {
      en: 'Swollen, twisted veins treated without open surgery — most patients walk out the same day.',
      ar: 'علاج الأوردة المتضخمة والمتعرجة دون جراحة مفتوحة — ومعظم المرضى يعودون للمنزل في نفس اليوم.',
    },
    body: {
      en: 'Varicose veins are swollen, twisted veins caused by weak valves that let blood pool in the legs. They can cause heaviness, aching, night cramps and, over time, skin changes around the ankle. A duplex Doppler scan maps exactly which veins are failing, so treatment targets the cause — not just what you can see.',
      ar: 'الدوالي أوردة متضخمة ومتعرجة سببها ضعف الصمامات الذي يسمح للدم بالتجمع في الساقين. قد تسبب ثقلاً وألماً وتقلصات ليلية، ومع الوقت تغيرات في الجلد حول الكاحل. يحدد فحص الدوبلر بدقة الأوردة المصابة، ليستهدف العلاج السبب الحقيقي لا الظاهر فقط.',
    },
    symptoms: [
      { en: 'Heavy, aching legs by the end of the day', ar: 'ثقل وألم في الساقين في آخر اليوم' },
      { en: 'Visible bulging or twisted veins', ar: 'أوردة بارزة أو متعرجة واضحة' },
      { en: 'Ankle swelling and night cramps', ar: 'تورم الكاحل وتقلصات ليلية' },
      { en: 'Itching or darkening of the skin', ar: 'حكة أو اسمرار في الجلد' },
    ],
    treatments: [
      { en: 'Endovenous laser / radiofrequency ablation', ar: 'الكي الحراري بالليزر أو الترددات الراديوية' },
      { en: 'Foam sclerotherapy', ar: 'الحقن بالرغوة' },
      { en: 'Ambulatory phlebectomy', ar: 'استئصال الأوردة الدقيقة' },
      { en: 'Medical compression plan', ar: 'خطة الجوارب الضاغطة الطبية' },
    ],
    duration: { en: '45–60 min · day case', ar: '٤٥–٦٠ دقيقة · بدون مبيت' },
  },
  {
    id: 'svc-arterial',
    slug: 'arterial-disease',
    icon: 'arterial',
    order: 2,
    featured: true,
    active: true,
    title: { en: 'Arterial blockage', ar: 'انسداد الشرايين' },
    short: {
      en: 'Leg pain on walking can come from narrowed arteries. A 15-minute Doppler scan tells us for sure.',
      ar: 'ألم الساق أثناء المشي قد يكون سببه ضيق الشرايين. فحص دوبلر لمدة ١٥ دقيقة يحسم الأمر.',
    },
    body: {
      en: 'Peripheral arterial disease narrows the arteries that carry blood to the legs. The classic sign is calf pain on walking that eases with rest. We measure your ankle–brachial index (ABI), scan the arteries and agree a plan — from supervised walking and medication to balloon angioplasty and stenting through a pinhole.',
      ar: 'مرض الشرايين الطرفية يضيّق الشرايين التي تغذي الساقين. العلامة المعتادة ألم في السمانة أثناء المشي يزول مع الراحة. نقيس مؤشر الكاحل والعضد، ونفحص الشرايين، ثم نتفق على خطة — من المشي المنتظم والأدوية إلى التوسيع بالبالون والدعامات عبر ثقب صغير.',
    },
    symptoms: [
      { en: 'Calf pain on walking that eases with rest', ar: 'ألم السمانة أثناء المشي يزول بالراحة' },
      { en: 'Cold or pale feet', ar: 'برودة أو شحوب القدمين' },
      { en: 'Slow-healing wounds on the toes', ar: 'جروح بطيئة الالتئام في الأصابع' },
      { en: 'Weak pulses in the feet', ar: 'ضعف النبض في القدمين' },
    ],
    treatments: [
      { en: 'Balloon angioplasty', ar: 'التوسيع بالبالون' },
      { en: 'Stenting', ar: 'تركيب الدعامات' },
      { en: 'Bypass surgery', ar: 'جراحة التحويل الشرياني' },
      { en: 'Risk-factor & walking programme', ar: 'برنامج المشي وضبط عوامل الخطورة' },
    ],
    duration: { en: '60–120 min · short stay', ar: '٦٠–١٢٠ دقيقة · إقامة قصيرة' },
  },
  {
    id: 'svc-diabetic',
    slug: 'diabetic-foot',
    icon: 'diabetic',
    order: 3,
    featured: true,
    active: true,
    title: { en: 'Diabetic foot', ar: 'القدم السكري' },
    short: {
      en: 'Restoring blood flow and healing wounds early — the most important step in saving a limb.',
      ar: 'استعادة تدفق الدم وعلاج الجروح مبكراً — أهم خطوة للحفاظ على الطرف.',
    },
    body: {
      en: 'Diabetes affects both the nerves and the arteries of the feet. A small wound that will not heal is a warning sign. We assess circulation, clean and protect the wound, and where blood flow is reduced, open the arteries so the foot can heal — working closely with your diabetes doctor.',
      ar: 'يؤثر السكري على أعصاب القدم وشرايينها معاً. الجرح الصغير الذي لا يلتئم علامة تحذيرية. نقيّم الدورة الدموية، وننظف الجرح ونحميه، وعند ضعف التدفق نفتح الشرايين حتى تلتئم القدم — بالتنسيق مع طبيب السكري المعالج.',
    },
    symptoms: [
      { en: 'A wound or ulcer that will not heal', ar: 'جرح أو قرحة لا تلتئم' },
      { en: 'Colour change in the toes', ar: 'تغير لون أصابع القدم' },
      { en: 'Numbness or burning', ar: 'تنميل أو حرقان' },
      { en: 'Swelling, redness or infection', ar: 'تورم أو احمرار أو التهاب' },
    ],
    treatments: [
      { en: 'Limb-salvage revascularisation', ar: 'إعادة التروية للحفاظ على الطرف' },
      { en: 'Specialist wound care', ar: 'رعاية متخصصة للجروح' },
      { en: 'Offloading & footwear advice', ar: 'تخفيف الضغط وإرشادات الأحذية' },
      { en: 'Shared care with your diabetologist', ar: 'متابعة مشتركة مع طبيب السكري' },
    ],
    duration: { en: 'Programme of care', ar: 'برنامج رعاية متكامل' },
  },
  {
    id: 'svc-endovascular',
    slug: 'endovascular-repair',
    icon: 'endovascular',
    order: 4,
    featured: true,
    active: true,
    title: { en: 'Endovascular repair', ar: 'القسطرة الطرفية' },
    short: {
      en: 'Treating arteries from the inside through a pinhole — less pain, faster recovery.',
      ar: 'علاج الشرايين من الداخل عبر ثقب صغير — ألم أقل وتعافٍ أسرع.',
    },
    body: {
      en: 'Endovascular surgery uses fine wires, balloons and stents guided by live X-ray imaging to repair vessels from the inside. For many patients it replaces a long open operation with a procedure through a needle puncture in the groin or arm, and a much shorter recovery.',
      ar: 'تعتمد الجراحة داخل الأوعية على أسلاك دقيقة وبالونات ودعامات توجَّه بالأشعة الحية لإصلاح الأوعية من الداخل. ولكثير من المرضى تحل محل العملية المفتوحة الطويلة، عبر ثقب إبرة في أعلى الفخذ أو الذراع، مع فترة تعافٍ أقصر بكثير.',
    },
    symptoms: [
      { en: 'Narrowed or blocked arteries', ar: 'شرايين متضيقة أو مسدودة' },
      { en: 'Aneurysm suitable for stent-graft', ar: 'تمدد مناسب للدعامة المغطاة' },
      { en: 'Failing dialysis access', ar: 'ضعف وصلة الغسيل الكلوي' },
      { en: 'Patients at high risk for open surgery', ar: 'مرضى بخطورة عالية للجراحة المفتوحة' },
    ],
    treatments: [
      { en: 'Angioplasty & stenting', ar: 'التوسيع والدعامات' },
      { en: 'EVAR stent-graft', ar: 'الدعامة المغطاة للأورطي' },
      { en: 'Thrombectomy', ar: 'إزالة الجلطات بالقسطرة' },
      { en: 'Embolisation', ar: 'الانصمام العلاجي' },
    ],
    duration: { en: '1–3 hours · 0–2 nights', ar: '١–٣ ساعات · ٠–٢ ليلة' },
  },
  {
    id: 'svc-dialysis',
    slug: 'dialysis-access',
    icon: 'dialysis',
    order: 5,
    featured: false,
    active: true,
    title: { en: 'Dialysis access', ar: 'وصلات الغسيل الكلوي' },
    short: {
      en: 'Creating and maintaining fistulas that last — planned around your arm and your life.',
      ar: 'إنشاء وصلات شريانية وريدية تدوم والحفاظ عليها — بتخطيط يناسب ذراعك وحياتك.',
    },
    body: {
      en: 'A well-planned arteriovenous fistula is the lifeline for patients on haemodialysis. We map the arm veins with ultrasound, create the fistula under local anaesthesia, follow it until it matures, and treat narrowing early with balloon angioplasty so it keeps working.',
      ar: 'الوصلة الشريانية الوريدية المخطط لها جيداً هي شريان الحياة لمرضى الغسيل الدموي. نرسم خريطة أوردة الذراع بالموجات الصوتية، وننشئ الوصلة بتخدير موضعي، ونتابعها حتى تنضج، ونعالج أي ضيق مبكراً بالبالون لتستمر في العمل.',
    },
    symptoms: [
      { en: 'Starting haemodialysis soon', ar: 'بدء الغسيل الكلوي قريباً' },
      { en: 'Weak thrill or poor flow in fistula', ar: 'ضعف الرعشة أو التدفق في الوصلة' },
      { en: 'Arm swelling', ar: 'تورم الذراع' },
      { en: 'Prolonged bleeding after dialysis', ar: 'نزيف مطول بعد الغسيل' },
    ],
    treatments: [
      { en: 'AV fistula creation', ar: 'إنشاء وصلة شريانية وريدية' },
      { en: 'AV graft', ar: 'وصلة صناعية' },
      { en: 'Fistuloplasty', ar: 'توسيع الوصلة بالبالون' },
      { en: 'Vein mapping', ar: 'رسم خريطة الأوردة' },
    ],
    duration: { en: '60–90 min · local anaesthesia', ar: '٦٠–٩٠ دقيقة · تخدير موضعي' },
  },
  {
    id: 'svc-dvt',
    slug: 'venous-thrombosis',
    icon: 'dvt',
    order: 6,
    featured: false,
    active: true,
    title: { en: 'Venous thrombosis (DVT)', ar: 'جلطات الأوردة العميقة' },
    short: {
      en: 'Fast assessment of a swollen, painful leg — and a plan to protect the veins long-term.',
      ar: 'تقييم سريع للساق المتورمة والمؤلمة — وخطة لحماية الأوردة على المدى الطويل.',
    },
    body: {
      en: 'A deep vein thrombosis is a clot in a deep vein, usually in the leg. It needs prompt diagnosis to prevent the clot travelling to the lungs and to reduce long-term leg swelling. A duplex scan confirms the diagnosis the same visit, and selected patients benefit from catheter-directed clot removal.',
      ar: 'جلطة الأوردة العميقة تخثر في وريد عميق، غالباً في الساق. تحتاج تشخيصاً سريعاً لمنع انتقال الجلطة إلى الرئة وتقليل التورم المزمن. يؤكد فحص الدوبلر التشخيص في نفس الزيارة، وبعض المرضى يستفيدون من إذابة الجلطة أو إزالتها بالقسطرة.',
    },
    symptoms: [
      { en: 'Sudden swelling of one leg', ar: 'تورم مفاجئ في ساق واحدة' },
      { en: 'Calf pain or tenderness', ar: 'ألم أو إيلام في السمانة' },
      { en: 'Warm, reddish skin', ar: 'سخونة واحمرار الجلد' },
      { en: 'Recent travel, surgery or immobility', ar: 'سفر أو جراحة أو قلة حركة مؤخراً' },
    ],
    treatments: [
      { en: 'Same-day duplex diagnosis', ar: 'تشخيص بالدوبلر في نفس اليوم' },
      { en: 'Anticoagulation plan', ar: 'خطة السيولة' },
      { en: 'Catheter-directed thrombolysis', ar: 'إذابة الجلطة بالقسطرة' },
      { en: 'Post-thrombotic care', ar: 'رعاية ما بعد الجلطة' },
    ],
    duration: { en: 'Same-day assessment', ar: 'تقييم في نفس اليوم' },
  },
  {
    id: 'svc-aneurysm',
    slug: 'aortic-aneurysm',
    icon: 'aneurysm',
    order: 7,
    featured: false,
    active: true,
    title: { en: 'Aortic aneurysm', ar: 'تمدد الشريان الأورطي' },
    short: {
      en: 'Careful surveillance and, when needed, stent-graft repair through the groin.',
      ar: 'متابعة دقيقة، وعند الحاجة إصلاح بالدعامة المغطاة عبر أعلى الفخذ.',
    },
    body: {
      en: 'An abdominal aortic aneurysm is a weakened, widened section of the main artery in the abdomen. Most cause no symptoms and are found on a scan. Small aneurysms are watched with regular ultrasound; larger ones are repaired — often with an endovascular stent-graft (EVAR) rather than open surgery.',
      ar: 'تمدد الأورطي البطني منطقة ضعيفة ومتسعة في الشريان الرئيسي بالبطن. غالباً لا يسبب أعراضاً ويُكتشف بالأشعة. التمددات الصغيرة تُتابع بالموجات الصوتية بانتظام، والكبيرة تُصلح — غالباً بالدعامة المغطاة بدلاً من الجراحة المفتوحة.',
    },
    symptoms: [
      { en: 'Often no symptoms', ar: 'غالباً بدون أعراض' },
      { en: 'Pulsating feeling in the abdomen', ar: 'إحساس بنبض في البطن' },
      { en: 'Deep back or abdominal pain', ar: 'ألم عميق في الظهر أو البطن' },
      { en: 'Family history or long-term smoking', ar: 'تاريخ عائلي أو تدخين لفترة طويلة' },
    ],
    treatments: [
      { en: 'Ultrasound surveillance', ar: 'متابعة بالموجات الصوتية' },
      { en: 'EVAR stent-graft', ar: 'الدعامة المغطاة' },
      { en: 'Open repair', ar: 'الإصلاح الجراحي المفتوح' },
      { en: 'Blood-pressure optimisation', ar: 'ضبط ضغط الدم' },
    ],
    duration: { en: 'Planned procedure', ar: 'إجراء مخطط' },
  },
  {
    id: 'svc-doppler',
    slug: 'doppler-scan',
    icon: 'doppler',
    order: 8,
    featured: false,
    active: true,
    title: { en: 'Duplex Doppler scan', ar: 'فحص الدوبلر' },
    short: {
      en: 'A painless ultrasound that shows how blood flows through your veins and arteries.',
      ar: 'موجات صوتية بلا ألم تُظهر كيف يتدفق الدم في الأوردة والشرايين.',
    },
    body: {
      en: 'Duplex ultrasound combines a picture of the vessel with a measurement of blood flow. It is painless, uses no radiation and is done in the clinic. Most vascular decisions start here, and you see the images with the doctor as they are explained.',
      ar: 'يجمع فحص الدوبلر بين صورة الوعاء وقياس تدفق الدم فيه. لا ألم ولا إشعاع، ويُجرى داخل العيادة. معظم القرارات في جراحة الأوعية تبدأ من هنا، وتشاهد الصور مع الطبيب أثناء شرحها.',
    },
    symptoms: [
      { en: 'Leg pain, swelling or heaviness', ar: 'ألم أو تورم أو ثقل في الساق' },
      { en: 'Before and after vascular procedures', ar: 'قبل وبعد إجراءات الأوعية' },
      { en: 'Diabetes with foot symptoms', ar: 'سكري مع أعراض بالقدم' },
      { en: 'Suspected clot', ar: 'اشتباه في جلطة' },
    ],
    treatments: [
      { en: 'Venous reflux study', ar: 'دراسة ارتجاع الأوردة' },
      { en: 'Arterial duplex & ABI', ar: 'دوبلر الشرايين ومؤشر الكاحل' },
      { en: 'Carotid duplex', ar: 'دوبلر الشرايين السباتية' },
      { en: 'Fistula assessment', ar: 'تقييم الوصلة' },
    ],
    duration: { en: '15–30 min · in clinic', ar: '١٥–٣٠ دقيقة · بالعيادة' },
  },
]

/* ───────────────────────── Health tips ───────────────────────── */

export const tips: Tip[] = [
  {
    id: 'tip-1',
    slug: 'heavy-legs-end-of-day',
    category: { en: 'Veins', ar: 'الأوردة' },
    title: { en: 'Why do my legs feel heavy at the end of the day?', ar: 'لماذا أشعر بثقل في ساقيّ آخر اليوم؟' },
    excerpt: {
      en: 'Heaviness that improves when you raise your legs is often a sign of weak vein valves — and it is very treatable.',
      ar: 'الثقل الذي يتحسن عند رفع الساقين غالباً علامة على ضعف صمامات الأوردة — وعلاجه متاح وسهل.',
    },
    body: {
      en: 'Your leg veins carry blood upwards against gravity using one-way valves. When those valves weaken, blood pools in the lower leg after hours of standing or sitting, causing heaviness, aching and ankle swelling.\n\nSimple steps help: walk often, raise your legs for 15 minutes in the evening and avoid standing still for long periods. If the symptoms persist, a 15-minute Doppler scan shows exactly which veins are affected.\n\nToday most varicose veins are treated from the inside through a needle, under local anaesthesia, and you walk out the same day.',
      ar: 'تحمل أوردة الساق الدم إلى أعلى عكس الجاذبية بفضل صمامات تعمل في اتجاه واحد. وعندما تضعف هذه الصمامات يتجمع الدم أسفل الساق بعد ساعات من الوقوف أو الجلوس، فيسبب ثقلاً وألماً وتورماً في الكاحل.\n\nخطوات بسيطة تساعد: امشِ كثيراً، وارفع ساقيك ١٥ دقيقة مساءً، وتجنب الوقوف الثابت لفترات طويلة. وإذا استمرت الأعراض، يُظهر فحص دوبلر لمدة ١٥ دقيقة الأوردة المصابة بدقة.\n\nاليوم تُعالج معظم الدوالي من الداخل عبر إبرة وتحت تخدير موضعي، وتعود إلى منزلك في نفس اليوم.',
    },
    readMins: 3,
    published: true,
    date: '2026-09-28',
  },
  {
    id: 'tip-2',
    slug: 'calf-pain-when-walking',
    category: { en: 'Arteries', ar: 'الشرايين' },
    title: { en: 'Calf pain when walking: when to get it checked', ar: 'ألم السمانة أثناء المشي: متى يجب الفحص؟' },
    excerpt: {
      en: 'Pain that starts after a set distance and eases with rest can come from narrowed arteries.',
      ar: 'الألم الذي يبدأ بعد مسافة معينة ويزول بالراحة قد يكون سببه ضيق الشرايين.',
    },
    body: {
      en: 'Claudication is cramping pain in the calf, thigh or buttock that comes on with walking and settles within minutes of rest. It is the most common sign of peripheral arterial disease.\n\nThe check is simple: we compare the blood pressure at your ankle and arm (the ankle–brachial index) and scan the arteries. A result below 0.9 suggests narrowing.\n\nMany patients improve with a structured walking programme, stopping smoking and the right medication. When needed, narrowed arteries can be opened with a balloon or stent through a pinhole.',
      ar: 'العرج المتقطع ألم يشبه التقلص في السمانة أو الفخذ أو الأرداف يظهر مع المشي ويهدأ خلال دقائق من الراحة، وهو أشهر علامات مرض الشرايين الطرفية.\n\nالفحص بسيط: نقارن ضغط الدم عند الكاحل والذراع (مؤشر الكاحل والعضد) ونفحص الشرايين بالدوبلر. النتيجة الأقل من ٠٫٩ تشير إلى وجود ضيق.\n\nيتحسن كثير من المرضى ببرنامج مشي منتظم والتوقف عن التدخين والعلاج المناسب. وعند الحاجة يمكن فتح الشريان بالبالون أو الدعامة عبر ثقب صغير.',
    },
    readMins: 4,
    published: true,
    date: '2026-09-12',
  },
  {
    id: 'tip-3',
    slug: 'daily-foot-check-diabetes',
    category: { en: 'Diabetic foot', ar: 'القدم السكري' },
    title: { en: 'The 2-minute daily foot check for people with diabetes', ar: 'فحص القدم اليومي في دقيقتين لمرضى السكري' },
    excerpt: {
      en: 'Most serious foot problems start as a small wound nobody noticed. Here is what to look for.',
      ar: 'معظم مشكلات القدم الخطيرة تبدأ بجرح صغير لم يلاحظه أحد. إليك ما يجب البحث عنه.',
    },
    body: {
      en: 'Check both feet every evening in good light — use a mirror or ask a family member for the soles. Look for cuts, blisters, cracks between the toes, colour changes or swelling.\n\nWash and dry carefully between the toes, moisturise the skin but not between the toes, and never walk barefoot, even at home.\n\nIf a wound has not started to heal within a few days, or the foot becomes red, swollen or painful, contact the clinic the same day. Early care is the single most effective way to protect the foot.',
      ar: 'افحص القدمين كل مساء في إضاءة جيدة — استخدم مرآة أو اطلب من أحد أفراد الأسرة فحص باطن القدم. ابحث عن جروح أو فقاعات أو تشققات بين الأصابع أو تغير في اللون أو تورم.\n\nاغسل القدمين وجففهما جيداً بين الأصابع، وضع كريماً مرطباً على الجلد دون ما بين الأصابع، ولا تمشِ حافياً أبداً حتى في المنزل.\n\nإذا لم يبدأ الجرح في الالتئام خلال أيام قليلة، أو احمرت القدم أو تورمت أو آلمتك، تواصل مع العيادة في نفس اليوم. الرعاية المبكرة هي الطريقة الأكثر فاعلية لحماية القدم.',
    },
    readMins: 3,
    published: true,
    date: '2026-08-30',
  },
  {
    id: 'tip-4',
    slug: 'long-flights-and-clots',
    category: { en: 'Prevention', ar: 'الوقاية' },
    title: { en: 'Long flights and leg clots: simple prevention', ar: 'السفر الطويل وجلطات الساق: وقاية بسيطة' },
    excerpt: {
      en: 'Move, hydrate and know the warning signs — practical advice before your next trip.',
      ar: 'تحرك واشرب الماء واعرف العلامات التحذيرية — نصائح عملية قبل رحلتك القادمة.',
    },
    body: {
      en: 'Sitting still for more than four hours slows blood flow in the leg veins. For most travellers the risk is small, and a few habits reduce it further: walk the aisle every hour, flex your ankles while seated, drink water and limit alcohol.\n\nIf you have had a clot before, recent surgery, or are pregnant, ask about compression stockings or medication before you travel.\n\nSeek care promptly if one leg becomes swollen, warm and painful, or if you feel sudden breathlessness or chest pain.',
      ar: 'الجلوس دون حركة لأكثر من أربع ساعات يبطئ تدفق الدم في أوردة الساق. الخطر بسيط لمعظم المسافرين، وبعض العادات تقلله أكثر: امشِ في الممر كل ساعة، وحرك كاحليك أثناء الجلوس، واشرب الماء وقلل الكافيين.\n\nإذا أُصبت بجلطة من قبل، أو أجريت جراحة مؤخراً، أو كنتِ حاملاً، اسأل عن الجوارب الضاغطة أو العلاج الوقائي قبل السفر.\n\nاطلب الرعاية فوراً إذا تورمت ساق واحدة وأصبحت دافئة ومؤلمة، أو شعرت بضيق مفاجئ في التنفس أو ألم في الصدر.',
    },
    readMins: 3,
    published: true,
    date: '2026-08-14',
  },
  {
    id: 'tip-5',
    slug: 'swollen-leg-when-urgent',
    category: { en: 'Clots', ar: 'الجلطات' },
    title: { en: 'One swollen leg: when is it urgent?', ar: 'تورم ساق واحدة: متى يكون الأمر عاجلاً؟' },
    excerpt: {
      en: 'Swelling in both ankles is common. Swelling, warmth and pain in one leg needs a same-day check.',
      ar: 'تورم الكاحلين معاً أمر شائع، أما التورم مع السخونة والألم في ساق واحدة فيحتاج فحصاً في نفس اليوم.',
    },
    body: {
      en: 'Mild swelling in both ankles at the end of a hot day or a long flight usually settles overnight. Swelling in one leg is different, especially when the calf is also warm, tender or a different colour. These can be signs of a deep vein thrombosis (DVT), a clot in a deep leg vein.\n\nA DVT is diagnosed with a painless Doppler ultrasound. When it is found early, blood-thinning treatment works well and lowers the risk of the clot moving or causing long-term leg problems.\n\nCall the clinic the same day if one leg suddenly becomes swollen and painful. Go to emergency care straight away if you also feel short of breath, have chest pain or cough up blood.',
      ar: 'التورم الخفيف في الكاحلين معاً بعد يوم حار أو رحلة طويلة يزول عادة بعد ليلة من الراحة. أما تورم ساق واحدة فأمر مختلف، خاصة إذا كانت السمانة دافئة أو مؤلمة عند اللمس أو تغير لونها. فقد تكون هذه علامات جلطة الأوردة العميقة، وهي جلطة في أحد أوردة الساق العميقة.\n\nتُشخص الجلطة بفحص دوبلر بالموجات الصوتية دون أي ألم. وعند اكتشافها مبكراً يكون علاج سيولة الدم فعالاً، ويقلل خطر انتقال الجلطة أو حدوث مشكلات مزمنة في الساق.\n\nاتصل بالعيادة في نفس اليوم إذا تورمت ساق واحدة فجأة مع ألم. وتوجه إلى الطوارئ فوراً إذا شعرت أيضاً بضيق في التنفس أو ألم في الصدر أو سعال مصحوب بدم.',
    },
    readMins: 3,
    published: true,
    date: '2026-10-14',
  },
  {
    id: 'tip-6',
    slug: 'spider-veins-or-varicose-veins',
    category: { en: 'Veins', ar: 'الأوردة' },
    title: { en: 'Spider veins or varicose veins: what is the difference?', ar: 'الشعيرات الدموية أم الدوالي: ما الفرق؟' },
    excerpt: {
      en: 'Both are veins you can see, but they differ in size, symptoms and treatment.',
      ar: 'كلاهما أوردة ظاهرة على الجلد، لكنهما يختلفان في الحجم والأعراض وطريقة العلاج.',
    },
    body: {
      en: 'Spider veins are fine red, blue or purple lines just under the skin, often on the thighs and around the ankles. They are usually harmless and treated mainly for appearance.\n\nVaricose veins are larger, bulging and twisted veins, 3 mm or more across. They come from weak valves in the vein and can cause heaviness, aching, itching, night cramps and ankle swelling. Over years, untreated varicose veins can lead to skin changes and, in some people, ulcers near the ankle.\n\nA Doppler scan shows whether the visible veins are fed by a leaking vein deeper down. Spider veins usually respond to sclerotherapy, small injections that close them. Varicose veins are now mostly treated from the inside with heat or medical glue through a needle, and you walk out the same day.',
      ar: 'الشعيرات الدموية خطوط رفيعة حمراء أو زرقاء أو بنفسجية تحت الجلد مباشرة، تظهر غالباً على الفخذين وحول الكاحلين. وهي في الغالب غير ضارة، ويكون علاجها لأسباب جمالية أساساً.\n\nأما الدوالي فأوردة أكبر بارزة وملتوية، قطرها ٣ ملم أو أكثر، وسببها ضعف الصمامات داخل الوريد. وقد تسبب ثقلاً وألماً وحكة وتقلصات ليلية وتورماً في الكاحل. ومع مرور السنوات قد تؤدي الدوالي غير المعالجة إلى تغيرات في الجلد، وعند بعض المرضى إلى قرح قرب الكاحل.\n\nيوضح فحص الدوبلر ما إذا كانت الأوردة الظاهرة تتغذى من وريد أعمق به ارتجاع. وتستجيب الشعيرات عادة للحقن التصليبي، وهو حقن صغيرة تغلقها. أما الدوالي فتُعالج اليوم غالباً من الداخل بالحرارة أو باللاصق الطبي عبر إبرة، وتعود إلى منزلك في نفس اليوم.',
    },
    readMins: 4,
    published: true,
    date: '2026-10-07',
  },
  {
    id: 'tip-7',
    slug: 'after-varicose-vein-treatment',
    category: { en: 'Recovery', ar: 'التعافي' },
    title: { en: 'After varicose vein treatment: your first two weeks', ar: 'بعد علاج الدوالي: أول أسبوعين' },
    excerpt: {
      en: 'Walking is part of the treatment. Here is what is normal, what helps and when to call.',
      ar: 'المشي جزء من العلاج. إليك ما هو طبيعي، وما يساعد، ومتى تتصل بنا.',
    },
    body: {
      en: 'Walk on the same day: a short walk every hour while awake keeps blood moving in the deep veins. Wear the compression stocking for as long as you were advised, and return to desk work within a day or two.\n\nBruising, a pulling feeling along the treated vein and a firm, tender cord under the skin are all normal. They fade over two to three weeks. Simple painkillers help.\n\nFor about two weeks, avoid heavy lifting, intense exercise, long hot baths and saunas. Call the clinic if the pain gets worse instead of better, if your calf becomes swollen, or if you develop a fever. You will be seen again for a follow-up scan to confirm the vein has closed.',
      ar: 'امشِ في نفس اليوم: نزهة قصيرة كل ساعة أثناء اليقظة تحافظ على حركة الدم في الأوردة العميقة. ارتدِ الجورب الضاغط للمدة التي حددها الطبيب، ويمكنك العودة إلى العمل المكتبي خلال يوم أو يومين.\n\nالكدمات، والإحساس بشد على امتداد الوريد المعالج، ووجود حبل صلب ومؤلم قليلاً تحت الجلد، كلها أمور طبيعية تختفي خلال أسبوعين إلى ثلاثة. وتساعد المسكنات البسيطة.\n\nتجنب لمدة أسبوعين تقريباً حمل الأشياء الثقيلة، والرياضة العنيفة، والحمام الساخن الطويل، والساونا. واتصل بالعيادة إذا زاد الألم بدلاً من أن يتحسن، أو تورمت السمانة، أو ارتفعت حرارتك. وستعود لفحص متابعة بالدوبلر للتأكد من انغلاق الوريد.',
    },
    readMins: 3,
    published: true,
    date: '2026-09-21',
  },
  {
    id: 'tip-8',
    slug: 'compression-stockings-guide',
    category: { en: 'Veins', ar: 'الأوردة' },
    title: { en: 'Compression stockings: how to choose and wear them', ar: 'الجوارب الضاغطة: كيف تختارها وترتديها' },
    excerpt: {
      en: 'They only work if they fit and you can get them on. A few practical tips make all the difference.',
      ar: 'لا تفيد إلا إذا كانت بالمقاس الصحيح واستطعت ارتداءها. بعض النصائح العملية تصنع الفرق.',
    },
    body: {
      en: 'Compression stockings squeeze the leg most firmly at the ankle and less towards the knee, helping the veins push blood upwards. The strength and length should be prescribed for you. Measure the ankle and calf in the morning, before the leg swells.\n\nPut them on first thing in the morning. Turn the stocking inside out down to the heel, slip your foot in, then roll it up gradually without bunching. Rubber gloves make gripping much easier. Take them off at night.\n\nWash them by hand and replace them every three to six months, as they lose pressure over time. If you have diabetes, numbness in the feet or known artery disease, check with the doctor first: compression is not safe for everyone.',
      ar: 'تضغط الجوارب الضاغطة على الساق بأكبر قوة عند الكاحل وتقل تدريجياً نحو الركبة، فتساعد الأوردة على دفع الدم إلى أعلى. ويجب أن يحدد الطبيب درجة الضغط والطول المناسبين لك. قِس محيط الكاحل والسمانة صباحاً قبل أن تتورم الساق.\n\nارتدِها أول شيء في الصباح: اقلب الجورب للداخل حتى الكعب، وأدخل قدمك، ثم اسحبه لأعلى تدريجياً دون تجاعيد. القفازات المطاطية تسهل الإمساك به كثيراً. واخلعها ليلاً.\n\nاغسلها باليد، واستبدلها كل ثلاثة إلى ستة أشهر لأنها تفقد ضغطها مع الوقت. وإذا كنت مريض سكري، أو تعاني تنميلاً في القدمين، أو لديك مرض معروف في الشرايين، فاستشر الطبيب أولاً: فالضغط ليس آمناً للجميع.',
    },
    readMins: 4,
    published: true,
    date: '2026-07-30',
  },
  {
    id: 'tip-9',
    slug: 'aortic-aneurysm-screening',
    category: { en: 'Arteries', ar: 'الشرايين' },
    title: { en: 'Aortic aneurysm: who should have a screening scan?', ar: 'تمدد الشريان الأورطي: من يحتاج إلى فحص؟' },
    excerpt: {
      en: 'Most aneurysms cause no symptoms until they are large. A 10-minute ultrasound finds them early.',
      ar: 'معظم حالات التمدد لا تسبب أعراضاً حتى تكبر. وفحص بالموجات الصوتية لمدة ١٠ دقائق يكشفها مبكراً.',
    },
    body: {
      en: 'The aorta is the main artery running through the abdomen. In some people its wall weakens and slowly balloons outwards. This is an abdominal aortic aneurysm. It rarely causes symptoms, which is why it is worth looking for.\n\nA screening scan is especially worth considering for men aged 65 or over, anyone who smokes or used to smoke, people with high blood pressure, and anyone with a parent or sibling who had an aneurysm. The check is a painless ultrasound of the abdomen, and the result is clear on the same visit.\n\nSmall aneurysms are usually watched with regular scans, alongside stopping smoking and controlling blood pressure. Larger ones can be repaired, often with a stent graft placed through small cuts in the groin. Sudden severe pain in the abdomen or back is an emergency.',
      ar: 'الأورطي هو الشريان الرئيسي الذي يمر عبر البطن. وعند بعض الأشخاص يضعف جداره ويتمدد للخارج ببطء، وهذا هو تمدد الشريان الأورطي البطني. ونادراً ما يسبب أعراضاً، ولهذا يستحق البحث عنه.\n\nيُنصح بالفحص بشكل خاص للرجال في سن ٦٥ عاماً أو أكثر، والمدخنين حالياً أو سابقاً، ومرضى ضغط الدم المرتفع، ومن أُصيب أحد والديه أو إخوته بالتمدد. والفحص موجات صوتية على البطن دون أي ألم، والنتيجة واضحة في نفس الزيارة.\n\nتُتابع حالات التمدد الصغيرة عادة بفحوصات دورية، مع التوقف عن التدخين وضبط ضغط الدم. أما الكبيرة فيمكن إصلاحها، غالباً بدعامة مغطاة تُركب عبر فتحات صغيرة في أعلى الفخذ. والألم الشديد المفاجئ في البطن أو الظهر حالة طوارئ.',
    },
    readMins: 4,
    published: true,
    date: '2026-07-16',
  },
  {
    id: 'tip-10',
    slug: 'caring-for-dialysis-fistula',
    category: { en: 'Dialysis access', ar: 'وصلات الغسيل' },
    title: { en: 'Caring for your dialysis fistula every day', ar: 'العناية اليومية بوصلة الغسيل الكلوي' },
    excerpt: {
      en: 'Your fistula is your lifeline. A daily check and a few simple rules help it last for years.',
      ar: 'الوصلة هي شريان حياتك. فحص يومي وبعض القواعد البسيطة تساعدها على الاستمرار لسنوات.',
    },
    body: {
      en: 'Check your fistula every morning and evening. Rest your fingers lightly on it and you should feel a buzz, called the thrill. Hold it near your ear and you will hear a whooshing sound.\n\nProtect the arm: no blood pressure readings, blood tests or drips on the fistula arm. Avoid tight sleeves, watches and bracelets, do not carry heavy bags on that arm and try not to sleep on it. Keep the skin clean, and wash the arm before every dialysis session.\n\nCall the clinic the same day if the buzz becomes weak or stops, if the arm becomes red, hot, swollen or painful, or if your hand turns cold or numb. A fistula that has just stopped can often be saved if it is treated quickly.',
      ar: 'افحص الوصلة كل صباح ومساء: ضع أصابعك عليها برفق ويجب أن تشعر برعشة أو اهتزاز. وإذا قربتها من أذنك ستسمع صوت تدفق مستمر.\n\nاحمِ الذراع: لا قياس ضغط ولا سحب دم ولا محاليل في ذراع الوصلة. وتجنب الأكمام الضيقة والساعة والأساور، ولا تحمل حقائب ثقيلة بتلك الذراع، وحاول ألا تنام عليها. وحافظ على نظافة الجلد، واغسل الذراع قبل كل جلسة غسيل.\n\nاتصل بالعيادة في نفس اليوم إذا ضعفت الرعشة أو توقفت، أو احمرت الذراع أو سخنت أو تورمت أو آلمتك، أو أصبحت يدك باردة أو منملة. فالوصلة التي توقفت حديثاً يمكن إنقاذها غالباً إذا عولجت بسرعة.',
    },
    readMins: 3,
    published: true,
    date: '2026-07-02',
  },
  {
    id: 'tip-11',
    slug: 'smoking-and-your-arteries',
    category: { en: 'Prevention', ar: 'الوقاية' },
    title: { en: 'Smoking and your arteries: it is never too late to stop', ar: 'التدخين وشرايينك: لم يفت الأوان أبداً للإقلاع' },
    excerpt: {
      en: 'Smoking is the strongest risk factor for blocked leg arteries. Stopping helps at any age.',
      ar: 'التدخين أقوى عوامل خطر انسداد شرايين الساقين، والإقلاع عنه مفيد في أي عمر.',
    },
    body: {
      en: 'Tobacco damages the lining of the arteries, makes the blood more likely to clot and speeds up the build-up of plaque. That is why most people with blocked leg arteries are current or former smokers, and why smoking raises the risk of aneurysm and amputation.\n\nThe benefits of stopping start quickly. Within weeks, circulation and walking distance often improve. After treatment such as a balloon or bypass, the opened artery stays open longer in people who have stopped. This applies to cigarettes, shisha and chewed tobacco alike.\n\nYou do not have to do it alone. Ask at your next visit about a quitting plan. Nicotine replacement and medication can double your chances of success.',
      ar: 'يتلف التبغ البطانة الداخلية للشرايين، ويزيد قابلية الدم للتجلط، ويسرع تراكم الترسبات. ولهذا فإن معظم مرضى انسداد شرايين الساقين مدخنون حاليون أو سابقون، ولهذا أيضاً يرفع التدخين خطر تمدد الشريان والبتر.\n\nتبدأ فوائد الإقلاع بسرعة: فخلال أسابيع تتحسن الدورة الدموية ومسافة المشي غالباً. وبعد علاج مثل البالون أو التحويلة، يبقى الشريان مفتوحاً لفترة أطول عند من أقلعوا. وينطبق هذا على السجائر والشيشة والتبغ الممضوغ على حد سواء.\n\nلست مضطراً لفعلها وحدك: اسأل في زيارتك القادمة عن خطة للإقلاع. فبدائل النيكوتين والأدوية قد تضاعف فرص نجاحك.',
    },
    readMins: 3,
    published: true,
    date: '2026-06-18',
  },
  {
    id: 'tip-12',
    slug: 'preparing-for-doppler-scan',
    category: { en: 'Your visit', ar: 'زيارتك' },
    title: { en: 'Preparing for your Doppler scan', ar: 'الاستعداد لفحص الدوبلر' },
    excerpt: {
      en: 'Painless, no needles and about 15 minutes. Here is how to get the most from it.',
      ar: 'بلا ألم ولا إبر، ويستغرق نحو ١٥ دقيقة. إليك كيف تستفيد منه أكبر استفادة.',
    },
    body: {
      en: 'A Doppler scan uses ultrasound to show blood flowing through your veins and arteries, live on screen. It is painless, uses no radiation and needs no injection.\n\nFor leg scans, wear loose clothing or shorts so the legs are easy to reach. There is no need to fast. For scans of the abdominal aorta, we may ask you not to eat for a few hours beforehand, and the clinic will tell you when you book.\n\nBring any previous scans, reports and your list of medicines. The doctor explains the images as the scan happens, so you leave knowing what was found and what the next step is.',
      ar: 'يستخدم فحص الدوبلر الموجات الصوتية لإظهار تدفق الدم في الأوردة والشرايين مباشرة على الشاشة. وهو بلا ألم، وبلا إشعاع، ولا يحتاج إلى أي حقن.\n\nلفحص الساقين، ارتدِ ملابس واسعة أو قصيرة حتى يسهل الوصول إلى الساقين، ولا داعي للصيام. أما فحص الأورطي البطني فقد نطلب منك الامتناع عن الأكل لبضع ساعات قبله، وستخبرك العيادة بذلك عند الحجز.\n\nأحضر معك أي أشعة أو تقارير سابقة وقائمة أدويتك. ويشرح الطبيب الصور أثناء الفحص، فتغادر وأنت تعرف ما الذي وُجد وما الخطوة التالية.',
    },
    readMins: 2,
    published: true,
    date: '2026-06-04',
  },
]

/* ───────────────────────── Reviews ───────────────────────── */

export const reviews: Review[] = [
  { id: 'rv-1', name: 'Ahmed S.', rating: 5, lang: 'en', serviceId: 'svc-varicose', status: 'approved', date: '2026-10-02', text: 'He showed me the scan on screen and explained every step before the procedure. I walked out the same afternoon.' },
  { id: 'rv-2', name: 'منى ع.', rating: 5, lang: 'ar', serviceId: 'svc-diabetic', status: 'approved', date: '2026-09-21', text: 'دكتور هيثم تابع جرح والدتي أسبوعاً بأسبوع حتى التأم تماماً. شرح هادئ ومتابعة شخصية حقيقية.' },
  { id: 'rv-3', name: 'Karim H.', rating: 5, lang: 'en', serviceId: 'svc-arterial', status: 'approved', date: '2026-09-09', text: 'Clear, calm and honest. No pressure, just the options and what each one means. The follow-up calls made a real difference.' },
  { id: 'rv-4', name: 'سارة م.', rating: 5, lang: 'ar', serviceId: 'svc-varicose', status: 'approved', date: '2026-08-27', text: 'كنت قلقة جداً من العملية، لكن الشرح كان واضحاً والعيادة مريحة. الحمد لله النتيجة ممتازة.' },
  { id: 'rv-5', name: 'Omar F.', rating: 5, lang: 'en', serviceId: 'svc-dialysis', status: 'approved', date: '2026-08-11', text: 'My fistula was planned around my work and it has worked perfectly for dialysis since. Very organised clinic.' },
  { id: 'rv-6', name: 'هالة ر.', rating: 4, lang: 'ar', serviceId: 'svc-doppler', status: 'approved', date: '2026-07-30', text: 'فحص الدوبلر كان سريعاً، والدكتور شرح الصور بنفسه. انتظار بسيط لكن يستحق.' },
  { id: 'rv-7', name: 'Youssef T.', rating: 5, lang: 'en', serviceId: 'svc-endovascular', status: 'pending', date: '2026-10-18', text: 'Stent through the groin, home the next day. Thank you to the whole team.' },
]

/* ───────────────────────── FAQ ───────────────────────── */

export const faqs: Faq[] = [
  {
    id: 'faq-1',
    q: { en: 'Do I need a referral to book?', ar: 'هل أحتاج تحويلاً من طبيب للحجز؟' },
    a: { en: 'No. You can book directly online, by phone or on WhatsApp. Bring any previous scans or reports with you.', ar: 'لا. يمكنك الحجز مباشرة عبر الموقع أو الهاتف أو واتساب. أحضر معك أي أشعة أو تقارير سابقة.' },
  },
  {
    id: 'faq-2',
    q: { en: 'What happens at the first visit?', ar: 'ماذا يحدث في الزيارة الأولى؟' },
    a: { en: 'A conversation about your symptoms, an examination and — in most cases — a Doppler scan in the same visit. You leave with a clear explanation and a written plan.', ar: 'حوار عن الأعراض، ثم فحص سريري، وفي معظم الحالات فحص دوبلر في نفس الزيارة. وتغادر بشرح واضح وخطة مكتوبة.' },
  },
  {
    id: 'faq-3',
    q: { en: 'Is varicose vein treatment painful?', ar: 'هل علاج الدوالي مؤلم؟' },
    a: { en: 'Modern treatment is done under local anaesthesia through a needle. Most patients describe mild discomfort and return to normal walking the same day.', ar: 'يُجرى العلاج الحديث بتخدير موضعي عبر إبرة. يصف معظم المرضى انزعاجاً بسيطاً ويعودون للمشي الطبيعي في نفس اليوم.' },
  },
  {
    id: 'faq-4',
    q: { en: 'How long is recovery after an endovascular procedure?', ar: 'كم تستغرق فترة التعافي بعد القسطرة؟' },
    a: { en: 'It depends on the procedure. Many patients go home the same day or the next morning and return to light activity within a few days.', ar: 'يعتمد ذلك على نوع الإجراء. كثير من المرضى يعودون للمنزل في نفس اليوم أو صباح اليوم التالي، ويستأنفون النشاط الخفيف خلال أيام.' },
  },
  {
    id: 'faq-5',
    q: { en: 'Will I be followed up after treatment?', ar: 'هل توجد متابعة بعد العلاج؟' },
    a: { en: 'Always. Care continues after the procedure — every patient has scheduled follow-up visits and a direct line to the clinic.', ar: 'دائماً. الرعاية تستمر بعد الإجراء — لكل مريض مواعيد متابعة محددة وتواصل مباشر مع العيادة.' },
  },
]

/* ───────────────────────── Settings ───────────────────────── */

export const settings: Settings = {
  doctor: {
    name: { en: 'Dr. Haitham AlHatiem', ar: 'د. هيثم الحطيم' },
    title: { en: 'Consultant Vascular & Endovascular Surgeon', ar: 'استشاري جراحة الأوعية الدموية والقسطرة' },
    credentials: { en: 'Fellow of the Royal College of Surgeons (UK)', ar: 'زميل كلية الجراحين الملكية البريطانية' },
    bio: {
      en: 'Dr. Haitham AlHatiem is a consultant vascular surgeon and a Fellow of the Royal College of Surgeons (UK). His practice covers the full range of venous and arterial disease — from varicose veins and diabetic foot to minimally invasive endovascular repair. Patients know him for three things: he explains clearly, treats precisely and follows up personally.',
      ar: 'د. هيثم الحطيم استشاري جراحة الأوعية الدموية وزميل كلية الجراحين الملكية البريطانية. تشمل ممارسته أمراض الأوردة والشرايين بكافة أنواعها — من الدوالي والقدم السكري إلى الإصلاح بالقسطرة بأقل تدخل جراحي. يعرفه مرضاه بثلاثة أشياء: يشرح بوضوح، ويعالج بدقة، ويتابع بنفسه.',
    },
  },
  whatsapp: '201060934438',
  email: 'clinic@drhaithamalhatiem.com',
  // placeholders until the real branches are entered in Dashboard → Settings
  branches: [
    {
      id: 'br-1',
      name: { en: 'Main clinic', ar: 'العيادة الرئيسية' },
      address: { en: 'Clinic address, Cairo, Egypt', ar: 'عنوان العيادة، القاهرة، مصر' },
      phones: ['010 6093 4438'],
      mapUrl: 'https://maps.google.com/?q=Cairo%2C%20Egypt',
    },
  ],
  hours: [
    { day: 'sat', open: '17:00', close: '22:00', closed: false },
    { day: 'sun', open: '17:00', close: '22:00', closed: false },
    { day: 'mon', open: '17:00', close: '22:00', closed: false },
    { day: 'tue', open: '17:00', close: '22:00', closed: false },
    { day: 'wed', open: '17:00', close: '22:00', closed: false },
    { day: 'thu', open: '17:00', close: '20:00', closed: false, byAppointment: true },
    { day: 'fri', open: '00:00', close: '00:00', closed: true },
  ],
  stats: [
    { id: 'st-1', value: 15, suffix: '+', label: { en: 'Years in vascular surgery', ar: 'عاماً في جراحة الأوعية' } },
    { id: 'st-2', value: 15, suffix: ' min', label: { en: 'Doppler scan, same visit', ar: 'دقيقة لفحص الدوبلر' } },
    { id: 'st-3', value: 8, suffix: '', label: { en: 'Specialised services', ar: 'خدمات متخصصة' } },
    { id: 'st-4', value: 100, suffix: '%', label: { en: 'Patients personally followed up', ar: 'من المرضى بمتابعة شخصية' } },
  ],
  social: {
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/',
    google: 'https://g.page/',
  },
  announcement: {
    en: 'New: same-visit Doppler scans every clinic day.',
    ar: 'جديد: فحص الدوبلر في نفس الزيارة كل أيام العيادة.',
  },
  announcementOn: true,
}

export function iso(d: Date) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function createSeed(): DB {
  return { services, tips, reviews, faqs, settings }
}

import type {
  Appointment,
  AppointmentSource,
  AppointmentStatus,
  AppointmentType,
  Condition,
  DB,
  Faq,
  Inquiry,
  Patient,
  Review,
  Service,
  Settings,
  Tip,
} from './types'

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
  phone: '010 6093 4438',
  whatsapp: '201060934438',
  email: 'clinic@drhaithamalhatiem.com',
  address: { en: 'Clinic address, Cairo, Egypt', ar: 'عنوان العيادة، القاهرة، مصر' },
  mapQuery: 'Cairo, Egypt',
  hours: [
    { day: 'sat', open: '17:00', close: '22:00', closed: false },
    { day: 'sun', open: '17:00', close: '22:00', closed: false },
    { day: 'mon', open: '17:00', close: '22:00', closed: false },
    { day: 'tue', open: '17:00', close: '22:00', closed: false },
    { day: 'wed', open: '17:00', close: '22:00', closed: false },
    { day: 'thu', open: '17:00', close: '20:00', closed: false, byAppointment: true },
    { day: 'fri', open: '00:00', close: '00:00', closed: true },
  ],
  slotMinutes: 20,
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
  bookingOpen: true,
}

/* ───────────────── Generated clinical data (relative to today) ───────────────── */

// Deterministic PRNG so the demo looks the same on every first load
function rng(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296
    return seed / 4294967296
  }
}

export function iso(d: Date) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

const FIRST_M = ['Ahmed', 'Mohamed', 'Mahmoud', 'Omar', 'Khaled', 'Youssef', 'Tarek', 'Hassan', 'Mostafa', 'Ibrahim', 'Karim', 'Sherif', 'Adel', 'Samir']
const FIRST_F = ['Mona', 'Sara', 'Nour', 'Heba', 'Rania', 'Dina', 'Yasmin', 'Mariam', 'Hala', 'Amal', 'Laila', 'Salma']
const LAST = ['Hassan', 'Mansour', 'El-Sayed', 'Farouk', 'Nabil', 'Fahmy', 'Ragab', 'Saleh', 'Osman', 'Kamel', 'Zaki', 'Hamdy', 'Shawky', 'Fouad']

const conditionByService: Record<string, Condition> = {
  'svc-varicose': 'Varicose veins',
  'svc-arterial': 'Peripheral arterial disease',
  'svc-diabetic': 'Diabetic foot',
  'svc-endovascular': 'Peripheral arterial disease',
  'svc-dialysis': 'Dialysis access',
  'svc-dvt': 'Deep vein thrombosis',
  'svc-aneurysm': 'Aortic aneurysm',
  'svc-doppler': 'Varicose veins',
}

export function generateClinical(today = new Date()) {
  const r = rng(20260420)
  const pick = <T,>(a: T[]) => a[Math.floor(r() * a.length)]
  const serviceWeights = [
    ['svc-varicose', 30],
    ['svc-arterial', 16],
    ['svc-diabetic', 14],
    ['svc-doppler', 16],
    ['svc-endovascular', 8],
    ['svc-dialysis', 7],
    ['svc-dvt', 6],
    ['svc-aneurysm', 3],
  ] as const
  const totalW = serviceWeights.reduce((s, [, w]) => s + w, 0)
  const pickService = () => {
    let x = r() * totalW
    for (const [id, w] of serviceWeights) {
      x -= w
      if (x <= 0) return id
    }
    return 'svc-varicose'
  }

  const patients: Patient[] = []
  for (let i = 0; i < 64; i++) {
    const female = r() < 0.48
    const name = `${pick(female ? FIRST_F : FIRST_M)} ${pick(LAST)}`
    const svc = pickService()
    const cond = conditionByService[svc]
    const age = 28 + Math.floor(r() * 50)
    const dob = new Date(today.getFullYear() - age, Math.floor(r() * 12), 1 + Math.floor(r() * 27))
    const arterial = cond === 'Peripheral arterial disease' || cond === 'Diabetic foot'
    const created = new Date(today)
    created.setDate(created.getDate() - Math.floor(r() * 220) - 5)
    const follow = new Date(today)
    follow.setDate(follow.getDate() + Math.floor(r() * 40) - 8)
    patients.push({
      id: `pt-${String(i + 1).padStart(3, '0')}`,
      name,
      phone: `01${pick(['0', '1', '2', '5'])} ${String(1000 + Math.floor(r() * 8999))} ${String(1000 + Math.floor(r() * 8999))}`,
      email: r() < 0.6 ? `${name.split(' ')[0].toLowerCase()}.${Math.floor(r() * 90 + 10)}@mail.com` : undefined,
      gender: female ? 'female' : 'male',
      dob: iso(dob),
      conditions: r() < 0.2 ? [cond, pick(['Venous ulcer', 'Carotid disease', 'Lymphoedema'] as Condition[])] : [cond],
      abiLeft: arterial ? +(0.45 + r() * 0.5).toFixed(2) : +(0.98 + r() * 0.2).toFixed(2),
      abiRight: arterial ? +(0.5 + r() * 0.5).toFixed(2) : +(0.98 + r() * 0.2).toFixed(2),
      ceap: cond === 'Varicose veins' ? ['C1', 'C2', 'C3', 'C4a', 'C5'][Math.floor(r() * 5)] : undefined,
      diabetic: cond === 'Diabetic foot' || r() < 0.22,
      smoker: r() < (arterial ? 0.55 : 0.2),
      notes: '',
      followUp: r() < 0.7 ? iso(follow) : undefined,
      createdAt: iso(created),
    })
  }

  const times: string[] = []
  for (let h = 17; h < 22; h++) for (const m of ['00', '20', '40']) times.push(`${h}:${m}`)

  const appointments: Appointment[] = []
  let n = 1
  for (let off = -75; off <= 21; off++) {
    const d = new Date(today)
    d.setDate(d.getDate() + off)
    if (d.getDay() === 5) continue // Friday closed
    const isThu = d.getDay() === 4
    const count = isThu ? 2 + Math.floor(r() * 3) : 5 + Math.floor(r() * 7) - (off > 0 ? Math.floor(off / 3) : 0)
    const used = new Set<string>()
    for (let k = 0; k < Math.max(count, 0); k++) {
      let time = pick(times)
      while (used.has(time)) time = pick(times)
      used.add(time)
      const pt = pick(patients)
      const svc = pickService()
      const type: AppointmentType = svc === 'svc-doppler' ? 'doppler' : r() < 0.38 ? 'follow-up' : r() < 0.12 ? 'procedure' : 'consultation'
      let status: AppointmentStatus
      if (off < 0) status = r() < 0.86 ? 'completed' : r() < 0.5 ? 'no-show' : 'cancelled'
      else if (off === 0) status = r() < 0.4 ? 'completed' : 'confirmed'
      else status = r() < 0.65 ? 'confirmed' : 'pending'
      const source: AppointmentSource = pick(['website', 'website', 'website', 'phone', 'phone', 'whatsapp', 'walk-in'])
      const created = new Date(d)
      created.setDate(created.getDate() - 1 - Math.floor(r() * 10))
      appointments.push({
        id: `ap-${String(n++).padStart(4, '0')}`,
        patientId: pt.id,
        name: pt.name,
        phone: pt.phone,
        email: pt.email,
        serviceId: svc,
        type,
        date: iso(d),
        time,
        status,
        source,
        createdAt: created.toISOString(),
      })
    }
  }

  const inquiries: Inquiry[] = [
    { id: 'iq-1', name: 'Nour Hamdy', phone: '010 2231 7781', message: 'Is the Doppler scan available on Thursday? My mother has swelling in one leg since yesterday.', createdAt: new Date(today.getTime() - 3.6e6 * 3).toISOString(), read: false },
    { id: 'iq-2', name: 'محمد فؤاد', phone: '011 4410 9932', message: 'أريد الاستفسار عن علاج الدوالي بالليزر ومدة الراحة بعد الإجراء.', createdAt: new Date(today.getTime() - 3.6e6 * 20).toISOString(), read: false },
    { id: 'iq-3', name: 'Tarek Zaki', phone: '012 8890 1123', email: 'tarek.z@mail.com', message: 'Do you accept patients referred from a nephrologist for fistula creation?', createdAt: new Date(today.getTime() - 3.6e6 * 50).toISOString(), read: true },
  ]

  return { patients, appointments, inquiries }
}

export function createSeed(): DB {
  const clinical = generateClinical()
  return {
    services,
    tips,
    reviews,
    faqs,
    settings,
    ...clinical,
  }
}

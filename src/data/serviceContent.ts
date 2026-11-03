import type { L } from './types'

export interface ServiceSection { id: string; title: L; body: L }
export interface ServiceFaq { q: L; a: L }
export interface ServiceContent {
  /** 50–60 character page title for search results, no doctor name (it is appended) */
  seoTitle: L
  /** 140–160 character meta description, answer-first, mentions what the patient gets */
  seoDescription: L
  sections: ServiceSection[]
  faqs: ServiceFaq[]
}

export const serviceContent: Record<string, ServiceContent> = {
  /* ───────────────────────── Varicose veins ───────────────────────── */
  'svc-varicose': {
    seoTitle: {
      en: 'Varicose Veins Treatment Without Open Surgery in Egypt',
      ar: 'علاج دوالي الساقين بدون جراحة مفتوحة في مصر',
    },
    seoDescription: {
      en: 'Varicose veins can be treated through a needle under local anaesthesia. Get a Doppler-guided plan, same-day treatment and a quick return to walking.',
      ar: 'يمكن علاج الدوالي عبر إبرة وتحت تخدير موضعي. احصل على خطة علاج مبنية على فحص الدوبلر، وعلاج في نفس اليوم، وعودة سريعة إلى المشي.',
    },
    sections: [
      {
        id: 'what',
        title: { en: 'What are varicose veins?', ar: 'ما هي دوالي الساقين؟' },
        body: {
          en: 'Your leg veins carry blood back up to the heart against gravity. Small one-way valves inside them stop the blood from falling back down. When these valves weaken, blood flows the wrong way and collects in the lower leg. The veins near the skin then stretch, swell and twist. These are varicose veins.\n\nFor some people they are only a cosmetic worry. For many others they cause heavy, aching legs, ankle swelling, itching and night cramps.\n\nThey matter because, left for years, the extra pressure can damage the skin around the ankle. The skin may darken, harden or break down into a slow-healing wound called a venous ulcer. Treating the faulty veins early helps prevent this.',
          ar: 'تحمل أوردة الساق الدم عائداً إلى القلب عكس الجاذبية، وبداخلها صمامات صغيرة تعمل في اتجاه واحد تمنع الدم من الرجوع إلى أسفل. وعندما تضعف هذه الصمامات يتدفق الدم في الاتجاه الخطأ ويتجمع أسفل الساق، فتتمدد الأوردة القريبة من الجلد وتتضخم وتتعرج. هذه هي الدوالي.\n\nبالنسبة لبعض الناس هي مجرد مشكلة شكلية، لكنها عند كثيرين تسبب ثقلاً وألماً في الساقين وتورماً في الكاحل وحكة وتقلصات ليلية.\n\nوتكمن أهميتها في أن الضغط الزائد لسنوات طويلة قد يضر الجلد حول الكاحل، فيسمرّ لونه أو يتصلب أو يتقرح مكوناً جرحاً بطيء الالتئام يسمى القرحة الوريدية. وعلاج الأوردة المصابة مبكراً يساعد على منع ذلك.',
        },
      },
      {
        id: 'causes',
        title: { en: 'Causes and risk factors', ar: 'الأسباب وعوامل الخطورة' },
        body: {
          en: 'Varicose veins are very common, and there is rarely a single cause. The main things that raise your chance of getting them are:\n- A family history — they often run in families\n- Long hours standing or sitting still at work\n- Pregnancy, which increases the blood volume and pressure in the leg veins\n- Getting older, as vein walls and valves lose strength\n- Being overweight\n- A previous clot in the leg veins (deep vein thrombosis)\n\nWomen are affected more often than men, but men tend to come later, when symptoms are more advanced. You cannot change your genes, but staying active and keeping a healthy weight help your veins.',
          ar: 'الدوالي شائعة جداً، ونادراً ما يكون لها سبب واحد. أهم ما يزيد احتمال الإصابة بها:\n- التاريخ العائلي، فهي كثيراً ما تتكرر في العائلة الواحدة\n- الوقوف أو الجلوس دون حركة لساعات طويلة في العمل\n- الحمل، لأنه يزيد حجم الدم والضغط في أوردة الساقين\n- التقدم في العمر، إذ تفقد جدران الأوردة وصماماتها قوتها\n- زيادة الوزن\n- جلطة سابقة في أوردة الساق العميقة\n\nتصاب النساء أكثر من الرجال، لكن الرجال يأتون عادة متأخرين بعد أن تتقدم الأعراض. لا يمكنك تغيير الوراثة، لكن الحركة المنتظمة والوزن الصحي يساعدان أوردتك.',
        },
      },
      {
        id: 'diagnosis',
        title: { en: 'How varicose veins are diagnosed', ar: 'كيف تُشخَّص الدوالي؟' },
        body: {
          en: 'At your visit the doctor asks about your symptoms, your work, pregnancies and any previous clots or vein treatment. Your legs are then examined while you stand, because that is when the veins fill.\n\nThe key test is a duplex Doppler scan of the veins (an ultrasound that shows both the vein and the direction of blood flow). It takes about 15–30 minutes, is painless and is usually done in the same visit. It shows exactly which valves are leaking and where the problem starts, which is often a vein you cannot see from the outside.\n\nWear loose trousers or a skirt, and bring any previous scans or reports. Treatment is then planned on the scan results, not only on what the veins look like.',
          ar: 'في الزيارة يسألك الطبيب عن الأعراض وطبيعة عملك والحمل وأي جلطات أو علاج سابق للأوردة، ثم يفحص ساقيك وأنت واقف لأن الأوردة تمتلئ في هذا الوضع.\n\nالفحص الأساسي هو دوبلر الأوردة (موجات صوتية تُظهر الوريد واتجاه تدفق الدم فيه معاً). يستغرق نحو ١٥–٣٠ دقيقة، بلا ألم، ويُجرى عادة في نفس الزيارة. يوضح بدقة أي الصمامات لا تعمل ومن أين تبدأ المشكلة، وكثيراً ما تكون في وريد لا يُرى من الخارج.\n\nارتدِ ملابس واسعة، واحضر معك أي فحوصات أو تقارير سابقة. ثم يُخطط العلاج بناءً على نتيجة الفحص لا على شكل الأوردة فقط.',
        },
      },
      {
        id: 'treatment',
        title: { en: 'Treatment options', ar: 'خيارات العلاج' },
        body: {
          en: 'Treatment is matched to your scan and your symptoms, starting with the simplest option:\n- Medical compression stockings: they support the veins and ease aching and swelling, but do not cure the leaking valves.\n- Foam sclerotherapy: a medicine mixed into a foam is injected into the vein through a fine needle, which makes it close and fade over time.\n- Endovenous laser or radiofrequency ablation: a thin fibre or catheter is passed into the faulty vein through a needle, and heat seals it shut from the inside. It is done under local anaesthesia and usually takes 45–60 minutes.\n- Ambulatory phlebectomy: remaining bulging veins are removed through tiny nicks in the skin that usually need no stitches.\n\nThese methods are often combined. Blood simply finds its way through the healthy veins.',
          ar: 'يُختار العلاج وفق نتيجة الفحص والأعراض، بدءاً من الأبسط:\n- الجوارب الضاغطة الطبية: تدعم الأوردة وتخفف الألم والتورم، لكنها لا تعالج الصمامات التالفة.\n- الحقن بالرغوة: يُحقن دواء ممزوج برغوة داخل الوريد عبر إبرة دقيقة، فيُغلق الوريد ويختفي تدريجياً.\n- الكي الحراري بالليزر أو الترددات الراديوية: تُدخل ألياف أو قسطرة رفيعة في الوريد المصاب عبر إبرة، وتغلقه الحرارة من الداخل. يتم تحت تخدير موضعي ويستغرق عادة ٤٥–٦٠ دقيقة.\n- استئصال الأوردة الدقيقة: تُزال الأوردة البارزة المتبقية عبر فتحات صغيرة جداً في الجلد لا تحتاج غالباً إلى غرز.\n\nكثيراً ما تُستخدم هذه الطرق معاً، ويجد الدم طريقه بسهولة عبر الأوردة السليمة.',
        },
      },
      {
        id: 'recovery',
        title: { en: 'Recovery and results', ar: 'التعافي والنتائج' },
        body: {
          en: 'Most patients walk out of the clinic the same day, and walking is encouraged straight away. You will usually wear a compression stocking for a short period, as your doctor advises.\n\nMild bruising, a pulling feeling along the treated vein and some tenderness are common for one to two weeks. Most people return to desk work within a few days, and to more physical work and the gym a little later.\n\nThe treated veins fade over several weeks. A follow-up visit, often with a short scan, checks that the vein has closed and that there is no clot.\n\nTreatment fixes the faulty veins, but it cannot stop new ones forming in the future. Staying active and keeping a healthy weight help protect the result.',
          ar: 'يعود معظم المرضى إلى منازلهم في نفس اليوم، ويُنصح بالمشي فوراً. وعادة ترتدي جورباً ضاغطاً لفترة قصيرة حسب توجيه الطبيب.\n\nمن الطبيعي ظهور كدمات خفيفة وإحساس بالشد على امتداد الوريد المعالج وبعض الألم عند اللمس لمدة أسبوع إلى أسبوعين. ويعود معظم الناس إلى الأعمال المكتبية خلال أيام قليلة، وإلى الأعمال المجهدة والتمارين بعد ذلك بقليل.\n\nتختفي الأوردة المعالجة تدريجياً خلال عدة أسابيع. وفي زيارة المتابعة يُجرى غالباً فحص قصير للتأكد من انغلاق الوريد وعدم وجود جلطة.\n\nالعلاج يصلح الأوردة المصابة، لكنه لا يمنع ظهور أوردة جديدة مستقبلاً. والحركة المنتظمة والوزن الصحي يساعدان على الحفاظ على النتيجة.',
        },
      },
      {
        id: 'when',
        title: { en: 'When to see a vascular surgeon', ar: 'متى تزور جراح الأوعية الدموية؟' },
        body: {
          en: 'Book a visit if your veins cause aching, heaviness, swelling or night cramps, if the skin around your ankle is itchy, darker or harder, or if you simply want to know your options.\n\nSee a doctor promptly if you have:\n- A wound near the ankle that is not healing\n- A varicose vein that becomes hard, red, hot and painful (a clot in a surface vein)\n\nSeek emergency care if:\n- A varicose vein bleeds heavily: lie down, raise the leg and press firmly on it while you get help\n- One leg suddenly becomes swollen and painful, which may be a deep vein clot\n- You have sudden breathlessness or chest pain',
          ar: 'احجز موعداً إذا كانت الأوردة تسبب لك ألماً أو ثقلاً أو تورماً أو تقلصات ليلية، أو إذا ظهرت حكة أو اسمرار أو تصلب في الجلد حول الكاحل، أو إذا أردت ببساطة معرفة الخيارات المتاحة.\n\nراجع الطبيب سريعاً إذا كان لديك:\n- جرح قرب الكاحل لا يلتئم\n- وريد متضخم أصبح صلباً ومحمراً وساخناً ومؤلماً (جلطة في وريد سطحي)\n\nاطلب الرعاية الطارئة إذا:\n- نزف وريد من الدوالي بغزارة: استلقِ وارفع ساقك واضغط بقوة على مكان النزيف حتى تصل المساعدة\n- تورمت ساق واحدة فجأة مع ألم، فقد تكون جلطة في وريد عميق\n- شعرت بضيق تنفس مفاجئ أو ألم في الصدر',
        },
      },
    ],
    faqs: [
      {
        q: { en: 'Is varicose vein treatment painful?', ar: 'هل علاج الدوالي مؤلم؟' },
        a: {
          en: 'Most patients feel only mild discomfort. Modern treatments are done through a needle under local anaesthesia, so you may feel a few small pricks at the start and some tenderness or bruising for a week or two afterwards.',
          ar: 'معظم المرضى يشعرون بانزعاج بسيط فقط. فالعلاج الحديث يتم عبر إبرة وتحت تخدير موضعي، لذلك قد تشعر ببعض الوخزات الصغيرة في البداية، ثم ببعض الألم عند اللمس أو الكدمات لمدة أسبوع أو أسبوعين.',
        },
      },
      {
        q: { en: 'Will my varicose veins come back after treatment?', ar: 'هل تعود الدوالي بعد العلاج؟' },
        a: {
          en: 'The veins that are treated usually stay closed, but new varicose veins can form over the years. This is because the tendency to weak valves often runs in the family. Staying active, keeping a healthy weight and having a check-up if symptoms return all help.',
          ar: 'الأوردة المعالجة تبقى مغلقة في الغالب، لكن قد تظهر دوالي جديدة مع مرور السنين، لأن الاستعداد لضعف الصمامات كثيراً ما يكون وراثياً. وتساعد الحركة المنتظمة والوزن الصحي والمتابعة عند عودة الأعراض على الحد من ذلك.',
        },
      },
      {
        q: { en: 'Can I walk after varicose vein treatment?', ar: 'هل يمكنني المشي بعد علاج الدوالي؟' },
        a: {
          en: 'Yes, and you are encouraged to. Walking straight after the procedure helps the circulation and lowers the chance of a clot. Most people go home the same day and return to light daily activities within a day or two.',
          ar: 'نعم، بل يُنصح بذلك. فالمشي بعد الإجراء مباشرة ينشط الدورة الدموية ويقلل احتمال حدوث جلطة. ويعود معظم الناس إلى منازلهم في نفس اليوم، وإلى أنشطتهم اليومية الخفيفة خلال يوم أو يومين.',
        },
      },
      {
        q: { en: 'Can varicose veins be treated during pregnancy?', ar: 'هل يمكن علاج الدوالي أثناء الحمل؟' },
        a: {
          en: 'Treatment to close the veins is usually delayed until after pregnancy. Veins often improve on their own after delivery, and compression stockings can ease symptoms in the meantime. A Doppler scan is safe if your doctor needs to check for a clot.',
          ar: 'يُؤجل علاج غلق الأوردة عادة إلى ما بعد الحمل، لأن الدوالي كثيراً ما تتحسن من تلقاء نفسها بعد الولادة، ويمكن للجوارب الضاغطة تخفيف الأعراض في هذه الفترة. وفحص الدوبلر آمن إذا احتاج الطبيب للتأكد من عدم وجود جلطة.',
        },
      },
      {
        q: { en: 'Are compression stockings enough on their own?', ar: 'هل تكفي الجوارب الضاغطة وحدها؟' },
        a: {
          en: 'Stockings ease symptoms but do not cure varicose veins. They support the veins while you wear them, which helps with aching and swelling. If the valves are leaking, the problem returns once the stockings come off, so treatment is offered when symptoms bother you.',
          ar: 'الجوارب تخفف الأعراض لكنها لا تعالج الدوالي. فهي تدعم الأوردة طالما ترتديها، مما يقلل الألم والتورم، لكن إذا كانت الصمامات تالفة تعود المشكلة بمجرد خلعها، لذلك يُقترح العلاج عندما تزعجك الأعراض.',
        },
      },
    ],
  },

  /* ───────────────────────── Arterial blockage ───────────────────────── */
  'svc-arterial': {
    seoTitle: {
      en: 'Leg Artery Blockage (PAD): Diagnosis and Treatment',
      ar: 'انسداد شرايين الساقين: التشخيص والعلاج بالقسطرة',
    },
    seoDescription: {
      en: 'Calf pain on walking can mean narrowed leg arteries. Get an ABI and Doppler check, a clear plan and, if needed, balloon or stent treatment through a pinhole.',
      ar: 'ألم السمانة أثناء المشي قد يعني ضيق شرايين الساق. احصل على قياس مؤشر الكاحل وفحص دوبلر وخطة واضحة، وعند الحاجة علاج بالبالون أو الدعامة عبر ثقب صغير.',
    },
    sections: [
      {
        id: 'what',
        title: { en: 'What is peripheral arterial disease?', ar: 'ما هو مرض الشرايين الطرفية؟' },
        body: {
          en: 'Peripheral arterial disease (PAD) means the arteries that carry blood to your legs have become narrowed or blocked. The cause is usually a build-up of fatty, hardened material in the artery wall, called atherosclerosis.\n\nWith less blood getting through, your leg muscles run short of oxygen when they work. The classic sign is a cramping pain in the calf, thigh or buttock when you walk, which eases within minutes of rest. This is called claudication.\n\nPAD matters for two reasons. In some people the blood flow falls so low that the foot is at risk of wounds and gangrene. And the same process often affects the arteries of the heart and brain, so PAD is a warning sign for heart attack and stroke too.',
          ar: 'مرض الشرايين الطرفية يعني أن الشرايين التي تغذي الساقين أصبحت متضيقة أو مسدودة. والسبب غالباً تراكم مواد دهنية متصلبة في جدار الشريان، وهو ما يسمى تصلب الشرايين.\n\nومع قلة الدم الواصل تعاني عضلات الساق من نقص الأكسجين عند المجهود. والعلامة المعتادة ألم يشبه التقلص في السمانة أو الفخذ أو الأرداف أثناء المشي، يهدأ خلال دقائق من الراحة، ويسمى العرج المتقطع.\n\nتكمن أهمية المرض في أمرين: ففي بعض المرضى ينخفض التدفق إلى حد يعرّض القدم للجروح والغرغرينا، كما أن نفس العملية كثيراً ما تصيب شرايين القلب والمخ، فيكون المرض إنذاراً لخطر الأزمات القلبية والسكتات الدماغية أيضاً.',
        },
      },
      {
        id: 'causes',
        title: { en: 'Causes and risk factors', ar: 'الأسباب وعوامل الخطورة' },
        body: {
          en: 'The same things that damage the heart arteries damage the leg arteries. The most important are:\n- Smoking, which is the strongest single risk factor\n- Diabetes\n- High blood pressure\n- High cholesterol\n- Getting older\n- Kidney disease\n- A family history of heart or artery disease\n\nThe good news is that most of these can be controlled. Stopping smoking, good sugar control and the right medicines slow the disease down and protect the heart and brain as well as the legs.',
          ar: 'ما يضر شرايين القلب يضر شرايين الساقين أيضاً. وأهم عوامل الخطورة:\n- التدخين، وهو أقوى عامل منفرد\n- السكري\n- ارتفاع ضغط الدم\n- ارتفاع الكوليسترول\n- التقدم في العمر\n- أمراض الكلى\n- التاريخ العائلي لأمراض القلب أو الشرايين\n\nوالخبر الجيد أن معظم هذه العوامل يمكن السيطرة عليها. فالتوقف عن التدخين وضبط السكر والأدوية المناسبة تبطئ تقدم المرض وتحمي القلب والمخ إلى جانب الساقين.',
        },
      },
      {
        id: 'diagnosis',
        title: { en: 'How it is diagnosed', ar: 'كيف يُشخَّص المرض؟' },
        body: {
          en: 'The doctor asks how far you can walk before the pain starts, where you feel it and how quickly it settles. Your feet are checked for pulses, colour, temperature and any wounds.\n\nTwo simple, painless tests usually confirm the diagnosis in the same visit:\n- The ankle–brachial index, or ABI (a blood pressure comparison between ankle and arm). A result below 0.9 suggests narrowing.\n- A duplex Doppler scan of the leg arteries, which shows where the narrowing is and how severe it is.\n\nIn people with diabetes or kidney disease the arteries can be stiff, which makes the ABI less reliable, so the scan matters even more. If a procedure is being considered, a CT angiogram (a CT scan with dye) may be arranged to map the arteries in detail. Bring any previous scans and your list of medicines.',
          ar: 'يسألك الطبيب عن المسافة التي تمشيها قبل بدء الألم ومكانه وسرعة زواله، ثم يفحص النبض في القدمين ولونهما وحرارتهما وأي جروح.\n\nعادة يؤكد فحصان بسيطان بلا ألم التشخيص في نفس الزيارة:\n- مؤشر الكاحل والعضد (مقارنة ضغط الدم عند الكاحل وعند الذراع)، والنتيجة الأقل من ٠٫٩ تشير إلى وجود ضيق.\n- فحص دوبلر لشرايين الساق، يوضح مكان الضيق ودرجته.\n\nعند مرضى السكري أو أمراض الكلى قد تكون الشرايين متصلبة فيقل الاعتماد على مؤشر الكاحل، فتزداد أهمية الدوبلر. وإذا كان التدخل وارداً قد تُطلب أشعة مقطعية بالصبغة لرسم الشرايين بالتفصيل. أحضر معك أي فحوصات سابقة وقائمة أدويتك.',
        },
      },
      {
        id: 'treatment',
        title: { en: 'Treatment options', ar: 'خيارات العلاج' },
        body: {
          en: 'Treatment depends on how much the disease limits your life and whether the foot is at risk:\n- Risk-factor control: stopping smoking, controlling sugar, blood pressure and cholesterol. Most patients are advised to take an antiplatelet (a medicine that makes blood less sticky) and a statin.\n- A walking programme: regular walking to the point of pain, resting, then walking again. Over months this often increases the distance you can walk.\n- Balloon angioplasty: a fine wire and balloon are passed into the artery through a needle puncture, usually in the groin, and the balloon opens the narrowing.\n- Stenting: a small metal mesh tube is left in place to keep the artery open when a balloon alone is not enough.\n- Bypass surgery: a vein or synthetic tube is used to carry blood around a long blockage, for disease that cannot be treated from the inside.\n\nProcedures usually take 60–120 minutes, with a short hospital stay.',
          ar: 'يعتمد العلاج على مدى تأثير المرض على حياتك وما إذا كانت القدم معرضة للخطر:\n- ضبط عوامل الخطورة: التوقف عن التدخين وضبط السكر والضغط والكوليسترول. ويُنصح معظم المرضى بتناول دواء مضاد للصفائح (يقلل لزوجة الدم) ودواء من مجموعة الستاتين.\n- برنامج المشي: المشي بانتظام حتى بدء الألم ثم الراحة ثم المشي مجدداً، ومع الشهور تزداد غالباً المسافة التي تستطيع مشيها.\n- التوسيع بالبالون: يُدخل سلك دقيق وبالون في الشريان عبر ثقب إبرة، غالباً في أعلى الفخذ، ويفتح البالون مكان الضيق.\n- تركيب الدعامات: أنبوب معدني شبكي صغير يبقى داخل الشريان ليحافظ عليه مفتوحاً عندما لا يكفي البالون وحده.\n- جراحة التحويل الشرياني: يُستخدم وريد أو أنبوب صناعي لتمرير الدم حول انسداد طويل لا يمكن علاجه من الداخل.\n\nتستغرق الإجراءات عادة ٦٠–١٢٠ دقيقة مع إقامة قصيرة في المستشفى.',
        },
      },
      {
        id: 'recovery',
        title: { en: 'Recovery and results', ar: 'التعافي والنتائج' },
        body: {
          en: 'After angioplasty or stenting most people go home the same day or the next morning. You will be asked to rest the leg for a few hours and to avoid heavy lifting for a few days while the puncture site heals. Walking is encouraged soon after.\n\nRecovery after bypass surgery takes longer, usually several weeks, with wound care and a gradual return to activity.\n\nWhatever the treatment, the medicines and lifestyle changes remain important for life. Arteries can narrow again over time, so follow-up visits with a Doppler scan are arranged to catch any problem early. Keep walking every day; it is one of the best things you can do for your circulation.',
          ar: 'بعد التوسيع بالبالون أو الدعامة يعود معظم المرضى إلى منازلهم في نفس اليوم أو صباح اليوم التالي. ويُطلب منك إراحة الساق لبضع ساعات وتجنب حمل الأشياء الثقيلة لأيام قليلة حتى يلتئم مكان الثقب، ويُشجَّع المشي بعد ذلك بوقت قصير.\n\nأما التعافي بعد جراحة التحويل فيستغرق وقتاً أطول، عادة عدة أسابيع، مع العناية بالجرح والعودة التدريجية للنشاط.\n\nوأياً كان العلاج، تظل الأدوية وتغيير نمط الحياة مهمة مدى الحياة. وقد تضيق الشرايين مجدداً مع الوقت، لذا تُحدد زيارات متابعة مع فحص دوبلر لاكتشاف أي مشكلة مبكراً. واظب على المشي يومياً، فهو من أفضل ما تقدمه لدورتك الدموية.',
        },
      },
      {
        id: 'when',
        title: { en: 'When to see a vascular surgeon', ar: 'متى تزور جراح الأوعية الدموية؟' },
        body: {
          en: 'Book a visit if you get pain in the calf, thigh or buttock when walking that eases with rest, or if your feet are often cold, pale or have weak pulses.\n\nSee a doctor within days if you have:\n- Pain in the foot or toes at rest, especially at night, that eases when you hang the leg over the bed\n- A wound on the foot or toes that is not healing\n- A toe that is turning dark or black\n\nGo to the emergency department straight away if:\n- Your leg or foot suddenly becomes cold, pale or blue, very painful, numb or weak. This can mean a sudden blockage, and treatment within hours can save the leg.',
          ar: 'احجز موعداً إذا شعرت بألم في السمانة أو الفخذ أو الأرداف أثناء المشي يزول بالراحة، أو إذا كانت قدماك كثيراً ما تكونان باردتين أو شاحبتين أو ضعيفتي النبض.\n\nراجع الطبيب خلال أيام إذا كان لديك:\n- ألم في القدم أو الأصابع أثناء الراحة، خاصة ليلاً، يخف عند تدلية الساق من السرير\n- جرح في القدم أو الأصابع لا يلتئم\n- إصبع يتحول لونه إلى الداكن أو الأسود\n\nتوجه إلى الطوارئ فوراً إذا:\n- أصبحت ساقك أو قدمك فجأة باردة أو شاحبة أو زرقاء، أو شديدة الألم، أو فقدت الإحساس أو الحركة. فقد يعني ذلك انسداداً مفاجئاً، والعلاج خلال ساعات قد ينقذ الساق.',
        },
      },
    ],
    faqs: [
      {
        q: { en: 'Is leg pain when walking always caused by blocked arteries?', ar: 'هل ألم الساق أثناء المشي سببه دائماً انسداد الشرايين؟' },
        a: {
          en: 'No, it can also come from the spine, joints, nerves or veins. Pain from narrowed arteries typically comes on after a similar distance each time and settles within minutes of standing still. A quick ABI and Doppler scan can tell the difference.',
          ar: 'لا، فقد يكون سببه العمود الفقري أو المفاصل أو الأعصاب أو الأوردة. أما ألم ضيق الشرايين فيظهر عادة بعد مسافة متقاربة في كل مرة ويهدأ خلال دقائق من التوقف. ويمكن لقياس مؤشر الكاحل وفحص الدوبلر التمييز بينها سريعاً.',
        },
      },
      {
        q: { en: 'Can blocked leg arteries be treated without surgery?', ar: 'هل يمكن علاج انسداد شرايين الساق بدون جراحة؟' },
        a: {
          en: 'Yes, many patients improve without any procedure. Stopping smoking, a regular walking programme and the right medicines often increase walking distance and protect the heart. When a procedure is needed, most are now done from the inside through a pinhole rather than open surgery.',
          ar: 'نعم، يتحسن كثير من المرضى دون أي تدخل. فالتوقف عن التدخين وبرنامج المشي المنتظم والأدوية المناسبة كثيراً ما تزيد مسافة المشي وتحمي القلب. وعند الحاجة لتدخل، تتم معظم الإجراءات اليوم من الداخل عبر ثقب صغير بدلاً من الجراحة المفتوحة.',
        },
      },
      {
        q: { en: 'How long does a stent last?', ar: 'كم يدوم مفعول الدعامة؟' },
        a: {
          en: 'There is no fixed lifespan; many stents work well for years. Narrowing can come back inside or near a stent, especially if smoking continues or risk factors are not controlled. Regular follow-up scans help find any narrowing early, when it is easier to treat.',
          ar: 'لا يوجد عمر محدد، فكثير من الدعامات تعمل جيداً لسنوات. لكن قد يعود الضيق داخل الدعامة أو بالقرب منها، خاصة مع استمرار التدخين أو عدم ضبط عوامل الخطورة. وتساعد فحوصات المتابعة المنتظمة على اكتشاف أي ضيق مبكراً حين يكون علاجه أسهل.',
        },
      },
      {
        q: { en: 'Is angioplasty done under general anaesthesia?', ar: 'هل يتم التوسيع بالبالون تحت تخدير كلي؟' },
        a: {
          en: 'Usually not; most angioplasty is done under local anaesthesia. The skin over the artery is numbed and you stay awake, sometimes with light sedation to help you relax. You may feel some pressure, but the inside of the artery has no pain nerves.',
          ar: 'غالباً لا، فمعظم عمليات التوسيع تتم تحت تخدير موضعي. يُخدر الجلد فوق الشريان وتبقى مستيقظاً، وأحياناً يُعطى مهدئ خفيف لتسترخي. قد تشعر ببعض الضغط، لكن داخل الشريان لا يحتوي على أعصاب للألم.',
        },
      },
    ],
  },

  /* ───────────────────────── Diabetic foot ───────────────────────── */
  'svc-diabetic': {
    seoTitle: {
      en: 'Diabetic Foot Care: Wound Healing and Limb Salvage',
      ar: 'علاج القدم السكري: التئام الجروح والحفاظ على الطرف',
    },
    seoDescription: {
      en: 'A diabetic foot wound needs early specialist care. Get a circulation check, wound care and, if blood flow is poor, artery treatment to save the foot.',
      ar: 'جرح القدم السكري يحتاج رعاية متخصصة مبكرة. احصل على تقييم للدورة الدموية ورعاية للجرح، وعند ضعف التدفق علاج لفتح الشرايين والحفاظ على القدم.',
    },
    sections: [
      {
        id: 'what',
        title: { en: 'What is diabetic foot disease?', ar: 'ما هو القدم السكري؟' },
        body: {
          en: 'Over time, diabetes can damage two things in the feet: the nerves and the arteries. Damaged nerves (neuropathy) mean you may not feel a cut, a blister or a tight shoe. Narrowed arteries mean less blood reaches the foot, so a wound heals slowly and infection takes hold more easily.\n\nTogether these turn a small, unnoticed injury into a wound or ulcer that will not heal. Infection can then spread quickly into deeper tissues and bone.\n\nThis is why diabetic foot problems need early, organised care. Most serious problems, including amputation, start with a small wound. Finding it early and restoring good blood flow give the foot the best chance to heal.',
          ar: 'مع الوقت قد يضر السكري شيئين في القدم: الأعصاب والشرايين. فتلف الأعصاب يعني أنك قد لا تشعر بجرح أو فقاعة أو حذاء ضيق، وضيق الشرايين يعني وصول دم أقل إلى القدم، فيلتئم الجرح ببطء ويسهل حدوث الالتهاب.\n\nويؤدي اجتماع الأمرين إلى تحول إصابة صغيرة لم يلاحظها أحد إلى جرح أو قرحة لا تلتئم، وقد ينتشر الالتهاب بعدها بسرعة إلى الأنسجة العميقة والعظام.\n\nلهذا تحتاج مشكلات القدم السكري إلى رعاية مبكرة ومنظمة. فمعظم المشكلات الخطيرة، ومنها البتر، تبدأ بجرح صغير، واكتشافه مبكراً واستعادة تدفق الدم الجيد يمنحان القدم أفضل فرصة للالتئام.',
        },
      },
      {
        id: 'causes',
        title: { en: 'Causes and risk factors', ar: 'الأسباب وعوامل الخطورة' },
        body: {
          en: 'Anyone with diabetes can develop foot problems, but the risk is higher if you have:\n- Diabetes for many years, or sugar that is often poorly controlled\n- Numbness, tingling or burning in the feet\n- Weak foot pulses or calf pain on walking\n- Smoking, high blood pressure or high cholesterol\n- Kidney disease, including patients on dialysis\n- A previous foot ulcer or amputation\n- Hard skin, corns, deformed toes or poor eyesight that makes self-checks difficult\n\nEveryday habits matter too. Walking barefoot, ill-fitting shoes and cutting corns at home are common starting points for a wound.',
          ar: 'يمكن أن يصاب أي مريض سكري بمشكلات في القدم، لكن الخطر يزيد في الحالات التالية:\n- الإصابة بالسكري لسنوات طويلة، أو عدم انتظام السكر كثيراً\n- تنميل أو وخز أو حرقان في القدمين\n- ضعف النبض في القدم أو ألم السمانة أثناء المشي\n- التدخين أو ارتفاع ضغط الدم أو الكوليسترول\n- أمراض الكلى، بما في ذلك مرضى الغسيل الكلوي\n- قرحة سابقة في القدم أو بتر سابق\n- جلد متصلب أو كالو أو تشوه في الأصابع أو ضعف نظر يصعّب الفحص الذاتي\n\nوللعادات اليومية دور أيضاً، فالمشي حافياً والأحذية غير المناسبة وقص الكالو في المنزل من أشهر بدايات الجروح.',
        },
      },
      {
        id: 'diagnosis',
        title: { en: 'What happens at your visit', ar: 'ماذا يحدث في الزيارة؟' },
        body: {
          en: 'The doctor looks closely at both feet, checks the pulses and tests sensation. Any wound is measured and examined for depth and signs of infection.\n\nThe circulation is then assessed with simple, painless tests:\n- A duplex Doppler scan of the leg arteries\n- The ankle–brachial index (a blood pressure comparison between ankle and arm). Because diabetes can make arteries stiff, toe pressures or Doppler wave patterns may also be used.\n\nAn X-ray may be needed if infection could have reached the bone, and blood tests check sugar control and infection. Bring your latest sugar readings, your medicines and any previous scans or reports, and wear shoes and socks you can remove easily.',
          ar: 'يفحص الطبيب القدمين بعناية، ويتحقق من النبض ويختبر الإحساس. ويُقاس أي جرح ويُفحص لمعرفة عمقه وعلامات الالتهاب.\n\nثم تُقيّم الدورة الدموية بفحوصات بسيطة بلا ألم:\n- فحص دوبلر لشرايين الساق\n- مؤشر الكاحل والعضد (مقارنة ضغط الدم عند الكاحل وعند الذراع). ولأن السكري قد يجعل الشرايين متصلبة، قد يُستعان أيضاً بقياس ضغط أصابع القدم أو شكل موجات الدوبلر.\n\nقد تُطلب أشعة عادية إذا احتُمل وصول الالتهاب إلى العظم، وتحاليل دم لمعرفة انتظام السكر ووجود التهاب. أحضر آخر قراءات السكر وأدويتك وأي فحوصات أو تقارير سابقة، وارتدِ حذاءً وجوارب يسهل خلعها.',
        },
      },
      {
        id: 'treatment',
        title: { en: 'Treatment options', ar: 'خيارات العلاج' },
        body: {
          en: 'Diabetic foot care is a programme rather than a single procedure. It usually combines:\n- Specialist wound care: regular cleaning, removal of dead tissue and the right dressings.\n- Treating infection: antibiotics, and sometimes draining an abscess or removing infected tissue.\n- Offloading: taking pressure off the wound with special footwear, insoles or a cast, because a wound under pressure cannot heal.\n- Restoring blood flow (revascularisation): if the arteries are narrowed, they are opened with a balloon or stent through a pinhole, or a bypass is performed, so that enough blood reaches the wound.\n- Shared care with your diabetologist: better sugar, blood pressure and cholesterol control help every other step work.\n\nIf part of a toe or foot is already beyond saving, a limited operation may be needed to protect the rest of the foot.',
          ar: 'رعاية القدم السكري برنامج متكامل وليست إجراءً واحداً، ويجمع عادة بين:\n- رعاية متخصصة للجرح: تنظيف منتظم، وإزالة الأنسجة الميتة، واختيار الغيار المناسب.\n- علاج الالتهاب: بالمضادات الحيوية، وأحياناً بتصريف خراج أو إزالة الأنسجة الملتهبة.\n- تخفيف الضغط: إبعاد الضغط عن الجرح بأحذية أو نعال خاصة أو جبيرة، لأن الجرح الواقع تحت الضغط لا يلتئم.\n- إعادة التروية: إذا كانت الشرايين متضيقة تُفتح بالبالون أو الدعامة عبر ثقب صغير، أو تُجرى جراحة تحويل، ليصل إلى الجرح ما يكفي من الدم.\n- متابعة مشتركة مع طبيب السكري: فضبط السكر والضغط والكوليسترول يساعد كل الخطوات الأخرى على النجاح.\n\nوإذا كان جزء من إصبع أو من القدم قد تعذر إنقاذه، فقد تلزم عملية محدودة لحماية باقي القدم.',
        },
      },
      {
        id: 'recovery',
        title: { en: 'Recovery and results', ar: 'التعافي والنتائج' },
        body: {
          en: 'Diabetic foot wounds heal slowly, often over weeks to months, even when blood flow has been restored. Regular dressing visits and keeping pressure off the wound are essential, so expect several follow-up appointments.\n\nOnce the wound has healed, the risk of a new one stays higher than before. Prevention then becomes the main goal:\n- Check both feet every day, using a mirror or a family member for the soles\n- Never walk barefoot, even at home\n- Wear well-fitting shoes and check inside them before putting them on\n- Keep sugar, blood pressure and cholesterol under control, and stop smoking\n- Keep your follow-up visits, including circulation checks if your arteries were treated',
          ar: 'تلتئم جروح القدم السكري ببطء، غالباً خلال أسابيع إلى شهور، حتى بعد استعادة تدفق الدم. لذلك تُعد زيارات الغيار المنتظمة وإبعاد الضغط عن الجرح أمراً أساسياً، فتوقع عدة مواعيد للمتابعة.\n\nبعد التئام الجرح يبقى خطر ظهور جرح جديد أعلى من السابق، فتصبح الوقاية هي الهدف الرئيسي:\n- افحص القدمين يومياً، مستعيناً بمرآة أو بأحد أفراد الأسرة لفحص باطن القدم\n- لا تمشِ حافياً أبداً حتى في المنزل\n- ارتدِ حذاءً مناسب المقاس وافحص داخله قبل لبسه\n- اضبط السكر والضغط والكوليسترول، وتوقف عن التدخين\n- التزم بمواعيد المتابعة، بما فيها فحص الدورة الدموية إذا عولجت شرايينك',
        },
      },
      {
        id: 'when',
        title: { en: 'When to see a vascular surgeon', ar: 'متى تزور جراح الأوعية الدموية؟' },
        body: {
          en: 'If you have diabetes, book a circulation check if you have weak foot pulses, calf pain on walking or numbness in the feet.\n\nContact the clinic the same day if:\n- A cut, blister or wound has not started to heal within a few days\n- A toe changes colour, becomes pale, blue or dark\n- The foot becomes red, warm or swollen, even without pain\n\nGo to the emergency department straight away if:\n- Redness or swelling is spreading quickly up the foot or leg\n- You have fever, shivering or feel generally unwell with a foot wound\n- There is pus, a bad smell, or a toe or area of skin turns black\n- The foot suddenly becomes cold, pale and painful\n\nRemember that nerve damage can hide pain, so do not wait for a wound to hurt.',
          ar: 'إذا كنت مريض سكري، احجز فحصاً للدورة الدموية إذا كان النبض في قدميك ضعيفاً، أو كنت تشعر بألم السمانة أثناء المشي، أو بتنميل في القدمين.\n\nتواصل مع العيادة في نفس اليوم إذا:\n- لم يبدأ جرح أو فقاعة في الالتئام خلال أيام قليلة\n- تغير لون أحد الأصابع إلى الشاحب أو الأزرق أو الداكن\n- احمرت القدم أو سخنت أو تورمت، حتى بدون ألم\n\nتوجه إلى الطوارئ فوراً إذا:\n- كان الاحمرار أو التورم ينتشر بسرعة في القدم أو الساق\n- أصابتك حرارة أو رعشة أو شعرت بتعب عام مع وجود جرح في القدم\n- ظهر صديد أو رائحة كريهة، أو تحول إصبع أو جزء من الجلد إلى اللون الأسود\n- أصبحت القدم فجأة باردة وشاحبة ومؤلمة\n\nتذكّر أن تلف الأعصاب قد يخفي الألم، فلا تنتظر حتى يؤلمك الجرح.',
        },
      },
    ],
    faqs: [
      {
        q: { en: 'Why does a small wound on a diabetic foot take so long to heal?', ar: 'لماذا يتأخر التئام الجرح الصغير في القدم السكري؟' },
        a: {
          en: 'Because diabetes often reduces both blood flow and feeling in the foot. Less blood means less oxygen for healing, and numbness means pressure keeps damaging the wound without you noticing. Improving circulation and taking pressure off the wound are usually the keys to healing.',
          ar: 'لأن السكري كثيراً ما يقلل تدفق الدم والإحساس في القدم معاً. فقلة الدم تعني أكسجيناً أقل للالتئام، والتنميل يعني استمرار الضغط على الجرح دون أن تلاحظ. وتحسين الدورة الدموية وإبعاد الضغط عن الجرح هما غالباً مفتاح الالتئام.',
        },
      },
      {
        q: { en: 'Does every diabetic foot ulcer lead to amputation?', ar: 'هل تنتهي كل قرحة في القدم السكري بالبتر؟' },
        a: {
          en: 'No, most diabetic foot ulcers heal with the right care. Early wound care, treating infection, offloading and restoring blood flow where it is reduced give the foot the best chance. The longer a wound is left, the harder it becomes to treat.',
          ar: 'لا، فمعظم قرح القدم السكري تلتئم مع الرعاية المناسبة. فالعناية المبكرة بالجرح وعلاج الالتهاب وتخفيف الضغط واستعادة تدفق الدم عند ضعفه تمنح القدم أفضل فرصة، وكلما طال إهمال الجرح صعب علاجه.',
        },
      },
      {
        q: { en: 'Why does a vascular surgeon treat diabetic foot problems?', ar: 'لماذا يعالج جراح الأوعية الدموية مشكلات القدم السكري؟' },
        a: {
          en: 'Because poor blood flow is one of the main reasons diabetic wounds fail to heal. A vascular surgeon can measure the circulation and, if needed, open narrowed arteries with a balloon, stent or bypass. This care works alongside your diabetes doctor and wound care team.',
          ar: 'لأن ضعف تدفق الدم من أهم أسباب عدم التئام جروح السكري. ويستطيع جراح الأوعية الدموية قياس الدورة الدموية، وعند الحاجة فتح الشرايين المتضيقة بالبالون أو الدعامة أو جراحة التحويل، بالتنسيق مع طبيب السكري وفريق رعاية الجروح.',
        },
      },
      {
        q: { en: 'Can I walk on my foot while the wound is healing?', ar: 'هل يمكنني المشي على قدمي أثناء التئام الجرح؟' },
        a: {
          en: 'It depends on where the wound is, and usually you will need to limit pressure on it. Walking on a wound, especially on the sole, can stop it healing. Your doctor will advise on special footwear, a cast or how much walking is safe.',
          ar: 'يعتمد ذلك على مكان الجرح، وغالباً ستحتاج إلى تقليل الضغط عليه. فالمشي على الجرح، خاصة في باطن القدم، قد يمنع التئامه. وسيرشدك الطبيب إلى الحذاء الخاص أو الجبيرة المناسبة ومقدار المشي الآمن.',
        },
      },
      {
        q: { en: 'How can I prevent diabetic foot problems?', ar: 'كيف أقي نفسي من مشكلات القدم السكري؟' },
        a: {
          en: 'Check your feet every day and act early on any change. Never walk barefoot, wear well-fitting shoes, keep your sugar under control and stop smoking. Have your feet and circulation checked regularly, especially if you have numbness or weak foot pulses.',
          ar: 'افحص قدميك يومياً وتصرف مبكراً عند أي تغير. لا تمشِ حافياً أبداً، وارتدِ حذاءً مناسب المقاس، واضبط مستوى السكر، وتوقف عن التدخين. واحرص على فحص قدميك ودورتك الدموية بانتظام، خاصة إذا كان لديك تنميل أو ضعف في نبض القدم.',
        },
      },
    ],
  },

  /* ───────────────────────── Endovascular repair ───────────────────────── */
  'svc-endovascular': {
    seoTitle: {
      en: 'Endovascular Repair: Artery Treatment Through a Pinhole',
      ar: 'القسطرة الطرفية: علاج الشرايين من الداخل عبر ثقب صغير',
    },
    seoDescription: {
      en: 'Endovascular repair treats arteries from the inside using balloons and stents through a pinhole. Get less pain, a short hospital stay and a faster recovery.',
      ar: 'تعالج القسطرة الطرفية الشرايين من الداخل بالبالونات والدعامات عبر ثقب صغير، مع ألم أقل وإقامة قصيرة بالمستشفى وتعافٍ أسرع من الجراحة المفتوحة.',
    },
    sections: [
      {
        id: 'what',
        title: { en: 'What is endovascular repair?', ar: 'ما هي القسطرة الطرفية؟' },
        body: {
          en: 'Endovascular means “inside the blood vessel”. Instead of opening the body to reach a diseased artery, the surgeon passes fine wires, catheters (thin flexible tubes), balloons and stents into it through a needle puncture, usually in the groin or arm. Live X-ray images guide every step on a screen.\n\nIt is used to open narrowed or blocked arteries, reline an aneurysm with a stent-graft (a fabric-covered stent), remove clots, and block bleeding or abnormal vessels.\n\nFor many patients it replaces a long open operation with a procedure under local anaesthesia, a smaller wound and a much shorter recovery. It is not right for everyone, and sometimes open surgery is still the better choice.',
          ar: 'تعني القسطرة الطرفية العلاج من داخل الوعاء الدموي. فبدلاً من فتح الجسم للوصول إلى الشريان المريض، يُدخل الجراح أسلاكاً دقيقة وقساطر (أنابيب رفيعة مرنة) وبالونات ودعامات عبر ثقب إبرة، غالباً في أعلى الفخذ أو الذراع، وتوجّه الأشعة الحية كل خطوة على الشاشة.\n\nوتُستخدم لفتح الشرايين المتضيقة أو المسدودة، وتبطين التمدد بدعامة مغطاة (دعامة مكسوة بنسيج)، وإزالة الجلطات، وغلق الأوعية النازفة أو غير الطبيعية.\n\nولكثير من المرضى تحل محل العملية المفتوحة الطويلة، بإجراء تحت تخدير موضعي وجرح أصغر وتعافٍ أقصر بكثير. لكنها لا تناسب الجميع، وأحياناً تظل الجراحة المفتوحة هي الخيار الأفضل.',
        },
      },
      {
        id: 'causes',
        title: { en: 'Conditions it treats', ar: 'الحالات التي تعالجها' },
        body: {
          en: 'Endovascular techniques are used for several conditions:\n- Narrowed or blocked leg arteries (peripheral arterial disease), causing pain on walking, rest pain or non-healing wounds\n- Abdominal aortic aneurysm, repaired with an EVAR stent-graft\n- A failing dialysis fistula or graft that has narrowed\n- Large clots in arteries or veins, removed or dissolved with a catheter (thrombectomy or thrombolysis)\n- Bleeding or abnormal vessels, closed from the inside (embolisation)\n\nIt is often a good option for patients who are at higher risk from open surgery, such as those with heart or lung disease. The underlying cause, such as smoking, diabetes or high blood pressure, still needs treating alongside the procedure.',
          ar: 'تُستخدم تقنيات القسطرة في عدة حالات:\n- تضيق أو انسداد شرايين الساق (مرض الشرايين الطرفية) المسبب لألم المشي أو ألم الراحة أو الجروح التي لا تلتئم\n- تمدد الشريان الأورطي البطني، ويُصلح بالدعامة المغطاة\n- ضعف وصلة الغسيل الكلوي بسبب الضيق\n- الجلطات الكبيرة في الشرايين أو الأوردة، وتُزال أو تُذاب بالقسطرة\n- الأوعية النازفة أو غير الطبيعية، وتُغلق من الداخل (الانصمام العلاجي)\n\nوهي غالباً خيار جيد للمرضى الأكثر عرضة لمخاطر الجراحة المفتوحة، مثل مرضى القلب أو الرئة. ويظل علاج السبب الأساسي، كالتدخين والسكري وارتفاع الضغط، ضرورياً بجانب الإجراء.',
        },
      },
      {
        id: 'diagnosis',
        title: { en: 'Before the procedure', ar: 'قبل الإجراء' },
        body: {
          en: 'Planning starts with imaging. A duplex Doppler scan, and often a CT angiogram (a CT scan with dye), show the exact size, length and position of the problem so the right equipment can be chosen.\n\nYou will usually have blood tests, including kidney function, because the X-ray dye is cleared by the kidneys. Tell the team if you have kidney disease or have ever reacted to X-ray dye or iodine.\n\nBring a full list of your medicines. Some, such as blood thinners and certain diabetes tablets, may need to be adjusted or paused for a short time; your doctor will tell you exactly what to do. You will be asked not to eat for a few hours beforehand. Bring previous scans and reports, and arrange for someone to take you home.',
          ar: 'يبدأ التخطيط بالأشعة. فيوضح فحص الدوبلر، وكثيراً الأشعة المقطعية بالصبغة، حجم المشكلة وطولها ومكانها بدقة لاختيار الأدوات المناسبة.\n\nستُجرى لك عادة تحاليل دم تشمل وظائف الكلى، لأن صبغة الأشعة تخرج من الجسم عبر الكليتين. أخبر الفريق إذا كنت تعاني من مرض في الكلى أو حدث لك من قبل تحسس من صبغة الأشعة أو اليود.\n\nأحضر قائمة كاملة بأدويتك، فبعضها مثل أدوية السيولة وبعض أقراص السكر قد يحتاج إلى تعديل أو إيقاف مؤقت، وسيخبرك الطبيب بما يلزم بالضبط. وسيُطلب منك الصيام لبضع ساعات قبل الإجراء. أحضر الفحوصات والتقارير السابقة، ورتّب لمن يرافقك إلى المنزل.',
        },
      },
      {
        id: 'treatment',
        title: { en: 'Types of endovascular treatment', ar: 'أنواع العلاج بالقسطرة' },
        body: {
          en: 'Most procedures take 1–3 hours. The area is numbed and a small tube (sheath) is placed in the artery through a needle. Depending on the problem, the surgeon may use:\n- Angioplasty: a balloon is inflated inside the narrowing to widen the artery.\n- Stenting: a metal mesh tube holds the artery open after the balloon.\n- EVAR stent-graft: a fabric-covered stent is placed inside an aortic aneurysm, so blood flows through the graft and no longer presses on the weak wall.\n- Thrombectomy or thrombolysis: a clot is pulled out with a catheter, or dissolved with a clot-busting medicine given directly into it.\n- Embolisation: tiny coils, plugs or special liquids are used to block a bleeding or abnormal vessel.\n\nAt the end, the puncture is closed with pressure or a small closure device.',
          ar: 'تستغرق معظم الإجراءات من ١ إلى ٣ ساعات. يُخدَّر المكان ويوضع أنبوب صغير في الشريان عبر إبرة، ثم يستخدم الجراح حسب الحالة:\n- التوسيع بالبالون: يُنفخ بالون داخل مكان الضيق لتوسيع الشريان.\n- الدعامات: أنبوب معدني شبكي يحافظ على الشريان مفتوحاً بعد البالون.\n- الدعامة المغطاة للأورطي: دعامة مكسوة بنسيج توضع داخل التمدد، فيمر الدم عبرها ولا يضغط على الجدار الضعيف.\n- إزالة الجلطات أو إذابتها: تُسحب الجلطة بالقسطرة، أو تُذاب بدواء مذيب يُعطى داخلها مباشرة.\n- الانصمام العلاجي: تُستخدم ملفات أو سدادات صغيرة أو سوائل خاصة لغلق وعاء نازف أو غير طبيعي.\n\nفي النهاية يُغلق مكان الثقب بالضغط أو بجهاز إغلاق صغير.',
        },
      },
      {
        id: 'recovery',
        title: { en: 'Recovery and results', ar: 'التعافي والنتائج' },
        body: {
          en: 'You will usually lie fairly flat for a few hours so the puncture can seal. Depending on the procedure, you may go home the same day or stay one or two nights.\n\nAt home, expect a small bruise at the puncture site. For about a week, avoid heavy lifting and hard exercise, and keep the site clean and dry. Most people are back to normal daily activities within days rather than weeks.\n\nYou will usually be on medicines such as antiplatelets or blood thinners afterwards; do not stop them without advice. Follow-up visits with a Doppler or CT scan check that the treated vessel stays open or, after EVAR, that the stent-graft stays in the right place. After EVAR, scans are needed for life.',
          ar: 'عادة تبقى مستلقياً بشكل شبه مستوٍ لبضع ساعات حتى يلتئم مكان الثقب. وحسب نوع الإجراء قد تعود إلى المنزل في نفس اليوم أو تبقى ليلة أو ليلتين.\n\nفي المنزل من الطبيعي وجود كدمة صغيرة مكان الثقب. تجنب حمل الأشياء الثقيلة والتمارين العنيفة لمدة أسبوع تقريباً، وحافظ على المكان نظيفاً وجافاً. ويعود معظم الناس إلى أنشطتهم اليومية المعتادة خلال أيام لا أسابيع.\n\nستتناول عادة بعد الإجراء أدوية مثل مضادات الصفائح أو أدوية السيولة، فلا توقفها دون استشارة. وفي زيارات المتابعة يُجرى فحص دوبلر أو أشعة مقطعية للتأكد من بقاء الوعاء المعالج مفتوحاً، أو بقاء الدعامة المغطاة في مكانها الصحيح، وبعد دعامة الأورطي تلزم المتابعة بالأشعة مدى الحياة.',
        },
      },
      {
        id: 'when',
        title: { en: 'When to contact your vascular surgeon', ar: 'متى تتواصل مع جراح الأوعية الدموية؟' },
        body: {
          en: 'Ask about endovascular treatment if you have been told you have narrowed leg arteries, an aortic aneurysm or a failing dialysis access, or if you have been advised that open surgery is high risk for you.\n\nAfter a procedure, contact the clinic the same day if:\n- The puncture site becomes red, hot, increasingly painful or leaks fluid\n- You develop a fever\n- Your original symptoms, such as pain on walking, come back\n\nSeek emergency care if:\n- The puncture site suddenly swells or bleeds: lie flat, press firmly on it and call for help\n- The treated leg or arm becomes cold, pale, numb or very painful\n- You have sudden severe abdominal or back pain, or you feel faint',
          ar: 'اسأل عن العلاج بالقسطرة إذا أُخبرت بأن لديك ضيقاً في شرايين الساق، أو تمدداً في الشريان الأورطي، أو ضعفاً في وصلة الغسيل الكلوي، أو إذا قيل لك إن الجراحة المفتوحة عالية الخطورة بالنسبة لك.\n\nبعد الإجراء، تواصل مع العيادة في نفس اليوم إذا:\n- احمر مكان الثقب أو سخن أو زاد ألمه أو خرج منه سائل\n- أصابتك حرارة\n- عادت أعراضك الأصلية، مثل ألم المشي\n\nاطلب الرعاية الطارئة إذا:\n- تورم مكان الثقب فجأة أو نزف: استلقِ واضغط عليه بقوة واطلب المساعدة\n- أصبحت الساق أو الذراع المعالجة باردة أو شاحبة أو فقدت الإحساس أو اشتد ألمها\n- شعرت بألم مفاجئ وشديد في البطن أو الظهر، أو بدوار يوشك أن يفقدك الوعي',
        },
      },
    ],
    faqs: [
      {
        q: { en: 'Am I awake during an endovascular procedure?', ar: 'هل أكون مستيقظاً أثناء القسطرة؟' },
        a: {
          en: 'Usually yes; most endovascular procedures are done under local anaesthesia. The puncture site is numbed and you may be given light sedation to relax. Some larger procedures, such as certain aneurysm repairs, may use regional or general anaesthesia, and your doctor will discuss this beforehand.',
          ar: 'غالباً نعم، فمعظم إجراءات القسطرة تتم تحت تخدير موضعي. يُخدَّر مكان الثقب وقد يُعطى مهدئ خفيف لتسترخي. وبعض الإجراءات الأكبر، مثل بعض حالات إصلاح التمدد، قد تحتاج تخديراً نصفياً أو كلياً، وسيناقش الطبيب ذلك معك مسبقاً.',
        },
      },
      {
        q: { en: 'Is endovascular repair better than open surgery?', ar: 'هل القسطرة أفضل من الجراحة المفتوحة؟' },
        a: {
          en: 'It is better for many patients, but not for everyone. It usually means less pain, a smaller wound and a faster recovery. However, open surgery may last longer or suit some artery shapes better, so the choice depends on your scans, your health and your preferences.',
          ar: 'هي أفضل لكثير من المرضى لكن ليس للجميع. فهي تعني عادة ألماً أقل وجرحاً أصغر وتعافياً أسرع، لكن الجراحة المفتوحة قد تدوم نتيجتها أطول أو تناسب بعض أشكال الشرايين بشكل أفضل، لذلك يعتمد الاختيار على الأشعة وحالتك الصحية ورغبتك.',
        },
      },
      {
        q: { en: 'How long will I stay in hospital?', ar: 'كم يوماً سأبقى في المستشفى؟' },
        a: {
          en: 'Most patients go home the same day or after one or two nights. Simple angioplasty is often a day case, while a stent-graft for an aneurysm usually needs a short stay. Your team will tell you what to expect for your procedure.',
          ar: 'يعود معظم المرضى إلى منازلهم في نفس اليوم أو بعد ليلة أو ليلتين. فالتوسيع البسيط بالبالون كثيراً ما يكون بدون مبيت، بينما تحتاج دعامة تمدد الأورطي عادة إلى إقامة قصيرة، وسيخبرك الفريق بما تتوقعه في حالتك.',
        },
      },
      {
        q: { en: 'Is the X-ray dye safe for my kidneys?', ar: 'هل صبغة الأشعة آمنة على الكلى؟' },
        a: {
          en: 'For most people it is safe, but it needs care if your kidneys are already weak. Your kidney function is checked beforehand, and the team can use less dye, give fluids or plan extra blood tests. Always mention kidney disease or a past dye reaction.',
          ar: 'هي آمنة لمعظم الناس، لكنها تحتاج حذراً إذا كانت الكليتان ضعيفتين أصلاً. لذلك تُفحص وظائف الكلى مسبقاً، ويمكن للفريق تقليل كمية الصبغة أو إعطاء سوائل أو ترتيب تحاليل إضافية. أخبر الفريق دائماً بأي مرض في الكلى أو تحسس سابق من الصبغة.',
        },
      },
    ],
  },

  /* ───────────────────────── Dialysis access ───────────────────────── */
  'svc-dialysis': {
    seoTitle: {
      en: 'Dialysis Access: AV Fistula Creation and Care in Egypt',
      ar: 'وصلات الغسيل الكلوي: إنشاء الوصلة الشريانية ورعايتها',
    },
    seoDescription: {
      en: 'An AV fistula gives reliable access for haemodialysis. Get vein mapping, fistula creation under local anaesthesia and early treatment if it narrows.',
      ar: 'الوصلة الشريانية الوريدية تمنحك طريقاً آمناً للغسيل الدموي. احصل على رسم خريطة الأوردة وإنشاء الوصلة بتخدير موضعي وعلاج مبكر لأي ضيق.',
    },
    sections: [
      {
        id: 'what',
        title: { en: 'What is dialysis access?', ar: 'ما هي وصلة الغسيل الكلوي؟' },
        body: {
          en: 'Haemodialysis cleans your blood through a machine, which needs a strong, reliable flow of blood several times a week. Normal arm veins are too small and slow for this.\n\nAn arteriovenous (AV) fistula solves the problem. In a short operation, an artery in your arm is joined directly to a nearby vein. The extra blood flow makes the vein grow larger and thicker over the following weeks, so it can be needled easily for dialysis.\n\nA fistula made from your own vessels is usually the preferred access because it tends to last longer and has fewer infections than a graft or a dialysis catheter (a plastic tube in a neck vein). Planning it early, before dialysis is urgent, makes a real difference.',
          ar: 'ينقّي الغسيل الدموي دمك عبر جهاز يحتاج إلى تدفق قوي ومنتظم للدم عدة مرات أسبوعياً، وأوردة الذراع العادية أصغر وأبطأ من أن تؤدي هذا الغرض.\n\nوتحل الوصلة الشريانية الوريدية هذه المشكلة. ففي عملية قصيرة يُوصل شريان في الذراع مباشرة بوريد قريب منه، فيجعل التدفق الزائد الوريد يكبر ويزداد سمكاً خلال الأسابيع التالية، فيسهل وخزه بالإبر أثناء الغسيل.\n\nوالوصلة المصنوعة من أوعيتك الطبيعية هي عادة الخيار المفضل، لأنها تدوم غالباً أطول وتقل فيها الالتهابات مقارنة بالوصلة الصناعية أو القسطرة (أنبوب بلاستيكي في وريد الرقبة). والتخطيط لها مبكراً قبل أن يصبح الغسيل عاجلاً يصنع فرقاً حقيقياً.',
        },
      },
      {
        id: 'causes',
        title: { en: 'Who needs dialysis access?', ar: 'من يحتاج إلى وصلة الغسيل؟' },
        body: {
          en: 'You may need an AV fistula if your kidney doctor expects you to start haemodialysis in the coming months, or if you are already on dialysis through a catheter.\n\nYou may also need to be seen if an existing fistula or graft is not working well, for example:\n- Weak thrill (the buzzing you feel over the fistula) or poor flow during dialysis\n- Prolonged bleeding after the needles are removed\n- Swelling of the arm, hand or face\n- A fistula that has not grown enough to be used\n\nThe most common causes of a failing fistula are narrowing of the vein and clotting. Low blood pressure, dehydration and pressure on the arm can make clotting more likely.',
          ar: 'قد تحتاج إلى وصلة شريانية وريدية إذا توقع طبيب الكلى بدء الغسيل الدموي خلال الشهور القادمة، أو إذا كنت تُغسل بالفعل عبر قسطرة.\n\nوقد تحتاج أيضاً إلى الكشف إذا كانت وصلتك الحالية أو الصناعية لا تعمل جيداً، مثل:\n- ضعف الرعشة (الاهتزاز الذي تشعر به فوق الوصلة) أو ضعف التدفق أثناء الغسيل\n- نزيف مطول بعد سحب الإبر\n- تورم الذراع أو اليد أو الوجه\n- وصلة لم تكبر بما يكفي لاستخدامها\n\nأشهر أسباب ضعف الوصلة ضيق الوريد وحدوث الجلطات. ويزيد انخفاض الضغط والجفاف والضغط على الذراع من احتمال التجلط.',
        },
      },
      {
        id: 'diagnosis',
        title: { en: 'Before the procedure', ar: 'قبل الإجراء' },
        body: {
          en: 'The first step is vein mapping: a duplex Doppler scan of both arms that measures the size and health of the arteries and veins. It takes about 15–30 minutes and shows the best place for the fistula, usually in the non-dominant arm, as far down the arm as the vessels allow.\n\nProtect your veins from now on. Ask that blood tests and drips are taken from the back of the hand or from the other arm, and avoid blood pressure cuffs on the arm planned for access.\n\nBring your latest kidney blood tests, your medicines list and any previous access reports. Wear a short-sleeved or loose top. The team will tell you whether any blood thinners need adjusting before surgery.',
          ar: 'الخطوة الأولى رسم خريطة الأوردة: فحص دوبلر للذراعين يقيس حجم الشرايين والأوردة وسلامتها. يستغرق نحو ١٥–٣٠ دقيقة، ويحدد أفضل مكان للوصلة، وغالباً يكون في الذراع غير المستخدمة في الكتابة، وفي أبعد نقطة تسمح بها الأوعية.\n\nاحمِ أوردتك من الآن: اطلب أن تُسحب التحاليل وتُركب الكانيولا من ظهر اليد أو من الذراع الأخرى، وتجنب قياس الضغط في الذراع المخصصة للوصلة.\n\nأحضر آخر تحاليل الكلى وقائمة أدويتك وأي تقارير سابقة عن الوصلات، وارتدِ ملابس بأكمام قصيرة أو واسعة. وسيخبرك الفريق إذا كانت أي أدوية سيولة تحتاج إلى تعديل قبل العملية.',
        },
      },
      {
        id: 'treatment',
        title: { en: 'Access options and treatments', ar: 'أنواع الوصلات وطرق علاجها' },
        body: {
          en: 'The options, from most to least preferred for most patients, are:\n- AV fistula: your own artery is joined to a vein at the wrist or elbow. It is done under local anaesthesia and usually takes 60–90 minutes, and you go home the same day.\n- AV graft: when the veins are not suitable, a soft synthetic tube connects the artery and vein under the skin. It can usually be used sooner than a fistula but needs more maintenance.\n- Dialysis catheter: a tube in a large neck vein, used when dialysis is needed urgently or other options are not possible.\n\nTo keep access working, problems are treated early:\n- Fistuloplasty: a balloon passed through a needle widens a narrowed segment.\n- Clot removal: a blocked fistula or graft can sometimes be reopened if treated quickly.',
          ar: 'الخيارات، من الأفضل إلى الأقل تفضيلاً لمعظم المرضى:\n- الوصلة الشريانية الوريدية: يُوصل شريانك بوريد عند الرسغ أو الكوع، تحت تخدير موضعي، وتستغرق عادة ٦٠–٩٠ دقيقة، وتعود إلى منزلك في نفس اليوم.\n- الوصلة الصناعية: عندما لا تكون الأوردة مناسبة، يربط أنبوب صناعي مرن بين الشريان والوريد تحت الجلد. يمكن استخدامها عادة أسرع من الوصلة الطبيعية، لكنها تحتاج إلى صيانة أكثر.\n- قسطرة الغسيل: أنبوب في وريد كبير بالرقبة، يُستخدم عند الحاجة العاجلة للغسيل أو عند تعذر الخيارات الأخرى.\n\nوللحفاظ على عمل الوصلة تُعالج المشكلات مبكراً:\n- توسيع الوصلة بالبالون: يُمرر بالون عبر إبرة لتوسيع الجزء المتضيق.\n- إزالة الجلطة: يمكن أحياناً إعادة فتح الوصلة أو الوصلة الصناعية المسدودة إذا عولجت بسرعة.',
        },
      },
      {
        id: 'recovery',
        title: { en: 'Recovery and fistula care', ar: 'التعافي ورعاية الوصلة' },
        body: {
          en: 'The arm may be sore and a little swollen for a few days. Keep it raised on a pillow, keep the dressing dry and move your fingers often. Gentle hand exercises, such as squeezing a soft ball, may be advised once the wound has settled.\n\nA fistula needs time to mature, usually several weeks and sometimes a few months. Follow-up visits, often with a Doppler scan, check that it is growing well before it is used for dialysis.\n\nLook after your fistula every day:\n- Feel for the thrill each morning and evening\n- No blood pressure cuffs, blood tests or drips on that arm\n- Avoid tight sleeves, watches and sleeping on the arm\n- Keep the skin clean and do not carry heavy bags on that arm',
          ar: 'قد تؤلمك الذراع وتتورم قليلاً لأيام قليلة. ارفعها على وسادة، وحافظ على الغيار جافاً، وحرك أصابعك كثيراً. وقد يُنصح بتمارين خفيفة لليد، مثل الضغط على كرة لينة، بعد أن يستقر الجرح.\n\nتحتاج الوصلة وقتاً حتى تنضج، عادة عدة أسابيع وأحياناً بضعة شهور. وفي زيارات المتابعة يُجرى غالباً فحص دوبلر للتأكد من نموها جيداً قبل استخدامها في الغسيل.\n\nاعتنِ بوصلتك يومياً:\n- تحسّس الرعشة كل صباح ومساء\n- لا قياس ضغط ولا تحاليل ولا كانيولا في هذه الذراع\n- تجنب الأكمام الضيقة والساعات والنوم على الذراع\n- حافظ على نظافة الجلد ولا تحمل أشياء ثقيلة بهذه الذراع',
        },
      },
      {
        id: 'when',
        title: { en: 'When to see a vascular surgeon', ar: 'متى تزور جراح الأوعية الدموية؟' },
        body: {
          en: 'Ideally, you should be seen months before dialysis is expected to start, so the fistula has time to mature and you can avoid a neck catheter. Ask your kidney doctor about referral early.\n\nContact the clinic the same day if:\n- The thrill is weaker or you cannot feel it at all: a clot treated early can sometimes be cleared\n- The dialysis team reports poor flow or high pressures\n- Bleeding after dialysis lasts much longer than usual\n- The skin over the fistula becomes red, hot or painful\n\nSeek emergency care if:\n- The fistula bleeds heavily: press firmly on it with a clean cloth and call for help\n- The skin over the fistula becomes thin, shiny or starts to break down\n- Your hand becomes cold, pale, numb or very painful',
          ar: 'يُفضل أن تكون الزيارة قبل بدء الغسيل المتوقع بشهور، حتى يكون لدى الوصلة وقت لتنضج وتتجنب قسطرة الرقبة. اسأل طبيب الكلى عن التحويل مبكراً.\n\nتواصل مع العيادة في نفس اليوم إذا:\n- ضعفت الرعشة أو لم تعد تشعر بها: فالجلطة التي تُعالج مبكراً يمكن أحياناً إزالتها\n- أبلغك فريق الغسيل بضعف التدفق أو ارتفاع الضغوط\n- استمر النزيف بعد الغسيل أطول كثيراً من المعتاد\n- احمر الجلد فوق الوصلة أو سخن أو آلمك\n\nاطلب الرعاية الطارئة إذا:\n- نزفت الوصلة بغزارة: اضغط عليها بقوة بقطعة قماش نظيفة واطلب المساعدة\n- أصبح الجلد فوق الوصلة رقيقاً أو لامعاً أو بدأ يتقرح\n- أصبحت يدك باردة أو شاحبة أو فقدت الإحساس أو اشتد ألمها',
        },
      },
    ],
    faqs: [
      {
        q: { en: 'How long before a new fistula can be used for dialysis?', ar: 'متى يمكن استخدام الوصلة الجديدة في الغسيل؟' },
        a: {
          en: 'Usually after several weeks, once it has matured. The vein needs time to grow larger and thicker so it can be needled safely. Some fistulas take longer, and a check-up with a Doppler scan helps decide when yours is ready.',
          ar: 'عادة بعد عدة أسابيع حين تنضج. فالوريد يحتاج وقتاً ليكبر ويزداد سمكاً حتى يمكن وخزه بأمان. وبعض الوصلات تستغرق وقتاً أطول، ويساعد الكشف مع فحص الدوبلر على تحديد موعد جاهزية وصلتك.',
        },
      },
      {
        q: { en: 'Is fistula surgery painful?', ar: 'هل عملية الوصلة مؤلمة؟' },
        a: {
          en: 'Most patients find it very manageable. It is done under local anaesthesia, so you are awake but the arm is numb. Afterwards the arm may be sore for a few days, and simple painkillers that are safe for your kidneys are usually enough.',
          ar: 'معظم المرضى يجدونها محتملة جداً. فهي تتم تحت تخدير موضعي، فتكون مستيقظاً والذراع مخدرة. وبعدها قد تؤلمك الذراع لأيام قليلة، وتكفي عادة المسكنات البسيطة الآمنة على الكلى.',
        },
      },
      {
        q: { en: 'What is the thrill, and why should I check it?', ar: 'ما هي الرعشة، ولماذا يجب أن أتحسسها؟' },
        a: {
          en: 'The thrill is the buzzing or purring feeling over a working fistula. It is caused by fast blood flow from the artery into the vein. Checking it daily is the simplest way to know your fistula is working, and a weaker thrill is a reason to call the same day.',
          ar: 'الرعشة هي الإحساس بالاهتزاز أو الطنين فوق الوصلة العاملة، وسببها تدفق الدم السريع من الشريان إلى الوريد. وتحسسها يومياً أبسط طريقة للتأكد من عمل الوصلة، وضعفها سبب للتواصل مع الطبيب في نفس اليوم.',
        },
      },
      {
        q: { en: 'Can a blocked fistula be saved?', ar: 'هل يمكن إنقاذ الوصلة المسدودة؟' },
        a: {
          en: 'Often yes, if it is treated quickly. A clot can sometimes be removed and the narrowing behind it widened with a balloon. The longer a fistula stays blocked, the harder it is to reopen, so do not wait until your next dialysis session to report it.',
          ar: 'غالباً نعم إذا عولجت بسرعة. فيمكن أحياناً إزالة الجلطة وتوسيع الضيق المسبب لها بالبالون. وكلما طالت فترة الانسداد صعبت إعادة فتح الوصلة، فلا تنتظر جلسة الغسيل التالية للإبلاغ عنها.',
        },
      },
    ],
  },

  /* ───────────────────────── Venous thrombosis (DVT) ───────────────────────── */
  'svc-dvt': {
    seoTitle: {
      en: 'Deep Vein Thrombosis (DVT): Same-Day Diagnosis and Care',
      ar: 'جلطات الأوردة العميقة: تشخيص في نفس اليوم وخطة علاج',
    },
    seoDescription: {
      en: 'A swollen, painful leg may be a deep vein clot. Get a same-day Doppler scan, a clear blood-thinner plan and long-term care to protect your leg veins.',
      ar: 'الساق المتورمة والمؤلمة قد تعني جلطة في وريد عميق. احصل على فحص دوبلر في نفس اليوم، وخطة واضحة لأدوية السيولة، ورعاية طويلة المدى لحماية أوردة ساقك.',
    },
    sections: [
      {
        id: 'what',
        title: { en: 'What is a deep vein thrombosis?', ar: 'ما هي جلطة الأوردة العميقة؟' },
        body: {
          en: 'A deep vein thrombosis (DVT) is a blood clot in one of the deep veins, usually in the calf or thigh, and sometimes in the pelvis or arm. The clot partly or fully blocks the vein, so blood struggles to return from the leg. This causes swelling, pain and warmth.\n\nA DVT needs prompt diagnosis for two reasons. First, part of the clot can break off and travel to the lungs. This is called a pulmonary embolism and can be life-threatening. Second, a clot can damage the valves inside the vein, leading to long-term swelling, aching and skin changes known as post-thrombotic syndrome.\n\nWith early treatment, most people recover well.',
          ar: 'جلطة الأوردة العميقة تخثر دموي في أحد الأوردة العميقة، غالباً في السمانة أو الفخذ، وأحياناً في الحوض أو الذراع. تسد الجلطة الوريد جزئياً أو كلياً، فيصعب رجوع الدم من الساق، مما يسبب تورماً وألماً وسخونة.\n\nتحتاج الجلطة إلى تشخيص سريع لسببين: أولاً، قد ينفصل جزء منها وينتقل إلى الرئة، وهو ما يسمى الانصمام الرئوي وقد يهدد الحياة. ثانياً، قد تتلف الجلطة الصمامات داخل الوريد، فتسبب تورماً وألماً مزمنين وتغيرات في الجلد تُعرف بمتلازمة ما بعد الجلطة.\n\nومع العلاج المبكر يتعافى معظم المرضى بشكل جيد.',
        },
      },
      {
        id: 'causes',
        title: { en: 'Causes and risk factors', ar: 'الأسباب وعوامل الخطورة' },
        body: {
          en: 'Clots form when blood flows slowly, when the vein wall is injured, or when the blood clots more easily than usual. Common risk factors include:\n- Recent surgery, especially hip, knee or abdominal operations\n- Being in bed or immobile for a long time, or a leg in plaster\n- Long journeys by plane, car or bus\n- Pregnancy and the weeks after giving birth\n- Hormonal contraceptive pills or hormone replacement therapy\n- Cancer and its treatment\n- A previous clot, or a family history of clots\n- Being overweight, dehydration or smoking\n\nSometimes no clear cause is found. In that case your doctor may suggest further tests.',
          ar: 'تتكون الجلطات عندما يتباطأ تدفق الدم، أو يُصاب جدار الوريد، أو يصبح الدم أسرع تجلطاً من المعتاد. ومن أشهر عوامل الخطورة:\n- جراحة حديثة، خاصة عمليات الفخذ أو الركبة أو البطن\n- ملازمة الفراش أو قلة الحركة لفترة طويلة، أو وضع الساق في جبس\n- السفر الطويل بالطائرة أو السيارة أو الحافلة\n- الحمل والأسابيع التالية للولادة\n- حبوب منع الحمل الهرمونية أو العلاج الهرموني التعويضي\n- الأورام وعلاجها\n- جلطة سابقة أو تاريخ عائلي للجلطات\n- زيادة الوزن أو الجفاف أو التدخين\n\nأحياناً لا يُعثر على سبب واضح، وفي هذه الحالة قد يقترح الطبيب فحوصات إضافية.',
        },
      },
      {
        id: 'diagnosis',
        title: { en: 'How a DVT is diagnosed', ar: 'كيف تُشخَّص الجلطة؟' },
        body: {
          en: 'The doctor asks when the symptoms started and about recent surgery, travel, illness or medicines, then examines both legs.\n\nThe main test is a duplex Doppler scan of the leg veins. It is painless, uses no radiation and usually gives an answer at the same visit. The scan shows whether there is a clot, how far it extends and whether it is in the deep or surface veins.\n\nA blood test called D-dimer (which rises when the body is breaking down a clot) may also be used, mainly to help rule a clot out. If you have breathlessness or chest pain, further tests for a lung clot are needed urgently. Bring any previous scans, blood tests and your current medicines.',
          ar: 'يسألك الطبيب عن وقت بدء الأعراض، وعن أي جراحة أو سفر أو مرض أو أدوية حديثة، ثم يفحص الساقين.\n\nالفحص الأساسي هو دوبلر أوردة الساق، وهو بلا ألم ولا إشعاع، ويعطي النتيجة عادة في نفس الزيارة. يوضح الفحص وجود الجلطة من عدمه، ومدى امتدادها، وما إذا كانت في الأوردة العميقة أو السطحية.\n\nوقد يُستخدم أيضاً تحليل دم يسمى دي-دايمر (يرتفع عندما يقوم الجسم بتفتيت جلطة)، وفائدته الأساسية المساعدة على استبعاد الجلطة. وإذا كان لديك ضيق تنفس أو ألم في الصدر فتلزم فحوصات عاجلة للبحث عن جلطة في الرئة. أحضر أي فحوصات أو تحاليل سابقة وقائمة أدويتك الحالية.',
        },
      },
      {
        id: 'treatment',
        title: { en: 'Treatment options', ar: 'خيارات العلاج' },
        body: {
          en: 'Most DVTs are treated with medicines, without any procedure:\n- Anticoagulants (blood thinners): these stop the clot growing and new clots forming while the body slowly dissolves the existing one. They are usually taken for at least three months, and sometimes longer depending on the cause. Tablets or injections may be used.\n- Compression stockings: these can ease swelling and aching once treatment has started; your doctor will advise if they suit you.\n- Catheter-directed treatment: for selected patients with a large clot in the main thigh or pelvic veins, a catheter is passed into the clot to dissolve it with medicine (thrombolysis) or remove it. This aims to relieve severe symptoms and reduce long-term damage to the vein.\n\nWalking is usually encouraged once treatment has started.',
          ar: 'تُعالج معظم الجلطات بالأدوية دون أي تدخل:\n- مضادات التجلط (أدوية السيولة): توقف نمو الجلطة وتمنع تكوّن جلطات جديدة بينما يذيب الجسم الجلطة الموجودة ببطء. تؤخذ عادة لمدة ثلاثة أشهر على الأقل، وأحياناً أطول حسب السبب، وقد تكون أقراصاً أو حقناً.\n- الجوارب الضاغطة: قد تخفف التورم والألم بعد بدء العلاج، وسيخبرك الطبيب إن كانت مناسبة لك.\n- العلاج بالقسطرة: لبعض المرضى المختارين الذين لديهم جلطة كبيرة في أوردة الفخذ أو الحوض الرئيسية، تُمرر قسطرة داخل الجلطة لإذابتها بالدواء أو إزالتها، بهدف تخفيف الأعراض الشديدة وتقليل الضرر طويل المدى للوريد.\n\nويُشجَّع المشي عادة بعد بدء العلاج.',
        },
      },
      {
        id: 'recovery',
        title: { en: 'Recovery and long-term care', ar: 'التعافي والرعاية طويلة المدى' },
        body: {
          en: 'Pain and swelling usually improve over days to weeks after starting a blood thinner. Some swelling can last longer, especially towards the end of the day.\n\nTake your blood thinner exactly as prescribed and do not stop it without advice. Tell any doctor or dentist that you take it, and report unusual bleeding, such as blood in the urine or black stools.\n\nA follow-up visit, often with a repeat scan, helps decide how long treatment should continue. Some people develop post-thrombotic syndrome, with lasting heaviness, swelling or skin changes. Staying active, raising the leg when resting and, if advised, wearing compression stockings help. If you have had a clot, ask about protection before future surgery, long travel or pregnancy.',
          ar: 'يتحسن الألم والتورم عادة خلال أيام إلى أسابيع من بدء أدوية السيولة، وقد يستمر بعض التورم فترة أطول، خاصة في آخر اليوم.\n\nتناول دواء السيولة كما وُصف لك تماماً ولا توقفه دون استشارة. أخبر أي طبيب أو طبيب أسنان بأنك تتناوله، وأبلغ عن أي نزيف غير معتاد مثل الدم في البول أو البراز الأسود.\n\nتساعد زيارة المتابعة، وغالباً مع فحص متكرر، على تحديد مدة استمرار العلاج. وقد يصاب بعض المرضى بمتلازمة ما بعد الجلطة مع ثقل أو تورم أو تغيرات مستمرة في الجلد، ويساعد على تخفيفها الحركة ورفع الساق عند الراحة وارتداء الجوارب الضاغطة إذا نُصحت بها. وإذا أصبت بجلطة من قبل، فاسأل عن الوقاية قبل أي جراحة أو سفر طويل أو حمل مستقبلاً.',
        },
      },
      {
        id: 'when',
        title: { en: 'When to seek help', ar: 'متى تطلب المساعدة؟' },
        body: {
          en: 'A suspected DVT should be checked the same day. Contact the clinic or a doctor promptly if you have:\n- Swelling of one leg, especially if it came on over hours or days\n- Pain, tenderness or cramping in the calf or thigh\n- Warm, red or discoloured skin on the leg\n- Any of these after surgery, a long journey, a period of bed rest, or during pregnancy\n\nCall an ambulance or go to the emergency department straight away if you have:\n- Sudden shortness of breath\n- Chest pain, especially when breathing in\n- Coughing up blood\n- Fainting, a racing heart or feeling very unwell\n- A leg that becomes massively swollen, blue and very painful',
          ar: 'يجب فحص أي اشتباه في جلطة الأوردة العميقة في نفس اليوم. تواصل مع العيادة أو طبيب سريعاً إذا كان لديك:\n- تورم في ساق واحدة، خاصة إذا ظهر خلال ساعات أو أيام\n- ألم أو إيلام أو تقلص في السمانة أو الفخذ\n- جلد ساخن أو محمر أو متغير اللون في الساق\n- أي مما سبق بعد جراحة أو سفر طويل أو ملازمة للفراش، أو أثناء الحمل\n\nاتصل بالإسعاف أو توجه إلى الطوارئ فوراً إذا كان لديك:\n- ضيق تنفس مفاجئ\n- ألم في الصدر، خاصة مع الشهيق\n- سعال مصحوب بدم\n- إغماء أو تسارع شديد في ضربات القلب أو شعور بتعب شديد\n- ساق أصبحت متورمة بشدة وزرقاء ومؤلمة جداً',
        },
      },
    ],
    faqs: [
      {
        q: { en: 'Can I walk if I have a DVT?', ar: 'هل يمكنني المشي إذا كانت لدي جلطة في الساق؟' },
        a: {
          en: 'Yes, in most cases walking is encouraged once you have started a blood thinner. Gentle activity helps the circulation and can ease swelling. Bed rest is not usually needed, but follow your doctor’s advice for your situation.',
          ar: 'نعم، في معظم الحالات يُشجَّع المشي بعد بدء أدوية السيولة. فالحركة الخفيفة تنشط الدورة الدموية وقد تخفف التورم، ولا يلزم عادة ملازمة الفراش، لكن اتبع نصيحة طبيبك في حالتك.',
        },
      },
      {
        q: { en: 'How long will I need blood thinners?', ar: 'كم مدة تناول أدوية السيولة؟' },
        a: {
          en: 'Usually for at least three months. If the clot had a clear, temporary cause such as surgery, treatment may stop after that. If there was no clear cause, or clots keep coming back, longer treatment may be advised after weighing the benefits against the bleeding risk.',
          ar: 'عادة لمدة ثلاثة أشهر على الأقل. فإذا كان للجلطة سبب واضح ومؤقت مثل جراحة، قد يتوقف العلاج بعدها. أما إذا لم يُعرف سبب واضح أو تكررت الجلطات، فقد يُنصح بعلاج أطول بعد الموازنة بين فائدته وخطر النزيف.',
        },
      },
      {
        q: { en: 'Is a Doppler scan safe in pregnancy?', ar: 'هل فحص الدوبلر آمن أثناء الحمل؟' },
        a: {
          en: 'Yes, a Doppler scan of the leg veins is safe in pregnancy. It uses sound waves, not radiation. Pregnancy raises the risk of clots, so a swollen, painful leg during pregnancy or after delivery should be scanned promptly.',
          ar: 'نعم، فحص دوبلر لأوردة الساق آمن أثناء الحمل، لأنه يعتمد على الموجات الصوتية وليس الإشعاع. والحمل يزيد خطر الجلطات، لذلك يجب فحص أي تورم أو ألم في الساق أثناء الحمل أو بعد الولادة سريعاً.',
        },
      },
      {
        q: { en: 'Can I travel by plane after a DVT?', ar: 'هل يمكنني السفر بالطائرة بعد الجلطة؟' },
        a: {
          en: 'Often yes, once you are stable on treatment, but ask your doctor first. On long journeys, walk around regularly, flex your ankles, drink enough water and wear compression stockings if advised. Avoid flying soon after a clot until your doctor agrees.',
          ar: 'غالباً نعم بعد استقرار حالتك على العلاج، لكن استشر طبيبك أولاً. وفي الرحلات الطويلة تحرك بانتظام، وحرّك كاحليك، واشرب ماءً كافياً، وارتدِ الجوارب الضاغطة إذا نُصحت بها، وتجنب السفر بالطائرة بعد الجلطة مباشرة حتى يوافق الطبيب.',
        },
      },
      {
        q: { en: 'Will the clot go away completely?', ar: 'هل تختفي الجلطة تماماً؟' },
        a: {
          en: 'In many people the clot shrinks or clears over weeks to months. Blood thinners do not dissolve the clot directly; they prevent it growing while the body breaks it down. Some scarring of the vein can remain, which is why follow-up and staying active matter.',
          ar: 'لدى كثيرين تصغر الجلطة أو تختفي خلال أسابيع إلى شهور. فأدوية السيولة لا تذيب الجلطة مباشرة، بل تمنع نموها بينما يفتتها الجسم. وقد يبقى بعض التليف في الوريد، ولهذا تهم المتابعة والحفاظ على الحركة.',
        },
      },
    ],
  },
  /* ───────────────────────── Aortic aneurysm ───────────────────────── */
  'svc-aneurysm': {
    seoTitle: {
      en: 'Abdominal Aortic Aneurysm: Surveillance and EVAR Repair',
      ar: 'تمدد الشريان الأورطي البطني: المتابعة والإصلاح بالدعامة',
    },
    seoDescription: {
      en: 'Most aortic aneurysms cause no symptoms. Get a clear scan, regular ultrasound surveillance and, when the size calls for it, repair by stent-graft or surgery.',
      ar: 'معظم تمددات الأورطي لا تسبب أعراضاً. احصل على فحص واضح ومتابعة منتظمة بالموجات الصوتية، وعندما يستدعي الحجم ذلك إصلاح بالدعامة المغطاة أو بالجراحة.',
    },
    sections: [
      {
        id: 'what',
        title: { en: 'What is an aortic aneurysm?', ar: 'ما هو تمدد الشريان الأورطي؟' },
        body: {
          en: 'The aorta is the main artery that carries blood from the heart down through the chest and abdomen. An abdominal aortic aneurysm (AAA) is a weakened section of its wall in the abdomen that has stretched and widened, like a balloon.\n\nMost aneurysms grow slowly and cause no symptoms at all. They are usually found by chance on an ultrasound or CT scan done for another reason, or through screening.\n\nThey matter because a large aneurysm can burst (rupture), causing severe internal bleeding that is often fatal. The risk of rupture rises as the aneurysm gets bigger. The aim of care is to watch small aneurysms safely and repair larger ones before they cause harm.',
          ar: 'الأورطي هو الشريان الرئيسي الذي يحمل الدم من القلب نزولاً عبر الصدر والبطن. وتمدد الأورطي البطني منطقة ضعيفة في جداره داخل البطن تمددت واتسعت مثل البالون.\n\nمعظم التمددات تكبر ببطء ولا تسبب أي أعراض، وتُكتشف عادة بالصدفة في أشعة موجات صوتية أو أشعة مقطعية لسبب آخر، أو من خلال فحص الكشف المبكر.\n\nوتكمن أهميته في أن التمدد الكبير قد ينفجر، مسبباً نزيفاً داخلياً شديداً كثيراً ما يكون قاتلاً، ويزداد خطر الانفجار مع زيادة حجم التمدد. والهدف من الرعاية متابعة التمددات الصغيرة بأمان وإصلاح الكبيرة قبل أن تسبب ضرراً.',
        },
      },
      {
        id: 'causes',
        title: { en: 'Causes and risk factors', ar: 'الأسباب وعوامل الخطورة' },
        body: {
          en: 'An aneurysm develops when the wall of the aorta weakens over time. The main risk factors are:\n- Smoking, now or in the past, which is the most important one\n- Being male and over 65\n- A parent, brother or sister who had an aneurysm\n- High blood pressure\n- Other artery disease, such as heart disease or narrowed leg arteries\n- High cholesterol\n\nWomen get aneurysms less often, but when they do, the aneurysm may be more likely to rupture at a smaller size. Because aneurysms are silent, many guidelines recommend a one-off ultrasound check for men around 65, and for others at higher risk, such as those with a strong family history.',
          ar: 'يحدث التمدد عندما يضعف جدار الأورطي مع الوقت. وأهم عوامل الخطورة:\n- التدخين حالياً أو سابقاً، وهو الأهم\n- الذكور فوق سن ٦٥\n- إصابة أحد الوالدين أو الإخوة بتمدد\n- ارتفاع ضغط الدم\n- أمراض شرايين أخرى، مثل أمراض القلب أو ضيق شرايين الساقين\n- ارتفاع الكوليسترول\n\nتصاب النساء بالتمدد بنسبة أقل، لكن عند إصابتهن قد يكون احتمال انفجاره أعلى عند حجم أصغر. ولأن التمدد صامت، توصي إرشادات كثيرة بفحص واحد بالموجات الصوتية للرجال في سن ٦٥ تقريباً، ولغيرهم ممن لديهم خطورة أعلى مثل وجود تاريخ عائلي قوي.',
        },
      },
      {
        id: 'diagnosis',
        title: { en: 'How it is diagnosed', ar: 'كيف يُشخَّص التمدد؟' },
        body: {
          en: 'The first test is usually an abdominal ultrasound. It is quick, painless, uses no radiation and measures the width of the aorta accurately. A normal abdominal aorta is about 2 cm wide; an aorta of 3 cm or more is called an aneurysm.\n\nIf the aneurysm is large or repair is being considered, a CT angiogram (a CT scan with dye) shows its exact shape and length and whether a stent-graft is suitable.\n\nAt the visit, the doctor also reviews your heart, lungs, kidneys and blood pressure, as these affect the choice and timing of treatment. For an abdominal ultrasound you may be asked not to eat for a few hours beforehand, so less gas is in the bowel. Bring all previous scans and reports, as comparing sizes over time is important.',
          ar: 'الفحص الأول عادة أشعة موجات صوتية على البطن، وهي سريعة وبلا ألم ولا إشعاع، وتقيس قطر الأورطي بدقة. القطر الطبيعي للأورطي البطني نحو ٢ سم، وإذا بلغ ٣ سم أو أكثر يسمى تمدداً.\n\nإذا كان التمدد كبيراً أو كان الإصلاح وارداً، توضح الأشعة المقطعية بالصبغة شكله وطوله بدقة، وما إذا كانت الدعامة المغطاة مناسبة.\n\nفي الزيارة يراجع الطبيب أيضاً حالة القلب والرئتين والكلى وضغط الدم، لأنها تؤثر على اختيار العلاج وتوقيته. وقبل أشعة البطن قد يُطلب منك الصيام لبضع ساعات لتقليل الغازات في الأمعاء. أحضر كل الفحوصات والتقارير السابقة، فمقارنة الحجم عبر الوقت أمر مهم.',
        },
      },
      {
        id: 'treatment',
        title: { en: 'Treatment options', ar: 'خيارات العلاج' },
        body: {
          en: 'Treatment depends mainly on the size of the aneurysm, how fast it is growing and whether it causes symptoms:\n- Ultrasound surveillance: small aneurysms are measured regularly, from yearly to every few months as they grow. The risk of rupture from a small aneurysm is low, and surveillance is the safest plan.\n- Risk-factor control: stopping smoking, controlling blood pressure, and usually a statin and an antiplatelet to protect the heart and arteries.\n- EVAR stent-graft: once an aneurysm reaches the size for repair, often around 5.5 cm in men and a little smaller in women, or grows quickly, a fabric-covered stent is placed inside it through the groin arteries. Blood then flows through the graft, taking pressure off the weak wall.\n- Open repair: through a cut in the abdomen, the aneurysm is replaced with a synthetic tube. It is a bigger operation but may suit some aneurysm shapes and younger, fitter patients better.',
          ar: 'يعتمد العلاج أساساً على حجم التمدد وسرعة نموه ووجود أعراض:\n- المتابعة بالموجات الصوتية: تُقاس التمددات الصغيرة بانتظام، من مرة سنوياً إلى كل بضعة أشهر كلما كبرت. خطر انفجار التمدد الصغير منخفض، والمتابعة هي الخطة الأكثر أماناً.\n- ضبط عوامل الخطورة: التوقف عن التدخين، وضبط ضغط الدم، وغالباً دواء من مجموعة الستاتين ومضاد للصفائح لحماية القلب والشرايين.\n- الدعامة المغطاة: عندما يصل التمدد إلى الحجم الذي يستدعي الإصلاح، وهو غالباً نحو ٥٫٥ سم عند الرجال وأقل قليلاً عند النساء، أو إذا كبر بسرعة، توضع داخله دعامة مكسوة بنسيج عبر شرايين أعلى الفخذ، فيمر الدم عبرها ويزول الضغط عن الجدار الضعيف.\n- الإصلاح الجراحي المفتوح: عبر فتح البطن يُستبدل الجزء المتمدد بأنبوب صناعي. وهي عملية أكبر، لكنها قد تناسب بعض أشكال التمدد والمرضى الأصغر سناً والأفضل صحة.',
        },
      },
      {
        id: 'recovery',
        title: { en: 'Recovery and follow-up', ar: 'التعافي والمتابعة' },
        body: {
          en: 'After EVAR, most patients stay in hospital for one or two nights and return to normal daily activities within a week or two. Avoid heavy lifting while the groin punctures heal.\n\nAfter open repair, the hospital stay is longer, usually about a week, and full recovery takes several weeks to a few months.\n\nFollow-up is essential. After EVAR you will need scans for life, usually ultrasound and sometimes CT, to check that the stent-graft stays in place and that no blood is leaking back into the aneurysm sac (an endoleak). Most problems found this way can be treated with another minor procedure. Whatever the treatment, keep taking your heart and blood pressure medicines and stay off cigarettes.',
          ar: 'بعد الدعامة المغطاة يبقى معظم المرضى في المستشفى ليلة أو ليلتين، ويعودون إلى أنشطتهم اليومية المعتادة خلال أسبوع أو أسبوعين، مع تجنب حمل الأشياء الثقيلة حتى تلتئم ثقوب أعلى الفخذ.\n\nأما بعد الإصلاح المفتوح فالإقامة بالمستشفى أطول، عادة نحو أسبوع، والتعافي الكامل يستغرق من عدة أسابيع إلى بضعة شهور.\n\nالمتابعة ضرورية. فبعد الدعامة المغطاة تحتاج إلى فحوصات مدى الحياة، عادة بالموجات الصوتية وأحياناً بالأشعة المقطعية، للتأكد من بقاء الدعامة في مكانها وعدم تسرب الدم مرة أخرى إلى كيس التمدد. ومعظم المشكلات التي تُكتشف بهذه الطريقة يمكن علاجها بإجراء بسيط آخر. وأياً كان العلاج، واظب على أدوية القلب والضغط وابتعد عن التدخين.',
        },
      },
      {
        id: 'when',
        title: { en: 'When to see a vascular surgeon', ar: 'متى تزور جراح الأوعية الدموية؟' },
        body: {
          en: 'Book a visit if a scan has shown a widened aorta, if you are a man around 65 who has smoked, or if a close relative had an aortic aneurysm. Also book if you feel a pulsating lump in your abdomen.\n\nSee a doctor urgently, the same day, if you have a known aneurysm and develop:\n- New pain in the abdomen, back or side that does not settle\n- Tenderness over the aneurysm\n\nCall an ambulance straight away if you have:\n- Sudden, severe pain in the abdomen or back, sometimes spreading to the groin or legs\n- Fainting, dizziness, sweating or a racing heart\n- Collapse\n\nThese can be signs of a rupture, which needs emergency surgery. Tell the paramedics you have an aneurysm, if you know about it.',
          ar: 'احجز موعداً إذا أظهرت أشعة اتساعاً في الأورطي، أو إذا كنت رجلاً في سن ٦٥ تقريباً ومدخناً حالياً أو سابقاً، أو إذا أصيب أحد أقاربك من الدرجة الأولى بتمدد في الأورطي. واحجز أيضاً إذا شعرت بكتلة نابضة في بطنك.\n\nراجع الطبيب بشكل عاجل في نفس اليوم إذا كان لديك تمدد معروف وظهر لديك:\n- ألم جديد في البطن أو الظهر أو الجنب لا يهدأ\n- ألم عند الضغط فوق مكان التمدد\n\nاتصل بالإسعاف فوراً إذا شعرت بـ:\n- ألم مفاجئ وشديد في البطن أو الظهر، قد يمتد أحياناً إلى أعلى الفخذ أو الساقين\n- إغماء أو دوار أو تعرق أو تسارع في ضربات القلب\n- انهيار مفاجئ\n\nقد تكون هذه علامات انفجار التمدد الذي يحتاج إلى جراحة طارئة. أخبر المسعفين بأن لديك تمدداً إذا كنت تعلم بذلك.',
        },
      },
    ],
    faqs: [
      {
        q: { en: 'Does every aortic aneurysm need an operation?', ar: 'هل يحتاج كل تمدد في الأورطي إلى عملية؟' },
        a: {
          en: 'No, most small aneurysms are safely watched with regular ultrasound scans. Repair is usually advised only when the aneurysm reaches a certain size, grows quickly or causes symptoms. Until then, controlling blood pressure and stopping smoking are the most useful steps.',
          ar: 'لا، فمعظم التمددات الصغيرة تُتابع بأمان بفحوصات الموجات الصوتية المنتظمة. ولا يُنصح بالإصلاح عادة إلا إذا وصل التمدد إلى حجم معين، أو كبر بسرعة، أو سبب أعراضاً. وحتى ذلك الحين يُعد ضبط الضغط والتوقف عن التدخين أهم الخطوات.',
        },
      },
      {
        q: { en: 'What is the difference between EVAR and open repair?', ar: 'ما الفرق بين الدعامة المغطاة والإصلاح الجراحي المفتوح؟' },
        a: {
          en: 'EVAR relines the aneurysm from the inside through the groin, while open repair replaces it through a cut in the abdomen. EVAR usually means a shorter hospital stay and faster recovery but needs lifelong scans. Open repair is a bigger operation but may need less follow-up imaging.',
          ar: 'الدعامة المغطاة تبطن التمدد من الداخل عبر أعلى الفخذ، بينما يستبدله الإصلاح المفتوح عبر فتح البطن. وتعني الدعامة عادة إقامة أقصر بالمستشفى وتعافياً أسرع، لكنها تحتاج إلى فحوصات مدى الحياة، أما الإصلاح المفتوح فعملية أكبر لكنه قد يحتاج متابعة أقل بالأشعة.',
        },
      },
      {
        q: { en: 'Can I exercise with an aortic aneurysm?', ar: 'هل يمكنني ممارسة الرياضة مع وجود تمدد في الأورطي؟' },
        a: {
          en: 'Yes, regular moderate exercise such as walking is generally encouraged. It helps blood pressure and overall heart health. Very heavy lifting or straining may not be advised, especially with larger aneurysms, so ask your doctor what suits you.',
          ar: 'نعم، يُشجَّع عموماً على الرياضة المعتدلة المنتظمة مثل المشي، فهي تساعد على ضبط الضغط وصحة القلب. لكن قد لا يُنصح برفع الأثقال الشديدة أو المجهود العنيف، خاصة مع التمددات الأكبر، فاسأل طبيبك عما يناسبك.',
        },
      },
      {
        q: { en: 'Should my family be checked for an aneurysm?', ar: 'هل يجب فحص أفراد عائلتي للكشف عن التمدد؟' },
        a: {
          en: 'It is often worth it, especially for brothers and sisters. Aneurysms can run in families, and having a parent, brother or sister with one raises the risk. A simple abdominal ultrasound is quick, painless and uses no radiation.',
          ar: 'غالباً يستحق ذلك، خاصة للإخوة والأخوات. فالتمدد قد يتكرر في العائلة الواحدة، وإصابة أحد الوالدين أو الإخوة تزيد احتمال الإصابة. وفحص الموجات الصوتية على البطن بسيط وسريع وبلا ألم ولا إشعاع.',
        },
      },
    ],
  },

  /* ───────────────────────── Duplex Doppler scan ───────────────────────── */
  'svc-doppler': {
    seoTitle: {
      en: 'Duplex Doppler Scan of Veins and Arteries in the Clinic',
      ar: 'فحص الدوبلر الملون للأوردة والشرايين داخل العيادة',
    },
    seoDescription: {
      en: 'A duplex Doppler scan is a painless ultrasound of your veins and arteries. Get a 15–30 minute in-clinic scan with results explained at the same visit.',
      ar: 'فحص الدوبلر موجات صوتية بلا ألم للأوردة والشرايين. احصل على فحص داخل العيادة لمدة ١٥–٣٠ دقيقة، مع شرح النتائج من الطبيب في نفس الزيارة.',
    },
    sections: [
      {
        id: 'what',
        title: { en: 'What is a duplex Doppler scan?', ar: 'ما هو فحص الدوبلر؟' },
        body: {
          en: 'A duplex Doppler scan is a type of ultrasound that does two things at once. It shows a picture of the blood vessel, and it measures the speed and direction of blood flowing through it. Colour on the screen shows which way the blood is moving.\n\nThe scan is painless and uses sound waves, not radiation, so it can be repeated as often as needed. A small probe with cool gel is moved over the skin. You may hear a whooshing sound, which is your blood flow.\n\nMost decisions in vascular surgery start with this scan. It shows whether a vein is leaking, an artery is narrowed or a clot is present, and you can see the images with the doctor as they are explained.',
          ar: 'فحص الدوبلر نوع من الموجات الصوتية يؤدي وظيفتين معاً: يُظهر صورة للوعاء الدموي، ويقيس سرعة الدم المتدفق فيه واتجاهه، وتوضح الألوان على الشاشة اتجاه حركة الدم.\n\nالفحص بلا ألم ويعتمد على الموجات الصوتية لا الإشعاع، لذلك يمكن تكراره كلما لزم الأمر. يُمرر مجس صغير مع جل بارد على الجلد، وقد تسمع صوتاً يشبه الحفيف وهو صوت تدفق دمك.\n\nتبدأ معظم القرارات في جراحة الأوعية الدموية من هذا الفحص، فهو يوضح ما إذا كان هناك ارتجاع في وريد أو ضيق في شريان أو جلطة، ويمكنك مشاهدة الصور مع الطبيب أثناء شرحها.',
        },
      },
      {
        id: 'causes',
        title: { en: 'Who needs a Doppler scan?', ar: 'من يحتاج إلى فحص الدوبلر؟' },
        body: {
          en: 'Your doctor may suggest a Doppler scan if you have:\n- Varicose veins, leg heaviness, ankle swelling or skin changes around the ankle\n- A swollen, painful leg or arm where a clot is suspected\n- Calf pain on walking, cold feet or weak foot pulses\n- Diabetes with numbness, a wound or colour change in the foot\n- A recent mini-stroke or stroke, or a narrowing heard in the neck arteries (carotid duplex)\n- A need for dialysis access, or a fistula that is not working well\n- A known aortic aneurysm that needs regular measuring\n\nIt is also used before and after vascular procedures, to plan treatment and to check that stents, bypasses or treated veins are working.',
          ar: 'قد يقترح طبيبك فحص الدوبلر إذا كان لديك:\n- دوالي أو ثقل في الساقين أو تورم في الكاحل أو تغيرات في الجلد حوله\n- ساق أو ذراع متورمة ومؤلمة مع اشتباه في جلطة\n- ألم في السمانة أثناء المشي أو برودة في القدمين أو ضعف النبض فيهما\n- سكري مع تنميل أو جرح أو تغير في لون القدم\n- سكتة دماغية بسيطة أو كاملة حديثة، أو اشتباه في ضيق شرايين الرقبة (دوبلر الشرايين السباتية)\n- حاجة إلى وصلة للغسيل الكلوي، أو وصلة لا تعمل جيداً\n- تمدد معروف في الأورطي يحتاج إلى قياس منتظم\n\nويُستخدم أيضاً قبل إجراءات الأوعية وبعدها، للتخطيط للعلاج وللتأكد من عمل الدعامات أو التحويلات أو الأوردة المعالجة.',
        },
      },
      {
        id: 'diagnosis',
        title: { en: 'What happens during the scan', ar: 'ماذا يحدث أثناء الفحص؟' },
        body: {
          en: 'The scan is done in the clinic and usually takes 15–30 minutes, depending on how many vessels are checked.\n\nYou will lie on a couch, or stand for a vein reflux study, because leaking valves show best when you are upright. Gel is applied and the probe is pressed gently over the vessels. For a vein study, the doctor may squeeze your calf briefly to test the valves. For an arterial study, blood pressure cuffs on your ankles and arms may be used to measure the ankle–brachial index (a blood pressure comparison between ankle and arm).\n\nHow to prepare:\n- Wear loose, comfortable clothing that is easy to roll up or remove\n- For leg and arm scans, no special preparation is needed\n- For a scan of the abdomen or aorta, you may be asked not to eat for a few hours\n- Bring previous scans, reports and your medicines list',
          ar: 'يُجرى الفحص داخل العيادة ويستغرق عادة ١٥–٣٠ دقيقة حسب عدد الأوعية التي تُفحص.\n\nتستلقي على سرير الفحص، أو تقف في حالة دراسة ارتجاع الأوردة، لأن الصمامات التالفة تظهر بوضوح أكبر في وضع الوقوف. يوضع الجل ويُمرر المجس بلطف فوق الأوعية. وفي فحص الأوردة قد يضغط الطبيب على السمانة لحظياً لاختبار الصمامات، وفي فحص الشرايين قد تُستخدم أكمام قياس الضغط على الكاحلين والذراعين لقياس مؤشر الكاحل والعضد (مقارنة ضغط الدم عند الكاحل وعند الذراع).\n\nكيف تستعد:\n- ارتدِ ملابس واسعة ومريحة يسهل رفعها أو خلعها\n- لا يحتاج فحص الساقين أو الذراعين إلى أي تحضير خاص\n- لفحص البطن أو الأورطي قد يُطلب منك الصيام لبضع ساعات\n- أحضر الفحوصات والتقارير السابقة وقائمة أدويتك',
        },
      },
      {
        id: 'treatment',
        title: { en: 'What the scan shows', ar: 'ماذا يُظهر الفحص؟' },
        body: {
          en: 'Different scans answer different questions:\n- Venous reflux study: shows which vein valves are leaking and where, which guides varicose vein treatment.\n- Venous scan for clots: shows whether there is a clot in the deep or surface veins, and how far it extends.\n- Arterial duplex and ABI: shows where leg arteries are narrowed or blocked and how much blood flow reaches the foot.\n- Carotid duplex: measures any narrowing in the neck arteries that supply the brain.\n- Fistula assessment: maps arm veins before access surgery and checks the flow and any narrowing in an existing fistula.\n- Aortic scan: measures the width of the abdominal aorta to find or follow an aneurysm.\n\nUltrasound has limits. Very stiff, calcified arteries, deep vessels or a lot of bowel gas can make some areas harder to see, and a CT scan is occasionally needed as well.',
          ar: 'تجيب الفحوصات المختلفة عن أسئلة مختلفة:\n- دراسة ارتجاع الأوردة: توضح أي صمامات الأوردة لا تعمل وأين، لتوجيه علاج الدوالي.\n- فحص الأوردة للجلطات: يوضح وجود جلطة في الأوردة العميقة أو السطحية ومدى امتدادها.\n- دوبلر الشرايين ومؤشر الكاحل: يوضح أماكن الضيق أو الانسداد في شرايين الساق ومقدار الدم الواصل إلى القدم.\n- دوبلر الشرايين السباتية: يقيس أي ضيق في شرايين الرقبة المغذية للمخ.\n- تقييم الوصلة: يرسم خريطة أوردة الذراع قبل جراحة الوصلة، ويقيس التدفق ويكشف أي ضيق في الوصلة الحالية.\n- فحص الأورطي: يقيس قطر الأورطي البطني لاكتشاف التمدد أو متابعته.\n\nللموجات الصوتية حدود، فالشرايين شديدة التكلس أو الأوعية العميقة أو كثرة الغازات في الأمعاء قد تصعّب رؤية بعض المناطق، وأحياناً تلزم أشعة مقطعية أيضاً.',
        },
      },
      {
        id: 'recovery',
        title: { en: 'After the scan and your results', ar: 'بعد الفحص والنتائج' },
        body: {
          en: 'There is no recovery time. The gel is wiped off and you can go straight back to your normal activities, drive and eat as usual.\n\nIn most cases the doctor explains the findings during or right after the scan, at the same visit, and you can see the images on the screen. You will usually receive a written report that you should keep with your medical records.\n\nIf treatment is needed, the scan results form the basis of the plan. Some conditions, such as aneurysms, stents or fistulas, need repeat scans over time, so your doctor will tell you when the next one is due. Keep your reports and bring them to every visit, as comparing scans is often as useful as a single result.',
          ar: 'لا يحتاج الفحص إلى أي فترة تعافٍ، فيُمسح الجل ويمكنك العودة فوراً إلى أنشطتك المعتادة والقيادة وتناول الطعام كالمعتاد.\n\nفي معظم الحالات يشرح الطبيب النتائج أثناء الفحص أو بعده مباشرة في نفس الزيارة، ويمكنك مشاهدة الصور على الشاشة، وتحصل عادة على تقرير مكتوب احتفظ به مع أوراقك الطبية.\n\nإذا احتجت إلى علاج، تكون نتائج الفحص أساس الخطة. وبعض الحالات، مثل التمددات والدعامات والوصلات، تحتاج إلى فحوصات متكررة مع الوقت، وسيخبرك الطبيب بموعد الفحص التالي. احتفظ بتقاريرك وأحضرها في كل زيارة، فمقارنة الفحوصات كثيراً ما تكون مفيدة بقدر النتيجة الواحدة.',
        },
      },
      {
        id: 'when',
        title: { en: 'When to get a scan, and when not to wait', ar: 'متى تحتاج إلى الفحص، ومتى لا تنتظر؟' },
        body: {
          en: 'Book a scan if you have leg aching, heaviness, swelling or visible veins, pain in the calf when walking, a foot wound with diabetes, or if your doctor has asked for a check of your arteries, veins or fistula.\n\nArrange a same-day scan if you have:\n- Sudden swelling and pain in one leg or arm\n- A fistula with a weak or absent thrill\n\nDo not wait for a clinic scan. Go to the emergency department or call an ambulance if you have:\n- Sudden breathlessness, chest pain or coughing up blood\n- A leg or foot that suddenly becomes cold, pale, numb or very painful\n- Sudden severe abdominal or back pain, especially with a known aneurysm\n- Sudden weakness of the face, arm or leg, slurred speech or loss of vision',
          ar: 'احجز فحصاً إذا كان لديك ألم أو ثقل أو تورم في الساقين أو أوردة ظاهرة، أو ألم في السمانة أثناء المشي، أو جرح في القدم مع السكري، أو إذا طلب طبيبك فحص شرايينك أو أوردتك أو وصلتك.\n\nرتّب لفحص في نفس اليوم إذا كان لديك:\n- تورم وألم مفاجئ في ساق أو ذراع واحدة\n- وصلة غسيل ضعفت فيها الرعشة أو اختفت\n\nلا تنتظر فحص العيادة، بل توجه إلى الطوارئ أو اتصل بالإسعاف إذا كان لديك:\n- ضيق تنفس مفاجئ أو ألم في الصدر أو سعال مصحوب بدم\n- ساق أو قدم أصبحت فجأة باردة أو شاحبة أو فقدت الإحساس أو اشتد ألمها\n- ألم مفاجئ وشديد في البطن أو الظهر، خاصة مع تمدد معروف\n- ضعف مفاجئ في الوجه أو الذراع أو الساق، أو تلعثم في الكلام، أو فقدان للرؤية',
        },
      },
    ],
    faqs: [
      {
        q: { en: 'Is a Doppler scan painful?', ar: 'هل فحص الدوبلر مؤلم؟' },
        a: {
          en: 'No, a Doppler scan is painless. You feel only the cool gel and light pressure from the probe. If a leg is very swollen or tender, the pressure may be a little uncomfortable, and the doctor will be as gentle as possible.',
          ar: 'لا، فحص الدوبلر بلا ألم. تشعر فقط ببرودة الجل وضغط خفيف من المجس. وإذا كانت الساق شديدة التورم أو الألم فقد يكون الضغط مزعجاً قليلاً، وسيحرص الطبيب على أن يكون لطيفاً قدر الإمكان.',
        },
      },
      {
        q: { en: 'Is a Doppler scan safe in pregnancy?', ar: 'هل فحص الدوبلر آمن أثناء الحمل؟' },
        a: {
          en: 'Yes, a Doppler scan of the veins or arteries is safe in pregnancy. It uses sound waves and no radiation. It is the standard test when a clot is suspected in a pregnant woman, so do not delay it.',
          ar: 'نعم، فحص دوبلر الأوردة أو الشرايين آمن أثناء الحمل، لأنه يعتمد على الموجات الصوتية دون أي إشعاع. وهو الفحص المعتاد عند الاشتباه في جلطة لدى السيدة الحامل، فلا تؤجليه.',
        },
      },
      {
        q: { en: 'Do I need to fast before a Doppler scan?', ar: 'هل أحتاج إلى الصيام قبل فحص الدوبلر؟' },
        a: {
          en: 'Usually not; scans of the legs, arms and neck need no fasting. For a scan of the abdomen or aorta, you may be asked not to eat for a few hours, because bowel gas can block the view. Take your usual medicines unless told otherwise.',
          ar: 'غالباً لا، ففحص الساقين والذراعين والرقبة لا يحتاج إلى صيام. أما فحص البطن أو الأورطي فقد يُطلب فيه الصيام لبضع ساعات، لأن غازات الأمعاء قد تحجب الرؤية. وتناول أدويتك المعتادة ما لم يُطلب منك غير ذلك.',
        },
      },
      {
        q: { en: 'How long does a Doppler scan take?', ar: 'كم يستغرق فحص الدوبلر؟' },
        a: {
          en: 'Most scans take 15–30 minutes. A single leg check for a clot is usually quicker, while a full vein map of both legs or a combined arterial study takes longer. You can go back to normal activities straight afterwards.',
          ar: 'تستغرق معظم الفحوصات ١٥–٣٠ دقيقة. ففحص ساق واحدة للبحث عن جلطة يكون عادة أسرع، بينما يستغرق رسم خريطة كاملة لأوردة الساقين أو فحص الشرايين الشامل وقتاً أطول. ويمكنك العودة إلى أنشطتك المعتادة بعده مباشرة.',
        },
      },
      {
        q: { en: 'Can a Doppler scan replace a CT angiogram?', ar: 'هل يغني فحص الدوبلر عن الأشعة المقطعية بالصبغة؟' },
        a: {
          en: 'Often yes, especially for veins and for many leg artery problems. Doppler has no radiation or dye, so it is usually the first test. A CT angiogram may still be needed to plan some procedures, such as aneurysm repair or complex artery treatment.',
          ar: 'غالباً نعم، خاصة في فحص الأوردة وكثير من مشكلات شرايين الساق. فالدوبلر بلا إشعاع ولا صبغة، لذا يكون عادة الفحص الأول. لكن قد تظل الأشعة المقطعية بالصبغة لازمة للتخطيط لبعض الإجراءات، مثل إصلاح التمدد أو علاج الشرايين المعقد.',
        },
      },
    ],
  },
}

import type { Dict } from './types'

/**
 * DRAFT translation: needs review by a native speaker before launch.
 * Uzbek in Latin script. Use ʻ (U+02BB) in oʻ / gʻ and ʼ (U+02BC) for the tutuq belgisi so the font can show them.
 */
export const uz: Dict = {
  languageName: 'Oʻzbekcha',
  meta: {
    title: 'Toshkentda self-service kirxona, 24 soat ochiq | Londry',
    description:
      'Londry — Toshkentdagi 24 soat ochiq self-service kirxona: ilova orqali katta hajmdagi kirni tez yuving va quriting. Nozik buyumlar uchun SPOTX akva tozalash.',
  },
  a11y: {
    skip: 'Asosiy mazmunga oʻtish',
    menu: 'Menyu',
    language: 'Til',
    home: 'Londry — bosh sahifa',
    mainNav: 'Asosiy navigatsiya',
  },
  nav: { services: 'Xizmatlar', partners: 'Hamkorlar', locations: 'Filiallar', contact: 'Aloqa' },
  header: { cta: 'Ilovani yuklab olish', ctaShort: 'Yuklab olish' },
  stores: { appStoreLead: 'Yuklab olish', googlePlayLead: 'Yuklab olish', soon: 'Tez orada' },
  hero: {
    eyebrow: 'Self-service kirxona · Toshkent',
    titleA: 'Toza kiyim,',
    titleB: 'kutmasdan.',
    lead: 'Katta hajmdagi kirlarni energiya tejamkor mashinalarimizda tez yuving va quriting — yoki nozik buyumlaringizni SPOTX akva tozalashga topshiring. Hammasi Londry ilovasida boshlanadi.',
    checks: ['Toshkentda 2 ta filial', 'Katta yuklar, tez quritish', 'Oʻzbek · Rus · Ingliz'],
    screenshotAlt: 'Londry ilovasining bosh ekrani: kir yuvish, quritish yoki mashinani band qilish',
  },
  reviews: {
    label: 'Mijozlarning Google’dagi sharhlari',
    rating: 'Google reytingi',
    quoteSource: 'Google sharhi',
  },
  strip: {
    callLabel: 'Qoʻngʻiroq qiling',
    branchLabel: 'Filialni toping',
    branchValue: 'Talabalar · Yunusobod',
    followLabel: 'Bizni kuzating',
  },
  services: {
    eyebrow: 'Xizmatlarimiz',
    title: 'Kiyimingizga nima kerakligini tanlang',
    londry: {
      eyebrow: 'Self-service kirxona',
      title: 'Londry',
      paragraphs: [
        'Qanday qilib kir yuvishni yanada osonlashtirishni bilmoqchimisiz? Biz sizga LONDRY da eng ilgʻor texnologiyalar asosida yuqori sifatli kir yuvish xizmatlarini taklif etib, hayotingizni yanada qulay qilishga intilamiz.',
        '**Londry sizga qanday afzaliklarni beradi?** Bizda katta hajmdagi kirlarni yuvishga yordam beradigan zamonaviy, energiya tejovchi kir yuvish mashinalari va quritgich mashinalarni keng tanlovi mavjud. Uskunalarimiz kirlaringizni yumshoq boʻlishi, shuningdek, tez va samarali quritishni taʼminlaydi.',
        'Kir yuvishni kechiktirmang, LONDRYga tashrif buyuring!',
      ],
      chips: ['Energiya tejamkor', 'Katta yuklar', 'Tez quritish'],
      photoAlts: [
        'Kir yuvish mashinasi barabaniga kir solayotgan qoʻl',
        'Kir yuvish mashinasining tanga uyasiga jeton tashlayotgan qoʻl',
        'Kir yuvish mashinasining boshqaruv panelida dastur tugmasini bosayotgan qoʻl',
      ],
    },
    spotx: {
      eyebrow: 'Akva tozalash',
      title: 'SPOTX',
      text: 'Kiyimlar, nozik mato va qimmat toʻqimachilik mahsulotlaridan kir va doʻlarni iloji boricha ehtiyotkorlik bilan ketkazamiz. Nozik matolar uchun quruq tozalashni qoʻllash mumkin boʻlmagan xollarda akvachistka ideal yechim boʻla oladi.',
      pointsLead: 'SPOTX akvachistkasida siz:',
      points: [
        'Yuvish rejimi va yuvish vositalarini tanlashdan oldin kiyimlarni toʻliq **ekspert tahlilidan** oʻtkazish;',
        'Xattoki eng nozik kiyimlarga ham zarar yetkazmaslik uchun faqat **professional yuvish vositalarining** ishlatilishi;',
        'Har bir mijozga **individual yondashish**, xizmat koʻrsatishni koʻrishingiz mumkin. Biz barcha istaklarni inobatga olamiz va alohida eʼtibor qaratamiz.',
      ],
      photoAlts: [
        'Dogʻli kiyimlar yonida dogʻ ketkazuvchi vositalar shishalari',
        'Kiyimdagi dogʻga dogʻ ketkazuvchi vosita surtilmoqda',
        'Kiyimlarni tozalash va dazmollash uchun professional uskunalar: yuvish va quritish mashinasi, press va dazmol stollari',
      ],
    },
  },
  partners: {
    captions: ['Self-service kirxona', 'Akva tozalash', 'Yuvish vositalari', 'Trening'],
  },
  videos: {
    label: 'Videolar',
    reviewsTitle: 'Mijozlar sharhlari',
    play: 'Videoni ijro etish',
  },
  locations: {
    eyebrow: 'Filiallar',
    title: 'Toshkentda ikkita filial',
    directions: 'Yoʻnalish olish',
    open24h: '24 soat ochiq',
    branches: [
      { name: 'Talabalar', address: 'Talabalar koʻchasi, 81/1, Toshkent', mapAlt: 'Xarita: Londry self-service kirxonasi, Talabalar koʻchasi, Toshkent' },
      {
        name: 'Yunusobod',
        address: 'Iftixor koʻchasi, 1a, Yunusobod tumani, Toshkent',
        mapAlt: 'Xarita: Londry self-service kirxonasi, Iftixor koʻchasi, Yunusobod, Toshkent',
      },
    ],
  },
  faq: {
    eyebrow: 'Bilish foydali',
    title: 'Toshkentda kir yuvish: koʻp beriladigan savollar',
    items: [
      {
        question: 'Londry 24 soat ochiqmi?',
        answer: 'Ha. Londry — Toshkentdagi 24 soat ochiq kirxona: Talabalar va Yunusobod filiallari kecha-yu kunduz ochiq, shuning uchun kirni sizga qulay istalgan vaqtda yuvib, quritishingiz mumkin.',
      },
      {
        question: 'Self-service kirxona qanday ishlaydi?',
        answer: 'Hammasi Londry ilovasida boshlanadi. Kir yuvish mashinasini va dasturni tanlang, xizmat uchun ilovada toʻlang. Quritish ham shunday: quritgich va dasturni tanlang. Kir yuvish mashinasini oldindan band qilish ham mumkin — band qilish 10 daqiqa davomida amal qiladi.',
      },
      {
        question: 'Londry kirxonalari Toshkentda qayerda?',
        answer: 'Talabalar filiali — Talabalar koʻchasi, 81/1, talabalar mahallasida, yotoqxonalar yaqinida. Yunusobod filiali — Iftixor koʻchasi, 1a. Ikkala self-service kirxona Toshkentda 24 soat ochiq.',
      },
      {
        question: 'SPOTX akva tozalash nima?',
        answer: 'SPOTX — Londryning Toshkentdagi akva tozalash xizmati: nozik matolar va premium tekstil uchun, kimyoviy tozalash mos kelmaganda. Mutaxassis avval har bir buyumni tekshiradi, soʻng unga xavfsiz rejim va vositalarni tanlaydi.',
      },
    ],
  },
  cta: {
    title: 'Istalgan vaqtda keling.',
    text: 'Ikkala filial ham 24 soat ochiq. Eng yaqinini tanlang va yoʻnalish oling.',
  },
  footer: {
    about: 'Toshkentdagi self-service kirxona va SPOTX akva tozalash.',
    contact: 'Aloqa',
    addresses: 'Manzillar',
    instagram: 'Instagram',
    terms: 'Foydalanish shartlari',
    privacy: 'Maxfiylik siyosati',
    rights: 'Londry.uz',
  },
  legal: {
    back: 'Bosh sahifaga qaytish',
    updated: 'Oxirgi yangilanish',
    contactLine: 'Savollaringiz boʻlsa, qoʻngʻiroq qiling:',
    draftNotice: 'Hujjatning toʻliq matni tez orada shu yerda eʼlon qilinadi.',
  },
  notFound: {
    title: 'Sahifa topilmadi',
    text: 'Bunday sahifa mavjud emas yoki koʻchirilgan.',
    home: 'Bosh sahifaga',
  },
  offline: {
    title: 'Internet aloqasi yoʻq',
    text: 'Hozir aloqa yoʻq. Eng kerakli maʼlumotlar quyida.',
    retry: 'Qayta urinish',
  },
}

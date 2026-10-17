import type { Dict } from './types'

/**
 * DRAFT translation: needs review by a native speaker before launch.
 * Uzbek in Latin script. Use ʻ (U+02BB) in oʻ / gʻ and ʼ (U+02BC) for the tutuq belgisi so the font can show them.
 */
export const uz: Dict = {
  languageName: 'Oʻzbekcha',
  meta: {
    title: 'Londry — Toshkentdagi self-service kirxona | SPOTX akva tozalash',
    description:
      'Kirni energiya tejamkor mashinalarda tez yuving va quriting yoki nozik buyumlarni SPOTX akva tozalashga topshiring. Toshkentda ikkita filial. Hammasi Londry ilovasida boshlanadi.',
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
    screenshotAlt: 'Londry ilovasining bosh ekrani',
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
      text: 'Kir yuvishni oson va qulay qiladigan zamonaviy self-service kirxona. Energiya tejamkor kir yuvish va quritish mashinalari katta yuklarni sigʻdiradi, buyumlaringizni ehtiyotkorlik bilan yuvadi va tez quritadi.',
      chips: ['Energiya tejamkor', 'Katta yuklar', 'Tez quritish'],
      photoAlt: 'Londry kirxonasining ichki koʻrinishi',
    },
    spotx: {
      eyebrow: 'Akva tozalash',
      title: 'SPOTX',
      text: 'Quruq tozalash mos kelmaydigan nozik matolar va yuqori sifatli toʻqimalar uchun.',
      points: [
        '**Mutaxassis tahlili** — rejim va vositalarni tanlashdan oldin har bir kiyim koʻrib chiqiladi',
        '**Professional vositalar** — eng nozik matolar uchun ham xavfsiz',
        '**Individual yondashuv** va soʻrov boʻyicha maxsus shartlar',
      ],
      photoAlt: 'SPOTX da kiyim parvarishi',
    },
  },
  partners: { eyebrow: 'Hamkorlar', title: 'Biz hamkorlik qilamiz' },
  locations: {
    eyebrow: 'Filiallar',
    title: 'Toshkentda ikkita filial',
    directions: 'Yoʻnalish olish',
    branches: [
      { name: 'Talabalar', address: 'Talabalar koʻchasi, 81/1, Toshkent', mapAlt: 'Xarita: Talabalar, 81/1' },
      {
        name: 'Yunusobod',
        address: 'Iftixor koʻchasi, 1a, Yunusobod tumani, Toshkent',
        mapAlt: 'Xarita: Iftixor, 1a',
      },
    ],
  },
  cta: {
    title: 'Kir yuvishni keyinga qoldirmang.',
    text: 'Londry ilovasini yuklab oling va keyingi kir yuvishni telefoningizdan boshlang.',
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

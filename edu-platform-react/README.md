# منصة التعلم — React + TypeScript + Vite

منصة تعليمية (لوحة تحكم للطالب) بالعربية، اتجاه RTL، Dark Theme افتراضي،
مبنية على React + TypeScript + Vite.

## التشغيل

```bash
npm install
npm run dev
```

هيفتح المشروع على `http://localhost:5173`.

للبناء لنسخة إنتاج:

```bash
npm run build
npm run preview   # لمعاينة نسخة الإنتاج محليًا
```

## هيكل المشروع

```
src/
  config/
    platformConfig.ts     ← الملف الوحيد اللي تعدّله لتغيير الهوية البصرية
  types/
    index.ts               ← أنواع البيانات (شكل الـ API الحقيقي)
  api/
    mockApi.ts              ← طبقة بيانات وهمية، استبدلها بـ fetch حقيقي
  hooks/
    useApplyPlatformColors.ts
    useTheme.ts
  components/
    Header.tsx, Sidebar.tsx, StatCards.tsx, ContinueLearning.tsx,
    LearningStats.tsx, WeeklyChart.tsx, CoursesGrid.tsx, Footer.tsx,
    icons.tsx
  styles/
    index.css               ← كل الـ CSS، مبني على متغيرات (CSS variables)
  App.tsx                    ← تجميع الصفحة وتحميل البيانات
  main.tsx                   ← نقطة الدخول
```

## تخصيص الهوية البصرية لمدرّس/منصة تانية

عدّل **`src/config/platformConfig.ts`** بس:

- اسم المنصة، اللوجو (نص أو صورة)، الفافيكون
- اسم المدرس، صورته، بيانات التواصل
- الألوان: `primary` / `primaryLight` / `primaryDark` / `secondary` /
  `accent` / `danger`
- روابط السوشيال ميديا

الألوان بتتطبّق تلقائيًا على كل الواجهة عن طريق
`src/hooks/useApplyPlatformColors.ts`، اللي بيكتبها كمتغيرات CSS على
`<html>` عند تحميل التطبيق — مفيش أي حاجة تانية تحتاج تتعدّل.

**لا تعدّل أي component لتغيير الهوية البصرية أو بيانات المدرس** — الهدف
إن نفس الكود الأساسي (Core) يشتغل لمدرّس تاني بمجرد تغيير هذا الملف.

## ربط بيانات حقيقية (Backend)

كل البيانات الديناميكية (عدد الكورسات، آخر فيديو، الإحصائيات الأسبوعية،
الكورسات المقترحة) بتيجي حاليًا من **`src/api/mockApi.ts`**، وهي طبقة
محاكاة بسيطة بترجع Promises بتأخير بسيط عشان تمثّل استجابة شبكة حقيقية.

لربط backend فعلي:

1. استبدل جسم كل دالة في `mockApi.ts` بنداء `fetch()` حقيقي لنفس الـ
   endpoint (الشكل/التوقيع بتاع كل دالة زي اسمها ونوع الإرجاع اتصمم بحيث
   يفضل زي ما هو).
2. المكونات (`components/`) مبتتكلمش مع الـ API مباشرة — كلها بتاخد
   البيانات من `App.tsx` كـ props، فمش هتحتاج تعدّل أي component.
3. لحفظ آخر مكان وصل له الطالب في كل فيديو (استكمال المشاهدة)، احفظ
   `watchedSeconds` بشكل دوري (كل بضع ثواني) لكل فيديو مربوط بحساب
   الطالب في قاعدة البيانات، وارجعها في `getContinueWatching()`.

## ملاحظات

- التصميم بالكامل Responsive (كمبيوتر / تابلت / موبايل)، والـ Sidebar
  بيتحول لقائمة منسدلة (off-canvas) على الشاشات الصغيرة.
- كل قسم بيحمّل بياناته بشكل مستقل، وله حالة تحميل (Skeleton)، وحالة
  فارغة (Empty State)، وحالة خطأ (Error State) منفصلة.
- زرار تبديل الوضع الفاتح/الداكن بيغيّر `data-theme` على `<html>`؛ لو
  عايز تحفظ اختيار المستخدم بين الزيارات اربطه بـ `localStorage` أو
  بإعدادات حساب المستخدم في الـ backend.

import { AboutSection } from "@/src/components/AboutSection";
import { CertificationsSection } from "@/src/components/CertificationsSection";
import { ContactSection } from "@/src/components/ContactSection";
import { EducationSection } from "@/src/components/EducationSection";
import { ExperienceSection } from "@/src/components/ExperienceSection";
import { FooterSection } from "@/src/components/FooterSection";
import { Header } from "@/src/components/Header";
import { HeroSection } from "@/src/components/HeroSection";
import { ProjectsSection } from "@/src/components/ProjectsSection";
import { SkillsSection } from "@/src/components/SkillsSection";
import { getDictionary } from "@/src/i18n/get-dictionary";
import { defaultLocale, locales } from "@/src/i18n/settings";
import type { Locale } from "@/src/i18n/settings";

type PageProps = {
  params: { locale: Locale };
};

const skillsByLocale: Record<
  Locale,
  Record<string, string[]>
> = {
  it: {
    cad: ["SolidWorks", "AutoCAD / Inventor", "CAD/CAM", "FARO", "Microsoft Office", "Gantter"],
    fem: ["disegno tecnico", "messa in tavola", "lettura disegni", "tolleranze dimensionali"],
    manufacturing: ["progettazione meccanica", "sviluppo prodotto", "calcoli strutturali", "documentazione di produzione"],
    energy: ["componenti architettonici", "macchinari per mining", "tubazioni per macchine agricole"],
    management: ["Spagnolo", "Inglese", "Italiano"]
  },
  en: {
    cad: ["SolidWorks", "AutoCAD / Inventor", "CAD/CAM", "FARO", "Microsoft Office", "Gantter"],
    fem: ["technical drawing", "drafting standards", "drawing interpretation", "dimensional tolerances"],
    manufacturing: ["mechanical design", "product development", "structural calculations", "production documentation"],
    energy: ["architectural components", "mining equipment", "agricultural machinery piping"],
    management: ["Spanish", "English", "Italian"]
  }
};

const experienceByLocale: Record<
  Locale,
  Array<{ role: string; company: string; period: string; location: string; bullets: string[] }>
> = {
  it: [
    {
      role: "Progettazione architettonica",
      company: "Arktura (fino al 2022) – Ferra Designs (attuale)",
      period: "2021 – Presente",
      location: "Remote",
      bullets: [
        "Traduzione degli obiettivi del cliente in soluzioni realizzabili e funzionali.",
        "Progettazione di porte, serramenti, scale e altri elementi architettonici."
      ]
    },
    {
      role: "Progettazione meccanica e gestione progetti",
      company: "Tecnicord S.A. – Tecmaq S.R.L.",
      period: "2014 – 2021",
      location: "Argentina",
      bullets: [
        "Sviluppo prodotto, calcoli strutturali, visite in fabbrica e presso clienti.",
        "Progettazione di macchine e impianti per frantumazione di inerti e cave."
      ]
    },
    {
      role: "Tecnico / disegnatore",
      company: "Università – Piro",
      period: "2010 – 2014",
      location: "Argentina",
      bullets: [
        "Assistente di ricerca in vibrazioni meccaniche e tecnico in produzione.",
        "Disegni per lamiera piegata, progettazione dispositivi e manutenzione."
      ]
    }
  ],
  en: [
    {
      role: "Architectural Design",
      company: "Arktura (until 2022) – Ferra Designs (current)",
      period: "2021 – Present",
      location: "Remote",
      bullets: [
        "Translate client goals into buildable and functional solutions.",
        "Design doors, windows, staircases, and other architectural elements."
      ]
    },
    {
      role: "Mechanical Design & Project Managing",
      company: "Tecnicord S.A. – Tecmaq S.R.L.",
      period: "2014 – 2021",
      location: "Argentina",
      bullets: [
        "Product development, structural calculations, factory and client visits.",
        "Design of machines and aggregate crushing plants (quarries)."
      ]
    },
    {
      role: "Technician / Draftsman",
      company: "University – Piro",
      period: "2010 – 2014",
      location: "Argentina",
      bullets: [
        "Mechanical vibrations research assistant and production technician.",
        "Drafted bent sheet metal parts, device design, and maintenance tasks."
      ]
    }
  ]
};

const educationByLocale: Record<Locale, Array<{ title: string; school: string; period: string; location: string }>> = {
  it: [
    {
      title: "Laurea Magistrale in Ingegneria Meccanica",
      school: "Università Tecnologica Nazionale",
      period: "2009 – 2021",
      location: "Argentina"
    },
    {
      title: "Diploma di Perito Tecnico Meccanico",
      school: "Instituto Tecnico Salesiano Villada",
      period: "2003 – 2008",
      location: "Argentina"
    }
  ],
  en: [
    {
      title: "Master's Degree in Mechanical Engineering",
      school: "Technological National University",
      period: "2009 – 2021",
      location: "Argentina"
    },
    {
      title: "Technical High School Diploma in Mechanical Engineering",
      school: "Salesian Technical Institute Villada",
      period: "2003 – 2008",
      location: "Argentina"
    }
  ]
};

const certificationsByLocale: Record<Locale, string[]> = {
  it: ["SolidWorks", "AutoCAD / Inventor", "FARO", "CAD/CAM", "Microsoft Office", "Gantter"],
  en: ["SolidWorks", "AutoCAD / Inventor", "FARO", "CAD/CAM", "Microsoft Office", "Gantter"]
};

export default async function Home({ params }: PageProps) {
  const locale = locales.includes(params.locale) ? params.locale : defaultLocale;
  const dictionary = await getDictionary(locale);
  const skills = skillsByLocale[locale] ?? skillsByLocale[defaultLocale];
  const experience = experienceByLocale[locale] ?? experienceByLocale[defaultLocale];
  const education = educationByLocale[locale] ?? educationByLocale[defaultLocale];
  const certifications = certificationsByLocale[locale] ?? certificationsByLocale[defaultLocale];

  const navLinks = [
    { href: "#about", label: dictionary.nav.about },
    { href: "#skills", label: dictionary.nav.skills },
    { href: "#projects", label: dictionary.nav.projects },
    { href: "#experience", label: dictionary.nav.experience },
    { href: "#education", label: dictionary.nav.education },
    { href: "#contact", label: dictionary.nav.contact }
  ];

  const cvLink = "https://example.com/Guido_Gabriel_Paris_CV.pdf";
  const email = "guidogparis@gmail.com";
  const linkedin = "https://www.linkedin.com/in/guido-gabriel-paris-7745871aa";

  return (
    <>
      <Header
        locale={locale}
        navLinks={navLinks}
        cvLink={cvLink}
        primaryCtaLabel={dictionary.hero.primaryCta}
        roleLabel={locale === "it" ? "Ingegnere Meccanico" : "Mechanical Engineer"}
        name="Guido Gabriel Paris"
        switcherLabels={{
          it: dictionary.langSwitcher.it,
          en: dictionary.langSwitcher.en,
          aria: dictionary.langSwitcher.aria
        }}
      />

      <main>
        <HeroSection
          title={dictionary.hero.title}
          subtitle={dictionary.hero.subtitle}
          primaryCtaLabel={dictionary.hero.primaryCta}
          secondaryCtaLabel={dictionary.hero.secondaryCta}
          cvLink={cvLink}
          contactHref="#contact"
        />

        <AboutSection title={dictionary.about.title} body={dictionary.about.body} />

        <ProjectsSection
          locale={locale}
          title={dictionary.projects.title}
          subtitle={dictionary.projects.subtitle}
        />

        <SkillsSection
          title={dictionary.skills.title}
          categories={Object.entries(skills ?? {}).map(([key, items]) => ({
            label: dictionary.skills.categories[key as keyof typeof dictionary.skills.categories],
            items
          }))}
        />

        <ExperienceSection title={dictionary.experience.title} items={experience} />

        <EducationSection title={dictionary.education.title} items={education} />

        <CertificationsSection
          title={dictionary.certifications.title}
          note={dictionary.certifications.optionalNote}
          items={certifications}
        />

        <ContactSection
          title={dictionary.contact.title}
          description={
            locale === "it"
              ? "Residente a Ragusa, Italia. Tel: +54 9 351 661 8834 | +39 351 348 5795"
              : "Based in Ragusa, Italy. Phone: +54 9 351 661 8834 | +39 351 348 5795"
          }
          emailLabel={dictionary.contact.emailLabel}
          email={email}
          linkedinLabel={dictionary.contact.linkedinLabel}
          linkedin={linkedin}
          formCta={dictionary.contact.formCta}
        />
      </main>

      <FooterSection
        cta={dictionary.footer.cta}
        links={[
          { href: linkedin, label: "LinkedIn" },
          { href: cvLink, label: "CV" },
          { href: `mailto:${email}`, label: "Email" }
        ]}
      />
    </>
  );
}


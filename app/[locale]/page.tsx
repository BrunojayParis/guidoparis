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
    cad: ["SolidWorks", "AutoCAD", "Inventor", "modellazione 3D", "disegno tecnico"],
    fem: ["lettura disegni", "tolleranze", "messa in tavola"],
    manufacturing: ["lamiera e piegatura", "taglio e assemblaggio", "distinte base", "documentazione di produzione"],
    energy: ["progettazione industriale", "installazioni architettoniche", "progetti per mining"],
    management: ["collaborazione con architetti", "coordinamento produzione", "gestione requisiti"]
  },
  en: {
    cad: ["SolidWorks", "AutoCAD", "Inventor", "3D modeling", "technical drawing"],
    fem: ["drawing interpretation", "tolerances", "drafting standards"],
    manufacturing: ["sheet metal & bending", "cutting & assembly", "BOMs", "production documentation"],
    energy: ["industrial design", "architectural installations", "mining equipment projects"],
    management: ["architect collaboration", "production coordination", "requirements management"]
  }
};

const experienceByLocale: Record<
  Locale,
  Array<{ role: string; company: string; period: string; location: string; bullets: string[] }>
> = {
  it: [
    {
      role: "Industrial Designer",
      company: "Uptalent.io",
      period: "lug 2023 – Presente",
      location: "Argentina",
      bullets: [
        "Sviluppo di disegni tecnici e documentazione per la produzione.",
        "Supporto a progetti industriali con modellazione 3D e layout di assemblaggio."
      ]
    },
    {
      role: "Project Engineering",
      company: "Arktura",
      period: "ott 2021 – set 2023",
      location: "Córdoba, Argentina",
      bullets: [
        "Collaborazione con architetti per definire soluzioni producibili.",
        "Creazione di programmi e documentazione per taglio, piega e assemblaggio."
      ]
    },
    {
      role: "Progettista meccanico",
      company: "TECMAQ S.R.L.",
      period: "gen 2019 – ott 2021",
      location: "Argentina",
      bullets: [
        "Progetti per il settore minerario con SolidWorks e AutoCAD.",
        "Calcoli e disegni tecnici per componenti e assiemi."
      ]
    },
    {
      role: "Progettista reti telefoniche (autonomo)",
      company: "Freelance",
      period: "mar 2017 – feb 2019",
      location: "Argentina",
      bullets: [
        "Progettazione di reti e layout tecnici per infrastrutture telefoniche."
      ]
    },
    {
      role: "Assistente di ingegneria",
      company: "Tecnicord S.A.",
      period: "mar 2014 – gen 2017",
      location: "Argentina",
      bullets: [
        "Ingegneria di prodotto e disegno in Inventor e AutoCAD."
      ]
    }
  ],
  en: [
    {
      role: "Industrial Designer",
      company: "Uptalent.io",
      period: "Jul 2023 – Present",
      location: "Argentina",
      bullets: [
        "Produce technical drawings and production documentation.",
        "Support industrial projects with 3D modeling and assembly layouts."
      ]
    },
    {
      role: "Project Engineering",
      company: "Arktura",
      period: "Oct 2021 – Sep 2023",
      location: "Córdoba, Argentina",
      bullets: [
        "Partnered with architects to enable manufacturable solutions.",
        "Created programs and documentation for cutting, bending, and assembly."
      ]
    },
    {
      role: "Mechanical Designer",
      company: "TECMAQ S.R.L.",
      period: "Jan 2019 – Oct 2021",
      location: "Argentina",
      bullets: [
        "Mining industry projects using SolidWorks and AutoCAD.",
        "Technical calculations and drawings for components and assemblies."
      ]
    },
    {
      role: "Telecom Network Designer (Freelance)",
      company: "Self-employed",
      period: "Mar 2017 – Feb 2019",
      location: "Argentina",
      bullets: [
        "Designed layouts and technical plans for telephone networks."
      ]
    },
    {
      role: "Engineering Assistant",
      company: "Tecnicord S.A.",
      period: "Mar 2014 – Jan 2017",
      location: "Argentina",
      bullets: [
        "Product engineering and drafting using Inventor and AutoCAD."
      ]
    }
  ]
};

const educationByLocale: Record<Locale, Array<{ title: string; school: string; period: string; location: string }>> = {
  it: [
    {
      title: "Laurea Magistrale in Ingegneria Meccanica",
      school: "Politecnico di Torino",
      period: "2014 – 2016",
      location: "Torino, Italia"
    },
    {
      title: "Laurea Triennale in Ingegneria Industriale",
      school: "Università di Bologna",
      period: "2011 – 2014",
      location: "Bologna, Italia"
    }
  ],
  en: [
    {
      title: "MSc in Mechanical Engineering",
      school: "Politecnico di Torino",
      period: "2014 – 2016",
      location: "Turin, Italy"
    },
    {
      title: "BSc in Industrial Engineering",
      school: "University of Bologna",
      period: "2011 – 2014",
      location: "Bologna, Italy"
    }
  ]
};

const certificationsByLocale: Record<Locale, string[]> = {
  it: ["Certificazione Six Sigma Green Belt", "Corso avanzato GD&T", "Fondamenti di gestione progetti (PMI)"],
  en: ["Six Sigma Green Belt", "Advanced GD&T course", "Project management fundamentals (PMI)"]
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

  const cvLink = "https://example.com/Guido_Paris_CV.pdf";
  const email = "guido.paris@email.com";
  const linkedin = "https://www.linkedin.com/in/guido-paris";

  return (
    <>
      <Header
        locale={locale}
        navLinks={navLinks}
        cvLink={cvLink}
        primaryCtaLabel={dictionary.hero.primaryCta}
        roleLabel={locale === "it" ? "Ingegnere Meccanico" : "Mechanical Engineer"}
        name="Guido Paris"
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

        <SkillsSection
          title={dictionary.skills.title}
          categories={Object.entries(skills ?? {}).map(([key, items]) => ({
            label: dictionary.skills.categories[key as keyof typeof dictionary.skills.categories],
            items
          }))}
        />

        <ProjectsSection
          locale={locale}
          title={dictionary.projects.title}
          subtitle={dictionary.projects.subtitle}
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
              ? "Disponibile per ruoli full-time o consulenze in Italia ed Europa."
              : "Available for full-time roles or consulting in Italy and across Europe."
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


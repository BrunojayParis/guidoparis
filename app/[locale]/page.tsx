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
import type { Locale } from "@/src/i18n/settings";

type PageProps = {
  params: { locale: Locale };
};

const skillsByLocale: Record<
  Locale,
  Record<string, string[]>
> = {
  it: {
    cad: ["Siemens NX", "SolidWorks", "CATIA V5", "GD&T", "Tolleranze e accoppiamenti"],
    fem: ["Ansys Mechanical", "Nastran/Patran", "calcolo statico e fatica", "CFD di base"],
    manufacturing: ["DFM/DFA", "lavorazioni meccaniche", "lamiera e saldature", "prototipazione rapida", "boM e distinta base"],
    energy: ["termofluidi", "scambiatori di calore", "macchine rotanti", "analisi energetiche"],
    management: ["APQP", "FMEA di processo", "PPAP", "Lean & Kaizen", "gestione fornitori"]
  },
  en: {
    cad: ["Siemens NX", "SolidWorks", "CATIA V5", "GD&T", "Fits and tolerances"],
    fem: ["Ansys Mechanical", "Nastran/Patran", "static & fatigue", "CFD basics"],
    manufacturing: ["DFM/DFA", "machining", "sheet metal & welding", "rapid prototyping", "BOM management"],
    energy: ["thermofluids", "heat exchangers", "rotating machinery", "energy audits"],
    management: ["APQP", "Process FMEA", "PPAP", "Lean & Kaizen", "supplier coordination"]
  }
};

const experienceByLocale: Record<
  Locale,
  Array<{ role: string; company: string; period: string; location: string; bullets: string[] }>
> = {
  it: [
    {
      role: "Senior Mechanical Engineer",
      company: "Armonia Industrial Systems",
      period: "2022 – Presente",
      location: "Milano, Italia",
      bullets: [
        "Lead design per linee di assemblaggio: layout, cinematismi e validazione FEM.",
        "Riduzione costi -12% tramite standardizzazione componenti e ottimizzazione distinte.",
        "Coordinamento con fornitori per prototipi e preserie, audit di processo e qualità."
      ]
    },
    {
      role: "Mechanical Design Engineer",
      company: "Vela Mobility",
      period: "2018 – 2022",
      location: "Torino, Italia",
      bullets: [
        "Progettazione strutture leggere e staffe per veicoli elettrici con requisiti NVH.",
        "Introduzione libreria CAD modulare che ha ridotto i tempi di progettazione del 20%.",
        "Collaborazione con test e validazione per chiusura issue log e azioni correttive."
      ]
    },
    {
      role: "Junior Engineer",
      company: "Energia Blu",
      period: "2016 – 2018",
      location: "Bologna, Italia",
      bullets: [
        "Dimensionamento scambiatori e piping per impianti termici industriali.",
        "Supporto gare tecniche con schemi P&ID e stime materiali.",
        "Monitoraggio KPI di efficienza energetica e manutenzione predittiva."
      ]
    }
  ],
  en: [
    {
      role: "Senior Mechanical Engineer",
      company: "Armonia Industrial Systems",
      period: "2022 – Present",
      location: "Milan, Italy",
      bullets: [
        "Lead design for assembly lines: layouts, mechanisms, and FEM validation.",
        "Cut costs by 12% through component standardization and BOM optimization.",
        "Coordinated suppliers for prototypes and pre-series, including process and quality audits."
      ]
    },
    {
      role: "Mechanical Design Engineer",
      company: "Vela Mobility",
      period: "2018 – 2022",
      location: "Turin, Italy",
      bullets: [
        "Designed lightweight structures and brackets for EV platforms under NVH constraints.",
        "Introduced a modular CAD library reducing design time by 20%.",
        "Worked with testing and validation to close issue logs and corrective actions."
      ]
    },
    {
      role: "Junior Engineer",
      company: "Energia Blu",
      period: "2016 – 2018",
      location: "Bologna, Italy",
      bullets: [
        "Sized heat exchangers and piping for industrial thermal plants.",
        "Supported technical bids with P&ID diagrams and material estimates.",
        "Tracked energy efficiency KPIs and predictive maintenance tasks."
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
  const dictionary = await getDictionary(params.locale);
  const skills = skillsByLocale[params.locale];
  const experience = experienceByLocale[params.locale];
  const education = educationByLocale[params.locale];
  const certifications = certificationsByLocale[params.locale];

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
        locale={params.locale}
        navLinks={navLinks}
        cvLink={cvLink}
        primaryCtaLabel={dictionary.hero.primaryCta}
        roleLabel={params.locale === "it" ? "Ingegnere Meccanico" : "Mechanical Engineer"}
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
          categories={Object.entries(skills).map(([key, items]) => ({
            label: dictionary.skills.categories[key as keyof typeof dictionary.skills.categories],
            items
          }))}
        />

        <ProjectsSection
          locale={params.locale}
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
            params.locale === "it"
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


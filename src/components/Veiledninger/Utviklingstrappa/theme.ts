export type UTheme = "red" | "redSoft" | "blue" | "blueSoft" | "dark" | "darkSoft"

export const UTHEME: Record<
  UTheme,
  {
    panel: string
    tagText: string
    focus: string
    tabActive: string
    tabIdle: string
    chipActive: string
    chipIdle: string
    stripe: string
    modalHeader: string
    button: string
    buttonHover: string
    /** Full-color callout (used for info callouts & tips in modals) */
    calloutBg: string
    calloutText: string
    /** Section title icon wrapper */
    iconWrap: string
  }
> = {
  red: {
    panel: "from-kilred to-kilred-700",
    tagText: "text-kilred",
    focus: "focus-visible:outline-kilred",
    tabActive: "bg-kilred-50 text-kilred border-kilred",
    tabIdle: "bg-transparent text-kilsvart-400 border-transparent",
    chipActive: "border-kilred-200 bg-kilred-50 text-kilred",
    chipIdle: "border-kilsvart-100 bg-kilsvart-50 text-kilsvart-500",
    stripe: "bg-kilred",
    modalHeader: "bg-kilred",
    button: "bg-kilred/10 text-kilred-700",
    buttonHover: "hover:bg-kilred/20",
    calloutBg: "bg-kilred",
    calloutText: "text-white",
    iconWrap: "bg-kilred text-white",
  },
  redSoft: {
    panel: "from-kilred-400 to-kilred-300",
    tagText: "text-kilred-400",
    focus: "focus-visible:outline-kilred-400",
    tabActive: "bg-kilred-50 text-kilred-500 border-kilred-300",
    tabIdle: "bg-transparent text-kilsvart-400 border-transparent",
    chipActive: "border-kilred-200 bg-kilred-50/60 text-kilred-500",
    chipIdle: "border-kilsvart-100 bg-kilsvart-50 text-kilsvart-500",
    stripe: "bg-kilred-400",
    modalHeader: "bg-kilred-500",
    button: "bg-kilred-50 text-kilred-600",
    buttonHover: "hover:bg-kilred-100",
    calloutBg: "bg-kilred-500",
    calloutText: "text-white",
    iconWrap: "bg-kilred-400 text-white",
  },
  blue: {
    panel: "from-kilblue to-kilblue-700",
    tagText: "text-kilblue",
    focus: "focus-visible:outline-kilblue",
    tabActive: "bg-kilblue-50 text-kilblue border-kilblue",
    tabIdle: "bg-transparent text-kilsvart-400 border-transparent",
    chipActive: "border-kilblue-200 bg-kilblue-50 text-kilblue",
    chipIdle: "border-kilsvart-100 bg-kilsvart-50 text-kilsvart-500",
    stripe: "bg-kilblue",
    modalHeader: "bg-kilblue",
    button: "bg-kilblue/10 text-kilblue-800",
    buttonHover: "hover:bg-kilblue/20",
    calloutBg: "bg-kilblue",
    calloutText: "text-white",
    iconWrap: "bg-kilblue text-white",
  },
  blueSoft: {
    panel: "from-kilblue-400 to-kilblue-300",
    tagText: "text-kilblue-400",
    focus: "focus-visible:outline-kilblue-400",
    tabActive: "bg-kilblue-50 text-kilblue-500 border-kilblue-300",
    tabIdle: "bg-transparent text-kilsvart-400 border-transparent",
    chipActive: "border-kilblue-200 bg-kilblue-50/60 text-kilblue-500",
    chipIdle: "border-kilsvart-100 bg-kilsvart-50 text-kilsvart-500",
    stripe: "bg-kilblue-400",
    modalHeader: "bg-kilblue-500",
    button: "bg-kilblue-50 text-kilblue-600",
    buttonHover: "hover:bg-kilblue-100",
    calloutBg: "bg-kilblue-500",
    calloutText: "text-white",
    iconWrap: "bg-kilblue-400 text-white",
  },
  dark: {
    panel: "from-kilsvart to-kilsvart-700",
    tagText: "text-kilsvart",
    focus: "focus-visible:outline-kilsvart",
    tabActive: "bg-kilsvart-50 text-kilsvart border-kilsvart",
    tabIdle: "bg-transparent text-kilsvart-400 border-transparent",
    chipActive: "border-kilsvart-200 bg-kilsvart-50 text-kilsvart",
    chipIdle: "border-kilsvart-100 bg-kilsvart-50 text-kilsvart-500",
    stripe: "bg-kilsvart",
    modalHeader: "bg-kilsvart",
    button: "bg-kilsvart/10 text-kilsvart",
    buttonHover: "hover:bg-kilsvart/20",
    calloutBg: "bg-kilsvart",
    calloutText: "text-white",
    iconWrap: "bg-kilsvart text-white",
  },
  darkSoft: {
    panel: "from-kilsvart-500 to-kilsvart-400",
    tagText: "text-kilsvart-500",
    focus: "focus-visible:outline-kilsvart-400",
    tabActive: "bg-kilsvart-50 text-kilsvart-600 border-kilsvart-400",
    tabIdle: "bg-transparent text-kilsvart-400 border-transparent",
    chipActive: "border-kilsvart-200 bg-kilsvart-50/60 text-kilsvart-600",
    chipIdle: "border-kilsvart-100 bg-kilsvart-50 text-kilsvart-500",
    stripe: "bg-kilsvart-400",
    modalHeader: "bg-kilsvart-600",
    button: "bg-kilsvart-50 text-kilsvart-600",
    buttonHover: "hover:bg-kilsvart-100",
    calloutBg: "bg-kilsvart-600",
    calloutText: "text-white",
    iconWrap: "bg-kilsvart-500 text-white",
  },
}
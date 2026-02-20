// lib/teamInfo.ts
// Sentralisert laginfo: farger, forkortelser og badge-komponent.
// Importer herfra i MatchModal, HeroKamper, KommendeKamper osv.

/* ═══════════════════════════════════════════════════════════════
   FARGER
   ═══════════════════════════════════════════════════════════════ */

   export type TeamColor = {
    primary: string
    secondary: string
    /** true hvis primary er så lys at tekst bør være mørk */
    lightPrimary: boolean
  }
  
  const TEAMS: Record<string, Omit<TeamColor, "lightPrimary"> & { lightPrimary?: boolean }> = {
    // KIL
    kongsvinger: { primary: "#C40000", secondary: "#FEE2E2" },
  
    // Blå-toner
    lhf:      { primary: "#0088CD", secondary: "#DBEAFE" },
    lfh09:    { primary: "#0088CD", secondary: "#DBEAFE" },
    gjøvik:   { primary: "#003C75", secondary: "#EBF4FF" },
    flisa:    { primary: "#1E40AF", secondary: "#DBEAFE" },
    furnes:   { primary: "#0369A1", secondary: "#E0F2FE" },
    moelven:  { primary: "#2563EB", secondary: "#DBEAFE" },
  
    // Svart / nøytral
    elverum:  { primary: "#181414", secondary: "#F3F4F6" },
  
    // Varme røde
    gausdal:  { primary: "#DC2626", secondary: "#FEE2E2" },
    veldre:   { primary: "#DC2626", secondary: "#FFEDD5" },
    trysil:   { primary: "#DC2626", secondary: "#FECACA" },
  
    // Lilla
    vipers:   { primary: "#7C3AED", secondary: "#EDE9FE" },
  
    // Grønne
    grue:      { primary: "#16A34A", secondary: "#DCFCE7" },
    nordbygda: { primary: "#15803D", secondary: "#BBF7D0" },
    varde:     { primary: "#166534", secondary: "#ECFDF5" },
  
    // Gule
    storhamar: { primary: "#EAB308", secondary: "#FEF3C7" },
    ottestad:  { primary: "#EAB308", secondary: "#FEF3C7" },
    ring:      { primary: "#EAB308", secondary: "#FEF3C7" },
    jaren:     { primary: "#EAB308", secondary: "#FEF3C7" },
  
    // Lyse (tekst skal være mørk)
    vang:    { primary: "#F5F5F5", secondary: "#1F2937", lightPrimary: true },
    eidskog: { primary: "#F3F4F6", secondary: "#1F2937", lightPrimary: true },
  }
  
  const DEFAULT_HOME: TeamColor = { primary: "#181414", secondary: "#F9FAFB", lightPrimary: false }
  const DEFAULT_AWAY: TeamColor = { primary: "#4B5563", secondary: "#F3F4F6", lightPrimary: false }
  
  /**
   * Hent farger for et lag basert på lagnavn (case-insensitive partial match).
   */
  export function getTeamColors(teamName: string, isHome = true): TeamColor {
    const n = teamName.toLowerCase()
    for (const [key, val] of Object.entries(TEAMS)) {
      if (n.includes(key)) {
        return { primary: val.primary, secondary: val.secondary, lightPrimary: val.lightPrimary ?? false }
      }
    }
    return isHome ? DEFAULT_HOME : DEFAULT_AWAY
  }
  
  /* ═══════════════════════════════════════════════════════════════
     FORKORTELSER / INITIALER
     ═══════════════════════════════════════════════════════════════ */
  
  const ABBREVIATIONS: Record<string, string> = {
    kongsvinger: "KIL",
    elverum:     "EH",
    storhamar:   "SIL",
    skarnes:     "SH",
    lfh09:       "LHF",
    lhf:         "LHF",
    larvik:      "LHK",
    gjøvik:      "GHK",
    flisa:       "FAL",
    furnes:      "FH",
    moelven:     "MIL",
    gausdal:     "GHK",
    veldre:      "VH",
    trysil:      "TIL",
    grue:        "GIL",
    nordbygda:   "NIL",
    varde:       "VIL",
    ottestad:    "OIL",
    ring:        "RIL",
    jaren:       "JIL",
    vang:        "VH",
    eidskog:     "EHK",
    ålgård:      "ÅIL",
    tromsø:       "THK",
  }
  
  /**
   * Hent forkortelse / initialer for et lagnavn.
   * Kjente lag får sin faste forkortelse, ukjente lag får initialer fra ordene i navnet.
   */
  export function getTeamInitials(teamName: string): string {
    const n = teamName.toLowerCase()
    for (const [key, abbr] of Object.entries(ABBREVIATIONS)) {
      if (n.includes(key)) return abbr
    }
    const words = teamName.split(" ").filter(Boolean)
    if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
    return words[0]?.[0]?.toUpperCase() ?? "?"
  }
  
  /* ═══════════════════════════════════════════════════════════════
     SAMLET INFO-OBJEKT
     ═══════════════════════════════════════════════════════════════ */
  
  export type TeamInfo = TeamColor & {
    initials: string
  }
  
  /**
   * Hent komplett info for et lag: farger + initialer.
   */
  export function getTeamInfo(teamName: string, isHome = true): TeamInfo {
    return {
      ...getTeamColors(teamName, isHome),
      initials: getTeamInitials(teamName),
    }
  }
import type { UtviklingLevel } from "./UtviklingSplitLevels"
import type { UTheme } from "./theme"
import type { DeepDiveDoc } from "./DeepDiveModal"
import type { UIconKey } from "./icons"

export type USectionType = "rich" | "levels" | "table" | "resources"

export type USectionBase = {
  id: string
  title: string
  icon: UIconKey
  theme: UTheme
  type: USectionType
}

export type URichSection = USectionBase & {
  type: "rich"
  paragraphs: string[]
  callouts?: Array<{ tone: "info" | "danger"; title?: string; text: string }>
  cards?: Array<{ tone: "blue" | "red"; heading: string; text: string }>
  source?: { label: string; url: string }
}

export type ULevelsSection = USectionBase & {
  type: "levels"
  tagLabel: string
  intro?: string
  levels: UtviklingLevel[]
  callouts?: Array<{ tone: "info" | "danger"; title?: string; text: string }>
}

export type UTableSection = USectionBase & {
  type: "table"
  paragraphs: string[]
  rows: Array<{ level: number; age: string; sessions: string; days: string }>
}

export type UResourcesSection = USectionBase & {
  type: "resources"
  paragraphs?: string[]
  resources: Array<{ title: string; desc: string; url: string }>
}

export type USection = URichSection | ULevelsSection | UTableSection | UResourcesSection

// ─────────────────────────────────────────────────────────────
// MODAL CONTENT (unchanged from previous version)
// ─────────────────────────────────────────────────────────────
export const modalContent: Record<string, DeepDiveDoc> = {
  "mental-n2-indre-dialog": { id: "mental-n2-indre-dialog", title: "Indre dialog – Nivå 2", sections: [
    { heading: "Positiv forsterkning", text: ["Den indre dialogen er de tankene og den samtalen du til enhver tid har med deg selv. For noen er denne samtalen veldig tydelig og «stemmene» i hodet helt klare, dette er helt normalt. For andre er den indre dialogen mer diffus og utydelig og kanskje ikke så bevisst. Vi kan trene oss på å gjøre den indre dialogen og tankene tydeligere ved å skru opp volumet og tydeligheten og rette oppmerksomheten mer inn i vårt eget hode.", "Positive, hensiktsmessige tanker og indre dialoger gjør at du kan forberede deg bedre og mer formålstjenlig til trening og kamp. Det øker motivasjonen og bygger opp selvtilliten, tryggheten og motet du trenger for å prestere bra. «Hold hjertet varmt og hodet kaldt»."] },
    { heading: "Affirmasjoner", text: ["Affirmasjoner betyr forsterkende positive tanker om deg selv. Eksempler: «Jeg er sterk», «Jeg er modig», «Jeg er besluttsom», «Jeg er rå», «Jeg er en glad og positiv person».", "Hovedhensikten er å styrke selvfølelsen og selvtilliten din og føre tankene inn på rett spor: «Dette kommer til å gå bra», «Jeg skal gi alt jeg har gjennom hele kampen», «Det viktigste er å ha det gøy på banen»."], tip: "Skriv ned på ett ark hva som er dine styrker som håndballspiller, både håndballspesifikke og personlige egenskaper. Skriv ned noen positive stikkord du kan gjenta for deg selv i forberedelsene til kamp. Noen har med seg en lapp med stikkord i bagen og noen skriver stikkord i hånden." },
  ]},
  "mental-n2-selvtillit": { id: "mental-n2-selvtillit", title: "Selvtillit – Nivå 2", sections: [
    { heading: "Mestring", text: ["Mestring er sannsynligvis den beste måten å få og vedlikeholde selvtillit på. Det er lurt å knytte mestringsfølelsen mer til gjennomføring (mestringsfokus) enn til resultater (resultatfokus).", "Vi kan ha gjort en optimal kamp og likevel tape fordi motstanderen er bedre. Da er det viktig å opprettholde vår evaluering: Hvordan har vi gjennomført oppgavene?", "Positiv selvevaluering etter trening og kamp er en praktisk måte å bygge selvtillit på."] },
    { heading: "Positivt selvsnakk", text: ["Du kan også få selvtillit ved å se at andre lykkes, og når andre gir deg ros. Lag en tilbakemeldingskultur i laget – spiller til spiller.", "Ha spenningsnivået under kontroll – for høyt spenningsnivå kan øke negativ indre dialog og senke selvtilliten."] },
  ]},
  "mental-n3-malsetting": { id: "mental-n3-malsetting", title: "Målsetting – Nivå 3", sections: [
    { heading: "Drøm", text: ["En drøm er et fjernt, motiverende mål. Eksempler: spill på favorittlaget, fast på seniorlaget, profesjonell håndballspiller. Hold drømmen levende gjennom dagdrømming og visualisering."] },
    { heading: "Kortsiktige mål", text: ["Delmål på veien – fra neste trening til noen uker frem. Når du når dem øker motivasjonen og selvtilliten.", "Prestasjonsmål: forbedre beep-testen, øke styrke i en muskelgruppe. Mestringsmål: ekstra fokus på en skuddteknikk eller ny finte."] },
    { heading: "Arbeidsoppgaver i trening og kamp", text: ["Konkrete handlinger eller fokusområder i hver trening/kamp. De kan være et resultat av evalueringen etter siste økt."], tip: "Skriv ned to konkrete arbeidsoppgaver før hver økt i 2 uker. Etter hver økt – skriv kort hvordan det gikk." },
    { heading: "Evaluering", text: ["Ta status på det du har gjort. Feil skal ikke overskygge det du lykkes med – se på feil som en mulighet til å lære.", "Mange ser for seg «filmklipp» fra kampen. Du kan «reparere» aksjoner i hodet – visualiser at du lykkes optimalt. Spill filmen flere ganger.", "God balanse: 3 positive ting + 1–2 forbedringsoppgaver."], tip: "Treningsdagbok: Et sted å skrive tanker, lage treningsplaner og gjøre evalueringer. Gjør den personlig, positiv og interessant!" },
  ]},
  "mental-n3-visualisering": { id: "mental-n3-visualisering", title: "Visualisering – Nivå 3", sections: [
    { heading: "Visualisering", text: ["En av de mest effektive mentale teknikkene. Forestill deg noe i hodet – aktiver så mange sanser som mulig: syn, lukt, hørsel, kroppsfølelse og gode følelser.", "Visualisering skaper spor i hjernen som øker sannsynligheten for at det du vil, skjer. Bygg deg opp et «bibliotek» i hodet av gode aksjoner."] },
    { heading: "PETTLEP", text: ["Et huskeord for god visualisering:"], list: ["P – Physical: Etterlikne bevegelsene. Bruk alle sanser!", "E – Environment: Se for deg hallen du skal spille i.", "T – Task: Bestem på forhånd hva du skal visualisere.", "T – Timing: Samme tempo som i virkeligheten.", "L – Learning: Juster i takt med utviklingen.", "E – Emotion: Få tak i godfølelsen – selvtillit, trygghet, glede.", "P – Perspectiv: Innenfra (du er i aksjonen) eller utenfra (ser deg selv på film)."], tip: "Se for deg en kamp hvor du spilte veldig bra. Lagre bildene og ta dem frem før neste trening. Visualiser arbeidsoppgaven 5 ganger optimalt før trening." },
  ]},
  "mental-n3-indre-dialog": { id: "mental-n3-indre-dialog", title: "Indre dialog – Nivå 3", sections: [
    { heading: "Håndtere negative tanker og fjerne hindringer", text: ["Den indre dialogen kan inneholde forstyrrende tanker som tapper energi. Perfeksjonisme og selvkritikk kan bremse utviklingen.", "En effektiv teknikk: forestill deg at de forstyrrende tankene tilhører en «indre sabotør». Vær kreativ – steng den inne i et skap, send den på ferie!", "For noen er det bedre å bare akseptere tankene. SOAL-teknikken:"], list: ["S – Stopp tanken", "O – Observer uten å engasjere deg", "A – Aksepter uten å gå til kamp", "L – La den gå"], tip: "Forestill deg din indre sabotør som en skikkelse og finn en måte å stoppe den på. Bruk fantasien – alt er lov!" },
  ]},
  "mental-n3-selvtillit": { id: "mental-n3-selvtillit", title: "Selvtillit – Nivå 3", sections: [
    { heading: "Positivt selvsnakk", text: ["Påvirk selvtilliten gjennom affirmasjoner, attribusjoner (forklar suksess med egen fortreffelighet) og positiv selvstimulering.", "Fremkall gode følelser gjennom visualisering og knytt dem til kroppsspråk – rett i ryggen, opp med hodet, brystet frem."] },
    { heading: "Selvbilde", text: ["Selvtillit er knyttet til mestring. Selvbilde handler om hvem du er – du er ikke prestasjonen. Vær glad i deg selv uansett om du har en dårlig dag."] },
    { heading: "Tro", text: ["Å tro på at det går bra er en sterk kraft. «Tro kan flytte fjell.» Pass på at rutinene dine har en funksjon og er gjennomførbare uansett hvor du spiller."] },
    { heading: "Flyt – nivå på utfordring", text: ["Å være i «flytsonen» = god balanse mellom utfordringer og ferdigheter. God selvtillit → legg listen høyt. Lavere selvtillit → senk listen og tren på det du er god på."] },
  ]},
  "mental-n3-konsentrasjon": { id: "mental-n3-konsentrasjon", title: "Konsentrasjon – Nivå 3", sections: [
    { heading: "Fokus, retning og bredde", text: ["Fokus = hva du retter oppmerksomheten mot. Tilstedeværelse i nuet er kritisk i kamp.", "Retning: innover (egne tanker) eller utover (situasjonen). Bredde: bredt (oversikt) eller smalt (én aksjon)."], list: ["Bred ytre: Vite hva som skjer overalt på banen", "Smal ytre: Straffekast – kun det vesentlige", "Bred indre: Visualisere kampsituasjoner", "Smal indre: Visualisere en spesifikk teknikk"], tip: "Tren mindfulness/oppmerksomhetstrening. Olympiatoppen har program på imaxfocus.com." },
  ]},
  "mental-n3-stressmestring": { id: "mental-n3-stressmestring", title: "Stressmestring – Nivå 3", sections: [
    { heading: "Kartlegging og stressorer", text: ["Forstyrrelser kan være indre (negative tanker) eller ytre. Det viktigste er om du lar deg forstyrre. Vær bevisst på hva som forstyrrer – skriv en liste."] },
    { heading: "Mestringsstrategier", text: ["Avspenningsteknikker kan hjelpe. Noen oppnår avslapning på sekunder med pust og kroppslig avspenning. Knytt gjerne en trigger til teknikken – et ord eller en bevegelse.", "Du kan også bruke tanketeknikker som oppmerksomhetstrening."] },
  ]},
  "mental-n3-forberedelser": { id: "mental-n3-forberedelser", title: "Kamp- og treningsforberedelser – Nivå 3", sections: [
    { heading: "Ritualer", text: ["Mange har spesielle ritualer for forutsigbarhet, tro og trygghet. Noen er hensiktsmessige, andre minner om overtro – men kan gi god mental effekt.", "Vær forberedt på å gi slipp på ritualet når du ikke får gjennomført det."] },
    { heading: "Triggere", text: ["Påminnere som utløser følelser eller gode tanker. Eksempler: gjenstander med symbolverdi, ord på hånda, spesielle håndbevegelser, pannebånd."] },
  ]},
  "mental-n3-motivasjon": { id: "mental-n3-motivasjon", title: "Motivasjon – Nivå 3", sections: [
    { heading: "Vedlikeholde og øke", text: ["Motivasjonen er som en vektskål. Ytre kilder: belønning, resultater, ros. Indre kilder: utvikling, glede, sosial trivsel.", "Å ha det gøy med håndballen er for mange den viktigste kilden. Hvis gleden mangler kan det drepe lysten.", "Viktig: aksepter og trives med rollen din i laget. Hvis ikke – snakk med treneren."], tip: "Sett opp en prioritert liste over hva som motiverer deg. Pass på at de tre viktigste er tilstede mesteparten av tiden." },
  ]},
  "mental-n4-malsetting": { id: "mental-n4-malsetting", title: "Målsetting – Nivå 4", sections: [
    { heading: "Drøm", text: ["Et fjernt, motiverende mål. Hold drømmen levende gjennom dagdrømming og visualisering. Ha bilde av drømmen på veggen, pc eller mobil."] },
    { heading: "Langsiktige mål", text: ["Mål for en sesong eller lengre. Resultatmål (vinne cupen), prestasjonsmål (spille X kamper), mestringsmål (teknikk, spilleforståelse).", "Ha mye fokus på mestringsmål – de er her og nå i daglig trening. Resultatmål kan gjøre deg sårbar."] },
    { heading: "SMART", text: ["Huskeord for fornuftige mål:"], list: ["S – Spesifikke (konkret)", "M – Målbart", "A – Attraktivt (motiverende)", "R – Realistisk (oppnåelig)", "T – Tidsfrist"], tip: "Lag din egen mål- og utviklingsplan. Treneren kan ha mål- og utviklingssamtale med deg." },
  ]},
  "mental-n4-konsentrasjon": { id: "mental-n4-konsentrasjon", title: "Konsentrasjon – Nivå 4", sections: [
    { heading: "Energistyring", text: ["Spar energien til oppvarming og kamp. Ha en AV/PÅ-knapp som styrer når du fokuserer på håndball og når du kopler av.", "Rett oppmerksomheten mot ting du kan gjøre noe med. Ikke sløs energi på skadesituasjon, lite spilletid, dommeravgjørelser.", "Noen følelser gir energi (glede, stolthet), andre tapper (sinne, frustrasjon). Oppsøk energigivende mennesker og aktiviteter."] },
    { heading: "Perspektiv", text: ["Velg det «brilleparet» som er mest hensiktsmessig. En skade kan være vondt, men også et sted for å utvikle andre sider. Se muligheter i stedet for begrensninger.", "«Det er i motbakke det går oppover» – «Bak skyene er himmelen alltid blå»."] },
  ]},
  "mental-n4-spenning": { id: "mental-n4-spenning", title: "Spenningsregulering – Nivå 4", sections: [
    { heading: "Optimalt spenningsnivå", text: ["Spenningsnivået bygges opp gjennom forberedelsene og den mentale/fysiske oppvarmingen. Ikke «svi av for mye krutt» før kampen starter.", "I avgjørende øyeblikk kan spenningsnivået påvirke konsentrasjon, teknikk og vurderingsevne."] },
    { heading: "Regulere ned", text: ["Signaler: mer nervøs enn vanlig, negative tanker, anspent kropp, urolig mage.", "Teknikker: pusteteknikk, avspenning med triggerord, avslappende musikk, visualisering av mestringsopplevelser. Humor er bra! «Mor er glad i meg uansett»."] },
    { heading: "Regulere opp", text: ["Musikk, visualisere noe aktiverende, hard fysisk oppvarming, «fyre hverandre opp» med en medspiller."], tip: "Se for deg en kamp hvor du presterte optimalt. Prøv å få tak i tilstanden. På en skala fra 1–10 – hvor ligger ditt optimale spenningsnivå?" },
  ]},
  "mental-n4-forberedelser": { id: "mental-n4-forberedelser", title: "Kamp- og treningsforberedelser – Nivå 4", sections: [
    { heading: "Plan", text: ["De fleste lag har faste rutiner: oppmøte, måltider, spillermøte, oppvarming, innmarsj. Legg dine individuelle rutiner rundt lagets tidsplan.", "Mange starter med nøye kosthold og nok søvn. Noen visualiserer arbeidsoppgaver knyttet til motstander.", "Å finne rett «kampmodus» er en læringsprosess. Tilstandsord: sterk, trygg, usårbar, gi alt, ha det gøy, brystet frem."] },
    { heading: "Plan B – forstyrrelser og endringer", text: ["Alt går ikke etter planen. Ha alternative løsninger klare. Lagre erfaringer slik at du kjenner igjen situasjonen.", "Klassiske eksempler: endringer i reisetid, garderoben er låst, dårlig oppvarming, støy fra publikum. Husk: det finnes løsninger på alt."] },
  ]},
  "mental-n4-motivasjon": { id: "mental-n4-motivasjon", title: "Motivasjon – Nivå 4", sections: [
    { heading: "Redusere demotivasjon", text: ["Noen ganger er det andre forhold som tærer: skade, forventningspress, konflikter, personlige problemer utenfor håndballen.", "Du kan forsøke å løse problemet, eller finne måter å forholde deg til det. «Det er ikke så viktig hvordan man har det, men hvordan man tar det.»", "Internt problem? Ta det opp. Eksternt? Håndballen kan være et fristed med glede og energi."], tip: "Skriv ned problemet i en bok, legg det vekk før trening. Si til deg selv: nå fokuserer jeg 100% på håndballen." },
  ]},
}

// ─────────────────────────────────────────────────────────────
// SECTIONS
// ─────────────────────────────────────────────────────────────
export const utviklingSections: USection[] = [
  { id: "om-utviklingstrappa", title: "Om utviklingstrappa", icon: "layers", theme: "darkSoft", type: "rich",
    paragraphs: ["I de fleste idretter i dag benyttes en utviklingstrapp som gir anbefalinger om hva som er viktig å trene på i de ulike fasene av et utviklingsløp.", "Vi har delt vår utviklingstrapp inn i nivåer. Nivå som håndballspiller defineres av nivå i kampsituasjon. Det nivået du er i stand til å utnytte ferdighetene dine på, til fordel for laget, er det nivået du er kommet til i utviklingstrappen.", "Bruk av en utviklingstrapp vil kunne gi et langsiktig utviklingsløp fra første treningsår. Trening i samsvar med prinsipper og metoder i håndballens utviklingstrapp øker mulighetene for at flere unge utøvere får oppleve en treningshverdag preget av utviklingsfokus og sunn balanse mellom utfordring og mestring.", "Håndballidretten er i stadig utvikling og det stilles betydelige krav til fysiske, tekniske, taktiske og mentale ferdigheter. Disse ferdighetene avgjør på hvilket nivå man evner å skape og utnytte spillesituasjoner til fordel for eget lag.", "Håndballferdighet kan defineres ut fra hvilke fysiske, tekniske, taktiske og mentale ferdigheter den enkelte spiller har."],
    source: { label: "Norges Håndballforbund – Utviklingstrappa", url: "https://www.utviklingstrappa.no" },
  },
  { id: "laeringsmiljoer", title: "Læringsmiljøer", icon: "heart", theme: "blue", type: "rich",
    paragraphs: ["Før vi starter på de ulike nivåene ønsker vi å skape en bevissthet rundt ulike læringsmiljøer. Det å være i gode utviklingsmiljøer er en viktig faktor for prestasjonsutviklingen. Det psykologiske læringsmiljøet en befinner seg i påvirker den enkelte spillers subjektive oppfatning av læringssituasjoner og dermed muligheten til å oppleve mestring og utvikling.", "Vi snakker om to målperspektiv:"],
    cards: [
      { tone: "blue", heading: "OPPGAVEORIENTERT", text: "Spilleren har seg selv som referanse. Mestringsfølelsen utløses ved forbedring eller ny oppgave mestret. Fokus: «Hvordan kan jeg forbedre ferdigheten min?» «Hva må til for at jeg skal bli bedre?»" },
      { tone: "red", heading: "RESULTATORIENTERT", text: "Opptatt av å bevise ferdigheter i forhold til andre (ego-orientering). Hovedmålet er å dokumentere dyktighet og kompetanse i forhold til andre. Vil ofte være mer sårbar når forventninger ikke innfris." },
    ],
    callouts: [{ tone: "info", title: "Betydningen av et godt læringsmiljø", text: "Studier viser at utøvere som oppfatter sitt miljø som oppgaveorientert er mer tilbøyelig til å velge passe utfordrende oppgaver, like læringssituasjonen bedre og ha en sterkere tro på betydningen av egeninnsats. Disse tendensene omfatter også utøvere med lav selvvurdert mestringsevne. Det bør være viktig for oss alle å arbeide for å fremme oppgaveorienterte læringsmiljøer i norsk håndball." }],
  },
  { id: "tekniske-ferdigheter", title: "Tekniske ferdigheter", icon: "target", theme: "red", type: "levels", tagLabel: "Teknisk",
    intro: "Som en grunnleggende definisjon kan vi si at teknikk er den enkelte utøveres bevegelsesløsning, og at god teknikk i håndball er en funksjonell løsning av bevegelsesoppgavene i spillet. Teknikk handler om bevegelse, og om hvilke bevegelser vi bruker for å løse de utfordringene som spillet gir oss. Når du skal trene teknikk er det viktig å få et så godt bilde av teknikken som mulig. Teknikktrening bør skje i starten av økten og det bør legges opp til mange repetisjoner.",
    levels: [
      { level: 1, age: "6–9 år", sub: "Lek & bevegelsesglede", items: [{ heading: "Innlæring gjennom lek", subItems: ["Ballbehandling", "Skudd fra gulvet og fra lufta", "Drible begge hender", "Finte v-h og h-v", "Fokus på rytme", "Avløp: Hvordan komme seg forbi forsvarsspilleren uten ball?", "Tohåndsmottak og kast med høyre og venstre hånd"] }, "Bruk ulike typer baller", "Teknikktreningen skal ha utgangspunkt i den enkeltes utviklings- og ferdighetsnivå", "«Kompis med ballen»", "I forsvar bør fokus være på forflytning og snapping. Ønsket om å vinne ballen må stå sentralt."] },
      { level: 2, age: "10–12 år", sub: "Ferdighetsbygging", items: [{ heading: "Innlæring og videreutvikling gjennom lek", subItems: ["Ballbehandling", "Skudd fra gulvet og fra lufta – fra ulike posisjoner", "Finte (blant annet overslag, piruett og skuddfinte) – hvordan komme seg forbi forsvarsspilleren med ball?", "Avløp: Hvordan komme seg forbi forsvarsspiller uten ball", "Etthånds mottak", "Kast med høyre og venstre hånd i fart", "Bruk ulike typer baller"] }, { heading: "Skuddteknikk", subItems: ["Sats «feil» fot", "Stem skudd", "Parallelle føtter (fra gulv og luft)", "Stegskudd", "Introdusere posisjonsspesifikke skudd (LS, KS, BS)"] }, { heading: "Pasningsteknikk", subItems: ["Pasningsfinte", "Innspill, utspill, oppspill"] }, { heading: "Forsvar", subItems: ["Duellspill 1:1 og 1:2", "Finte som forsvarsspiller", "Beredskapsstilling", "Forflytning", "Takling", "Snapp"] }] },
      { level: 3, age: "13–15 år", sub: "Automatisering", items: [{ heading: "Automatisere teknikker", subItems: ["Ballbehandling med press", "Kast og mottak – med press og motspill, i fart og fra lufta", "Dribling", "Finte", "Skudd", "Sperrer", "Forflytning", "Takling", "Snapp", "Blokk"] }, "Faserelatert og posisjonsbestemt teknikk", "Spesialisere egen teknikk med utgangspunkt i egne ferdigheter og forutsetninger", "La alle spillerne få trene i linjeposisjon", "Vær bevisst på biologisk utvikling og modning (se egen tekst)"] },
      { level: 4, age: "16–20 år", sub: "Spisskompetanse", items: ["Situasjonsbestemt teknikk", { heading: "LS", subItems: ["Forflytning – sperre – mottak", "Forflytning – sperre – rykk – mottak", "Mottak med en hånd (høyt og lavt) – med og uten press"] }, { heading: "BS", subItems: ["Forflytning uten ball – posisjonering ut fra situasjon", "«Spesialskudd» og «Spesialfinte»", "Innspill, utspill og oppspill"] }, { heading: "KS", subItems: ["Tilløp med ulike vinkler", "Høyde i innhoppet", "Kunne satse på både venstre og høyre fot", "Variert skuddteknikk – kunne skyte i hele målet"] }, "Teknikker fra nivå 3 beherskes med høyere fart, kraft og presisjon i spill og motspill", "Vær bevisst på biologisk utvikling og modning (se egen tekst)"] },
    ],
  },
  { id: "taktiske-ferdigheter", title: "Taktiske ferdigheter", icon: "swords", theme: "blue", type: "levels", tagLabel: "Taktisk",
    intro: "Taktiske ferdigheter er hva spilleren velger å gjøre i enhver situasjon som oppstår. Valget tas i forhold til hvordan medspillere og motspillere agerer. Valgene kan være med eller uten ball, ut fra hva situasjonen tilsier. I tillegg har vi i håndball relasjonelle ferdigheter – håndballkvalitet som oppstår i samspill mellom to eller flere spillere. Ingen kan fullt ut vise sin kvalitet som håndballspiller på egenhånd.",
    levels: [
      { level: 1, age: "6–9 år", sub: "Spillforståelse gjennom lek", items: ["Ulike spillvarianter med forenklede regler og avgrenset område", "Få spillere på hvert lag – gir mye ballkontakt", "Spillvariantene bør stimulere: løp, hopp, kast, mottak, dribling, bevegelser uten ball og finter", "2:1 spill"] },
      { level: 2, age: "10–12 år", sub: "Valgtrening og samarbeid", items: ["Ulike spillvarianter med forenklede regler og avgrenset område", "Få spillere på hvert lag – gir mye ballkontakt", "Bruk mye tid på spill på avgrenset område og få spillere selv om dere nå spiller på stor bane", "Spillvariantene bør stimulere: løp, hopp, kast, mottak, dribling, bevegelser uten ball, finter, sidelengs forflytning, beredskapsstilling og snapp", "Elementer som trener samarbeid og valgtrening: 2:1, 3:2 og 4:3", "Duellspill 1:1 og 2:2 – fokus på spill og motspill", "Introdusere overgangsspill, pådragsspill og samarbeid BS–LS, BS–KS og KS–LS", "Introdusere forsvar med ulike presshøyder – fokus på å vinne ballen"] },
      { level: 3, age: "13–15 år", sub: "Småspill og faser", items: ["Utvikle pådragsspill og overgangsspill", "Introdusere kryssningsspill", "Valgtrening gjennom småspill bør stå sentralt: 3:2, 4:3, 2:2 og 3:3", "Videreutvikle samarbeid BS–LS, BS–KS og KS–LS", "Duellspill 1:1", "Forsvarsspill i små grupper: 2:2, 3:3 – plassering, initiativ og samarbeid i forsvar", "Videreutvikle forsvar med ulike presshøyder – fokus på å vinne ballen", "Kontra–retur: 1:1, 2:1, 2:2, 3:2, 3:3, 4:3 og 4:4"] },
      { level: 4, age: "16–20 år", sub: "Formasjoner og roller", items: ["Bruk av ulike formasjoner i forsvar og angrep", "Kunne bruke de individuelle ferdighetene i det «ferdige» spillet", "Roller og samarbeid i spillets ulike faser"] },
    ],
  },
  { id: "malvaktsferdigheter", title: "Målvaktsferdigheter", icon: "shield", theme: "redSoft", type: "levels", tagLabel: "Målvakt",
    intro: "Posisjonen som målvakt har litt andre arbeidskrav for fysiske, tekniske og taktiske ferdigheter. Her er en progresjon på de ulike ferdighetene en målvakt bør kunne.",
    levels: [
      { level: 1, age: "6–9 år", sub: "Allsidig introduksjon", items: ["Koordinative øvelser som stimulerer øye-hånd, øye-fot, rytme og balanse", "Bør trenes felles med resten av laget", "Alle bør prøve seg i mål"] },
      { level: 2, age: "10–12 år", sub: "Grunnteknikk", items: ["Koordinative øvelser som stimulerer øye-hånd, øye-fot, rytme og balanse", "Arbeid med riktig grunnstilling", { heading: "Enkel teknikkinnlæring", subItems: ["Stående utfall (oppe og nede)", "Sitteteknikk"] }, "Mye av teknikktreningen bør gjøres uten skudd", "Fraskyv på riktig ben", "Trening av bevegelighet", "De som ønsker bør få prøve seg i mål", "Igangsetting: pasninger på ca. 10 meter – raskt etter ballkontroll"] },
      { level: 3, age: "13–15 år", sub: "Utvikling og vurdering", items: ["Videreutvikle øye-hånd og øye-fot koordinasjon", "Grunnstilling i ulike posisjoner", "Langt og kort opptrekk", "Rette skudd", "Stående og sittende utfall med skudd", "Trening av bevegelighet, innside og bakside", "Stabilitet av kjernemuskulatur", "Kantskudd teknikk/taktikk", "Igangsetting: lange baller 25–30 meter", "Igangsetting: harde, presise baller på 10 m", "Utvikle vurderingsevnen"] },
      { level: 4, age: "16–20 år", sub: "Spisskompetanse", items: ["Skudd med press – lese skudd", "Anvende strategier (f.eks. invitere og lukke)", "Posisjonering i dybde og sidelengs i forhold til ulike skuddposisjoner", "Styrke og stabilitet i kroppsstamme", "Eksplosivitet i skyv og utfall", "Bevegelighet", "Igangsetting i høyt tempo og med liten vurderingstid (korte og lange baller fra ulike utgangsstillinger: sittende/stående)", "Automatisere ulike igangsettingsteknikker", "Harde, presise baller på 25–30 meter"] },
    ],
  },
  { id: "fysiske-ferdigheter", title: "Fysiske ferdigheter", icon: "dumbbell", theme: "blueSoft", type: "levels", tagLabel: "Fysisk",
    intro: "Fysiske ferdigheter er en viktig forutsetning for å kunne utføre de tekniske ferdighetene på en god og hensiktsmessig måte og til å skape effektive bevegelsesløsninger i ulike situasjoner på håndballbanen. Fysisk trening er en prosess som stimulerer flest mulig av de egenskapene som påvirker spillerens prestasjoner på banen i kamp. Målet er å påvirke hele personen og bidra til å vedlikeholde eller bedre den idrettsspesifikke prestasjonsevnen på en måte som gir varig endring og glede.",
    levels: [
      { level: 1, age: "6–9 år", sub: "Lekbasert fysikk", items: [{ heading: "Ferdigheter man bør ha fokus på", subItems: ["Koordinasjon (øye-hånd, øye-fot, balanse, rytme)", "Styrke med egen kropp", "Spenst og hurtighet", "Agility (retningsendringer)"] }] },
      { level: 2, age: "10–12 år", sub: "Videre utvikling", items: [{ heading: "Ferdigheter man bør ha fokus på", subItems: ["Koordinasjon (øye-hånd og øye-fot, balanse, rytme, romorientering)", "Styrke med egen kropp", "Ulike former for hopp på ett og to ben", "Agility (retningsendringer)", "Hurtighet"] }, "Fysisk trening kan i tillegg legges før eller etter treningstiden i hall"] },
      { level: 3, age: "13–15 år", sub: "Styrke og utholdenhet", items: ["Utvikling av koordinative og motoriske ferdigheter bør stå sentralt", "Fortsette med styrketrening med egen kropp", "Introdusere hjelpemidler som medisinballer, strikk o.l.", "Fokus på å bli sterk i kroppsstammen", "Lære teknikk i styrketrening med ytre belastning", "Lære ulike former for utholdenhetstrening", "Vær bevisst på biologisk utvikling og modning (se egen tekst)"] },
      { level: 4, age: "16–20 år", sub: "Belastning og prestasjon", items: ["Bygge grunnlaget for å tåle belastningen som håndballspillet på seniornivå gir", "Bygge grunnlag for å prestere", "Lære balansen mellom trening og restitusjon/hvile", "Vær bevisst på biologisk utvikling og modning (se egen tekst)"] },
    ],
  },
  { id: "mentale-ferdigheter", title: "Mentale ferdigheter", icon: "brain", theme: "dark", type: "levels", tagLabel: "Mentalt",
    intro: "Å trene på å utvikle mentale ferdigheter vil ofte hjelpe utøveren til å bedre kunne dra nytte av de fysiske, tekniske eller taktiske ferdighetene som utøveren allerede besitter eller ønsker å tilegne seg. For de aller yngste handler det om å skape et positivt selvbilde, samt skape en god relasjon i laget hvor glede, trivsel, trygghet og mestring står sentralt.",
    levels: [
      { level: 1, age: "6–9 år", sub: "Trygghet og mestring", items: ["Skape mestringsfølelse gjennom lekbetonte øvelser", "Trene på å få og gi positive tilbakemeldinger", "Skape en god sosial atmosfære i gruppen", "Tenk glede, trivsel, trygghet og mestring"] },
      { level: 2, age: "10–12 år", sub: "Lagfølelse og ansvar", items: ["Skape mestringsfølelse gjennom lekbetonte øvelser", "Trene på å få og gi positive tilbakemeldinger", "Skape en god sosial atmosfære i gruppen", "Tenk glede, trivsel, trygghet og mestring", "Lagfølelse (lagånd) bør stå sentralt: Hvordan vi vil ha det hos oss? Hvordan vil vi være mot hverandre?", "Utfordre spillerne på utviklingsoppgaver og ansvar for egen læring", { heading: "Indre dialog", subItems: ["Positiv forsterkning"] }, { heading: "Selvtillit", subItems: ["Bygge selvtillit gjennom arbeid med mestring", "Bygge selvtillit gjennom positivt selvsnakk"] }], deepDives: [{ label: "Indre dialog", modalId: "mental-n2-indre-dialog" }, { label: "Selvtillit", modalId: "mental-n2-selvtillit" }] },
      { level: 3, age: "13–15 år", sub: "Verktøy og teknikker", items: ["Glede, trivsel, trygghet og mestring", "Lagånd", "Videreutvikle ansvar for egen læring", { heading: "Målsetting", subItems: ["Drøm", "Kortsiktige mål", "Mål og arbeidsoppgaver i trening og kamp", "Evaluering"] }, { heading: "Visualisering", subItems: ["Visualisering – PETTLEP"] }, { heading: "Indre dialog", subItems: ["Håndtere negative tanker og fjerne hindringer"] }, { heading: "Selvtillit", subItems: ["Nivå på utfordring", "Selvbilde, tro, positiv selvsnakk"] }, { heading: "Konsentrasjon", subItems: ["Fokus, retning og bredde"] }, { heading: "Stressmestring", subItems: ["Kartlegging og strategier", "Mestringsstrategier"] }, { heading: "Kamp- og treningsforberedelser", subItems: ["Ritualer", "Triggere"] }, { heading: "Motivasjon", subItems: ["Vedlikeholde og øke"] }], deepDives: [{ label: "Målsetting", modalId: "mental-n3-malsetting" }, { label: "Visualisering", modalId: "mental-n3-visualisering" }, { label: "Indre dialog", modalId: "mental-n3-indre-dialog" }, { label: "Selvtillit", modalId: "mental-n3-selvtillit" }, { label: "Konsentrasjon", modalId: "mental-n3-konsentrasjon" }, { label: "Stressmestring", modalId: "mental-n3-stressmestring" }, { label: "Forberedelser", modalId: "mental-n3-forberedelser" }, { label: "Motivasjon", modalId: "mental-n3-motivasjon" }] },
      { level: 4, age: "16–20 år", sub: "Egen styring", items: ["Utvikle egne teknikker for visualisering, indre dialog, målsetting mm.", "Lære å være «din egen sjef» – styre egen utvikling (selvstendig utøver). Bli bevisst på valg og konsekvenser.", "Videreføre områdene fra nivå 3", { heading: "Målsetting", subItems: ["Drømmen", "Langsiktige mål", "Evaluering", "Mål – SMART"] }, { heading: "Visualisering", subItems: ["Automatisere teknikker"] }, { heading: "Indre dialog", subItems: ["Håndtere negative tanker", "Fjerne hindringer"] }, { heading: "Selvtillit", subItems: ["Selvbilde – du er mer enn prestasjonen din", "Videreutvikle fra nivå 3: tro – bevisst bygge tro på egne ferdigheter"] }, { heading: "Konsentrasjon", subItems: ["Energistyring – hva får du gjort noe med?", "Perspektiv – hvordan velger du å tenke?"] }, { heading: "Spenningsregulering", subItems: ["Bli bevisst optimalt spenningsnivå", "Lære teknikker for å regulere opp", "Lære teknikker for å regulere ned"] }, { heading: "Stressmestring", subItems: ["Kartlegging av situasjoner og stressorer", "Bevissthet", "Mestringsstrategier"] }, { heading: "Kamp- og treningsforberedelser", subItems: ["Plan", "Plan B – forstyrrelser og endringer", "Triggere – automatisere/videreutvikle"] }, { heading: "Motivasjon", subItems: ["Redusere demotivasjon"] }], deepDives: [{ label: "Målsetting", modalId: "mental-n4-malsetting" }, { label: "Konsentrasjon", modalId: "mental-n4-konsentrasjon" }, { label: "Spenningsregulering", modalId: "mental-n4-spenning" }, { label: "Forberedelser", modalId: "mental-n4-forberedelser" }, { label: "Motivasjon", modalId: "mental-n4-motivasjon" }] },
    ],
  },
  { id: "trenerrollen", title: "Trenerrollen", icon: "graduationCap", theme: "darkSoft", type: "levels", tagLabel: "Trenerrolle",
    intro: "Du som trener er den viktigste personen for at spilleren skal oppleve mestring, glede og ferdighetsutvikling – og gjennom det ha lyst til å spille håndball i mange år.",
    levels: [
      { level: 1, age: "6–9 år", sub: "Omsorg og miljø", items: ["Skape glede, trygghet og mestring gjennom oppmuntring og motivasjon.", "Treneren bør være en omsorgsperson, forbilde, læremester og miljøskaper.", "Alle barn skal ha trenerens oppmerksomhet.", "Velg øvelser som er gode for ferdighetsutvikling og som stimulerer til høy aktivitet.", "Treneren bør ha tatt eller startet på utdanningen «Barnehåndballtreneren».", "Det er anbefalt å ha en trener pr 5–6 barn på dette nivået."] },
      { level: 2, age: "10–12 år", sub: "Utvikling og feedback", items: ["Skape glede, trygghet og mestring gjennom oppmuntring og motivasjon.", "Treneren bør være en omsorgsperson, forbilde, læremester, verdibasert formidler, ferdighetsutvikler og miljøskaper.", "Alle barn skal ha trenerens oppmerksomhet og få en positiv og konstruktiv feedback som stimulerer til ferdighetsutviklingen.", "Velg øvelser som er gode for ferdighetsutvikling og som stimulerer til høy aktivitet og som gir differensierte utfordringer.", "Treneren bør ha tatt eller startet på utdanningen «Trener 1».", "Det er anbefalt å ha en trener pr 6–8 barn på dette nivået."] },
      { level: 3, age: "13–15 år", sub: "Tydelighet og medansvar", items: ["Skape glede, trygghet og mestring gjennom oppmuntring og motivasjon.", "Gi positiv og konstruktiv feedback, vær utviklingsorientert.", "Tydelig i kommunikasjon.", "Vis interesse og empati.", "Involvere og gi utøverne medansvar.", "Ansvarlig for at hver og en opplever utvikling og mestring.", "Treneren bør ha tatt eller startet på utdanningen «Trener 2».", "Det er anbefalt å ha en trener pr 10 spillere på dette nivået."] },
      { level: 4, age: "16–20 år", sub: "Prestasjon og krav", items: ["Skape glede, trygghet og mestring gjennom oppmuntring og motivasjon.", "Gi positiv og konstruktiv feedback, vær utviklingsorientert.", "Veiled i spillerens utvikling.", "Vær fleksibel, men still krav.", "Tydelig i kommunikasjon.", "Vis interesse og empati.", "Involvere og gi utøverne medansvar.", "Ansvarlig for at hver og en opplever utvikling og mestring.", "Utfordre spillerne til egen utvikling.", "Treneren bør ha tatt utdanningen «Trener 2» og, avhengig av nivå, startet på «Trener 3».", "Forberede til å prestere i kamp.", "Det er anbefalt å ha en trener pr 10 spillere på dette nivået."] },
    ],
    callouts: [{ tone: "info", title: "Mestringsklima", text: "Skap et mestringsklima og unngå et prestasjonsklima! Gi alle anerkjennelse og oppmerksomhet. Aksepter feil – la det bli en del av læringen. Sørg for mangfold i læringsaktiviteten. Vurder utøveren på innsats, fremgang og engasjement. La utøverne få nok tid i læringsprosessen. Skap et autonomistøttende og involverende klima: legg til rette for initiativ, medinnflytelse og valg fra utøverens side. Ta utøverens perspektiv ved problemløsning og vær lydhør for deres følelser." }],
  },
  { id: "konkurransen", title: "Konkurransen", icon: "trophy", theme: "redSoft", type: "levels", tagLabel: "Konkurranse",
    intro: "I selve konkurransen, håndballkampen, er det ulike elementer spilleren bør trene på å ha fokus på. Denne delen vil også være en rettesnor for klubben og laget. Husk at det er viktig at spillerne skal ha noe å se frem til og glede seg til. Det er viktig at spillerne ikke har opplevd «alt» i ung alder.",
    levels: [
      { level: 1, age: "6–9 år", sub: "Glede og Fair Play", items: ["Ha fokus på Fair Play.", "Skap jevne kamper.", "La barna spille i flere posisjoner."] },
      { level: 2, age: "10–12 år", sub: "Rett nivå og opplevelser", items: ["Ha fokus på Fair Play.", "Meld på til rett nivå og skap jevne kamper.", "La barna spille i flere posisjoner.", "Delta på 1–2 overnattingsturneringer per sesong."] },
      { level: 3, age: "13–15 år", sub: "Utviklingsfokus", items: ["Meld på til rett nivå.", "Gi spillerne utfordringer i flere posisjoner.", "Delta på to overnattingsturneringer per sesong.", "Ha et utviklingsfokus. Prøv gjerne å vinne kampen, men innenfor rammer som stimulerer til utvikling."] },
      { level: 4, age: "16–20 år", sub: "Prestasjon og overgang", items: ["Kampforberedelser.", "Skolering i å prestere.", "Håndtere press i kampsituasjoner.", "Beholde utviklingsfokus i all aldersbestemt aktivitet. Prøv å vinne kamper, men ikke for enhver pris.", "Delta på en lengre treningsleir.", "Delta på to overnattingsturneringer per sesong.", "Legge til rette for en gradvis overgang fra junior til seniorhåndball, tilpasset den enkelte spillers nivå, forutsetninger og ambisjoner."] },
    ],
  },
  { id: "treningsmengde", title: "Treningsmengde og progresjon", icon: "trendingUp", theme: "blueSoft", type: "table",
    paragraphs: ["NHF anbefaler at spilleren bør ha 2–3 treninger per spilte kamp. Det er derfor viktig at laget ikke melder seg på for mange kamparenaer. Fokuset på å utvikle de fysiske ferdighetene skal være høyt prioritert.", "Anbefalingene under gir en idé om hva NHF anbefaler som en fornuftig progresjon i treningsmengde fra en spiller starter med håndball i 6–7-årsalderen og frem til spilleren er i slutten av ungdomsårene og satser mot topphåndballen. Her vil det selvfølgelig være store variasjoner, ut fra blant annet når man begynner å spille håndball, ambisjoner og individuelle forutsetninger.", "Særlig på de to øverste nivåene er det vesentlig å merke seg at anbefalingene tar utgangspunkt i et utviklingsløp mot topphåndballen. Det vil selvfølgelig ikke gjelde alle spillere. Det skal være rom for å trene håndball et par ganger i uken og trives med det. Klubbene har et ansvar for å legge til rette for tilbud til ulike ambisjonsnivåer.", "NHF mener også at det er positivt med allsidighet og variasjon, og anbefaler derfor å drive med flere idretter. Opp til og med nivå 3 (til 15 år) bør det være uproblematisk å drive med flere idretter parallelt."],
    rows: [{ level: 1, age: "6–9", sessions: "1–3", days: "1–3 dager, 3–5 timer" }, { level: 2, age: "10–12", sessions: "2–4", days: "2–4 dager, 3–6 timer" }, { level: 3, age: "13–15", sessions: "3–6", days: "3–6 dager, 5–12 timer" }, { level: 4, age: "16–20", sessions: "7–12", days: "5–7 dager, 10–18 timer" }],
  },
  { id: "biologisk-alder", title: "Biologisk alder vs. fødselsdato", icon: "activity", theme: "redSoft", type: "rich",
    paragraphs: ["I ungdomsårene kan det være store fysiske forskjeller på spillerne. Som trener er det viktig at du håndterer det på en god måte og er bevisst på hvordan du ivaretar spillere som er på ulike stadier.", "Du må være forberedt på at den sportslige utviklingen i perioder vil kunne stagnere fordi spillerne får «nye kropper» som de skal lære å kjenne og bruke på en hensiktsmessig måte. Tenk for eksempel på gutten som vokser 20 cm i løpet av sommerferien og plutselig har masse «armer og bein» som skal kontrolleres. Det vil gjøre at koordinasjon, motorikk og teknikk en periode blir dårligere.", "Andre spillere kan være etter i den fysiske utviklingen og oppleve tilsvarende frustrasjon. De trener og står på, men føler kanskje at de ikke får det til så bra fordi de er underlegne fysisk. Også disse spillerne trenger å bli sett av treneren sin. Klarer du som trener å få disse spillerne til å fokusere på det de kan gjøre noe med, så kan det være spillere som det «plutselig» løsner for.", "Ikke minst er det viktig at du som trener forstår at nivået til spillerne i særlig barnehåndballen og tidlig i ungdomshåndballen vil være summen av den fysiske utviklingen og hvor lenge de har spilt håndball (altså hvor mye de har trent). De som trekkes frem som såkalte talenter i ung alder har ofte først og fremst et fortrinn på et eller begge av disse områdene."],
    callouts: [{ tone: "danger", title: "Viktig", text: "I ungdomsårene kan det være store fysiske forskjeller på spillerne. Som trener er det viktig at du håndterer det på en god måte og er bevisst på hvordan du ivaretar spillere som er på ulike stadier." }],
  },
  { id: "fagressurser", title: "Fagressurser", icon: "link", theme: "darkSoft", type: "resources",
    paragraphs: ["Til slutt i utviklingstrappen har vi samlet en del gode fagressurser som vil kunne være til god hjelp for trenere og klubber når man skal bygge opp gode utviklingsløp for spillere og lag."],
    resources: [
      { title: "Håndballtrening", desc: "NHFs samleside for håndballag", url: "https://www.handball.no/regioner/nhf-sentralt/utvikling/ht/" },
      { title: "«Håndballtreneren»", desc: "Din digitale trenerhåndbok", url: "https://www.xn--hndballtrenern-lib.no/" },
      { title: "Barnehåndball", desc: "NHFs portal for trening (6–12 år)", url: "https://www.handball.no/regioner/nhf-sentralt/utvikling/ht/barnehandball/" },
      { title: "«Forsvarsskolen»", desc: "Det du trenger for å bli en god forsvarsspiller", url: "https://www.forsvarsskolen.no/" },
      { title: "«Målvaktsskolen»", desc: "Hvordan utvikle neste generasjon målvakter?", url: "https://www.xn--mlvaktskolen-tcb.no/" },
      { title: "«Skuddskolen»", desc: "Trening for å utvikle skuddferdigheter", url: "https://www.skuddskolen.no/" },
      { title: "Håndballfysisk trening", desc: "Fysisk trening ut fra håndballkrav", url: "https://www.handball.no/regioner/nhf-sentralt/utvikling/ht/fysisk-trening/" },
      { title: "Ukas treningstips", desc: "Nye øvelser publiseres hver uke", url: "https://vimeopro.com/user40342050/ukas-treningstips" },
      { title: "Ferdige økter", desc: "Øktplaner for 6–16 år", url: "https://www.handball.no/regioner/nhf-sentralt/utvikling/ht/utgatt-barnehandball/barnehandball3/ferdige-okter/" },
      { title: "Go' og skadefri", desc: "NHFs sider for skadeforebygging", url: "https://www.handball.no/regioner/nhf-sentralt/utvikling/ht/goog-skadefri/" },
      { title: "skadefri.no", desc: "Hvordan forebygge skader i håndball?", url: "https://skadefri.no/idretter/handball/" },
    ],
  },
]
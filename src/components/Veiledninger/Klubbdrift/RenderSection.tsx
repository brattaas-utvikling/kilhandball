import React from "react";
import { motion, useInView } from "framer-motion";

interface Section {
  id: string;
  title: string;
  children?: Section[];
}

const RenderSection: React.FC<{ section: Section }> = ({ section }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const renderContent = (id: string) => {
    switch (id) {
      case "1-0":
        return (
          <>
            <p className="text-gray-700">
              Styret er klubbens høyeste myndighet mellom årsmøtene. Noen saker kan ikke styrebehandles, men må behandles av årsmøtet. Det gjelder saker som fremgår av «Årsmøtets oppgaver», og saker som er av ekstraordinær karakter eller av betydelig omfang i forhold til klubbens størrelse og virksomhet. Dersom styret er i tvil, bør saken opp på årsmøtet.
            </p>
          </>
        );
      case "1-1":
        return (
          <>
            <h3 className="text-xl font-semibold mt-6 mb-2 text-kilsvart">1.1 Styrets oppgaver</h3>
            <h4 className="text-lg font-medium mb-1">Lovpålagte oppgaver for styret</h4>
            <ul className="list-disc pl-5 mb-4 text-gray-700">
              <li>Styret skal drifte idrettslaget etter NIFs lov for idrettslag</li>
              <li>Sette i verk årsmøtets og overordnede organisasjonsledds regelverk og vedtak</li>
              <li>Påse at idrettslagets midler brukes og forvaltes på en forsvarlig måte, i samsvar med de vedtakene som er fattet på årsmøtet eller i et overordnet organisasjonsledd, og sørge for at idrettslaget har en tilfredsstillende organisering av regnskaps- og budsjettfunksjonen og en forsvarlig økonomistyring</li>
              <li>Etter behov oppnevne komiteer, utvalg eller personer for spesielle oppgaver og utarbeide mandat/instruks for deres funksjon</li>
              <li>Representere idrettslaget utad</li>
              <li>Oppnevne en som er ansvarlig for politiattester</li>
              <li>Oppnevne en ansvarlig (tillitsvalgt eller ansatt) for barneidretten.</li>
            </ul>
            <h4 className="text-lg font-medium mb-1">Andre viktige oppgaver</h4>
            <ul className="list-disc pl-5 mb-4 text-gray-700">
              <li>Planlegge og ivareta lagets totale drift, herunder mål- og strategiarbeid, budsjett og regnskap</li>
              <li>Påse at idrettens retningslinjer for aktiviteten i idrettslaget blir fulgt</li>
              <li>Det formelle arbeidsgiveransvaret.</li>
              <li>Legge frem innstilling til årsmøtet på kandidater til valgkomité</li>
              <li>Oppnevne to personer som i fellesskap skal disponere idrettslagets konti, og sørge for at de er dekket av underslagsforsikring</li>
              <li>Oppnevne eller engasjere regnskapsfører</li>
              <li>Lage årsberetning fra styret til årsmøtet</li>
              <li>Oppdatering av klubbhåndboka</li>
            </ul>
            <h4 className="text-lg font-medium mb-1">Styrets arbeid</h4>
            <p className="text-gray-700">
              Hovedstyret i KIL Håndball har møter seks til tolv ganger per år. På en del av møtene stiller også deltakere fra Sportslig utvalg. Det føres alltid referat fra møtene, hovedstyret har egen referent. Styret er vedtaksført når et flertall av styrets medlemmer er til stede. Vedtak fattes med flertall av de avgitte stemmene. Ved stemmelikhet er møtelederens stemme avgjørende. Styremedlemmene plikter å respektere et styrevedtak, selv om det er fattet mot vedkommende egen stemme. Styremøter kan avholdes per e-post eller elektronisk. Det skal alltid føres protokoll fra styremøtene. Daglig leder har møterett, men ikke stemmerett i hovedstyret. Hvert styremøte bør innledningsvis starte med spørsmål om det foreligger mulig inhabilitet i noen av sakene, og behandlingen av inhabilitet skal alltid protokolleres. Om inhabilitet, se lovnorm § 8.
            </p>
          </>
        );
      case "1-2":
        return (
          <>
            <h3 className="text-xl font-semibold mt-6 mb-2 text-kilsvart">1.2 Roller i Styret i KIL håndball</h3>
          </>
        );
      case "1-2-1":
        return (
          <>
            <h4 className="text-lg font-medium mb-1">1.2.1 Leder</h4>
            <p className="text-gray-700">Velges for 1 år</p>
            <ul className="list-disc pl-5 mb-4 text-gray-700">
              <li>Er ”ansvarlig” for driften av gruppa</li>
              <li>Er den som leder og legger opp alle styremøtene</li>
              <li>Er den som møter på alle hovedlagsmøter (hvis håndballen er en gruppe i et fleridrettslag eller medlem av et allianseidrettslag)</li>
              <li>Ansvarlig ved endelig inngåelse av kontrakter (spillerkontrakter, trenerkontrakter, sponsorkontrakter osv.)</li>
              <li>Hovedansvarlig i SA og ansvarlig for tilganger til medlemmer i organisasjonen</li>
              <li>Ansvarlig for å godkjenne overganger SA</li>
              <li>Er kontaktleddet til Norges Håndballforbund, NHF Region innlandet, idrettsråd og idrettskrets, og skal møte i de fellesfora hvor klubben er invitert.</li>
              <li>Informasjon herfra deles med resten av styret.</li>
              <li>Er den som delegerer og styrer jobber som ikke er definerte</li>
              <li>Utarbeide fullmaktmatrise og legge frem disse for vedtak i styret.</li>
              <li>Implementere rutiner som sikrer etterlevelse av disse.</li>
              <li>Er den som lager og fremfører årsrapporten til årsmøtet i samarbeid med nestleder.</li>
              <li>Pådriver for strategi og videreutvikling av gruppa.</li>
              <li>Kan, i tillegg til en annen delegert av styret, disponere håndballgruppas konti.</li>
            </ul>
          </>
        );
      case "1-2-2":
        return (
          <>
            <h4 className="text-lg font-medium mb-1">1.2.2 Nestleder</h4>
            <p className="text-gray-700">Velges for 2 år</p>
            <ul className="list-disc pl-5 mb-4 text-gray-700">
              <li>Fungere som leder under dennes fravær, og bør derfor være valgt med henblikk på at han/hun kan rykke opp som leder på et senere tidspunkt</li>
              <li>Føre referat fra årsmøte/styremøte og sørge for utsendelse av disse.</li>
              <li>Ansvarlig for innkallelse til styremøte, årsmøte osv.</li>
              <li>Ansvarlig for adresselister.</li>
              <li>Ansvarlig for arkiv.</li>
              <li>Ansvarlig ved oppmerksomhet som gaver, blomster osv på vegne av håndballgruppa/håndballklubben.</li>
              <li>Bistår leder og danner et lederteam med denne</li>
              <li>Ellers definerte oppgaver, på samme måte som et ordinært styremedlem.</li>
            </ul>
          </>
        );
      case "1-2-3":
        return (
          <>
            <h4 className="text-lg font-medium mb-1">1.2.3 Styremedlem</h4>
            <p className="text-gray-700">Velges for 2 år</p>
            <ul className="list-disc pl-5 mb-4 text-gray-700">
              <li>Bidra til å løse ikke definerte oppgaver (prosjekter)</li>
              <li>Være behjelpelig med styrets arbeid ved behov.</li>
              <li>Frivillighetsansvarlig</li>
              <li>Ansvarlig for å koordinere og samkjøre klubbens arbeid med å rekruttere, motivere og utvikle det frivillige arbeidet i klubben.</li>
            </ul>
          </>
        );
      case "1-2-4":
        return (
          <>
            <h4 className="text-lg font-medium mb-1">1.2.4 Økonomiansvarlig</h4>
            <p className="text-gray-700">Velges for 2 år</p>
            <ul className="list-disc pl-5 mb-4 text-gray-700">
              <li>Disponerer alle bankkontoer</li>
              <li>Ansvarlig for betaling av signerte regninger</li>
              <li>Fremlegge økonomisk oversikt til styret når de ber om det (både i hovedlaget og håndballgruppa)</li>
              <li>Oversikt over ”kasse”</li>
              <li>Føre regnskap for gruppa og sammen med leder legge frem budsjettet for styret ved årets slutt</li>
              <li>I samarbeid med dugnadsansvarlig ha ansvar for: Billettsalg i hallen, Dommeroppgjør i TA, Andre dugnader</li>
              <li>Ansvar for innkreving av treningsavgifter og purringer (evt. Ansvarlig for å delegere jobben videre til leder)</li>
              <li>Ansvarlig for oppdatering av medlemsregister (evt. i samarbeid med leder).</li>
            </ul>
          </>
        );
      case "1-2-5":
        return (
          <>
            <h4 className="text-lg font-medium mb-1">1.2.5 Dommerkontakt</h4>
            <p className="text-gray-700">Velges for 2 år</p>
            <ul className="list-disc pl-5 mb-4 text-gray-700">
              <li>Dommerkontakten skal være bindeleddet mellom klubbens dommere og NHF Region Innlandet.</li>
              <li>Sørge for at det kommer dommere til alle kamper hvor dommere fra klubben er satt opp</li>
              <li>Hjelpe klubbens dommere med forfall og følge opp dommere i forbindelse med treningskamper og trening</li>
              <li>Dommeroppsett ved mini/aktivitetsserie</li>
              <li>Melde på dommere for kommende sesong innen gjeldende frist.</li>
              <li>Begynne arbeidet med den påfølgende sesongen i god tid, helst før nyttår.</li>
              <li>Samarbeide med utdanningsdriveren om dommerkurs.</li>
              <li>Påse at klubben sørger for nødvendig dommerutstyr.</li>
            </ul>
          </>
        );
      case "1-2-6":
        return (
          <>
            <h4 className="text-lg font-medium mb-1">1.2.6 Arrangementsansvarlig</h4>
            <ul className="list-disc pl-5 mb-4 text-gray-700">
              <li>Sørge for at alle lag har tilstrekkelig kompetanse for å gjennomføre arrangement/hjemmekamp i hallen</li>
              <li>Ansvar for kiosken</li>
              <li>Organisere og delegere ved felles klubb dugnad</li>
              <li>Være ledende i større arrangement i regi av klubben</li>
              <li>Godkjenne/koordinere dugnad på lagsnivå</li>
              <li>Ved arrangement: Lede dette (delegere oppgaver til medlemmene), Kalle inn til møter og skrive referat, Planlegge, koordinere og gjennomføre planlagte arrangement, Sørge for at arrangementene er økonomisk bærekraftig</li>
              <li>Er ansvarlig for overføring av nødvendige bilag og oppgjør til kasserer i forbindelse med billettsalg og evt. dommeroppgjør i hallen.</li>
              <li>Er kontaktperson mot hovedlaget i saker som vedgår dugnader.</li>
              <li>Påse at dugnader blir likt fordelt og sammen med resten av styret kartlegge behovet for dugnader i fremtiden.</li>
            </ul>
          </>
        );
      case "1-2-7":
        return (
          <>
            <h4 className="text-lg font-medium mb-1">1.2.7 Attestansvarlig</h4>
            <p className="text-gray-700">Ansvarlig for å følge opp at alle som er trenere og dommere for barn og unge under 18 år leverer gyldig politiattest.</p>
          </>
        );
      case "1-2-8":
        return (
          <>
            <h4 className="text-lg font-medium mb-1">1.2.8 Hjemmeside & SoMe ansvarlig</h4>
            <p className="text-gray-700">Vedlikeholde klubbs hjemmesider/sosiale plattformer</p>
          </>
        );
      case "2-0":
        return (
          <>
            <p className="text-gray-700">
              Sportslig utvalg i KIL håndball har ansvaret for oppfølging av lag, spillere og trenere. SU har ansvaret for at klubbens sportsplan til enhver tid er oppdatert.
            </p>
          </>
        );
      case "2-1":
        return (
          <>
            <h3 className="text-xl font-semibold mt-6 mb-2 text-kilsvart">2.1 Sportslig utvalgs oppgaver</h3>
            <p className="text-gray-700">
              Sportslig utvalg i KIL håndball har ansvaret for oppfølging av lag, spillere og trenere. SU har ansvaret for at klubbens sportsplan til enhver tid er oppdatert.
            </p>
          </>
        );
      case "2-1-1":
        return (
          <>
            <h4 className="text-lg font-medium mb-1">2.1.1 Sportslig leder og sportslig utvalg (SU)</h4>
            <ul className="list-disc pl-5 mb-4 text-gray-700">
              <li>Ansvarlig for at alle trenere i klubb tar den obligatoriske trenerattesten</li>
              <li>Leder og SU er ansvarlig i forhold til styret og SUs arbeid og ansvarsområde.</li>
              <li>Leder og SU er ansvarlig for oppmelding av lag til seriespill</li>
              <li>Kalle inn og skrive referat fra møter i sportslig utvalg</li>
              <li>Sportslig utvalg skal håndtere konflikter mellom trenere-spillere-foreldre som kommer til styret eller SU.</li>
              <li>Informere alle trenere/lagledere om klubbens sportslige plan som er et praktisk verktøy for ledere og trenere i klubben.</li>
              <li>Legge til rette for at trenere og andre som skal ha tilhørighet til sportslig plan blir involvert i utviklingen.</li>
              <li>Ansvarlig for å ha tilstrekkelig med trenere og at andre nødvendige roller er dekket på alle oppmeldte lag.</li>
              <li>Skal på vegne av håndballgruppa sørge for nødvendige treningstimer i hall.</li>
              <li>Skal tilrettelegge for trenerforum et par ganger hver sesong.</li>
              <li>Ansvarlig sammen med styreleder for å utarbeide trenerkontrakter.</li>
              <li>Organisere og kalle inn til oppstart og evalueringsmøte</li>
              <li>Er den som har oversikt over cuper og andre former for sportslige aktiviteter.</li>
            </ul>
          </>
        );
      case "2-1-2":
        return (
          <>
            <h4 className="text-lg font-medium mb-1">2.1.2 Barnehåndballansvarlig (5-12 år)</h4>
            <ul className="list-disc pl-5 mb-4 text-gray-700">
              <li>Kontaktperson opp mot Region Innlandet og for lagene i egen klubb i alderen 6-12 år</li>
              <li>Rekrutteringsansvarlig - sørge for igangsetting, men flere ressurser i klubben må gjennomføre tiltakene</li>
              <li>Sette i gang tiltak i egen klubb eller i samarbeid med andre klubber for spillere eller trenere (Sosialt eller faglig innhold)</li>
              <li>Være en pådriver i egen klubb for at trenere i barnehåndball tar trenerutdanning.</li>
              <li>Sikre gode rutiner for å spre informasjon om idrettens barnerettigheter og bestemmelser om barneidrett i alle ledd i idrettslaget.</li>
              <li>Oppfordre til at idretter og grupper samarbeider, koordinerer, videreutvikler et mangfoldig og variert aktivitetstilbud for barna i idrettslaget.</li>
              <li>Arbeide for at alle barn blir inkludert i idretten, og at kostnaden for å drive idrett (som også inkluderer utstyr og reise, ikke bare treningsavgift) bør være lavest mulig.</li>
            </ul>
          </>
        );
      case "2-1-3":
        return (
          <>
            <h4 className="text-lg font-medium mb-1">2.1.3 Ungdoms- og seniorhåndballansvarlig (13+ år)</h4>
            <ul className="list-disc pl-5 mb-4 text-gray-700">
              <li>Kontaktperson opp mot Region Innlandet og for lagene i egen klubb i alderen 13+ år</li>
              <li>Være en pådriver i egen klubb for at trenere i junior- og seniorhåndballen tar trenerutdanning, og legge til rette for dette.</li>
              <li>Følge opp lagene og trenere i klubb, og ha tett dialog når det gjelder hospitering og lån av spillere på tvers av lag og alder.</li>
              <li>Ha ansvar for påmelding til regionseriespill.</li>
              <li>Følge opp spillerutvalg på de eldste lagene fra j16 til seniornivå.</li>
              <li>I samsvar med styret ha ansvar for gjennomføring av ulike utdanningskurs (dommerkurs, trenerkurs, trenermentorkurs osv.)</li>
              <li>I samarbeid med styret delta på møter vedrørende rekruttering av nye trenere og kontaktpersoner rundt alle lag i junior- og seniorklassene.</li>
            </ul>
          </>
        );
      case "3-0":
        return (
          <>
            <p className="text-gray-700">
              Her beskrives roller, organisering og arbeidsbeskrivelser knyttet til lag i KIL Håndball.
            </p>
          </>
        );
      case "3-1":
        return (
          <>
            <h3 className="text-xl font-semibold mt-6 mb-2 text-kilsvart">3.1 Utøver</h3>
            <p className="text-gray-700">Utøver bør være kjent med:</p>
            <ul className="list-disc pl-5 mb-4 text-gray-700">
              <li>Hva klubben står for (verdier, visjon og virksomhetsidé).</li>
              <li>Aktivitetstilbudet.</li>
              <li>Medlemskap.</li>
              <li>Dugnad.</li>
              <li>Klubbens retningslinjer og forventninger til utøverne.</li>
            </ul>
            <h4 className="text-lg font-medium mb-1">Retningslinjer for utøver i KIL Håndball</h4>
            <ul className="list-disc pl-5 mb-4 text-gray-700">
              <li>Vise gode holdninger.</li>
              <li>Respektere hverandre.</li>
              <li>Vise lojalitet mot klubb og trenere.</li>
              <li>Hjelpe hverandre og stille opp for hverandre.</li>
              <li>Følge klubbens regler.</li>
              <li>Være ærlig overfor trener og andre utøvere.</li>
              <li>Ta ansvar for godt samhold.</li>
              <li>Stille på treninger og arrangementer en har forpliktet seg til.</li>
              <li>Vise engasjement.</li>
              <li>Være stolt av sin egen innsats.</li>
              <li>Anerkjenne andre sin innsats.</li>
              <li>Ta ansvar for miljø og trivsel.</li>
              <li>Reagere på mobbing eller annen adferd som ikke er i tråd med klubbens verdier.</li>
            </ul>
            <p className="text-kilred font-semibold mt-2">Ansvar for at utøverne vet dette: Hovedtrener</p>
          </>
        );
      case "3-2":
        return (
          <>
            <h3 className="text-xl font-semibold mt-6 mb-2 text-kilsvart">3.2 Trener</h3>
            <p className="text-gray-700">
              Trenerne er ansvarlige for oppfølging av sine respektive tildelte utøvere/grupper/lag. Trenerne rapporterer til Sportslig leder. Treneren samarbeider med laglederen og de andre trenerne om organiseringen av aktivitetene som laget deltar i. Hovedtrener har alltid det øverste ansvaret dersom det er flere lag og trenere i samme gruppe.
            </p>
            <p className="text-gray-700">
              Trenerne har ansvar for å sikre at medlemmene som deltar i klubbens aktiviteter, får et godt tilbud og ivaretas på en god måte. Som trener er man en representant for klubben.
            </p>
            <p className="text-gray-700">Trenerne bør derfor være kjent med:</p>
            <ul className="list-disc pl-5 mb-4 text-gray-700">
              <li>Hva klubben står for (verdier, visjon og virksomhetsidé).</li>
              <li>Aktivitetstilbudet.</li>
              <li>Medlemskap.</li>
              <li>Lisens og forsikringer.</li>
              <li>Politiattest.</li>
              <li>Kompetansetilbud for trenere.</li>
              <li>Klubbens sportslige plan.</li>
              <li>Klubbens retningslinjer og forventninger til trenerne.</li>
              <li>Hva klubben tilbyr sine trenere (honorar, utstyr, bekledning, kurs …).</li>
            </ul>
            <h4 className="text-lg font-medium mb-1">Oppgaver:</h4>
            <ul className="list-disc pl-5 mb-4 text-gray-700">
              <li>Sette opp sportslige og sosiale mål for laget foran hver sesong i samsvar med gruppens sportslige plan.</li>
              <li>Lede treningene i samarbeid med eventuelt andre trenere/hjelpetrenere.</li>
              <li>Ha dialog og samarbeid med foreldre.</li>
              <li>Lede laget/gruppen/utøverne under kamper og turneringer.</li>
              <li>Bidra i trenergruppen og møte i trenerforumet i regi av klubben.</li>
              <li>Følge gjeldende regelverk.</li>
              <li>Sette seg inn i barneidrettsbestemmelsene og retningslinjer for ungdomsidrett fra Norges idrettsforbund.</li>
              <li>Sette seg inn i klubbens verdigrunnlag og retningslinjer for utøvere/spillere og trenere.</li>
              <li>Se til at både egen og utøvernes/lagets opptreden er i samsvar med klubbens verdier og retningslinjer.</li>
              <li>Være oppdatert på informasjon fra styret.</li>
              <li>Representere klubben på en god måte.</li>
              <li>Planlegge trening i samsvar med aktivitetsplan/terminliste og klubbens sportslige plan.</li>
              <li>Møte i god tid til trening og konkurranser/kamp.</li>
              <li>Ha korrekt utstyr/medisinveske</li>
            </ul>
            <h4 className="text-lg font-medium mb-1">Som trener i idrettslaget skal du bidra til:</h4>
            <ul className="list-disc pl-5 mb-4 text-gray-700">
              <li>Mestring, selvstendighet og tilhørighet for utøveren.</li>
              <li>Positive erfaringer med trening og konkurranse.</li>
              <li>Å fremme et godt sosialt miljø, lagånd og vennskap.</li>
              <li>At utøvere skal kunne drive idrett i andre avdelinger.</li>
              <li>Samarbeid og god kommunikasjon med andre trenere, ledere og foreldre.</li>
              <li>Vær et godt forbilde.</li>
              <li>Møt presis og godt forberedt til hver trening.</li>
              <li>Som trener er du veileder, inspirator og motivator.</li>
              <li>Bry deg litt ekstra og involver deg i utøverne dine.</li>
              <li>Bli kjent med utøvernes individuelle mål og opplevelse av treningen.</li>
              <li>Søk å utvikle selvstendig vurderingsevne hos utøveren.</li>
              <li>Vis god sportsånd og respekt for andre.</li>
              <li>Vær bevisst på at du gir alle utøverne oppmerksomhet.</li>
              <li>Enhver utøver eller gruppe skal utfordres til å utvikle sine ferdigheter.</li>
            </ul>
            <h4 className="text-lg font-medium mb-1">Innholdet i treningen skal være preget av:</h4>
            <ul className="list-disc pl-5 mb-4 text-gray-700">
              <li>En målrettet plan.</li>
              <li>Progresjon i opplevelse og ferdigheter.</li>
              <li>Stadig nye utfordringer slik at utøveren flytter grenser.</li>
              <li>Effektiv organisering.</li>
              <li>Saklig og presis informasjon.</li>
              <li>Kreative løsninger.</li>
              <li>Fleksibilitet ved problemløsning.</li>
              <li>Som trener er du ansvarlig for god kommunikasjon.</li>
            </ul>
            <p className="text-kilred font-semibold mt-2">Ansvar for at trenerne vet dette: Sportslig Utvalg</p>
          </>
        );
      case "3-3":
        return (
          <>
            <h3 className="text-xl font-semibold mt-6 mb-2 text-kilsvart">3.3 Hjelpetrener</h3>
            <p className="text-gray-700">
              En hjelpetrener bidrar på treninger og under kampavvikling. Flere trenere på et lag vil gjøre det enklere å gjennomføre morsomme og utviklende treninger hvor hjelpetreneren bidrar i planlegging og diskusjoner knyttet til lagets aktivitetsplan.
            </p>
            <p className="text-gray-700">Hjelpetrenerne bør derfor være kjent med:</p>
            <ul className="list-disc pl-5 mb-4 text-gray-700">
              <li>Hva klubben står for (verdier, visjon og virksomhetsidé).</li>
              <li>Aktivitetstilbudet.</li>
              <li>Medlemskap.</li>
              <li>Lisens og forsikringer.</li>
              <li>Politiattest.</li>
              <li>Kompetansetilbud for trenere.</li>
              <li>Klubbens sportslige plan.</li>
              <li>Klubbens retningslinjer og forventninger til trenerne.</li>
              <li>Hva klubben tilbyr sine trenere (honorar, utstyr, bekledning, kurs …).</li>
            </ul>
            <h4 className="text-lg font-medium mb-1">Oppgaver:</h4>
            <ul className="list-disc pl-5 mb-4 text-gray-700">
              <li>Hjelpe hovedtrener å sette opp sportslige og sosiale mål for laget foran hver sesong i samsvar med gruppens sportslige plan.</li>
              <li>Lede treningene i samarbeid med eventuelt andre trenere</li>
              <li>Ha dialog og samarbeid med foreldre.</li>
              <li>Lede laget/gruppen/utøverne under kamper, turneringer eller løp.</li>
              <li>Bidra i trenergruppen og møte i trenerforumet i regi av klubben.</li>
              <li>Følge gjeldende regelverk.</li>
              <li>Sette seg inn i barneidrettsbestemmelsene og retningslinjer for ungdomsidrett fra Norges idrettsforbund.</li>
              <li>Sette seg inn i klubbens verdigrunnlag og retningslinjer for utøvere/spillere og trenere.</li>
              <li>Se til at både egen og utøvernes/lagets opptreden er i samsvar med klubbens verdier og retningslinjer.</li>
              <li>Være oppdatert på informasjon fra styret.</li>
              <li>Representere klubben på en god måte.</li>
              <li>Planlegge trening i samsvar med aktivitetsplan/terminliste og klubbens sportslige plan.</li>
              <li>Møte i god tid til trening og konkurranser/kamp.</li>
              <li>Ha korrekt utstyr/medisinveske</li>
            </ul>
            <h4 className="text-lg font-medium mb-1">Som hjelpetrener i idrettslaget skal du bidra til:</h4>
            <ul className="list-disc pl-5 mb-4 text-gray-700">
              <li>Mestring, selvstendighet og tilhørighet for utøveren.</li>
              <li>Positive erfaringer med trening og konkurranse.</li>
              <li>Å fremme et godt sosialt miljø, lagånd og vennskap.</li>
              <li>At utøvere skal kunne drive idrett i andre avdelinger.</li>
              <li>Samarbeid og god kommunikasjon med andre trenere, ledere og foreldre.</li>
              <li>Vær et godt forbilde.</li>
              <li>Møt presis til hver trening.</li>
              <li>Bry deg litt ekstra og involver deg i utøverne dine.</li>
              <li>Bli kjent med utøvernes individuelle mål og opplevelse av treningen.</li>
              <li>Søk å utvikle selvstendig vurderingsevne hos utøveren.</li>
              <li>Vis god sportsånd og respekt for andre.</li>
              <li>Vær bevisst på at du gir alle utøverne oppmerksomhet.</li>
              <li>Enhver utøver eller gruppe skal utfordres til å utvikle sine ferdigheter.</li>
            </ul>
            <p className="text-kilred font-semibold mt-2">Ansvarlig for at hjelpetrener vet dette: Hovedtrener</p>
          </>
        );
      case "3-4":
        return (
          <>
            <h3 className="text-xl font-semibold mt-6 mb-2 text-kilsvart">3.4 Lagleder</h3>
            <p className="text-gray-700">
              Laglederen er lagets/treningsgruppas administrative leder og har ansvaret for at alt praktisk fungerer rundt laget/treningsgruppa. Laglederen skal overlate alt det sportslige til treneren/trenerne som har ansvar for organisering av treninger, lagoppsett til kamper/stevner, gjennomføring av kamper osv.
            </p>
            <p className="text-gray-700">Lagledere bør være kjent med:</p>
            <ul className="list-disc pl-5 mb-4 text-gray-700">
              <li>Hva klubben står for (verdier, visjon og virksomhetsidé)</li>
              <li>Klubbens aktivitetstilbud</li>
              <li>Medlemskap</li>
              <li>Lisens og forsikringer</li>
              <li>Politiattest</li>
              <li>Klubbens retningslinjer og forventninger til foreldre</li>
              <li>Hva tilbyr klubben sine oppmenn/lagledere (utstyr, bekledning, kurs …)</li>
            </ul>
            <h4 className="text-lg font-medium mb-1">Oppgaver:</h4>
            <ul className="list-disc pl-5 mb-4 text-gray-700">
              <li>Ajourføre navnelister på spillere/utøvere og lagsapparat i medlemsregisteret.</li>
              <li>Følge opp innbetalinger av treningsavgift og medlemskontingent.</li>
              <li>Gjøre seg kjent med gruppens sportslige plan.</li>
              <li>Arrangere møter for foreldre og spillere/utøvere.</li>
              <li>Gå igjennom fair play-regler, foreldrevettregler og sportslig plan med alle spillere og foresatte.</li>
              <li>Møte på lagleder- og allmannamøter.</li>
              <li>Gi informasjon til spillere/utøvere, trenere og foresatte.</li>
              <li>Ansvar for lagskasse.</li>
              <li>Kjenne til rutiner for innskudd, utlegg, osv.</li>
              <li>Melde på til cuper, stevner og turneringer.</li>
              <li>Innkalle til dugnader.</li>
              <li>Arrangere hjemmekamper, ta imot gjestende lag og dommere, fylle ut kamprapport.</li>
              <li>Administrere reiser til/fra kamper eller stevner.</li>
              <li>Skaffe dommere ved behov.</li>
              <li>Kjenne til lisensregler og sikre at alle utøvere/spillere har lisens.</li>
              <li>Ansvarlig for evt. omberamminger via «MIN SIDE» - «TA» og dialog med motstandere.</li>
            </ul>
            <p className="text-kilred font-semibold mt-2">Ansvar for at lagleder vet dette: Hovedtrener</p>
          </>
        );
      case "3-5":
        return (
          <>
            <h3 className="text-xl font-semibold mt-6 mb-2 text-kilsvart">3.5 Foreldrekontakt</h3>
            <p className="text-gray-700">
              Foreldrekontakt er en viktig rolle som vi først og fremst har innen barneidretten og gjerne de første årene i ungdomsidretten. Rollen har noen overlappende oppgaver med Lagleder. I grupper og lag med begge rollene vil det derfor være naturlig med en avtalt arbeidsfordeling.
            </p>
            <h4 className="text-lg font-medium mb-1">Generelle oppgaver</h4>
            <ul className="list-disc pl-5 mb-4 text-gray-700">
              <li>Skape et godt og trygt miljø blant foreldrene, som igjen sikrer et godt fellesskap mellom barn/trenere og foreldre</li>
              <li>Det skal være trygt å være medlem i KIL Håndball, og spesielt innen barneidretten er det viktig at alle blir sett og fulgt opp på en god måte</li>
              <li>Ansvar for at det avholdes 2. foreldremøter i året i samråd med øvrig lagledelse.</li>
              <li>Sørge for at alle medlemmene har drakt og evnt. annet utstyr iht. klubbens veileder for utstyr.</li>
              <li>Laget har en fair-play og kampvert på hjemmekampene laget har ansvaret for</li>
              <li>Skaffe vakter til dugnader i klubbens regi og ha oversikt om hvem som stiller. Kioskvakter på arrangement, salgsdugnader osv.</li>
              <li>Bistå aktivt med positiv informasjon</li>
              <li>Formidle foreldrenes rolle i klubben. Dvs følge KIL Håndball sine retningslinjer når det gjelder dugnadsarbeid, foreldrevettregler, cupdeltagelser etc.</li>
              <li>Ansvar for sosiale samlinger i laget</li>
            </ul>
            <p className="text-kilred font-semibold mt-2">Ansvar for at foreldrekontakt vet dette: Hovedtrener</p>
          </>
        );
      case "3-6":
        return (
          <>
            <h3 className="text-xl font-semibold mt-6 mb-2 text-kilsvart">3.6 Foreldre/foresatt</h3>
            <h4 className="text-lg font-medium mb-1">Retningslinjer for foreldre/foresatte i Kongsvinger Håndball:</h4>
            <ul className="list-disc pl-5 mb-4 text-gray-700">
              <li>Respekter idrettslagets arbeid. Det er frivillig å være medlem av idrettslaget, men er du med følger du idrettslagets regler.</li>
              <li>Engasjer deg, men husk at det er barna som driver idrett – ikke du.</li>
              <li>Respekter treneren, hans/hennes arbeid og anerkjenn ham/henne overfor barna dine.</li>
              <li>Lær barna folkeskikk. Gå foran som et godt eksempel.</li>
              <li>Lær barna å tåle både medgang og motgang.</li>
              <li>Motiver barna til å være positive på trening.</li>
              <li>Vis god sportsånd og respekt for andre.</li>
              <li>Ved uenighet snakker du med den det gjelder – ikke om.</li>
              <li>Husk at det viktigste av alt er at barna trives og har det gøy!</li>
            </ul>
            <p className="text-gray-700">Foreldre bør være kjent med:</p>
            <ul className="list-disc pl-5 mb-4 text-gray-700">
              <li>Hva klubben står for (verdier, visjon og virksomhetsidé)</li>
              <li>Aktivitetstilbudet</li>
              <li>Medlemskap</li>
              <li>Forsikringer</li>
              <li>(Politiattest)</li>
              <li>Dugnad</li>
            </ul>
            <p className="text-gray-700">Viktige råd for å være en god idrettsforelder: Idrettsforelder</p>
            <p className="text-kilred font-semibold mt-2">Ansvar for at foreldrene vet dette: Hovedtrener</p>
          </>
        );
      default:
        return <p className="text-gray-700">Innhold for {section.title} mangler.</p>;
    }
  };

  return (
    <motion.section
      ref={ref}
      id={section.id}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="bg-white mt-4 md:p-8 scroll-mt-24"
    >
      <h2 className="text-2xl font-bold text-kilsvart mb-4">{section.title}</h2>
      {renderContent(section.id)}
      {section.children &&
        section.children.map((child) => (
          <RenderSection key={child.id} section={child} />
        ))}
    </motion.section>
  );
};

export default RenderSection;
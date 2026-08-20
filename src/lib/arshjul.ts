/**
 * Delt datalag for årshjulet. Alle tre designene bruker denne filen,
 * så data, farger og sortering er identisk uansett hvilket design dere velger.
 */

export const MANEDER = [
  'Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Desember',
] as const;

export const MANEDER_KORT = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAI', 'JUN',
  'JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DES',
] as const;

export type ArshjulKategori = 'sport' | 'dugnad' | 'sosialt' | 'admin' | 'frist';

export interface ArshjulHendelse {
  _id: string;
  tittel: string;
  maned: number;
  sluttManed?: number | null;
  kategori: ArshjulKategori;
  /** Dag og måned uten årstall, f.eks. «30. april» eller «10.–11. april» */
  dato?: string | null;
  beskrivelse?: string | null;
  ansvarlig?: string | null;
  lenke?: { tekst?: string | null; url?: string | null } | null;
  viktig?: boolean | null;
  rekkefolge?: number | null;
  sesong?: string | null;
}

interface KategoriStil {
  /** Kort etikett brukt i chips og legende */
  label: string;
  /** Fargeprikk – eneste stedet kategorifargen lever */
  prikk: string;
  /** Vertikal fargestripe på kort */
  stripe: string;
}

/**
 * Fargen bærer aldri informasjon alene – hver kategori har alltid tekst ved siden av prikken.
 * Tekst holdes på kilsvart mot lys bakgrunn, slik at kontrasten er 4.5:1 uansett kategori.
 */
export const KATEGORIER: Record<ArshjulKategori, KategoriStil> = {
  sport:   { label: 'Sport',           prikk: 'bg-kilred',       stripe: 'bg-kilred' },
  dugnad:  { label: 'Dugnad',          prikk: 'bg-amber-500',    stripe: 'bg-amber-500' },
  sosialt: { label: 'Sosialt',         prikk: 'bg-emerald-600',  stripe: 'bg-emerald-600' },
  admin:   { label: 'Administrativt',  prikk: 'bg-kilsvart',     stripe: 'bg-kilsvart' },
  frist:   { label: 'Frist',           prikk: 'bg-sky-600',      stripe: 'bg-sky-600' },
};

export const KATEGORI_REKKEFOLGE: ArshjulKategori[] = ['sport', 'dugnad', 'sosialt', 'admin', 'frist'];

export function kategoriStil(kategori?: string | null): KategoriStil {
  return KATEGORIER[(kategori as ArshjulKategori) ?? 'sport'] ?? KATEGORIER.sport;
}

/** GROQ. Tar valgfri $sesong – hendelser uten sesong regnes som «hvert år». */
export const ARSHJUL_QUERY = /* groq */ `
*[
  _type == "arshjulHendelse"
  && aktiv != false
  && (!defined($sesong) || !defined(sesong) || sesong == $sesong)
] | order(maned asc, rekkefolge asc, tittel asc) {
  _id,
  tittel,
  maned,
  sluttManed,
  kategori,
  dato,
  beskrivelse,
  ansvarlig,
  lenke,
  viktig,
  rekkefolge,
  sesong
}`;

/** Månedsnumre en hendelse dekker. Håndterer perioder over årsskiftet (sep → mars). */
export function manederIPeriode(start: number, slutt?: number | null): number[] {
  if (!slutt || slutt === start) return [start];
  const ut: number[] = [];
  let m = start;
  for (let i = 0; i < 12; i += 1) {
    ut.push(m);
    if (m === slutt) break;
    m = m === 12 ? 1 : m + 1;
  }
  return ut;
}

/** Returnerer alltid 12 lister, index 0 = januar. Perioder dukker opp i hver måned de dekker. */
export function grupperPaManed(hendelser: ArshjulHendelse[]): ArshjulHendelse[][] {
  const perManed: ArshjulHendelse[][] = Array.from({ length: 12 }, () => []);

  hendelser.forEach((h) => {
    manederIPeriode(h.maned, h.sluttManed).forEach((m) => {
      if (m >= 1 && m <= 12) perManed[m - 1].push(h);
    });
  });

  return perManed.map((liste) =>
    [...liste].sort((a, b) => {
      if (Boolean(a.viktig) !== Boolean(b.viktig)) return a.viktig ? -1 : 1;
      const ra = a.rekkefolge ?? 999;
      const rb = b.rekkefolge ?? 999;
      if (ra !== rb) return ra - rb;
      return a.tittel.localeCompare(b.tittel, 'nb');
    }),
  );
}

/** 1–12 */
export function naavaerendeManed(): number {
  return new Date().getMonth() + 1;
}

/** «September» eller «September–Mars» */
export function periodeEtikett(h: ArshjulHendelse): string {
  const start = MANEDER[h.maned - 1];
  if (!h.sluttManed || h.sluttManed === h.maned) return start;
  return `${start}–${MANEDER[h.sluttManed - 1]}`;
}

export function erPeriode(h: ArshjulHendelse): boolean {
  return Boolean(h.sluttManed && h.sluttManed !== h.maned);
}
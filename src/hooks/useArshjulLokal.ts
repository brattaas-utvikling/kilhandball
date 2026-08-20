import { useMemo } from 'react';
import { AARSHJUL_DATA } from '../data/aarshjul-data';
import { grupperPaManed, type ArshjulHendelse } from '../lib/arshjul';

interface ArshjulResultat {
  hendelser: ArshjulHendelse[];
  /** 12 lister, index 0 = januar */
  perManed: ArshjulHendelse[][];
  laster: boolean;
  feil: string | null;
}

/**
 * Samme returtype som useArshjul(), men leser fra src/data/aarshjul-data.ts
 * i stedet for Sanity. Ingen nettverkskall, ingen @sanity/client, ingen .env.
 *
 * Når Sanity er klart bytter du import-linjen øverst i komponentene –
 * ingenting annet må endres.
 */
export function useArshjulLokal(sesong?: string): ArshjulResultat {
  const hendelser = useMemo(
    () => AARSHJUL_DATA.filter((h) => !sesong || !h.sesong || h.sesong === sesong),
    [sesong],
  );

  const perManed = useMemo(() => grupperPaManed(hendelser), [hendelser]);

  return { hendelser, perManed, laster: false, feil: null };
}

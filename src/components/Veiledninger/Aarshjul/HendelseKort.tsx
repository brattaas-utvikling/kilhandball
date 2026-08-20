import { FaArrowUpRightFromSquare, FaRegCalendar } from 'react-icons/fa6';
import { erPeriode, kategoriStil, periodeEtikett, type ArshjulHendelse } from '../../../lib/arshjul';

interface Props {
  hendelse: ArshjulHendelse;
  /** Vis «September–Mars» når kortet står utenfor en månedskontekst */
  visPeriode?: boolean;
}

/**
 * Ett kort per hendelse. Delt av alle tre designene slik at innholdet ser likt ut
 * uansett hvilken navigasjon som ligger rundt.
 */
export default function HendelseKort({ hendelse, visPeriode = true }: Props) {
  const stil = kategoriStil(hendelse.kategori);
  const harLenke = Boolean(hendelse.lenke?.url);

  const innhold = (
    <>
      <span className={`absolute left-0 top-0 h-full w-1 ${stil.stripe}`} aria-hidden="true" />

      <div className="flex items-start justify-between gap-3">
        <h4 className="font-anton text-base uppercase leading-tight tracking-wide text-kilsvart sm:text-lg">
          {hendelse.tittel}
        </h4>
        {hendelse.viktig ? (
          <span className="shrink-0 rounded-full bg-kilred px-2 py-0.5 font-roboto text-[11px] font-bold uppercase tracking-wider text-white">
            Viktig
          </span>
        ) : null}
      </div>

      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-roboto text-xs text-gray-600">
        {hendelse.dato ? (
          <span className="inline-flex items-center gap-1.5 font-semibold text-kilsvart">
            <FaRegCalendar className="h-3 w-3" aria-hidden="true" />
            {hendelse.dato}
          </span>
        ) : null}
        <span className="inline-flex items-center gap-1.5">
          <span className={`h-2 w-2 rounded-full ${stil.prikk}`} aria-hidden="true" />
          {stil.label}
        </span>
        {visPeriode && erPeriode(hendelse) ? <span>{periodeEtikett(hendelse)}</span> : null}
        {hendelse.ansvarlig ? <span>Ansvarlig: {hendelse.ansvarlig}</span> : null}
      </div>

      {hendelse.beskrivelse ? (
        <p className="mt-2 font-roboto text-sm leading-relaxed text-gray-700">{hendelse.beskrivelse}</p>
      ) : null}

      {harLenke ? (
        <span className="mt-3 inline-flex items-center gap-1.5 font-roboto text-sm font-semibold text-kilsvart  decoration-2 underline-offset-4">
          {hendelse.lenke?.tekst || 'Les mer'}
          <FaArrowUpRightFromSquare className="h-3 w-3" aria-hidden="true" />
        </span>
      ) : null}
    </>
  );

  const basis =
    'relative block w-full overflow-hidden rounded-xl border border-gray-200 bg-white py-4 pl-5 pr-4 text-left';

  if (harLenke) {
    return (
      <a
        href={hendelse.lenke!.url as string}
        target="_blank"
        rel="noopener noreferrer"
        className={`${basis} cursor-pointer touch-manipulation transition-[transform,border-color] duration-150 ease-out active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kilred focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:active:scale-100 hover:border-gray-300`}
      >
        {innhold}
      </a>
    );
  }

  return <div className={basis}>{innhold}</div>;
}
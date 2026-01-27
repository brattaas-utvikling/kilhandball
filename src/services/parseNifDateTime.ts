// src/services/parseNifDateTime.ts
import { DateTime } from 'luxon';

const ZONE = 'Europe/Oslo';

export interface ParsedNifDateTime {
  iso: string;     // full ISO i UTC
  date: string;    // yyyy-MM-dd
  time?: string;   // HH:mm (lokal)
}

export function parseNifDateTime(raw?: string | number | null): ParsedNifDateTime | null {
  if (!raw) return null;

  // Noen NIF-responser sender tid som tall (f.eks. 1900 eller 900)
  if (typeof raw === 'number') {
    // dette er da mest sannsynlig start-tid, ikke dato – la kallstedet håndtere det
    return null;
  }

  const value = String(raw).trim();

  // ✅ VIKTIG: Hvis ISO-format mangler klokkeslett (bare "T00:00:00"),
  // parse som "naiv" dato (ikke anta tidssone ennå)
  let dt: DateTime;
  
  if (/^\d{4}-\d{2}-\d{2}T00:00:00$/.test(value)) {
    // "2026-02-14T00:00:00" ← dette er KUN dato, ikke klokkeslett
    const dateOnly = value.split('T')[0]; // "2026-02-14"
    dt = DateTime.fromISO(dateOnly, { zone: ZONE }); // Treat as start of day in Oslo
  } else {
    // 1) Prøv ISO direkte (med eller uten tidssone)
    dt = DateTime.fromISO(value, { zone: ZONE });
    
    if (!dt.isValid) {
      // 2) Klassisk NIF: "2025-11-02 19:00:00" eller uten sekunder
      const formats = ['yyyy-LL-dd HH:mm:ss', 'yyyy-LL-dd HH:mm', "yyyy-LL-dd'T'HH:mm:ss"];
      for (const f of formats) {
        const cand = DateTime.fromFormat(value, f, { zone: ZONE });
        if (cand.isValid) {
          dt = cand;
          break;
        }
      }
    }

    // 3) Noen ganger har de norske datoer: "02.11.2025 19:00"
    if (!dt.isValid) {
      const cand = DateTime.fromFormat(value, 'dd.LL.yyyy HH:mm', { zone: ZONE });
      if (cand.isValid) {
        dt = cand;
      }
    }
  }

  if (!dt.isValid) return null;

  // ✅ Behold lokal Oslo-dato (ikke konverter til UTC-dato)
  // ISO-timestamp lagres i UTC for konsistens, men date-felt bruker lokal dato
  return {
    iso: dt.toUTC().toISO()!,        // ISO i UTC for backend/logging
    date: dt.toFormat('yyyy-LL-dd'),  // LOKAL Oslo-dato (det brukeren ser)
    time: dt.toFormat('HH:mm'),       // Lokal Oslo-tid
  };
}

// // src/services/parseNifDateTime.ts
// import { DateTime } from 'luxon';

// const ZONE = 'Europe/Oslo';

// export interface ParsedNifDateTime {
//   iso: string;     // full ISO i UTC
//   date: string;    // yyyy-MM-dd
//   time?: string;   // HH:mm (lokal)
// }

// export function parseNifDateTime(raw?: string | number | null): ParsedNifDateTime | null {
//   if (!raw) return null;

//   // Noen NIF-responser sender tid som tall (f.eks. 1900 eller 900)
//   if (typeof raw === 'number') {
//     // dette er da mest sannsynlig start-tid, ikke dato – la kallstedet håndtere det
//     return null;
//   }

//   const value = String(raw).trim();

//   // 1) Prøv ISO direkte
//   let dt = DateTime.fromISO(value, { zone: ZONE });
//   if (!dt.isValid) {
//     // 2) Klassisk NIF: "2025-11-02 19:00:00" eller uten sekunder
//     const formats = ['yyyy-LL-dd HH:mm:ss', 'yyyy-LL-dd HH:mm', "yyyy-LL-dd'T'HH:mm:ss"];
//     for (const f of formats) {
//       const cand = DateTime.fromFormat(value, f, { zone: ZONE });
//       if (cand.isValid) {
//         dt = cand;
//         break;
//       }
//     }
//   }

//   // 3) Noen ganger har de norske datoer: "02.11.2025 19:00"
//   if (!dt.isValid) {
//     const cand = DateTime.fromFormat(value, 'dd.LL.yyyy HH:mm', { zone: ZONE });
//     if (cand.isValid) {
//       dt = cand;
//     }
//   }

//   if (!dt.isValid) return null;

//   const utc = dt.toUTC();
//   return {
//     iso: utc.toISO()!,
//     date: utc.toFormat('yyyy-LL-dd'),
//     time: dt.toFormat('HH:mm'),
//   };
// }

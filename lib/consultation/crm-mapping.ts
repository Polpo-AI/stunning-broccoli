import type { Sector, Problem, Tool } from './domain';
export const sectorValues:Record<Sector,string>={sport:'sport',beauty:'beauty',restaurant:'ristorazione',professional:'studi_professionali',hospitality:'hospitality',other:'altro'};
export const problemValues:Record<Problem,string>={bookings:'prenotazioni',messages:'messaggi',reminders:'cancellazioni',manual:'processi_manuali',integrations:'integrazioni'};
export const toolValues:Record<Tool,string>={whatsapp:'whatsapp',phone:'telefono',email:'email',calendar:'calendario',excel:'excel',management:'gestionale'};
export const commercialProperties=['polpo_prodotto','polpo_settore','polpo_problema_principale','polpo_strumenti','polpo_origine_richiesta'] as const;

export type Audience = 'giocatori' | 'circoli';
export type Answers = Record<string, string[]>;
export type Option = { value: string; label: string };
export type Field = { id: string; label: string; options: Option[]; multi?: boolean; max?: number; exclusive?: string[]; scale?: boolean };
export type Question = { title: string; hint: string; fields: Field[]; detail?: boolean };
const options = (items: string[]): Option[] => items.map(item => { const [value, label] = item.split('|'); return { value, label }; });
const field = (id: string, label: string, items: string[], extra: Partial<Field> = {}): Field => ({ id, label, options: options(items), ...extra });
const unknown = 'unknown|Non so / non ricordo';
const skip = 'skip|Preferisco non rispondere';
export const VERSION = 'padel-surveys-v1';
export const isFriendsOnly = (answers: Answers) => answers.group?.[0] === 'friends';
export function toggle(field: Field, current: string[], value: string): string[] {
  if (!field.multi) return [value];
  if (current.includes(value)) return current.filter(item => item !== value);
  if (field.exclusive?.includes(value)) return [value];
  const next = current.filter(item => !field.exclusive?.includes(item));
  return next.length < (field.max ?? Infinity) ? [...next, value] : current;
}
export function updateAnswer(answers: Answers, id: string, values: string[]): Answers {
  const next = { ...answers, [id]: values };
  // Clear dependent answers when a reviewer changes an earlier branch.
  if (id === 'channel' && values[0] !== 'playtomic') delete next.playtomicUse;
  if (id === 'group') { delete next.obstacle; delete next.aiActions; }
  if (id === 'channel') delete next.ease;
  if (id === 'mainActivity') delete next.activeHours;
  if (id === 'problems') { delete next.activeHours; delete next.mainActivity; }
  return next;
}
export function questions(audience: Audience, answers: Answers): Question[] {
  const scale = (id: string, label: string, low: string, high: string) => field(id, label, [`1|1 — ${low}`, '2|2', '3|3', '4|4', `5|5 — ${high}`, 'na|Non applicabile', skip], { scale: true });
  const friends = isFriendsOnly(answers);
  if (audience === 'giocatori') return [
    { title: 'Quanto spesso giochi a padel?', hint: 'Pensa agli ultimi tre mesi, anche se hai giocato poco.', fields: [field('frequency', 'Frequenza di gioco', ['never|Non ho ancora giocato', 'rare|Meno di una volta al mese', 'monthly|1–3 volte al mese', 'weekly|1–2 volte a settimana', 'often|3 o più volte a settimana', skip])] },
    { title: 'Con chi giochi di solito?', hint: 'Scegli la situazione che ti rappresenta meglio.', fields: [field('group', 'Gruppo abituale', ['friends|Solo con un gruppo fisso di amici', 'mixed|Con amici, ma a volte cerco altre persone', 'open|Spesso con persone nuove in partite aperte', 'club|Mi affido al circolo per trovare partite', 'na|Non ho ancora un’abitudine', skip])] },
    { title: 'Come avete organizzato la tua ultima partita?', hint: 'Indica il canale principale usato per mettervi d’accordo, anche se il campo è stato prenotato altrove.', fields: [field('channel', 'Canale principale', ['whatsapp|WhatsApp', 'playtomic|Playtomic', 'other_app|Un’altra app', 'club|Telefono o segreteria del circolo', 'in_person|Di persona con amici o compagni', 'other|Un altro canale', 'never|Non ho ancora organizzato o giocato una partita', unknown, skip]), ...(answers.channel?.[0] === 'playtomic' ? [field('playtomicUse', 'In quell’occasione, a cosa è servito Playtomic?', ['booking|Solo a prenotare il campo: i giocatori erano già decisi', 'matching|A trovare giocatori o unirmi a una partita aperta', 'both|Sia a prenotare sia a trovare giocatori', unknown, skip])] : [])] },
    { title: 'Quanto è stato facile organizzare quella partita?', hint: 'Considera tutti i passaggi necessari, dal primo accordo alla conferma.', fields: [answers.channel?.[0] === 'never' ? field('ease', 'Nessuna partita da valutare', ['na|Non applicabile: non ho ancora giocato', skip]) : scale('ease', 'Facilità dell’ultima organizzazione', 'Molto difficile', 'Molto facile')] },
    { title: 'Nelle ultime 4 settimane, quante volte volevi giocare ma non ci sei riuscito?', hint: 'Conta le occasioni saltate, non il numero di messaggi inviati. Zero è una risposta utile.', fields: [field('failures', 'Occasioni saltate', ['0|Nessuna', '1|Una', '2_3|2–3', '4_7|4–7', '8_plus|8 o più', 'no_intent|Non ho cercato di giocare in questo periodo', unknown, skip])] },
    { title: 'Qual è stato l’ostacolo principale nelle ultime 4 settimane?', hint: friends ? 'Pensa a coordinare il tuo gruppo, prenotare o gestire una rinuncia.' : 'Pensa a organizzare una partita, trovare persone o unirti a un gruppo.', fields: [field('obstacle', 'Ostacolo principale', ['schedules|Mettere d’accordo gli orari', 'courts|Trovare un campo nell’orario desiderato', 'substitute|Sostituire una persona che ha rinunciato', ...(!friends ? ['players|Trovare abbastanza giocatori', 'compatibility|Capire se livello e stile di gioco sono compatibili'] : []), 'communication|Seguire messaggi e conferme', 'price|Costo della partita', 'personal|Impegni personali o condizioni fisiche', 'other|Un altro ostacolo', 'none|Nessun ostacolo rilevante', unknown, skip])] },
    { title: 'Quali aiuti accetteresti da un assistente AI?', hint: 'Scenario ipotetico: nessuna funzione viene attivata. Seleziona ogni azione che accetteresti; non implica accettare le altre.', fields: [field('aiActions', 'Azioni accettabili', ['suggest|Ricevere suggerimenti di campi e orari, senza azioni automatiche', ...(friends ? ['coordinate|Ricevere proposte di orari da condividere personalmente con i miei amici'] : ['suggest_players|Ricevere proposte di partite o giocatori compatibili, senza inviare inviti']), 'draft|Preparare un messaggio che controllo e invio io', 'confirm_booking|Prenotare solo dopo una mia conferma esplicita', 'confirm_invite|Inviare inviti solo dopo una mia conferma esplicita', 'auto_booking|Prenotare senza conferma ogni volta, entro regole e limiti che autorizzo prima', 'auto_invite|Inviare inviti senza conferma ogni volta, entro regole e limiti che autorizzo prima', 'none|Non accetterei nessuno di questi aiuti', 'unknown|Non so ancora', skip], { multi: true, exclusive: ['none', 'unknown', 'skip'] })] },
  ];
  const activities = ['messages|Rispondere alle richieste e seguire le conferme', 'booking|Inserire o aggiornare prenotazioni', 'cancellations|Gestire cancellazioni e sostituzioni', 'players|Trovare giocatori per le partite', 'levels|Valutare livelli e abbinamenti', 'admin|Prima nota, pagamenti e riconciliazioni', 'other|Un’altra attività'];
  return [
    { title: 'Qual è il tuo ruolo e quanti campi ha il circolo?', hint: 'Non servono il nome del circolo né altre informazioni identificative.', fields: [field('role', 'Il tuo ruolo principale', ['owner|Titolare / socio', 'manager|Responsabile operativo', 'reception|Segreteria / prenotazioni', 'coach|Maestro / referente livelli', 'other|Altro ruolo', skip]), field('courts', 'Campi da padel del circolo', ['1_2|1–2', '3_5|3–5', '6_9|6–9', '10_plus|10 o più', unknown, skip])] },
    { title: 'Quali strumenti usate per prenotazioni e comunicazioni?', hint: 'Puoi indicarne più di uno, anche se svolgono funzioni diverse.', fields: [field('tools', 'Strumenti attuali', ['playtomic|Playtomic', 'management|Un altro gestionale / app di prenotazione', 'whatsapp|WhatsApp', 'phone|Telefono', 'email|Email', 'paper|Agenda cartacea / fogli di calcolo', 'other|Altri strumenti', 'none|Nessuno strumento', unknown, skip], { multi: true, exclusive: ['none', 'unknown', 'skip'] })] },
    { title: 'Quali attività creano più difficoltà operative?', hint: 'Scegli al massimo due attività, pensando alle ultime 4 settimane. Anche nessuna difficoltà è una risposta utile.', fields: [field('problems', 'Attività problematiche', [...activities, 'none|Nessuna difficoltà rilevante', unknown, skip], { multi: true, max: 2, exclusive: ['none', 'unknown', 'skip'] })] },
    { title: 'Quanto lavoro attivo richiede l’attività più impegnativa?', hint: 'In una settimana tipica delle ultime 4, somma le ore effettivamente lavorate dalle persone coinvolte. Escludi attesa e durata del turno.', fields: [...(answers.problems?.length && !answers.problems.some(v => ['none', 'unknown', 'skip'].includes(v)) ? [field('mainActivity', 'Quale delle attività indicate pesa di più?', activities.filter(item => answers.problems.includes(item.split('|')[0])))] : [field('mainActivity', 'A quale attività riferisci la stima?', [...activities, 'na|Nessuna / non applicabile', unknown, skip])]), field('activeHours', 'Ore di lavoro attivo a settimana', ['zero|Nessuna', 'under_1|Meno di 1 ora', '1_3|Da 1 a meno di 4 ore', '4_7|Da 4 a meno di 8 ore', '8_plus|8 ore o più', 'na|Non applicabile', unknown, skip])] },
    { title: 'Quanto sei soddisfatto degli strumenti attuali?', hint: 'Considera nel complesso gli strumenti che usi nel tuo ruolo.', fields: [scale('satisfaction', 'Soddisfazione attuale', 'Per nulla soddisfatto', 'Molto soddisfatto')] },
    { title: 'Quale operazione miglioreresti per prima?', hint: 'Scegli una sola priorità. Puoi aggiungere cosa dovrebbe migliorare o restare invariato.', fields: [field('priority', 'Prima priorità', [...activities, 'none|Non cambierei nulla al momento', unknown, skip])], detail: true },
    { title: 'Valuteresti una soluzione che affianca gli strumenti attuali?', hint: 'La compatibilità andrebbe verificata caso per caso. La risposta indica disponibilità ad approfondire, senza impegni di prova o di acquisto.', fields: [field('interest', 'Disponibilità a valutare', ['yes|Sì, vorrei approfondire', 'depends|Dipende da compatibilità e condizioni', 'later|Forse più avanti, non è una priorità', 'no|No', unknown, skip])] },
  ];
}
export function validQuestion(question: Question, answers: Answers): boolean {
  return question.fields.every(field => {
    const values = answers[field.id] ?? [];
    return values.length > 0 && values.every(value => field.options.some(option => option.value === value)) &&
      values.length <= (field.multi ? field.max ?? Infinity : 1) &&
      !(values.length > 1 && values.some(value => field.exclusive?.includes(value)));
  });
}

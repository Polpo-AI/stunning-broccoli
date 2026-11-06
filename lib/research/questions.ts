export type Audience = 'giocatori' | 'circoli';
export type Answers = Record<string, string[]>;
export type Option = { value: string; label: string };
export type Field = { id: string; label: string; options: Option[]; multi?: boolean; max?: number; exclusive?: string[]; scale?: boolean };
export type Question = { title: string; hint: string; fields: Field[]; detail?: boolean };
const options = (items: string[]): Option[] => items.map(item => { const [value, label] = item.split('|'); return { value, label }; });
const field = (id: string, label: string, items: string[], extra: Partial<Field> = {}): Field => ({ id, label, options: options(items), ...extra });
const unknown = 'unknown|Non so / non ricordo';
const skip = 'skip|Preferisco non rispondere';
export const VERSION = 'padel-surveys-v3';
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
  if (id === 'group') { delete next.obstacle; delete next.aiActions; }
  if (id === 'channel') delete next.ease;
  if (id === 'mainActivity') { delete next.activeHours; delete next.incidents; }
  if (id === 'problems') { delete next.activeHours; delete next.mainActivity; delete next.incidents; }
  return next;
}
export function questions(audience: Audience, answers: Answers): Question[] {
  const scale = (id: string, label: string, low: string, high: string, allowSkip = true) => field(id, label, [`1|1 — ${low}`, '2|2', '3|3', '4|4', `5|5 — ${high}`, ...(allowSkip ? ['na|Non applicabile', skip] : [])], { scale: true });
  const friends = isFriendsOnly(answers);
  if (audience === 'giocatori') return [
    { title: 'Quanto spesso giochi a padel?', hint: 'Pensa agli ultimi tre mesi, anche se hai giocato poco.', fields: [field('frequency', 'Frequenza di gioco', ['rare|Meno di una volta al mese', 'monthly|1–3 volte al mese', 'weekly|1–2 volte a settimana', 'often|3 o più volte a settimana'])] },
    { title: 'Con chi giochi di solito?', hint: 'Scegli la situazione che ti rappresenta meglio.', fields: [field('group', 'Gruppo abituale', ['friends|Solo con un gruppo fisso di amici', 'mixed|Con amici, ma a volte cerco altre persone', 'open|Spesso con persone nuove in partite aperte', 'club|Mi affido al circolo per trovare partite'])] },
    { title: 'Come trovi di solito le persone per organizzare una partita?', hint: 'Pensa a chi ti aiuta a completare il gruppo di quattro, non a come viene prenotato il campo.', fields: [field('channel', 'Come si forma il gruppo', ['friends|Mi organizzo direttamente con amici o conoscenti', 'invited|Mi unisco a partite organizzate da altre persone', 'club|Il circolo o il maestro trova i giocatori', 'app|Uso un’app dedicata per trovare giocatori o partite', 'chat|Cerco giocatori in gruppi WhatsApp o altre chat', 'other|In un altro modo'])] },
    { title: 'Quanto è stato facile organizzare quella partita?', hint: 'Considera tutti i passaggi necessari, dal primo accordo alla conferma.', fields: [scale('ease', 'Facilità dell’ultima organizzazione', 'Molto difficile', 'Molto facile', false)] },
    { title: 'Nelle ultime 4 settimane, quante volte volevi giocare ma non ci sei riuscito?', hint: 'Conta le occasioni saltate, non il numero di messaggi inviati. Zero è una risposta utile.', fields: [field('failures', 'Occasioni saltate', ['0|Nessuna', '1|Una', '2_3|2–3', '4_plus|4 o più'])] },
    { title: 'Qual è stato l’ostacolo principale nelle ultime 4 settimane?', hint: friends ? 'Pensa a coordinare il tuo gruppo, prenotare o gestire una rinuncia.' : 'Pensa a organizzare una partita, trovare persone o unirti a un gruppo.', fields: [field('obstacle', 'Ostacolo principale', ['schedules|Mettere d’accordo gli orari tra giocatori', 'courts|Trovare un campo nell’orario desiderato', 'substitute|Sostituire una persona che ha rinunciato', ...(!friends ? ['players|Trovare abbastanza giocatori', 'compatibility|Capire se livello e stile di gioco sono compatibili'] : []), 'communication|Seguire messaggi e conferme', 'price|Costo della partita', 'personal|Impegni personali o condizioni fisiche', 'other|Un altro ostacolo', 'none|Nessun ostacolo rilevante'])] },
    { title: 'Quali aiuti accetteresti da un assistente AI?', hint: 'Scenario ipotetico: nessuna funzione viene attivata. Seleziona ogni azione che accetteresti; non implica accettare le altre.', fields: [field('aiActions', 'Azioni accettabili', ['suggest|Ricevere suggerimenti di campi e orari, senza azioni automatiche', ...(friends ? ['coordinate|Ricevere proposte di orari da condividere personalmente con i miei amici'] : ['suggest_players|Ricevere proposte di partite o giocatori compatibili, senza inviare inviti']), 'draft|Preparare un messaggio che controllo e invio io', 'confirm_booking|Prenotare solo dopo una mia conferma esplicita', 'confirm_invite|Inviare inviti solo dopo una mia conferma esplicita', 'auto_booking|Prenotare senza conferma ogni volta, entro regole e limiti che autorizzo prima', 'auto_invite|Inviare inviti senza conferma ogni volta, entro regole e limiti che autorizzo prima', 'none|Non accetterei nessuno di questi aiuti', 'unknown|Non so ancora'], { multi: true, exclusive: ['none', 'unknown'] })] },
  ];
  const activities = ['messages|Rispondere alle richieste e seguire le conferme', 'booking|Inserire o aggiornare prenotazioni', 'cancellations|Gestire cancellazioni e sostituzioni', 'players|Trovare giocatori per le partite', 'levels|Valutare livelli e abbinamenti', 'admin|Prima nota, pagamenti e riconciliazioni', 'other|Un’altra attività'];
  return [
    { title: 'Qual è il tuo ruolo e quanti campi ha il circolo?', hint: 'Non servono il nome del circolo né altre informazioni identificative.', fields: [field('role', 'Il tuo ruolo principale', ['owner|Titolare / socio', 'manager|Responsabile operativo', 'reception|Segreteria / prenotazioni', 'coach|Maestro / referente livelli', 'other|Altro ruolo', skip]), field('courts', 'Campi da padel del circolo', ['1_2|1–2', '3_5|3–5', '6_9|6–9', '10_plus|10 o più', unknown, skip])] },
    { title: 'Quali strumenti usate per prenotazioni e comunicazioni?', hint: 'Puoi indicarne più di uno, anche se svolgono funzioni diverse.', fields: [field('tools', 'Strumenti attuali', ['playtomic|Playtomic', 'management|Un altro gestionale / app di prenotazione', 'whatsapp|WhatsApp', 'phone|Telefono', 'email|Email', 'paper|Agenda cartacea / fogli di calcolo', 'other|Altri strumenti', 'none|Nessuno strumento', unknown, skip], { multi: true, exclusive: ['none', 'unknown', 'skip'] })] },
    { title: 'Quali attività creano più difficoltà operative?', hint: 'Scegli al massimo due attività, pensando alle ultime 4 settimane. Anche nessuna difficoltà è una risposta utile.', fields: [field('problems', 'Attività problematiche', [...activities, 'none|Nessuna difficoltà rilevante', unknown, skip], { multi: true, max: 2, exclusive: ['none', 'unknown', 'skip'] })] },
    { title: 'Quanto lavoro attivo richiede l’attività più impegnativa?', hint: 'In una settimana tipica delle ultime 4, somma le ore effettivamente lavorate dalle persone coinvolte. Escludi attesa e durata del turno.', fields: [...(answers.problems?.length && !answers.problems.some(v => ['none', 'unknown', 'skip'].includes(v)) ? [field('mainActivity', 'Quale delle attività indicate pesa di più?', activities.filter(item => answers.problems.includes(item.split('|')[0])))] : [field('mainActivity', 'A quale attività riferisci la stima?', [...activities, 'na|Nessuna / non applicabile', unknown, skip])]), field('activeHours', 'Ore di lavoro attivo a settimana', ['zero|Nessuna', 'under_1|Meno di 1 ora', '1_3|Da 1 a meno di 4 ore', '4_7|Da 4 a meno di 8 ore', '8_plus|8 ore o più', 'na|Non applicabile', unknown, skip]), field('incidents', 'Nelle ultime 4 settimane, quante volte questa attività ha causato ritardi, errori o richieste non gestite?', ['zero|Mai', 'one|Una volta', '2_3|2–3 volte', '4_plus|4 o più volte', 'na|Non applicabile', unknown, skip])] },
    { title: 'Quanto sei soddisfatto degli strumenti attuali?', hint: 'Considera nel complesso gli strumenti che usi nel tuo ruolo.', fields: [scale('satisfaction', 'Soddisfazione attuale', 'Per nulla soddisfatto', 'Molto soddisfatto')] },
    { title: 'Quale operazione miglioreresti per prima?', hint: 'Scegli una sola priorità. Puoi aggiungere cosa dovrebbe migliorare o restare invariato.', fields: [field('priority', 'Prima priorità', [...activities, 'none|Non cambierei nulla al momento', unknown, skip])], detail: true },
    { title: 'Se trovassimo una soluzione compatibile con i tuoi strumenti e con condizioni economiche chiare, quale passo valuteresti?', hint: 'La compatibilità non è verificata. La risposta indica solo un interesse dichiarato: non equivale a un impegno di acquisto.', fields: [field('interest', 'Possibile prossimo passo', ['demo|Vedere una dimostrazione pratica', 'technical|Verificare la compatibilità con il gestionale', 'offer|Valutare una proposta economica', 'later|Forse più avanti: non è una priorità', 'no|Non siamo interessati', unknown, skip])] },
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

/** Server-side contract validation: answers must match every visible field and no other field. */
export function validAnswerSet(audience: Audience, answers: unknown, detail?: unknown): answers is Answers {
  if (!answers || typeof answers !== 'object' || Array.isArray(answers)) return false;
  const input = answers as Record<string, unknown>;
  if (Object.values(input).some(value => !Array.isArray(value) || value.some(item => typeof item !== 'string'))) return false;
  const validInput = input as Answers;
  const relevant = questions(audience, validInput);
  const fields = relevant.flatMap(question => question.fields);
  const expected = new Set(fields.map(field => field.id));
  if (Object.keys(input).length !== expected.size || Object.keys(input).some(key => !expected.has(key))) return false;
  if (!relevant.every(question => validQuestion(question, validInput))) return false;
  if (audience === 'giocatori') {
    // The current player survey has no conditional booking or non-participation branches.
  }
  if (audience === 'giocatori' && detail !== undefined) return false;
  if (detail !== undefined && (typeof detail !== 'string' || detail.length > 300 || /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(detail))) return false;
  if (audience === 'circoli' && input.priority !== undefined && !Array.isArray(input.priority)) return false;
  return true;
}

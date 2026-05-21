'use client';

/* ─── Sito Avv. Giulia Bianchi · VECCHIA VERSIONE 2010 ──────────────────────
   APPOSITAMENTE BRUTTA — per dimostrare quanto un sito vecchio sia datato.
   Stile: anni 2010 mid, Comic Sans, GIF, marquee, table layout, hit counter,
   visite contatore finto, bordi sgargianti, colori clip-art. */

export default function OldVersion() {
  return (
    <div
      style={{
        background:
          'repeating-linear-gradient(45deg, #008b8b 0px, #008b8b 30px, #20b2aa 30px, #20b2aa 60px)',
        minHeight: '100vh',
        padding: '20px',
        paddingTop: '76px', // 56 spazio per pulsanti fixed portfolio + 20 originale
        fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
        color: '#000',
      }}
    >
      {/* MARQUEE BENVENUTO */}
      <div
        style={{
          background: 'yellow',
          border: '4px ridge red',
          padding: '8px',
          fontSize: '22px',
          fontWeight: 'bold',
          marginBottom: '15px',
          textAlign: 'center',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            animation: 'oldmarquee 14s linear infinite',
          }}
        >
          🔥🔥 BENVENUTI NEL SITO UFFICIALE DELL&apos;AVVOCATO BIANCHI GIULIA 🔥🔥 STUDIO LEGALE A MILANO 🔥🔥 PRENOTAZIONI APERTE 🔥🔥&nbsp;&nbsp;&nbsp;
        </span>
      </div>

      {/* Tabella tradizionale come una volta */}
      <table
        cellPadding={0}
        cellSpacing={0}
        border={3}
        width="100%"
        style={{
          background: '#fff',
          borderColor: '#ff8c00',
          borderStyle: 'outset',
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        {/* HEADER */}
        <tbody>
          <tr>
            <td
              colSpan={2}
              style={{
                background: 'linear-gradient(to bottom, #ff8c00 0%, #ff4500 100%)',
                padding: '20px',
                textAlign: 'center',
                color: '#fff',
                borderBottom: '4px ridge #800080',
              }}
            >
              <h1
                style={{
                  fontFamily: '"Times New Roman", serif',
                  fontSize: '42px',
                  textShadow: '3px 3px 0px #000, 6px 6px 0px rgba(0,0,0,0.3)',
                  margin: 0,
                  letterSpacing: '2px',
                }}
              >
                ⚖️ STUDIO LEGALE BIANCHI ⚖️
              </h1>
              <p
                style={{
                  margin: '8px 0 0',
                  fontSize: '14px',
                  fontFamily: '"Comic Sans MS", cursive',
                  color: 'yellow',
                }}
              >
                ~ * ~ Avvocato a Milano dal 2010 ~ * ~
              </p>
              <p style={{ fontSize: '11px', margin: '4px 0 0', color: '#ffe' }}>
                Best viewed with Internet Explorer 6 · 1024x768
              </p>
            </td>
          </tr>

          {/* MENU LINKS BLU SOTTOLINEATI */}
          <tr>
            <td
              colSpan={2}
              style={{
                background: '#000080',
                padding: '6px',
                color: '#0ff',
                fontSize: '13px',
                textAlign: 'center',
              }}
            >
              <a href="#" style={{ color: '#0ff', textDecoration: 'underline', marginRight: '12px' }}>
                ▶ Home
              </a>
              <a href="#" style={{ color: '#0ff', textDecoration: 'underline', marginRight: '12px' }}>
                ▶ Chi sono
              </a>
              <a href="#" style={{ color: '#0ff', textDecoration: 'underline', marginRight: '12px' }}>
                ▶ Servizi
              </a>
              <a href="#" style={{ color: '#0ff', textDecoration: 'underline', marginRight: '12px' }}>
                ▶ Contatti
              </a>
              <a href="#" style={{ color: '#ff0', textDecoration: 'underline blink' }}>
                ▶ <span style={{ background: 'red', color: 'yellow', padding: '0 4px' }}>NOVITÀ!</span>
              </a>
            </td>
          </tr>

          {/* CORPO PRINCIPALE — sidebar + content */}
          <tr>
            {/* SIDEBAR */}
            <td
              valign="top"
              width="180"
              style={{
                background: '#ffe4b5',
                padding: '10px',
                borderRight: '3px ridge #800080',
                fontSize: '12px',
                color: '#000',
              }}
            >
              <h3
                style={{
                  background: '#800080',
                  color: '#ff0',
                  padding: '4px',
                  margin: '0 0 8px',
                  textAlign: 'center',
                  fontSize: '14px',
                }}
              >
                📞 CONTATTI
              </h3>
              <p style={{ margin: '4px 0', fontSize: '11px' }}>
                <b>Tel:</b> 02-1234-5678
                <br />
                <b>Cell:</b> 333-1234567
                <br />
                <b>Fax:</b> 02-1234-5679
                <br />
                <b>Email:</b>
                <br />
                <a href="#" style={{ color: '#0000ee' }}>
                  bianchi@hotmail.it
                </a>
              </p>

              <div
                style={{
                  background: '#ff0',
                  padding: '6px',
                  border: '2px dashed red',
                  margin: '12px 0',
                  textAlign: 'center',
                }}
              >
                <p style={{ margin: 0, fontSize: '11px', fontWeight: 'bold' }}>
                  🎉 PROMO!
                  <br />
                  Prima consulenza
                  <br />
                  <span style={{ color: 'red', fontSize: '18px' }}>GRATIS!</span>
                </p>
              </div>

              <h3
                style={{
                  background: '#800080',
                  color: '#ff0',
                  padding: '4px',
                  margin: '12px 0 8px',
                  textAlign: 'center',
                  fontSize: '14px',
                }}
              >
                🔥 VISITATORI
              </h3>
              <div
                style={{
                  background: '#000',
                  color: '#0f0',
                  padding: '6px',
                  fontFamily: '"Courier New", monospace',
                  textAlign: 'center',
                  fontSize: '20px',
                  letterSpacing: '4px',
                  border: '2px inset #888',
                }}
              >
                0 0 4 2 7 1 9
              </div>
              <p style={{ fontSize: '10px', textAlign: 'center', margin: '4px 0 0' }}>
                Hit counter dal 12/04/2010
              </p>

              <h3
                style={{
                  background: '#800080',
                  color: '#ff0',
                  padding: '4px',
                  margin: '12px 0 8px',
                  textAlign: 'center',
                  fontSize: '14px',
                }}
              >
                🌐 LINK AMICI
              </h3>
              <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: '11px' }}>
                <li>
                  <a href="#" style={{ color: '#0000ee' }}>
                    Mio cugino fotografo
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: '#0000ee' }}>
                    Sito comune Milano
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: '#0000ee' }}>
                    Pagine Gialle ✆
                  </a>
                </li>
              </ul>
            </td>

            {/* CONTENUTO PRINCIPALE */}
            <td valign="top" style={{ background: '#fff', padding: '15px', color: '#000' }}>
              <h2
                style={{
                  background:
                    'repeating-linear-gradient(90deg, #ffff00 0px, #ffff00 10px, #ff8c00 10px, #ff8c00 20px)',
                  padding: '6px',
                  textAlign: 'center',
                  fontSize: '24px',
                  fontFamily: '"Times New Roman", serif',
                  border: '2px ridge red',
                  margin: '0 0 12px',
                }}
              >
                ★ BENVENUTI nel mio sito! ★
              </h2>

              <p style={{ fontSize: '13px', lineHeight: 1.5 }}>
                Mi chiamo <b>Avvocato Bianchi Giulia</b> e sono un avvocato che esercita la
                professione legale presso il Foro di Milano dal 2010. Il mio Studio Legale è
                ubicato presso il centro di Milano, vicinissimo al Tribunale.{' '}
                <span style={{ color: 'red', fontWeight: 'bold' }}>
                  Chiama subito per un preventivo!
                </span>
              </p>

              {/* IMMAGINE CLIPART CENTRATA */}
              <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <div
                  style={{
                    display: 'inline-block',
                    width: '200px',
                    height: '160px',
                    background: '#ddd',
                    border: '4px ridge #888',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '48px',
                    }}
                  >
                    ⚖️📜🏛️
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      top: 4,
                      left: 4,
                      background: '#ff0',
                      padding: '2px 6px',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      border: '1px solid red',
                    }}
                  >
                    ClipArt™
                  </div>
                </div>
                <p style={{ fontSize: '10px', color: '#666', margin: '4px 0' }}>
                  ↑ Foto rappresentativa dello studio ↑
                </p>
              </div>

              <h3
                style={{
                  background: '#008080',
                  color: '#fff',
                  padding: '4px 8px',
                  fontSize: '15px',
                  fontFamily: '"Times New Roman", serif',
                  margin: '12px 0 8px',
                }}
              >
                ➤ I MIEI SERVIZI:
              </h3>
              <ul style={{ fontSize: '13px', lineHeight: 1.6, paddingLeft: '24px' }}>
                <li>
                  <b>Diritto civile</b> (contratti, obbligazioni, etc.)
                </li>
                <li>
                  <b>Diritto commerciale</b> (società, ecc.)
                </li>
                <li>
                  <b>Diritto del lavoro</b> (vertenze, controversie)
                </li>
                <li>
                  Recupero crediti{' '}
                  <span style={{ color: 'red' }}>
                    <b>(NOVITÀ!)</b>
                  </span>
                </li>
                <li>Successioni & testamenti</li>
                <li>
                  Separazioni e divorzi{' '}
                  <span style={{ background: '#ff0', padding: '0 4px', fontSize: '11px' }}>
                    [esperienza ventennale]
                  </span>
                </li>
              </ul>

              {/* BANNER PUBBLICITÀ FALSO */}
              <div
                style={{
                  background:
                    'linear-gradient(90deg, #ff0 0%, #f00 50%, #ff0 100%)',
                  border: '3px outset #f80',
                  padding: '8px',
                  textAlign: 'center',
                  margin: '20px 0',
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
              >
                🎯 OFFERTA SPECIALE 🎯<br />
                <span style={{ fontSize: '18px', color: 'blue' }}>
                  SCONTO 10% sulla prima causa civile!
                </span>
                <br />
                <span style={{ fontSize: '10px', color: '#000' }}>
                  *promo valida fino al 31/12/2014
                </span>
              </div>

              {/* FAKE TESTIMONIANZE */}
              <h3
                style={{
                  background: '#008080',
                  color: '#fff',
                  padding: '4px 8px',
                  fontSize: '15px',
                  fontFamily: '"Times New Roman", serif',
                  margin: '12px 0 8px',
                }}
              >
                ➤ DICONO DI ME:
              </h3>
              <div style={{ fontSize: '12px', lineHeight: 1.5 }}>
                <p style={{ background: '#ffd', padding: '6px', border: '1px dashed #888' }}>
                  <i>
                    "L&apos;avvocato Bianchi mi ha aiutato in un momento difficile. Bravissima!"
                  </i>{' '}
                  — <b>Mario R.</b> (cliente)
                </p>
                <p style={{ background: '#ffd', padding: '6px', border: '1px dashed #888' }}>
                  <i>"Professionale e disponibile. Consigliata!"</i> — <b>Anna B.</b>
                </p>
              </div>
            </td>
          </tr>

          {/* FOOTER */}
          <tr>
            <td
              colSpan={2}
              style={{
                background: '#000080',
                color: '#fff',
                padding: '8px',
                fontSize: '11px',
                textAlign: 'center',
              }}
            >
              © 2010-2014 Studio Legale Bianchi — Tutti i diritti riservati ®
              <br />
              <span style={{ color: '#ff0' }}>
                ⚠️ This site is best viewed with Internet Explorer 6 at 1024x768 resolution
              </span>
              <br />
              <a href="#" style={{ color: '#0ff', textDecoration: 'underline' }}>
                Webmaster
              </a>{' '}
              — <a href="#" style={{ color: '#0ff', textDecoration: 'underline' }}>
                Privacy Policy
              </a>{' '}
              —{' '}
              <a href="#" style={{ color: '#0ff', textDecoration: 'underline' }}>
                Mappa del sito
              </a>
              <br />
              <div style={{ marginTop: '8px', fontSize: '20px' }}>🔒 Sicuro · 🇮🇹 Italiano · 🆕 New!</div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Marquee keyframes */}
      <style jsx global>{`
        @keyframes oldmarquee {
          from { transform: translateX(100%); }
          to   { transform: translateX(-100%); }
        }
        @keyframes blink-old {
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}

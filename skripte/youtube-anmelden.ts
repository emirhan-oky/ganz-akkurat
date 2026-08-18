import 'dotenv/config';
import { anmelden, zugriffstoken } from '../src/youtube';

/**
 * Einmalige Anmeldung fuer die YouTube Analytics API.
 *
 * Danach steht `YOUTUBE_REFRESH_TOKEN` in .env und dieses Skript wird nie
 * wieder gebraucht — es sei denn, die App in der Cloud-Konsole steht auf
 * „Testing“. Dann verfaellt die Anmeldung nach sieben Tagen.
 */
const main = async () => {
  console.log('Anmeldung bei YouTube Analytics\n');

  const token = await anmelden();
  console.log(`✓ Angemeldet. YOUTUBE_REFRESH_TOKEN steht in .env (${token.length} Zeichen).\n`);

  // Gleich ausprobieren: Ein Token, das sich nicht einloesen laesst, ist
  // keins — und der Unterschied faellt sonst erst naechste Woche auf.
  await zugriffstoken();
  console.log('✓ Zugriffstoken lässt sich damit holen. Fertig.');
};

main().catch((f) => {
  console.error('\n✗ ' + (f instanceof Error ? f.message : String(f)));
  process.exit(1);
});

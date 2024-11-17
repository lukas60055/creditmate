import { parseStringPromise } from 'xml2js';
import { ErrorHandler } from '../middlewares/errorHandler';
import ReferenceRate from '../models/ReferenceRate';

export const fetchReferenceRate = async () => {
  const response = await fetch(
    'https://static.nbp.pl/dane/stopy/stopy_procentowe.xml'
  );

  if (!response.ok) {
    throw new ErrorHandler(
      response.status,
      `Błąd połączenia z NBP! Nie udało się pobrać danych stopy referencyjnej`
    );
  }

  const xmlData = await response.text();
  const data = await parseStringPromise(xmlData);

  const referenceRateEntry = data.stopy_procentowe.tabela[0].pozycja.find(
    (position: any) => position.$.id === 'ref'
  );

  const referenceRateString = referenceRateEntry.$.oprocentowanie;
  const referenceRate = parseFloat(referenceRateString.replace(',', '.'));

  const newRate = await ReferenceRate.create({
    value: referenceRate,
    retrievalDate: new Date(),
  });

  return { referenceRate, referenceRateId: newRate.id };
};

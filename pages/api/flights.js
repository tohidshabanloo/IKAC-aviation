const API_KEY = '9adb44eec480a58760e00358630c5ee2a';
const BASE_URL = 'https://api.aviationstack.com/v1';

export default async function handler(req, res) {
  const { type = 'arrivals', limit = 25 } = req.query;

  const param = type === 'departures' ? 'dep_iata' : 'arr_iata';
  const url = `${BASE_URL}/flights?access_key=${API_KEY}&${param}=IKA&limit=${limit}&lang=fa`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      return res.status(400).json({ error: data.error });
    }

    const flights = (data.data || []).map((f) => ({
      flight_number: f.flight?.iata || f.flight?.icao || '-',
      airline: f.airline?.name || '-',
      airline_iata: f.airline?.iata_code || '-',
      status: f.flight_status || 'scheduled',
      aircraft: f.aircraft?.iata || '-',
      departure: {
        airport: f.departure?.airport || '-',
        iata: f.departure?.iata || '-',
        terminal: f.departure?.terminal || '-',
        gate: f.departure?.gate || '-',
        scheduled: f.departure?.scheduled || null,
        estimated: f.departure?.estimated || null,
        actual: f.departure?.actual || null,
        delay: f.departure?.delay || 0,
      },
      arrival: {
        airport: f.arrival?.airport || '-',
        iata: f.arrival?.iata || '-',
        terminal: f.arrival?.terminal || '-',
        gate: f.arrival?.gate || '-',
        baggage: f.arrival?.baggage || '-',
        scheduled: f.arrival?.scheduled || null,
        estimated: f.arrival?.estimated || null,
        actual: f.arrival?.actual || null,
        delay: f.arrival?.delay || 0,
      },
      live: f.live || null,
    }));

    return res.status(200).json({ flights, pagination: data.pagination });
  } catch (error) {
    return res.status(500).json({ error: { message: 'خطا در دریافت اطلاعات پرواز' } });
  }
}

export function formatRupiah(amount) {
  return 'Rp' + Math.round(Number(amount) || 0).toLocaleString('id-ID');
}

export function slugify(text) {
  return (text || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function formatCatAge(birthDateStr) {
  if (!birthDateStr) return '-';
  const birth = new Date(birthDateStr);
  if (Number.isNaN(birth.getTime())) return '-';
  const now = new Date();
  let months =
    (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
  if (now.getDate() < birth.getDate()) months -= 1;
  if (months < 1) return '< 1 bln';
  const years = Math.floor(months / 12);
  const remMonths = months % 12;
  if (years === 0) return `${remMonths} bln`;
  if (remMonths === 0) return `${years} th`;
  return `${years} th ${remMonths} bln`;
}

const MONTHS_ID = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Agu',
  'Sep',
  'Okt',
  'Nov',
  'Des',
];

const DAYS_ID = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
const DAYS_FULL_ID = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

export function formatDateShort(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr + 'T00:00:00');
  if (Number.isNaN(d.getTime())) return dateStr;
  return `${d.getDate()} ${MONTHS_ID[d.getMonth()]}`;
}

export function formatDateFull(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr + 'T00:00:00');
  if (Number.isNaN(d.getTime())) return dateStr;
  return `${DAYS_FULL_ID[d.getDay()]}, ${d.getDate()} ${MONTHS_ID[d.getMonth()]} ${d.getFullYear()}`;
}

export function getTodayISO() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function addDaysISO(baseISO, days) {
  const d = new Date(baseISO + 'T00:00:00');
  d.setDate(d.getDate() + days);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function getDayParts(dateISO) {
  const d = new Date(dateISO + 'T00:00:00');
  return {
    dayShort: DAYS_ID[d.getDay()],
    dayNumber: d.getDate(),
    monthShort: MONTHS_ID[d.getMonth()],
    dayIndex: d.getDay(),
  };
}

export function timeToMinutes(timeStr) {
  if (!timeStr) return 0;
  const [h, m] = timeStr.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}

export function minutesToTime(mins) {
  const h = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  return `${String(h).padStart(2, '0')}.${String(m).padStart(2, '0')}`;
}

export function minutesToColonTime(mins) {
  const h = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function formatTimeDot(timeStr) {
  return (timeStr || '').replace(':', '.');
}

export function getCafeOpenStatus(cafe) {
  const now = new Date();
  const dayIdx = now.getDay();
  const hoursList = Array.isArray(cafe?.operatingHours)
    ? cafe.operatingHours
    : Array.isArray(cafe?.hours)
    ? cafe.hours
    : [];
  const todayHour = hoursList.find((h) => (h.dayIndex ?? h.dayOfWeek) === dayIdx);
  if (!todayHour || todayHour.isClosed) {
    return { isOpen: false, label: 'Tutup hari ini', todayHour };
  }
  const nowMins = now.getHours() * 60 + now.getMinutes();
  const openMins = timeToMinutes(todayHour.openTime);
  const closeMins = timeToMinutes(todayHour.closeTime);
  if (nowMins >= openMins && nowMins < closeMins) {
    return {
      isOpen: true,
      label: `Buka sekarang · sampai ${formatTimeDot(todayHour.closeTime)}`,
      todayHour,
    };
  }
  if (nowMins < openMins) {
    return {
      isOpen: false,
      label: `Tutup · buka pukul ${formatTimeDot(todayHour.openTime)}`,
      todayHour,
    };
  }
  return { isOpen: false, label: 'Tutup sekarang', todayHour };
}

export function getPromoTimeState(startDate, endDate) {
  const today = getTodayISO();
  if (today < startDate) return 'upcoming';
  if (today > endDate) return 'ended';
  return 'ongoing';
}

export function getRemainingDaysText(startDate, endDate) {
  const today = new Date(getTodayISO() + 'T00:00:00');
  const start = new Date(startDate + 'T00:00:00');
  const end = new Date(endDate + 'T00:00:00');
  if (today < start) {
    const diff = Math.ceil((start.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return `Mulai ${diff} hari lagi`;
  }
  if (today > end) {
    return 'Sudah berakhir';
  }
  const diff = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 'Berakhir hari ini';
  return `Berakhir ${diff} hari lagi`;
}
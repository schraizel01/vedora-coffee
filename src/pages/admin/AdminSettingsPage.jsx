import React, { useEffect, useState } from 'react';
import { ExternalLink, MapPin, Save } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AdminLayout } from '../../components/AdminLayout';
import { Button } from '../../components/ui';

const DAY_NAMES = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

export const AdminSettingsPage = () => {
  const { cafeInfo, saveCafeInfo, isOnline } = useApp();

  const [form, setForm] = useState({
    name: '',
    tagline: '',
    description: '',
    phone: '',
    whatsapp: '',
    email: '',
    instagram: '',
    address: '',
    latitude: '',
    longitude: '',
    aboutImageUrl: '',
    heroUrl: '',
    maxCapacity: 30,
    slotMinutes: 60,
    bookingDurationMinutes: 120,
    operatingHours: [],
  });

  const [aboutImageFile, setAboutImageFile] = useState(null);
  const [heroFile, setHeroFile] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!cafeInfo) return;
    const hours =
      cafeInfo.operatingHours && cafeInfo.operatingHours.length > 0
        ? cafeInfo.operatingHours
        : DAY_NAMES.map((dayName, idx) => ({
            dayIndex: idx,
            dayName,
            openTime: '10:00',
            closeTime: '22:00',
            isClosed: false,
          }));

    setForm({
      name: cafeInfo.name || '',
      tagline: cafeInfo.tagline || '',
      description: cafeInfo.description || '',
      phone: cafeInfo.phone || '',
      whatsapp: cafeInfo.whatsapp || '',
      email: cafeInfo.email || '',
      instagram: cafeInfo.instagram || '',
      address: cafeInfo.address || '',
      latitude:
        cafeInfo.latitude !== undefined && cafeInfo.latitude !== null
          ? String(cafeInfo.latitude)
          : '',
      longitude:
        cafeInfo.longitude !== undefined && cafeInfo.longitude !== null
          ? String(cafeInfo.longitude)
          : '',
      aboutImageUrl: cafeInfo.aboutImageUrl || cafeInfo.about_image_url || '',
      heroUrl: cafeInfo.heroImage || cafeInfo.heroUrl || '',
      maxCapacity: cafeInfo.maxCapacity || 30,
      slotMinutes: cafeInfo.slotMinutes || cafeInfo.slotDurationMinutes || 60,
      bookingDurationMinutes:
        cafeInfo.bookingDurationMinutes || cafeInfo.tableDurationMinutes || 120,
      operatingHours: hours,
    });
  }, [cafeInfo]);

  const handleHourChange = (dayIndex, field, value) => {
    setForm((prev) => ({
      ...prev,
      operatingHours: prev.operatingHours.map((h) =>
        (h.dayIndex ?? h.dayOfWeek) === dayIndex ? { ...h, [field]: value } : h
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saving || !isOnline) return;
    setSaving(true);
    try {
      const parsedLat = parseFloat(String(form.latitude).replace(',', '.'));
      const parsedLng = parseFloat(String(form.longitude).replace(',', '.'));

      await saveCafeInfo({
        ...form,
        latitude: Number.isFinite(parsedLat) ? parsedLat : 0,
        longitude: Number.isFinite(parsedLng) ? parsedLng : 0,
        maxCapacity: Number(form.maxCapacity) || 30,
        slotMinutes: Number(form.slotMinutes) || 60,
        bookingDurationMinutes: Number(form.bookingDurationMinutes) || 120,
        aboutImageFile,
        heroFile,
      });
      setAboutImageFile(null);
      setHeroFile(null);
    } finally {
      setSaving(false);
    }
  };

  const mapsPreviewUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    `${form.latitude || 0},${form.longitude || 0}`
  )}`;

  return (
    <AdminLayout title="Profil & Pengaturan Kafe">
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6 pb-28 lg:pb-12">
        {/* Identitas & Visual */}
        <section className="bg-bg-surface border border-border-subtle rounded-[16px] p-4 sm:p-6 space-y-4">
          <h2 className="font-sans font-semibold text-[16px] text-text-primary">
            Identitas & Visual Kafe
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] text-text-secondary mb-1.5">Nama kafe</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full h-11 px-3.5 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary focus:outline-none focus:border-accent-500"
              />
            </div>
            <div>
              <label className="block text-[13px] text-text-secondary mb-1.5">Tagline</label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                className="w-full h-11 px-3.5 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary focus:outline-none focus:border-accent-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[13px] text-text-secondary mb-1.5">Deskripsi singkat</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full p-3.5 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary focus:outline-none focus:border-accent-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="space-y-2">
              <label className="block text-[13px] text-text-secondary">URL / File Foto Hero</label>
              <input
                type="url"
                value={form.heroUrl}
                onChange={(e) => setForm({ ...form, heroUrl: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full h-11 px-3.5 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary text-[13px] focus:outline-none focus:border-accent-500"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setHeroFile(e.target.files?.[0] || null)}
                className="block w-full text-[12px] text-text-secondary file:mr-3 file:py-1.5 file:px-3 file:rounded-[8px] file:border-0 file:bg-bg-elevated file:text-text-primary hover:file:bg-brown-800 cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[13px] text-text-secondary">
                URL / File Foto Tentang Kami
              </label>
              <input
                type="url"
                value={form.aboutImageUrl}
                onChange={(e) => setForm({ ...form, aboutImageUrl: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full h-11 px-3.5 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary text-[13px] focus:outline-none focus:border-accent-500"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setAboutImageFile(e.target.files?.[0] || null)}
                className="block w-full text-[12px] text-text-secondary file:mr-3 file:py-1.5 file:px-3 file:rounded-[8px] file:border-0 file:bg-bg-elevated file:text-text-primary hover:file:bg-brown-800 cursor-pointer"
              />
            </div>
          </div>
        </section>

        {/* Kontak */}
        <section className="bg-bg-surface border border-border-subtle rounded-[16px] p-4 sm:p-6 space-y-4">
          <h2 className="font-sans font-semibold text-[16px] text-text-primary">Kontak & Sosial</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] text-text-secondary mb-1.5">Telepon</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full h-11 px-3.5 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary focus:outline-none focus:border-accent-500"
              />
            </div>
            <div>
              <label className="block text-[13px] text-text-secondary mb-1.5">
                WhatsApp (62...)
              </label>
              <input
                type="text"
                value={form.whatsapp}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                className="w-full h-11 px-3.5 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary focus:outline-none focus:border-accent-500"
              />
            </div>
            <div>
              <label className="block text-[13px] text-text-secondary mb-1.5">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full h-11 px-3.5 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary focus:outline-none focus:border-accent-500"
              />
            </div>
            <div>
              <label className="block text-[13px] text-text-secondary mb-1.5">Instagram</label>
              <input
                type="text"
                value={form.instagram}
                onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                className="w-full h-11 px-3.5 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary focus:outline-none focus:border-accent-500"
              />
            </div>
          </div>
        </section>

        {/* Lokasi */}
        <section className="bg-bg-surface border border-border-subtle rounded-[16px] p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-sans font-semibold text-[16px] text-text-primary flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent-500" />
              Lokasi
            </h2>
            <a
              href={mapsPreviewUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[13px] text-accent-500 hover:underline inline-flex items-center gap-1"
            >
              Pratinjau Maps <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div>
            <label className="block text-[13px] text-text-secondary mb-1.5">Alamat lengkap</label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full h-11 px-3.5 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary focus:outline-none focus:border-accent-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] text-text-secondary mb-1.5">Latitude</label>
              <input
                type="text"
                inputMode="decimal"
                placeholder="-7.054821"
                value={form.latitude}
                onChange={(e) => setForm({ ...form, latitude: e.target.value })}
                className="w-full h-11 px-3.5 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary focus:outline-none focus:border-accent-500"
              />
            </div>
            <div>
              <label className="block text-[13px] text-text-secondary mb-1.5">Longitude</label>
              <input
                type="text"
                inputMode="decimal"
                placeholder="110.433192"
                value={form.longitude}
                onChange={(e) => setForm({ ...form, longitude: e.target.value })}
                className="w-full h-11 px-3.5 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary focus:outline-none focus:border-accent-500"
              />
            </div>
          </div>
        </section>

        {/* Jam Operasional (Layout responsif: presisi 50:50 di HP & 1 baris rapi di Desktop) */}
        <section className="bg-bg-surface border border-border-subtle rounded-[16px] p-4 sm:p-6 space-y-3.5">
          <h2 className="font-sans font-semibold text-[16px] text-text-primary">Jam Operasional</h2>
          <div className="space-y-3">
            {form.operatingHours.map((h) => {
              const dIdx = h.dayIndex ?? h.dayOfWeek;
              return (
                <div
                  key={dIdx}
                  className="p-3.5 rounded-[12px] bg-bg-elevated border border-border-subtle flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-3"
                >
                  {/* Baris Atas di HP / Sisi Kiri di Desktop: Nama Hari & Libur */}
                  <div className="flex items-center justify-between sm:contents">
                    <span className="sm:w-24 text-[14px] font-semibold sm:font-medium text-text-primary">
                      {h.dayName || DAY_NAMES[dIdx]}
                    </span>

                    <label className="inline-flex items-center gap-2 text-[13px] text-text-secondary cursor-pointer select-none sm:order-3">
                      <input
                        type="checkbox"
                        checked={Boolean(h.isClosed)}
                        onChange={(e) => handleHourChange(dIdx, 'isClosed', e.target.checked)}
                        className="w-4 h-4 rounded accent-accent-500 cursor-pointer"
                      />
                      <span>Libur</span>
                    </label>
                  </div>

                  {/* Baris Bawah di HP / Tengah di Desktop: Jam Buka - Jam Tutup */}
                  <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:flex items-center gap-2 sm:order-2">
                    <input
                      type="time"
                      disabled={h.isClosed}
                      value={h.openTime}
                      onChange={(e) => handleHourChange(dIdx, 'openTime', e.target.value)}
                      className="w-full min-w-0 sm:w-auto h-10 sm:h-9 px-2.5 rounded-[9px] bg-bg-surface border border-border-subtle text-[13px] text-text-primary disabled:opacity-40 focus:outline-none focus:border-accent-500"
                    />
                    <span className="text-text-muted text-center">–</span>
                    <input
                      type="time"
                      disabled={h.isClosed}
                      value={h.closeTime}
                      onChange={(e) => handleHourChange(dIdx, 'closeTime', e.target.value)}
                      className="w-full min-w-0 sm:w-auto h-10 sm:h-9 px-2.5 rounded-[9px] bg-bg-surface border border-border-subtle text-[13px] text-text-primary disabled:opacity-40 focus:outline-none focus:border-accent-500"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Pengaturan Reservasi */}
        <section className="bg-bg-surface border border-border-subtle rounded-[16px] p-4 sm:p-6 space-y-4">
          <div>
            <h2 className="font-sans font-semibold text-[16px] text-text-primary">
              Pengaturan Reservasi
            </h2>
            <p className="text-[12px] text-text-muted mt-0.5">
              Perubahan hanya berlaku untuk reservasi baru.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[13px] text-text-secondary mb-1.5">
                Kapasitas maksimum (kursi)
              </label>
              <input
                type="number"
                min={1}
                value={form.maxCapacity}
                onChange={(e) => setForm({ ...form, maxCapacity: e.target.value })}
                className="w-full h-11 px-3.5 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary focus:outline-none focus:border-accent-500"
              />
            </div>
            <div>
              <label className="block text-[13px] text-text-secondary mb-1.5">
                Durasi slot (menit)
              </label>
              <input
                type="number"
                min={15}
                step={15}
                value={form.slotMinutes}
                onChange={(e) => setForm({ ...form, slotMinutes: e.target.value })}
                className="w-full h-11 px-3.5 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary focus:outline-none focus:border-accent-500"
              />
            </div>
            <div>
              <label className="block text-[13px] text-text-secondary mb-1.5">
                Durasi meja (menit)
              </label>
              <input
                type="number"
                min={30}
                step={15}
                value={form.bookingDurationMinutes}
                onChange={(e) =>
                  setForm({ ...form, bookingDurationMinutes: e.target.value })
                }
                className="w-full h-11 px-3.5 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary focus:outline-none focus:border-accent-500"
              />
            </div>
          </div>
        </section>

        <Button type="submit" fullWidth disabled={saving || !isOnline}>
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Menyimpan...' : 'Simpan Pengaturan'}
        </Button>
      </form>
    </AdminLayout>
  );
};
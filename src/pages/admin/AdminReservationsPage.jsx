import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Phone, MessageCircle, Calendar, Users, WifiOff, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatDateFull, formatTimeDot, getTodayISO } from '../../utils/format';
import { AdminLayout } from '../../components/AdminLayout';
import { Badge, Button, ConfirmDialog, EmptyState } from '../../components/ui';

const STATUS_META = {
  pending: { label: 'Menunggu konfirmasi', tone: 'warning' },
  confirmed: { label: 'Dikonfirmasi', tone: 'success' },
  completed: { label: 'Selesai', tone: 'neutral' },
  cancelled: { label: 'Dibatalkan', tone: 'danger' },
};

export const AdminReservationsPage = () => {
  const {
    reservations,
    offlineReservationsCount,
    isOnline,
    updateReservationStatus,
    syncOfflineReservations,
  } = useApp();
  const [searchParams] = useSearchParams();
  const today = getTodayISO();

  const initialStatus = searchParams.get('status') || 'all';
  const [dateMode, setDateMode] = useState('all');
  const [customDate, setCustomDate] = useState(today);
  const [statusFilter, setStatusFilter] = useState(initialStatus);
  const [query, setQuery] = useState('');
  const [pendingAction, setPendingAction] = useState(null);

  const filtered = useMemo(() => {
    return reservations.filter((r) => {
      if (dateMode === 'today' && r.date !== today) return false;
      if (dateMode === 'custom' && r.date !== customDate) return false;
      if (statusFilter !== 'all' && r.status !== statusFilter) return false;
      if (query.trim()) {
        const q = query.trim().toLowerCase();
        if (!r.code.toLowerCase().includes(q) && !r.customerName.toLowerCase().includes(q)) {
          return false;
        }
      }
      return true;
    });
  }, [reservations, dateMode, customDate, today, statusFilter, query]);

  return (
    <AdminLayout title="Kelola Reservasi">
      <div className="space-y-4 pb-24 lg:pb-8">
        {/* Banner Antrean Tiket Offline */}
        {offlineReservationsCount > 0 && (
          <div className="p-4 rounded-[14px] bg-accent-500/12 border border-accent-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5 text-[13px] text-text-primary">
              <WifiOff className="w-4 h-4 text-accent-500 shrink-0 mt-0.5" />
              <span>
                Terdapat <strong>{offlineReservationsCount} tiket reservasi offline</strong>{' '}
                {isOnline
                  ? 'yang siap disinkronkan ke database.'
                  : 'di penyimpanan sementara. Admin tetap bisa melakukan approval offline; data otomatis masuk ke database saat kembali online.'}
              </span>
            </div>
            {isOnline && (
              <Button size="sm" type="button" onClick={() => syncOfflineReservations()}>
                <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                Sinkronkan Sekarang
              </Button>
            )}
          </div>
        )}

        {/* Date & Search Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="inline-flex p-1 rounded-[12px] bg-bg-surface border border-border-subtle shrink-0">
            <button
              type="button"
              onClick={() => setDateMode('today')}
              className={`h-9 px-3.5 rounded-[10px] text-[13px] font-semibold cursor-pointer ${
                dateMode === 'today' ? 'bg-accent-500 text-on-accent' : 'text-text-secondary'
              }`}
            >
              Hari ini
            </button>
            <button
              type="button"
              onClick={() => setDateMode('all')}
              className={`h-9 px-3.5 rounded-[10px] text-[13px] font-semibold cursor-pointer ${
                dateMode === 'all' ? 'bg-accent-500 text-on-accent' : 'text-text-secondary'
              }`}
            >
              Semua tanggal
            </button>
            <button
              type="button"
              onClick={() => setDateMode('custom')}
              className={`h-9 px-3.5 rounded-[10px] text-[13px] font-semibold cursor-pointer ${
                dateMode === 'custom' ? 'bg-accent-500 text-on-accent' : 'text-text-secondary'
              }`}
            >
              Pilih tanggal
            </button>
          </div>

          {dateMode === 'custom' && (
            <input
              type="date"
              value={customDate}
              onChange={(e) => setCustomDate(e.target.value)}
              className="h-11 px-3.5 rounded-[12px] bg-bg-surface border border-border-subtle text-text-primary"
            />
          )}

          <div className="relative flex-1">
            <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari kode booking atau nama tamu..."
              className="w-full h-11 pl-10 pr-4 rounded-[12px] bg-bg-surface border border-border-subtle text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-500"
            />
          </div>
        </div>

        {/* Status Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { key: 'all', label: 'Semua' },
            { key: 'pending', label: 'Menunggu' },
            { key: 'confirmed', label: 'Dikonfirmasi' },
            { key: 'completed', label: 'Selesai' },
            { key: 'cancelled', label: 'Dibatalkan' },
          ].map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setStatusFilter(s.key)}
              className={`h-9 px-4 rounded-full text-[13px] font-medium whitespace-nowrap cursor-pointer ${
                statusFilter === s.key
                  ? 'bg-accent-500 text-on-accent font-semibold'
                  : 'bg-bg-surface border border-border-subtle text-text-secondary'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* List */}
        {filtered.length === 0 ? (
          <EmptyState icon="cup" title="Tidak ada reservasi yang cocok" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((r) => {
              const st = STATUS_META[r.status] || STATUS_META.pending;
              const isOfflineTicket = Boolean(r.isOffline);
              const actionDisabled = !isOnline && !isOfflineTicket;

              return (
                <div
                  key={r.id}
                  className={`bg-bg-surface border ${
                    isOfflineTicket ? 'border-dashed border-accent-500/70' : 'border-border-subtle'
                  } rounded-[16px] p-4 space-y-3 flex flex-col justify-between`}
                >
                  <div className="space-y-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-semibold text-[16px] text-accent-500">
                          {r.code}
                        </span>
                        {isOfflineTicket && <Badge tone="neutral">Offline · Lokal</Badge>}
                      </div>
                      <Badge tone={st.tone}>{st.label}</Badge>
                    </div>

                    <div>
                      <div className="font-semibold text-[16px] text-text-primary">
                        {r.customerName}
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-[13px] text-text-secondary">
                        <span>{r.customerPhone}</span>
                        <a
                          href={`tel:${r.customerPhone}`}
                          className="inline-flex items-center gap-1 text-accent-200 hover:underline"
                        >
                          <Phone className="w-3.5 h-3.5" /> Telepon
                        </a>
                        <a
                          href={`https://wa.me/${r.customerPhone.replace(/^0/, '62')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-status-success hover:underline"
                        >
                          <MessageCircle className="w-3.5 h-3.5" /> WA
                        </a>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-text-secondary pt-1">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-brown-300" />
                        {formatDateFull(r.date)} · {formatTimeDot(r.startTime)}–
                        {formatTimeDot(r.endTime)}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-brown-300" />
                        {r.guests} tamu
                      </span>
                    </div>

                    {r.notes && (
                      <div className="p-2.5 rounded-[10px] bg-bg-elevated/60 text-[13px] text-text-secondary">
                        Catatan: {r.notes}
                      </div>
                    )}
                  </div>

                  {r.status === 'pending' && (
                    <div className="flex gap-2.5 pt-2 border-t border-border-subtle/70">
                      <Button
                        size="sm"
                        variant="destructive"
                        fullWidth
                        disabled={actionDisabled}
                        onClick={() =>
                          setPendingAction({
                            id: r.id,
                            code: r.code,
                            nextStatus: 'cancelled',
                            title: `Tolak reservasi ${r.code}?`,
                            desc: isOfflineTicket
                              ? 'Status disimpan sementara dan akan tersinkron ke database saat online.'
                              : 'Status akan menjadi Dibatalkan dan kursi dilepas kembali.',
                            destructive: true,
                          })
                        }
                      >
                        Tolak
                      </Button>
                      <Button
                        size="sm"
                        fullWidth
                        disabled={actionDisabled}
                        onClick={() =>
                          setPendingAction({
                            id: r.id,
                            code: r.code,
                            nextStatus: 'confirmed',
                            title: `Konfirmasi reservasi ${r.code}?`,
                            desc: isOfflineTicket
                              ? `Approve tiket offline ${r.customerName}. Data akan otomatis masuk ke database saat online.`
                              : `Konfirmasi meja untuk ${r.customerName} (${r.guests} tamu).`,
                          })
                        }
                      >
                        Konfirmasi
                      </Button>
                    </div>
                  )}

                  {r.status === 'confirmed' && (
                    <div className="flex gap-2.5 pt-2 border-t border-border-subtle/70">
                      <Button
                        size="sm"
                        variant="destructive"
                        fullWidth
                        disabled={actionDisabled}
                        onClick={() =>
                          setPendingAction({
                            id: r.id,
                            code: r.code,
                            nextStatus: 'cancelled',
                            title: `Batalkan reservasi ${r.code}?`,
                            desc: 'Reservasi yang sudah dikonfirmasi akan dibatalkan.',
                            destructive: true,
                          })
                        }
                      >
                        Batalkan
                      </Button>
                      <Button
                        size="sm"
                        fullWidth
                        disabled={actionDisabled}
                        onClick={() =>
                          setPendingAction({
                            id: r.id,
                            code: r.code,
                            nextStatus: 'completed',
                            title: `Tandai selesai ${r.code}?`,
                            desc: 'Sesi kunjungan tamu telah selesai.',
                          })
                        }
                      >
                        Tandai Selesai
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={Boolean(pendingAction)}
        title={pendingAction?.title || ''}
        description={pendingAction?.desc || ''}
        destructive={pendingAction?.destructive}
        onCancel={() => setPendingAction(null)}
        onConfirm={() => {
          if (pendingAction) {
            updateReservationStatus(pendingAction.id, pendingAction.nextStatus);
          }
          setPendingAction(null);
        }}
      />
    </AdminLayout>
  );
};
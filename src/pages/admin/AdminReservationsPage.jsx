const _jsxFileName = "src\\pages\\admin\\AdminReservationsPage.tsx"; function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Phone, MessageCircle, Calendar, Users } from 'lucide-react';
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
  const { reservations, isOnline, updateReservationStatus } = useApp();
  const [searchParams] = useSearchParams();
  const today = getTodayISO();

  const initialStatus = (searchParams.get('status') ) || 'all';
  const [dateMode, setDateMode] = useState('all');
  const [customDate, setCustomDate] = useState(today);
  const [statusFilter, setStatusFilter] = useState(initialStatus);
  const [query, setQuery] = useState('');

  const [pendingAction, setPendingAction] = useState






(null);

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
    React.createElement(AdminLayout, { title: "Kelola Reservasi" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 53}}
      , React.createElement('div', { className: "space-y-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 54}}
        /* Date & Search Controls */
        , React.createElement('div', { className: "flex flex-col sm:flex-row gap-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 56}}
          , React.createElement('div', { className: "inline-flex p-1 rounded-[12px] bg-bg-surface border border-border-subtle shrink-0"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 57}}
            , React.createElement('button', {
              type: "button",
              onClick: () => setDateMode('today'),
              className: `h-9 px-3.5 rounded-[10px] text-[13px] font-semibold cursor-pointer ${
                dateMode === 'today' ? 'bg-accent-500 text-on-accent' : 'text-text-secondary'
              }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 58}}
, "Hari ini"

            )
            , React.createElement('button', {
              type: "button",
              onClick: () => setDateMode('all'),
              className: `h-9 px-3.5 rounded-[10px] text-[13px] font-semibold cursor-pointer ${
                dateMode === 'all' ? 'bg-accent-500 text-on-accent' : 'text-text-secondary'
              }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 67}}
, "Semua tanggal"

            )
            , React.createElement('button', {
              type: "button",
              onClick: () => setDateMode('custom'),
              className: `h-9 px-3.5 rounded-[10px] text-[13px] font-semibold cursor-pointer ${
                dateMode === 'custom' ? 'bg-accent-500 text-on-accent' : 'text-text-secondary'
              }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 76}}
, "Pilih tanggal"

            )
          )
          , dateMode === 'custom' && (
            React.createElement('input', {
              type: "date",
              value: customDate,
              onChange: (e) => setCustomDate(e.target.value),
              className: "h-11 px-3.5 rounded-[12px] bg-bg-surface border border-border-subtle text-text-primary"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 87}}
            )
          )
          , React.createElement('div', { className: "relative flex-1" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 94}}
            , React.createElement(Search, { className: "w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 95}} )
            , React.createElement('input', {
              type: "search",
              value: query,
              onChange: (e) => setQuery(e.target.value),
              placeholder: "Cari kode booking atau nama tamu..."     ,
              className: "w-full h-11 pl-10 pr-4 rounded-[12px] bg-bg-surface border border-border-subtle text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-500"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 96}}
            )
          )
        )

        /* Status Chips */
        , React.createElement('div', { className: "flex items-center gap-2 overflow-x-auto no-scrollbar"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 107}}
          , [
            { key: 'all' , label: 'Semua' },
            { key: 'pending' , label: 'Menunggu' },
            { key: 'confirmed' , label: 'Dikonfirmasi' },
            { key: 'completed' , label: 'Selesai' },
            { key: 'cancelled' , label: 'Dibatalkan' },
          ].map((s) => (
            React.createElement('button', {
              key: s.key,
              type: "button",
              onClick: () => setStatusFilter(s.key),
              className: `h-9 px-4 rounded-full text-[13px] font-medium whitespace-nowrap cursor-pointer ${
                statusFilter === s.key
                  ? 'bg-accent-500 text-on-accent font-semibold'
                  : 'bg-bg-surface border border-border-subtle text-text-secondary'
              }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 115}}

              , s.label
            )
          ))
        )

        /* List */
        , filtered.length === 0 ? (
          React.createElement(EmptyState, { icon: "cup", title: "Tidak ada reservasi yang cocok"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 132}} )
        ) : (
          React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 134}}
            , filtered.map((r) => {
              const st = STATUS_META[r.status];
              return (
                React.createElement('div', {
                  key: r.id,
                  className: "bg-bg-surface border border-border-subtle rounded-[16px] p-4 space-y-3 flex flex-col justify-between"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 138}}

                  , React.createElement('div', { className: "space-y-2.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 142}}
                    , React.createElement('div', { className: "flex items-center justify-between gap-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 143}}
                      , React.createElement('span', { className: "font-mono font-semibold text-[16px] text-accent-500"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 144}}
                        , r.code
                      )
                      , React.createElement(Badge, { tone: st.tone, __self: this, __source: {fileName: _jsxFileName, lineNumber: 147}}, st.label)
                    )

                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 150}}
                      , React.createElement('div', { className: "font-semibold text-[16px] text-text-primary"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 151}}
                        , r.customerName
                      )
                      , React.createElement('div', { className: "flex items-center gap-3 mt-1 text-[13px] text-text-secondary"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 154}}
                        , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 155}}, r.customerPhone)
                        , React.createElement('a', {
                          href: `tel:${r.customerPhone}`,
                          className: "inline-flex items-center gap-1 text-accent-200 hover:underline"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 156}}

                          , React.createElement(Phone, { className: "w-3.5 h-3.5" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 160}} ), " Telepon"
                        )
                        , React.createElement('a', {
                          href: `https://wa.me/${r.customerPhone.replace(/^0/, '62')}`,
                          target: "_blank",
                          rel: "noreferrer",
                          className: "inline-flex items-center gap-1 text-status-success hover:underline"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 162}}

                          , React.createElement(MessageCircle, { className: "w-3.5 h-3.5" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 168}} ), " WA"
                        )
                      )
                    )

                    , React.createElement('div', { className: "flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-text-secondary pt-1"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 173}}
                      , React.createElement('span', { className: "inline-flex items-center gap-1.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 174}}
                        , React.createElement(Calendar, { className: "w-4 h-4 text-brown-300"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 175}} )
                        , formatDateFull(r.date), " · "  , formatTimeDot(r.startTime), "–"
                        , formatTimeDot(r.endTime)
                      )
                      , React.createElement('span', { className: "inline-flex items-center gap-1.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 179}}
                        , React.createElement(Users, { className: "w-4 h-4 text-brown-300"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 180}} )
                        , r.guests, " tamu"
                      )
                    )

                    , r.notes && (
                      React.createElement('div', { className: "p-2.5 rounded-[10px] bg-bg-elevated/60 text-[13px] text-text-secondary"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 186}}, "Catatan: "
                         , r.notes
                      )
                    )
                  )

                  /* Status-appropriate actions only */
                  , r.status === 'pending' && (
                    React.createElement('div', { className: "flex gap-2.5 pt-2 border-t border-border-subtle/70"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 194}}
                      , React.createElement(Button, {
                        size: "sm",
                        variant: "destructive",
                        fullWidth: true,
                        disabled: !isOnline,
                        onClick: () =>
                          setPendingAction({
                            id: r.id,
                            code: r.code,
                            nextStatus: 'cancelled',
                            title: `Tolak reservasi ${r.code}?`,
                            desc: 'Status akan menjadi Dibatalkan dan kursi dilepas kembali.',
                            destructive: true,
                          })
                        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 195}}
, "Tolak"

                      )
                      , React.createElement(Button, {
                        size: "sm",
                        fullWidth: true,
                        disabled: !isOnline,
                        onClick: () =>
                          setPendingAction({
                            id: r.id,
                            code: r.code,
                            nextStatus: 'confirmed',
                            title: `Konfirmasi reservasi ${r.code}?`,
                            desc: `Konfirmasi meja untuk ${r.customerName} (${r.guests} tamu).`,
                          })
                        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 213}}
, "Konfirmasi"

                      )
                    )
                  )

                  , r.status === 'confirmed' && (
                    React.createElement('div', { className: "flex gap-2.5 pt-2 border-t border-border-subtle/70"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 233}}
                      , React.createElement(Button, {
                        size: "sm",
                        variant: "destructive",
                        fullWidth: true,
                        disabled: !isOnline,
                        onClick: () =>
                          setPendingAction({
                            id: r.id,
                            code: r.code,
                            nextStatus: 'cancelled',
                            title: `Batalkan reservasi ${r.code}?`,
                            desc: 'Reservasi yang sudah dikonfirmasi akan dibatalkan.',
                            destructive: true,
                          })
                        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 234}}
, "Batalkan"

                      )
                      , React.createElement(Button, {
                        size: "sm",
                        fullWidth: true,
                        disabled: !isOnline,
                        onClick: () =>
                          setPendingAction({
                            id: r.id,
                            code: r.code,
                            nextStatus: 'completed',
                            title: `Tandai selesai ${r.code}?`,
                            desc: 'Sesi kunjungan tamu telah selesai.',
                          })
                        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 252}}
, "Tandai Selesai"

                      )
                    )
                  )
                )
              );
            })
          )
        )
      )

      , React.createElement(ConfirmDialog, {
        open: Boolean(pendingAction),
        title: _optionalChain([pendingAction, 'optionalAccess', _ => _.title]) || '',
        description: _optionalChain([pendingAction, 'optionalAccess', _2 => _2.desc]) || '',
        destructive: _optionalChain([pendingAction, 'optionalAccess', _3 => _3.destructive]),
        onCancel: () => setPendingAction(null),
        onConfirm: () => {
          if (pendingAction) {
            updateReservationStatus(pendingAction.id, pendingAction.nextStatus);
          }
          setPendingAction(null);
        }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 277}}
      )
    )
  );
};

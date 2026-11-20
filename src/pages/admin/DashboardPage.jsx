const _jsxFileName = "src\\pages\\admin\\DashboardPage.tsx"; function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Check, X as XIcon, Users } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  formatDateFull,
  formatTimeDot,
  getTodayISO,
  minutesToColonTime,
  timeToMinutes,
} from '../../utils/format';
import { AdminLayout } from '../../components/AdminLayout';
import { Badge, Button, ConfirmDialog } from '../../components/ui';

export const DashboardPage = () => {
  const {
    currentUser,
    cafeInfo,
    reservations,
    menuItems,
    cats,
    reviews,
    isOnline,
    getSlotBookedGuests,
    updateReservationStatus,
  } = useApp();

  const [confirmAction, setConfirmAction] = useState



(null);

  const today = getTodayISO();
  const todayReservations = useMemo(
    () =>
      reservations
        .filter((r) => r.date === today)
        .sort((a, b) => a.startTime.localeCompare(b.startTime)),
    [reservations, today]
  );

  const todayActiveGuests = todayReservations
    .filter((r) => r.status === 'pending' || r.status === 'confirmed')
    .reduce((s, r) => s + r.guests, 0);

  const pendingResCount = reservations.filter((r) => r.status === 'pending').length;
  const availableMenuCount = menuItems.filter((m) => m.isAvailable).length;
  const activeCatsCount = cats.filter((c) => c.status === 'active').length;
  const pendingReviewCount = reviews.filter((r) => r.status === 'pending').length;

  const todayDayIdx = new Date().getDay();
  const todayHour = cafeInfo.operatingHours.find((h) => h.dayIndex === todayDayIdx);
  const hourlyBars = useMemo(() => {
    if (!todayHour || todayHour.isClosed) return [];
    const open = timeToMinutes(todayHour.openTime);
    const close = timeToMinutes(todayHour.closeTime);
    const bars = [];
    for (let m = open; m < close; m += 60) {
      const start = minutesToColonTime(m);
      const end = minutesToColonTime(m + 60);
      const booked = getSlotBookedGuests(today, start, end);
      const pct = Math.min(100, Math.round((booked / cafeInfo.maxCapacity) * 100));
      bars.push({ label: formatTimeDot(start), booked, pct });
    }
    return bars;
  }, [todayHour, today, cafeInfo.maxCapacity, getSlotBookedGuests]);

  return (
    React.createElement(AdminLayout, {
      title: "Dashboard",
      action: 
        React.createElement('div', { className: "hidden sm:flex items-center gap-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 73}}
          , React.createElement(Link, { to: "/admin/menu?new=1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 74}}
            , React.createElement(Button, { size: "sm", variant: "secondary", __self: this, __source: {fileName: _jsxFileName, lineNumber: 75}}
              , React.createElement(Plus, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 76}} ), "Tambah Menu"

            )
          )
          , React.createElement(Link, { to: "/admin/promo?new=1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 80}}
            , React.createElement(Button, { size: "sm", __self: this, __source: {fileName: _jsxFileName, lineNumber: 81}}
              , React.createElement(Plus, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 82}} ), "Tambah Promo"

            )
          )
        )
      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 70}}

      , React.createElement('div', { className: "space-y-6", __self: this, __source: {fileName: _jsxFileName, lineNumber: 89}}
        /* Greeting */
        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 91}}
          , React.createElement('p', { className: "text-[13px] text-text-secondary" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 92}}, formatDateFull(today))
          , React.createElement('h2', { className: "font-serif font-semibold text-[24px] text-text-primary"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 93}}, "Halo, "
             , _optionalChain([currentUser, 'optionalAccess', _ => _.name, 'access', _2 => _2.split, 'call', _3 => _3(' '), 'access', _4 => _4[0]])
          )
        )

        /* Summary Cards */
        , React.createElement('div', { className: "grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 99}}
          , React.createElement('div', { className: "bg-bg-surface border border-border-subtle rounded-[16px] p-4"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 100}}
            , React.createElement('div', { className: "text-[13px] text-text-secondary" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 101}}, "Reservasi hari ini"  )
            , React.createElement('div', { className: "text-[26px] font-semibold text-text-primary mt-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 102}}
              , todayReservations.length
            )
            , React.createElement('div', { className: "text-[12px] text-text-muted mt-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 105}}, todayActiveGuests, " tamu aktif"  )
          )

          , React.createElement(Link, {
            to: "/admin/reservasi?status=pending",
            className: "bg-bg-surface border border-border-subtle hover:border-accent-500 rounded-[16px] p-4 transition-colors"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 108}}

            , React.createElement('div', { className: "text-[13px] text-text-secondary" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 112}}, "Menunggu konfirmasi" )
            , React.createElement('div', { className: "text-[26px] font-semibold text-accent-500 mt-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 113}}, pendingResCount)
            , React.createElement('div', { className: "text-[12px] text-accent-200 mt-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 114}}, "Ketuk untuk proses"  )
          )

          , React.createElement('div', { className: "bg-bg-surface border border-border-subtle rounded-[16px] p-4"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 117}}
            , React.createElement('div', { className: "text-[13px] text-text-secondary" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 118}}, "Menu tersedia" )
            , React.createElement('div', { className: "text-[26px] font-semibold text-text-primary mt-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 119}}
              , availableMenuCount
              , React.createElement('span', { className: "text-[15px] text-text-muted font-normal"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 121}}, "/", menuItems.length)
            )
            , React.createElement('div', { className: "text-[12px] text-text-muted mt-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 123}}, "Aktif di katalog"  )
          )

          , React.createElement('div', { className: "bg-bg-surface border border-border-subtle rounded-[16px] p-4"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 126}}
            , React.createElement('div', { className: "text-[13px] text-text-secondary" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 127}}, "Kucing aktif" )
            , React.createElement('div', { className: "text-[26px] font-semibold text-status-success mt-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 128}}
              , activeCatsCount
            )
            , React.createElement('div', { className: "text-[12px] text-text-muted mt-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 131}}, "Siap bermain" )
          )

          , React.createElement(Link, {
            to: "/admin/ulasan",
            className: "col-span-2 lg:col-span-1 bg-bg-surface border border-border-subtle hover:border-brown-300 rounded-[16px] p-4 transition-colors"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 134}}

            , React.createElement('div', { className: "text-[13px] text-text-secondary" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 138}}, "Ulasan menunggu" )
            , React.createElement('div', { className: "text-[26px] font-semibold text-status-warning mt-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 139}}
              , pendingReviewCount
            )
            , React.createElement('div', { className: "text-[12px] text-text-muted mt-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 142}}, "Perlu moderasi" )
          )
        )

        /* Mobile Shortcuts */
        , React.createElement('div', { className: "flex sm:hidden gap-2.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 147}}
          , React.createElement(Link, { to: "/admin/menu?new=1", className: "flex-1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 148}}
            , React.createElement(Button, { variant: "secondary", size: "sm", fullWidth: true, __self: this, __source: {fileName: _jsxFileName, lineNumber: 149}}
              , React.createElement(Plus, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 150}} ), "Tambah Menu"

            )
          )
          , React.createElement(Link, { to: "/admin/promo?new=1", className: "flex-1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 154}}
            , React.createElement(Button, { size: "sm", fullWidth: true, __self: this, __source: {fileName: _jsxFileName, lineNumber: 155}}
              , React.createElement(Plus, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 156}} ), "Tambah Promo"

            )
          )
        )

        , React.createElement('div', { className: "grid grid-cols-1 lg:grid-cols-12 gap-6"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 162}}
          /* Today's Reservations */
          , React.createElement('section', { className: "lg:col-span-7 bg-bg-surface border border-border-subtle rounded-[16px] p-5 space-y-4"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 164}}
            , React.createElement('div', { className: "flex items-center justify-between"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 165}}
              , React.createElement('h3', { className: "font-sans font-semibold text-[18px] text-text-primary"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 166}}, "Reservasi hari ini"

              )
              , React.createElement(Link, {
                to: "/admin/reservasi",
                className: "text-[13px] font-semibold text-accent-500 hover:underline"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 169}}
, "Lihat semua"

              )
            )

            , todayReservations.length === 0 ? (
              React.createElement('p', { className: "text-[14px] text-text-secondary py-6 text-center"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 178}}, "Belum ada reservasi untuk hari ini."

              )
            ) : (
              React.createElement('div', { className: "space-y-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 182}}
                , todayReservations.map((r) => (
                  React.createElement('div', {
                    key: r.id,
                    className: "p-3.5 rounded-[12px] bg-bg-elevated/60 border border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 184}}

                    , React.createElement('div', { className: "space-y-1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 188}}
                      , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 189}}
                        , React.createElement('span', { className: "font-mono text-[13px] font-semibold text-accent-500"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 190}}
                          , r.code
                        )
                        , React.createElement(Badge, {
                          tone: 
                            r.status === 'confirmed'
                              ? 'success'
                              : r.status === 'pending'
                              ? 'warning'
                              : r.status === 'cancelled'
                              ? 'danger'
                              : 'neutral'
                          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 193}}

                          , r.status === 'pending'
                            ? 'Menunggu'
                            : r.status === 'confirmed'
                            ? 'Dikonfirmasi'
                            : r.status === 'completed'
                            ? 'Selesai'
                            : 'Dibatalkan'
                        )
                      )
                      , React.createElement('div', { className: "text-[14px] font-medium text-text-primary"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 213}}
                        , r.customerName, " ·" , ' '
                        , React.createElement('span', { className: "text-text-secondary font-normal" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 215}}
                          , formatTimeDot(r.startTime), "–", formatTimeDot(r.endTime)
                        )
                      )
                      , React.createElement('div', { className: "text-[12px] text-text-secondary inline-flex items-center gap-1"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 219}}
                        , React.createElement(Users, { className: "w-3.5 h-3.5" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 220}} ), " " , r.guests, " tamu"
                      )
                    )

                    , r.status === 'pending' && (
                      React.createElement('div', { className: "flex items-center gap-2 shrink-0"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 225}}
                        , React.createElement(Button, {
                          size: "sm",
                          variant: "destructive",
                          disabled: !isOnline,
                          onClick: () =>
                            setConfirmAction({ id: r.id, status: 'cancelled', code: r.code })
                          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 226}}

                          , React.createElement(XIcon, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 234}} ), "Tolak"

                        )
                        , React.createElement(Button, {
                          size: "sm",
                          disabled: !isOnline,
                          onClick: () =>
                            setConfirmAction({ id: r.id, status: 'confirmed', code: r.code })
                          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 237}}

                          , React.createElement(Check, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 244}} ), "Konfirmasi"

                        )
                      )
                    )
                  )
                ))
              )
            )
          )

          /* Capacity Today */
          , React.createElement('section', { className: "lg:col-span-5 bg-bg-surface border border-border-subtle rounded-[16px] p-5 space-y-4"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 256}}
            , React.createElement('div', { className: "flex items-center justify-between"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 257}}
              , React.createElement('h3', { className: "font-sans font-semibold text-[18px] text-text-primary"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 258}}, "Kapasitas hari ini"

              )
              , React.createElement('span', { className: "text-[12px] text-text-secondary" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 261}}, "Maks "
                 , cafeInfo.maxCapacity, " kursi"
              )
            )

            , hourlyBars.length === 0 ? (
              React.createElement('p', { className: "text-[14px] text-text-secondary py-6 text-center"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 267}}, "Kafe tutup hari ini."

              )
            ) : (
              React.createElement('div', { className: "space-y-2.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 271}}
                , hourlyBars.map((b) => (
                  React.createElement('div', { key: b.label, className: "flex items-center gap-3 text-[13px]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 273}}
                    , React.createElement('span', { className: "w-12 text-text-secondary font-mono"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 274}}, b.label)
                    , React.createElement('div', { className: "flex-1 h-2.5 rounded-full bg-bg-elevated overflow-hidden"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 275}}
                      , React.createElement('div', {
                        className: `h-full rounded-full transition-all ${
                          b.pct >= 90
                            ? 'bg-status-danger'
                            : b.pct >= 70
                            ? 'bg-status-warning'
                            : 'bg-accent-500'
                        }`,
                        style: { width: `${b.pct}%` }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 276}}
                      )
                    )
                    , React.createElement('span', { className: "w-14 text-right text-text-secondary"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 287}}
                      , b.booked, "/", cafeInfo.maxCapacity
                    )
                  )
                ))
              )
            )
          )
        )
      )

      , React.createElement(ConfirmDialog, {
        open: Boolean(confirmAction),
        title: 
          _optionalChain([confirmAction, 'optionalAccess', _5 => _5.status]) === 'confirmed'
            ? `Konfirmasi ${_optionalChain([confirmAction, 'optionalAccess', _6 => _6.code])}?`
            : `Tolak ${_optionalChain([confirmAction, 'optionalAccess', _7 => _7.code])}?`
        ,
        description: 
          _optionalChain([confirmAction, 'optionalAccess', _8 => _8.status]) === 'confirmed'
            ? 'Status reservasi akan berubah menjadi Dikonfirmasi.'
            : 'Reservasi akan dibatalkan dan kursi dilepas kembali.'
        ,
        confirmLabel: _optionalChain([confirmAction, 'optionalAccess', _9 => _9.status]) === 'confirmed' ? 'Konfirmasi' : 'Tolak',
        destructive: _optionalChain([confirmAction, 'optionalAccess', _10 => _10.status]) === 'cancelled',
        onCancel: () => setConfirmAction(null),
        onConfirm: () => {
          if (confirmAction) {
            updateReservationStatus(confirmAction.id, confirmAction.status);
          }
          setConfirmAction(null);
        }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 298}}
      )
    )
  );
};

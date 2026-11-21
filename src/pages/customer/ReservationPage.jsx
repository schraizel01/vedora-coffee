const _jsxFileName = "src\\pages\\customer\\ReservationPage.tsx";
function _optionalChain(ops) {
  let lastAccessLHS = undefined;
  let value = ops[0];
  let i = 1;
  while (i < ops.length) {
    const op = ops[i];
    const fn = ops[i + 1];
    i += 2;
    if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) {
      return undefined;
    }
    if (op === 'access' || op === 'optionalAccess') {
      lastAccessLHS = value;
      value = fn(value);
    } else if (op === 'call' || op === 'optionalCall') {
      value = fn((...args) => value.call(lastAccessLHS, ...args));
      lastAccessLHS = undefined;
    }
  }
  return value;
}
import React, { useMemo, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { CheckCircle2, Copy, Minus, Plus, WifiOff } from 'lucide-react';
import { useApp } from '../../context/AppContext';

import {
  addDaysISO,
  formatDateFull,
  formatTimeDot,
  getDayParts,
  getTodayISO,
  minutesToColonTime,
  timeToMinutes,
} from '../../utils/format';
import { CustomerLayout } from '../../components/CustomerLayout';
import { Badge, Button, EmptyState } from '../../components/ui';

export const ReservationPage = () => {
  const { currentUser, cafeInfo, isOnline, getSlotBookedGuests, createReservation, showToast } =
    useApp();
  const location = useLocation();

  const todayISO = getTodayISO();
  const dateOptions = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => {
      const iso = addDaysISO(todayISO, i);
      const parts = getDayParts(iso);
      const hour = cafeInfo.operatingHours.find((h) => h.dayIndex === parts.dayIndex);
      return {
        iso,
        ...parts,
        isClosed: !hour || hour.isClosed,
        hour,
      };
    });
  }, [todayISO, cafeInfo.operatingHours]);

  const firstOpenDate =
    _optionalChain([
      dateOptions,
      'access',
      (_2) => _2.find,
      'call',
      (_3) => _3((d) => !d.isClosed),
      'optionalAccess',
      (_4) => _4.iso,
    ]) || '';

  const [selectedDate, setSelectedDate] = useState(firstOpenDate);
  const [guests, setGuests] = useState(2);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [customerName, setCustomerName] = useState(
    _optionalChain([currentUser, 'optionalAccess', (_5) => _5.name]) || ''
  );
  const [customerPhone, setCustomerPhone] = useState(
    _optionalChain([currentUser, 'optionalAccess', (_6) => _6.phone]) || ''
  );
  const [notes, setNotes] = useState('');
  const [slotError, setSlotError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successRes, setSuccessRes] = useState(null);

  if (!currentUser) {
    return React.createElement(Navigate, {
      to: '/masuk',
      replace: true,
      state: { from: location.pathname, contextMessage: 'Masuk untuk membuat reservasi' },
      __self: this,
      __source: { fileName: _jsxFileName, lineNumber: 51 },
    });
  }

  const activeDateObj = dateOptions.find((d) => d.iso === selectedDate);
  const allClosed = dateOptions.every((d) => d.isClosed);
  const durationMinutes =
    Number(
      cafeInfo.tableDurationMinutes ||
        cafeInfo.bookingDurationMinutes ||
        cafeInfo.durationMinutes
    ) || 120;

  const timeSlots = useMemo(() => {
    if (!activeDateObj || activeDateObj.isClosed || !activeDateObj.hour) return [];
    const openMins = timeToMinutes(activeDateObj.hour.openTime);
    const closeMins = timeToMinutes(activeDateObj.hour.closeTime);
    const step = Number(cafeInfo.slotDurationMinutes || cafeInfo.slotMinutes) || 60;
    const duration = durationMinutes;

    const now = new Date();
    const isToday = activeDateObj.iso === todayISO;
    const nowMins = now.getHours() * 60 + now.getMinutes();

    const slots = [];

    for (let m = openMins; m + duration <= closeMins; m += step) {
      if (isToday && m <= nowMins) continue;
      const start = minutesToColonTime(m);
      const end = minutesToColonTime(m + duration);
      const booked = getSlotBookedGuests(activeDateObj.iso, start, end);
      const remaining = Math.max(0, cafeInfo.maxCapacity - booked);

      let status = 'available';
      if (remaining === 0) status = 'full';
      else if (remaining < guests) status = 'insufficient';
      else if (remaining <= Math.ceil(cafeInfo.maxCapacity * 0.2)) status = 'almost';

      slots.push({ start, end, remaining, status });
    }
    return slots;
  }, [activeDateObj, cafeInfo, durationMinutes, guests, todayISO, getSlotBookedGuests]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    if (!selectedDate || !selectedSlot) {
      setSlotError('Silakan pilih tanggal dan jam reservasi terlebih dahulu.');
      return;
    }

    setSlotError('');
    setSubmitting(true);
    try {
      const res = await createReservation({
        date: selectedDate,
        startTime: selectedSlot.start,
        endTime: selectedSlot.end,
        guests,
        customerName,
        customerPhone,
        notes,
      });

      if (!res?.ok) {
        setSlotError(res?.error || 'Gagal mengirim reservasi');
        return;
      }

      setSuccessRes(res.reservation);
      showToast('Reservasi berhasil dikirim!', 'success');
    } finally {
      setSubmitting(false);
    }
  };

  if (successRes) {
    return React.createElement(
      CustomerLayout,
      { __self: this, __source: { fileName: _jsxFileName, lineNumber: 122 } },
      React.createElement(
        'div',
        {
          className: 'max-w-lg mx-auto px-4 sm:px-6 py-10',
          __self: this,
          __source: { fileName: _jsxFileName, lineNumber: 123 },
        },
        React.createElement(
          'div',
          {
            className:
              'bg-bg-surface border border-border-subtle rounded-[16px] p-6 sm:p-8 text-center space-y-6',
            __self: this,
            __source: { fileName: _jsxFileName, lineNumber: 124 },
          },
          React.createElement(
            'div',
            {
              className:
                'w-16 h-16 rounded-full bg-status-success/16 text-status-success flex items-center justify-center mx-auto',
              __self: this,
              __source: { fileName: _jsxFileName, lineNumber: 125 },
            },
            React.createElement(CheckCircle2, {
              className: 'w-9 h-9',
              strokeWidth: 1.75,
              __self: this,
              __source: { fileName: _jsxFileName, lineNumber: 126 },
            })
          ),
          React.createElement(
            'div',
            {
              className: 'space-y-2',
              __self: this,
              __source: { fileName: _jsxFileName, lineNumber: 128 },
            },
            React.createElement(
              Badge,
              { tone: 'warning', __self: this, __source: { fileName: _jsxFileName, lineNumber: 129 } },
              'Menunggu konfirmasi'
            ),
            React.createElement(
              'h1',
              {
                className:
                  'font-serif font-semibold text-[28px] leading-[36px] text-text-primary pt-1',
                __self: this,
                __source: { fileName: _jsxFileName, lineNumber: 130 },
              },
              'Reservasi Terkirim'
            ),
            React.createElement(
              'p',
              {
                className: 'text-[14px] text-text-secondary',
                __self: this,
                __source: { fileName: _jsxFileName, lineNumber: 133 },
              },
              'Admin akan mengonfirmasi reservasimu. Cek statusnya di Akun Saya.'
            )
          ),

          React.createElement(
            'div',
            {
              className: 'p-4 rounded-[12px] bg-bg-elevated border border-border-subtle',
              __self: this,
              __source: { fileName: _jsxFileName, lineNumber: 138 },
            },
            React.createElement(
              'div',
              {
                className: 'text-[12px] uppercase tracking-wider text-text-muted mb-1',
                __self: this,
                __source: { fileName: _jsxFileName, lineNumber: 139 },
              },
              'Kode Booking'
            ),
            React.createElement(
              'div',
              {
                className: 'flex items-center justify-center gap-2.5',
                __self: this,
                __source: { fileName: _jsxFileName, lineNumber: 142 },
              },
              React.createElement(
                'span',
                {
                  className: 'font-mono font-semibold text-[26px] tracking-wider text-accent-500',
                  __self: this,
                  __source: { fileName: _jsxFileName, lineNumber: 143 },
                },
                successRes.code
              ),
              React.createElement(
                'button',
                {
                  type: 'button',
                  onClick: () => {
                    _optionalChain([
                      navigator,
                      'access',
                      (_7) => _7.clipboard,
                      'optionalAccess',
                      (_8) => _8.writeText,
                      'call',
                      (_9) => _9(successRes.code),
                    ]);
                    showToast('Kode booking disalin', 'success');
                  },
                  className:
                    'w-9 h-9 rounded-[10px] bg-bg-surface border border-border-subtle flex items-center justify-center text-text-secondary hover:text-text-primary cursor-pointer',
                  'aria-label': 'Salin kode booking',
                  __self: this,
                  __source: { fileName: _jsxFileName, lineNumber: 146 },
                },
                React.createElement(Copy, {
                  className: 'w-4 h-4',
                  __self: this,
                  __source: { fileName: _jsxFileName, lineNumber: 155 },
                })
              )
            )
          ),

          React.createElement(
            'div',
            {
              className: 'text-left bg-bg-elevated/60 rounded-[12px] p-4 space-y-2 text-[14px]',
              __self: this,
              __source: { fileName: _jsxFileName, lineNumber: 160 },
            },
            React.createElement(
              'div',
              {
                className: 'flex justify-between',
                __self: this,
                __source: { fileName: _jsxFileName, lineNumber: 161 },
              },
              React.createElement(
                'span',
                {
                  className: 'text-text-secondary',
                  __self: this,
                  __source: { fileName: _jsxFileName, lineNumber: 162 },
                },
                'Tanggal'
              ),
              React.createElement(
                'span',
                {
                  className: 'font-medium text-text-primary',
                  __self: this,
                  __source: { fileName: _jsxFileName, lineNumber: 163 },
                },
                formatDateFull(successRes.date)
              )
            ),
            React.createElement(
              'div',
              {
                className: 'flex justify-between',
                __self: this,
                __source: { fileName: _jsxFileName, lineNumber: 167 },
              },
              React.createElement(
                'span',
                {
                  className: 'text-text-secondary',
                  __self: this,
                  __source: { fileName: _jsxFileName, lineNumber: 168 },
                },
                'Jam'
              ),
              React.createElement(
                'span',
                {
                  className: 'font-medium text-text-primary',
                  __self: this,
                  __source: { fileName: _jsxFileName, lineNumber: 169 },
                },
                formatTimeDot(successRes.startTime),
                '–',
                formatTimeDot(successRes.endTime)
              )
            ),
            React.createElement(
              'div',
              {
                className: 'flex justify-between',
                __self: this,
                __source: { fileName: _jsxFileName, lineNumber: 173 },
              },
              React.createElement(
                'span',
                {
                  className: 'text-text-secondary',
                  __self: this,
                  __source: { fileName: _jsxFileName, lineNumber: 174 },
                },
                'Jumlah tamu'
              ),
              React.createElement(
                'span',
                {
                  className: 'font-medium text-text-primary',
                  __self: this,
                  __source: { fileName: _jsxFileName, lineNumber: 175 },
                },
                successRes.guests,
                ' orang'
              )
            )
          ),

          React.createElement(
            'div',
            {
              className: 'flex flex-col gap-3',
              __self: this,
              __source: { fileName: _jsxFileName, lineNumber: 179 },
            },
            React.createElement(
              Link,
              { to: '/akun', __self: this, __source: { fileName: _jsxFileName, lineNumber: 180 } },
              React.createElement(
                Button,
                {
                  fullWidth: true,
                  __self: this,
                  __source: { fileName: _jsxFileName, lineNumber: 181 },
                },
                'Lihat di Akun Saya'
              )
            ),
            React.createElement(
              Link,
              { to: '/', __self: this, __source: { fileName: _jsxFileName, lineNumber: 183 } },
              React.createElement(
                Button,
                {
                  variant: 'secondary',
                  fullWidth: true,
                  __self: this,
                  __source: { fileName: _jsxFileName, lineNumber: 184 },
                },
                'Kembali ke Beranda'
              )
            )
          )
        )
      )
    );
  }

  const canSubmit =
    isOnline &&
    !submitting &&
    Boolean(selectedDate) &&
    Boolean(selectedSlot) &&
    guests >= 1 &&
    customerName.trim().length > 0 &&
    customerPhone.trim().length >= 9;

  return React.createElement(
    CustomerLayout,
    { __self: this, __source: { fileName: _jsxFileName, lineNumber: 204 } },
    React.createElement(
      'div',
      {
        className: 'max-w-2xl mx-auto px-4 sm:px-6 pt-5 pb-40 lg:pb-12',
        __self: this,
        __source: { fileName: _jsxFileName, lineNumber: 205 },
      },
      React.createElement(
        'div',
        {
          className: 'space-y-1.5 mb-6',
          __self: this,
          __source: { fileName: _jsxFileName, lineNumber: 206 },
        },
        React.createElement(
          'h1',
          {
            className: 'font-serif font-semibold text-[33px] leading-[40px] text-text-primary',
            __self: this,
            __source: { fileName: _jsxFileName, lineNumber: 207 },
          },
          'Reservasi Meja'
        ),
        React.createElement(
          'p',
          {
            className: 'text-[14px] text-text-secondary',
            __self: this,
            __source: { fileName: _jsxFileName, lineNumber: 210 },
          },
          'Durasi meja tetap ',
          Math.round(durationMinutes / 60),
          ' jam per sesi agar suasana kafe tetap nyaman.'
        )
      ),

      !isOnline &&
        React.createElement(
          'div',
          {
            className:
              'mb-6 p-4 rounded-[12px] bg-status-warning/16 border border-status-warning/30 text-status-warning text-[14px] flex items-center gap-3',
            __self: this,
            __source: { fileName: _jsxFileName, lineNumber: 217 },
          },
          React.createElement(WifiOff, {
            className: 'w-5 h-5 shrink-0',
            __self: this,
            __source: { fileName: _jsxFileName, lineNumber: 218 },
          }),
          React.createElement(
            'span',
            { __self: this, __source: { fileName: _jsxFileName, lineNumber: 219 } },
            'Kamu sedang offline. Reservasi butuh koneksi internet.'
          )
        ),

      allClosed
        ? React.createElement(EmptyState, {
            icon: 'cup',
            title: 'Kafe tutup pada rentang tanggal ini',
            description: 'Silakan cek jam operasional di halaman Tentang Vedora.',
            __self: this,
            __source: { fileName: _jsxFileName, lineNumber: 224 },
          })
        : React.createElement(
            'form',
            {
              onSubmit: handleSubmit,
              className: `space-y-7 ${!isOnline ? 'opacity-50 pointer-events-none' : ''}`,
              __self: this,
              __source: { fileName: _jsxFileName, lineNumber: 230 },
            },
            /* Step 1: Pilih Tanggal */
            React.createElement(
              'section',
              {
                className: 'space-y-3',
                __self: this,
                __source: { fileName: _jsxFileName, lineNumber: 232 },
              },
              React.createElement(
                'h2',
                {
                  className: 'font-sans font-semibold text-[16px] text-text-primary',
                  __self: this,
                  __source: { fileName: _jsxFileName, lineNumber: 233 },
                },
                '1. Pilih tanggal'
              ),
              React.createElement(
                'div',
                {
                  className:
                    'flex gap-2.5 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 sm:mx-0 sm:px-0',
                  __self: this,
                  __source: { fileName: _jsxFileName, lineNumber: 236 },
                },
                dateOptions.map((d) => {
                  const selected = d.iso === selectedDate;
                  return React.createElement(
                    'button',
                    {
                      key: d.iso,
                      type: 'button',
                      disabled: d.isClosed,
                      onClick: () => {
                        setSelectedDate(d.iso);
                        setSelectedSlot(null);
                      },
                      className: `w-[68px] py-2.5 rounded-[12px] border flex flex-col items-center shrink-0 transition-colors cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed ${
                        selected
                          ? 'bg-accent-500 border-accent-500 text-on-accent'
                          : 'bg-bg-surface border-border-subtle text-text-primary hover:border-brown-300'
                      }`,
                      __self: this,
                      __source: { fileName: _jsxFileName, lineNumber: 240 },
                    },
                    React.createElement(
                      'span',
                      {
                        className: `text-[12px] ${
                          selected ? 'text-on-accent/80 font-medium' : 'text-text-secondary'
                        }`,
                        __self: this,
                        __source: { fileName: _jsxFileName, lineNumber: 254 },
                      },
                      d.dayShort
                    ),
                    React.createElement(
                      'span',
                      {
                        className: 'text-[18px] font-semibold leading-tight my-0.5',
                        __self: this,
                        __source: { fileName: _jsxFileName, lineNumber: 261 },
                      },
                      d.dayNumber
                    ),
                    React.createElement(
                      'span',
                      {
                        className: `text-[11px] ${
                          selected ? 'text-on-accent/80' : 'text-text-muted'
                        }`,
                        __self: this,
                        __source: { fileName: _jsxFileName, lineNumber: 264 },
                      },
                      d.isClosed ? 'Tutup' : d.monthShort
                    )
                  );
                })
              )
            ),

            /* Step 2: Jumlah Tamu */
            React.createElement(
              'section',
              {
                className: 'space-y-3',
                __self: this,
                __source: { fileName: _jsxFileName, lineNumber: 278 },
              },
              React.createElement(
                'h2',
                {
                  className: 'font-sans font-semibold text-[16px] text-text-primary',
                  __self: this,
                  __source: { fileName: _jsxFileName, lineNumber: 279 },
                },
                '2. Jumlah tamu'
              ),
              React.createElement(
                'div',
                {
                  className:
                    'flex items-center justify-between bg-bg-surface border border-border-subtle rounded-[12px] p-3',
                  __self: this,
                  __source: { fileName: _jsxFileName, lineNumber: 282 },
                },
                React.createElement(
                  'span',
                  {
                    className: 'text-[14px] text-text-secondary pl-1',
                    __self: this,
                    __source: { fileName: _jsxFileName, lineNumber: 283 },
                  },
                  'Maksimal ',
                  cafeInfo.maxCapacity,
                  ' kursi per sesi'
                ),
                React.createElement(
                  'div',
                  {
                    className: 'flex items-center gap-3',
                    __self: this,
                    __source: { fileName: _jsxFileName, lineNumber: 286 },
                  },
                  React.createElement(
                    'button',
                    {
                      type: 'button',
                      onClick: () => {
                        setGuests((g) => Math.max(1, g - 1));
                        setSelectedSlot(null);
                      },
                      disabled: guests <= 1,
                      'aria-label': 'Kurangi tamu',
                      className:
                        'w-11 h-11 rounded-[10px] bg-bg-elevated border border-border-subtle flex items-center justify-center text-text-primary disabled:opacity-40 cursor-pointer',
                      __self: this,
                      __source: { fileName: _jsxFileName, lineNumber: 287 },
                    },
                    React.createElement(Minus, {
                      className: 'w-4 h-4',
                      __self: this,
                      __source: { fileName: _jsxFileName, lineNumber: 297 },
                    })
                  ),
                  React.createElement(
                    'span',
                    {
                      className: 'w-8 text-center font-semibold text-[18px] text-text-primary',
                      __self: this,
                      __source: { fileName: _jsxFileName, lineNumber: 299 },
                    },
                    guests
                  ),
                  React.createElement(
                    'button',
                    {
                      type: 'button',
                      onClick: () => {
                        setGuests((g) => Math.min(cafeInfo.maxCapacity, g + 1));
                        setSelectedSlot(null);
                      },
                      disabled: guests >= cafeInfo.maxCapacity,
                      'aria-label': 'Tambah tamu',
                      className:
                        'w-11 h-11 rounded-[10px] bg-bg-elevated border border-border-subtle flex items-center justify-center text-text-primary disabled:opacity-40 cursor-pointer',
                      __self: this,
                      __source: { fileName: _jsxFileName, lineNumber: 302 },
                    },
                    React.createElement(Plus, {
                      className: 'w-4 h-4',
                      __self: this,
                      __source: { fileName: _jsxFileName, lineNumber: 312 },
                    })
                  )
                )
              )
            ),

            /* Step 3: Pilih Jam */
            React.createElement(
              'section',
              {
                className: 'space-y-3',
                __self: this,
                __source: { fileName: _jsxFileName, lineNumber: 319 },
              },
              React.createElement(
                'h2',
                {
                  className: 'font-sans font-semibold text-[16px] text-text-primary',
                  __self: this,
                  __source: { fileName: _jsxFileName, lineNumber: 320 },
                },
                '3. Pilih jam'
              ),
              slotError &&
                React.createElement(
                  'div',
                  {
                    className: 'p-3 rounded-[12px] bg-status-danger/16 text-status-danger text-[13px]',
                    __self: this,
                    __source: { fileName: _jsxFileName, lineNumber: 322 },
                  },
                  slotError
                ),
              timeSlots.length === 0
                ? React.createElement(
                    'div',
                    {
                      className:
                        'p-4 rounded-[12px] bg-bg-surface border border-border-subtle text-[14px] text-text-secondary',
                      __self: this,
                      __source: { fileName: _jsxFileName, lineNumber: 327 },
                    },
                    'Tidak ada slot jam tersisa untuk tanggal ini. Pilih tanggal lain.'
                  )
                : React.createElement(
                    'div',
                    {
                      className: 'grid grid-cols-2 sm:grid-cols-3 gap-2.5',
                      __self: this,
                      __source: { fileName: _jsxFileName, lineNumber: 331 },
                    },
                    timeSlots.map((slot) => {
                      const isSelected =
                        _optionalChain([selectedSlot, 'optionalAccess', (_10) => _10.start]) ===
                          slot.start &&
                        _optionalChain([selectedSlot, 'optionalAccess', (_11) => _11.end]) ===
                          slot.end;
                      const disabled = slot.status === 'full' || slot.status === 'insufficient';
                      return React.createElement(
                        'button',
                        {
                          key: slot.start,
                          type: 'button',
                          disabled: disabled,
                          onClick: () => setSelectedSlot({ start: slot.start, end: slot.end }),
                          className: `p-3 rounded-[12px] border text-left transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                            isSelected
                              ? 'bg-accent-500 border-accent-500 text-on-accent'
                              : 'bg-bg-surface border-border-subtle text-text-primary hover:border-brown-300'
                          }`,
                          __self: this,
                          __source: { fileName: _jsxFileName, lineNumber: 337 },
                        },
                        React.createElement(
                          'div',
                          {
                            className: 'font-semibold text-[14px]',
                            __self: this,
                            __source: { fileName: _jsxFileName, lineNumber: 348 },
                          },
                          formatTimeDot(slot.start),
                          '–',
                          formatTimeDot(slot.end)
                        ),
                        React.createElement(
                          'div',
                          {
                            className: `text-[12px] mt-0.5 ${
                              isSelected
                                ? 'text-on-accent/85 font-medium'
                                : slot.status === 'almost'
                                ? 'text-status-warning font-medium'
                                : 'text-text-secondary'
                            }`,
                            __self: this,
                            __source: { fileName: _jsxFileName, lineNumber: 351 },
                          },
                          slot.status === 'full'
                            ? 'Penuh'
                            : slot.status === 'insufficient'
                            ? `Sisa ${slot.remaining} kursi`
                            : `Sisa ${slot.remaining} kursi`
                        )
                      );
                    })
                  )
            ),

            /* Step 4: Data Kontak */
            React.createElement(
              'section',
              {
                className: 'space-y-3',
                __self: this,
                __source: { fileName: _jsxFileName, lineNumber: 374 },
              },
              React.createElement(
                'h2',
                {
                  className: 'font-sans font-semibold text-[16px] text-text-primary',
                  __self: this,
                  __source: { fileName: _jsxFileName, lineNumber: 375 },
                },
                '4. Data kontak'
              ),
              React.createElement(
                'div',
                {
                  className: 'space-y-3',
                  __self: this,
                  __source: { fileName: _jsxFileName, lineNumber: 378 },
                },
                React.createElement(
                  'div',
                  { __self: this, __source: { fileName: _jsxFileName, lineNumber: 379 } },
                  React.createElement(
                    'label',
                    {
                      className: 'block text-[13px] text-text-secondary mb-1.5',
                      __self: this,
                      __source: { fileName: _jsxFileName, lineNumber: 380 },
                    },
                    'Nama lengkap'
                  ),
                  React.createElement('input', {
                    type: 'text',
                    required: true,
                    value: customerName,
                    onChange: (e) => setCustomerName(e.target.value),
                    className:
                      'w-full h-12 px-4 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary focus:outline-none focus:border-accent-500',
                    __self: this,
                    __source: { fileName: _jsxFileName, lineNumber: 383 },
                  })
                ),
                React.createElement(
                  'div',
                  { __self: this, __source: { fileName: _jsxFileName, lineNumber: 391 } },
                  React.createElement(
                    'label',
                    {
                      className: 'block text-[13px] text-text-secondary mb-1.5',
                      __self: this,
                      __source: { fileName: _jsxFileName, lineNumber: 392 },
                    },
                    'Nomor HP'
                  ),
                  React.createElement('input', {
                    type: 'tel',
                    required: true,
                    value: customerPhone,
                    onChange: (e) => setCustomerPhone(e.target.value),
                    className:
                      'w-full h-12 px-4 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary focus:outline-none focus:border-accent-500',
                    __self: this,
                    __source: { fileName: _jsxFileName, lineNumber: 393 },
                  })
                ),
                React.createElement(
                  'div',
                  { __self: this, __source: { fileName: _jsxFileName, lineNumber: 401 } },
                  React.createElement(
                    'div',
                    {
                      className: 'flex justify-between text-[13px] text-text-secondary mb-1.5',
                      __self: this,
                      __source: { fileName: _jsxFileName, lineNumber: 402 },
                    },
                    React.createElement(
                      'label',
                      { __self: this, __source: { fileName: _jsxFileName, lineNumber: 403 } },
                      'Catatan (opsional)'
                    ),
                    React.createElement(
                      'span',
                      {
                        className: 'text-text-muted',
                        __self: this,
                        __source: { fileName: _jsxFileName, lineNumber: 404 },
                      },
                      notes.length,
                      '/200'
                    )
                  ),
                  React.createElement('textarea', {
                    rows: 2,
                    maxLength: 200,
                    value: notes,
                    onChange: (e) => setNotes(e.target.value),
                    placeholder: 'Mis. ulang tahun, kursi dekat jendela',
                    className:
                      'w-full p-3.5 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-500',
                    __self: this,
                    __source: { fileName: _jsxFileName, lineNumber: 406 },
                  })
                )
              )
            ),

            /* Step 5: Ringkasan */
            React.createElement(
              'section',
              {
                className: 'space-y-3',
                __self: this,
                __source: { fileName: _jsxFileName, lineNumber: 419 },
              },
              React.createElement(
                'h2',
                {
                  className: 'font-sans font-semibold text-[16px] text-text-primary',
                  __self: this,
                  __source: { fileName: _jsxFileName, lineNumber: 420 },
                },
                '5. Ringkasan'
              ),
              React.createElement(
                'div',
                {
                  className:
                    'bg-bg-surface border border-border-subtle rounded-[16px] p-4 space-y-2 text-[14px]',
                  __self: this,
                  __source: { fileName: _jsxFileName, lineNumber: 421 },
                },
                React.createElement(
                  'div',
                  {
                    className: 'flex justify-between',
                    __self: this,
                    __source: { fileName: _jsxFileName, lineNumber: 422 },
                  },
                  React.createElement(
                    'span',
                    {
                      className: 'text-text-secondary',
                      __self: this,
                      __source: { fileName: _jsxFileName, lineNumber: 423 },
                    },
                    'Tanggal'
                  ),
                  React.createElement(
                    'span',
                    {
                      className: 'font-medium text-text-primary',
                      __self: this,
                      __source: { fileName: _jsxFileName, lineNumber: 424 },
                    },
                    selectedDate ? formatDateFull(selectedDate) : '-'
                  )
                ),
                React.createElement(
                  'div',
                  {
                    className: 'flex justify-between',
                    __self: this,
                    __source: { fileName: _jsxFileName, lineNumber: 428 },
                  },
                  React.createElement(
                    'span',
                    {
                      className: 'text-text-secondary',
                      __self: this,
                      __source: { fileName: _jsxFileName, lineNumber: 429 },
                    },
                    'Jam'
                  ),
                  React.createElement(
                    'span',
                    {
                      className: 'font-medium text-text-primary',
                      __self: this,
                      __source: { fileName: _jsxFileName, lineNumber: 430 },
                    },
                    selectedSlot
                      ? `${formatTimeDot(selectedSlot.start)}–${formatTimeDot(selectedSlot.end)}`
                      : 'Belum dipilih'
                  )
                ),
                React.createElement(
                  'div',
                  {
                    className: 'flex justify-between',
                    __self: this,
                    __source: { fileName: _jsxFileName, lineNumber: 436 },
                  },
                  React.createElement(
                    'span',
                    {
                      className: 'text-text-secondary',
                      __self: this,
                      __source: { fileName: _jsxFileName, lineNumber: 437 },
                    },
                    'Durasi meja'
                  ),
                  React.createElement(
                    'span',
                    {
                      className: 'font-medium text-text-primary',
                      __self: this,
                      __source: { fileName: _jsxFileName, lineNumber: 438 },
                    },
                    Math.round(durationMinutes / 60),
                    ' jam'
                  )
                ),
                React.createElement(
                  'div',
                  {
                    className: 'flex justify-between',
                    __self: this,
                    __source: { fileName: _jsxFileName, lineNumber: 442 },
                  },
                  React.createElement(
                    'span',
                    {
                      className: 'text-text-secondary',
                      __self: this,
                      __source: { fileName: _jsxFileName, lineNumber: 443 },
                    },
                    'Jumlah tamu'
                  ),
                  React.createElement(
                    'span',
                    {
                      className: 'font-medium text-text-primary',
                      __self: this,
                      __source: { fileName: _jsxFileName, lineNumber: 444 },
                    },
                    guests,
                    ' orang'
                  )
                )
              )
            ),

            /* Desktop Submit */
            React.createElement(
              'div',
              {
                className: 'hidden lg:block',
                __self: this,
                __source: { fileName: _jsxFileName, lineNumber: 450 },
              },
              React.createElement(
                Button,
                {
                  type: 'submit',
                  fullWidth: true,
                  disabled: !canSubmit,
                  __self: this,
                  __source: { fileName: _jsxFileName, lineNumber: 451 },
                },
                submitting ? 'Mengirim...' : 'Kirim Reservasi'
              )
            ),

            /* Mobile Sticky Submit (ditempatkan tepat di atas Bottom Navigation Bar) */
            React.createElement(
              'div',
              {
                className:
                  'lg:hidden fixed bottom-[64px] left-0 right-0 z-40 bg-bg-surface/95 backdrop-blur-md border-t border-border-subtle px-4 py-3',
                __self: this,
                __source: { fileName: _jsxFileName, lineNumber: 457 },
              },
              React.createElement(
                Button,
                {
                  type: 'submit',
                  fullWidth: true,
                  disabled: !canSubmit,
                  __self: this,
                  __source: { fileName: _jsxFileName, lineNumber: 458 },
                },
                submitting ? 'Mengirim...' : 'Kirim Reservasi'
              )
            )
          )
    )
  );
};